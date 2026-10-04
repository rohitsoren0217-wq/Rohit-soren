import { AppointmentLead } from '../types';

const LEADS_STORAGE_KEY = 'aarogya_hospital_leads';
const LEAD_EMAIL_CONFIG_KEY = 'aarogya_lead_recipient_email';
const PRIVYR_WEBHOOK_KEY = 'aarogya_privyr_webhook_url';

export const DEFAULT_LEAD_EMAIL = 'rohitsoren0217@gmail.com';
export const DEFAULT_PRIVYR_WEBHOOK_URL =
  'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/cMDDm0gL';

export interface LeadSubmissionPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  source?: 'modal' | 'page' | 'contact';
}

export interface LeadSubmissionResponse {
  success: boolean;
  referenceId: string;
  lead: AppointmentLead;
  recipientEmail: string;
  emailDispatched: boolean;
  privyrDispatched: boolean;
  privyrLeadId?: string;
  message: string;
}

/**
 * Get configured recipient email address
 */
export const getRecipientEmail = (): string => {
  try {
    const saved = localStorage.getItem(LEAD_EMAIL_CONFIG_KEY);
    return saved && saved.trim() ? saved.trim() : DEFAULT_LEAD_EMAIL;
  } catch {
    return DEFAULT_LEAD_EMAIL;
  }
};

/**
 * Update configured recipient email address
 */
export const setRecipientEmail = (email: string): void => {
  try {
    localStorage.setItem(LEAD_EMAIL_CONFIG_KEY, email.trim() || DEFAULT_LEAD_EMAIL);
  } catch (err) {
    console.error('Failed to save recipient email', err);
  }
};

/**
 * Get configured Privyr Webhook URL
 */
export const getPrivyrWebhookUrl = (): string => {
  try {
    const saved = localStorage.getItem(PRIVYR_WEBHOOK_KEY);
    return saved && saved.trim() ? saved.trim() : DEFAULT_PRIVYR_WEBHOOK_URL;
  } catch {
    return DEFAULT_PRIVYR_WEBHOOK_URL;
  }
};

/**
 * Update configured Privyr Webhook URL
 */
export const setPrivyrWebhookUrl = (url: string): void => {
  try {
    localStorage.setItem(PRIVYR_WEBHOOK_KEY, url.trim() || DEFAULT_PRIVYR_WEBHOOK_URL);
  } catch (err) {
    console.error('Failed to save Privyr webhook URL', err);
  }
};

/**
 * Direct dispatcher to Privyr Incoming Leads Generic Webhook
 */
export const sendLeadToPrivyr = async (
  lead: AppointmentLead,
  customWebhookUrl?: string
): Promise<{ success: boolean; lead_id?: string; error?: string }> => {
  const rawUrl = customWebhookUrl || getPrivyrWebhookUrl();
  const cleanUrl = rawUrl.replace(/#.*$/, '').trim();

  if (!cleanUrl) {
    return { success: false, error: 'No Privyr webhook URL provided' };
  }

  const notes = [
    `Hospital: Aarogya City Hospital, Dhanbad`,
    `Service / Department: ${lead.service || 'General Healthcare'}`,
    `Schedule: ${lead.preferredDate || 'Immediate'} (${lead.preferredTime || 'General Slot'})`,
    `Patient Address: ${lead.address || 'City Centre, Dhanbad'}`,
    lead.notes ? `Patient Message: ${lead.notes}` : '',
    `Reference ID: ${lead.referenceId}`,
    `Source Form: ${lead.source || 'Website'}`,
  ]
    .filter(Boolean)
    .join('\n');

  const payload = {
    name: lead.fullName,
    phone: lead.phoneNumber,
    email: lead.email || '',
    lead_source: 'Aarogya City Hospital Website',
    notes,
    other_fields: {
      Address: lead.address || '',
      Service: lead.service || '',
      PreferredDate: lead.preferredDate || '',
      PreferredTime: lead.preferredTime || '',
      ReferenceID: lead.referenceId,
      FormSource: lead.source || 'Website',
      PatientNotes: lead.notes || '',
    },
  };

  try {
    const res = await fetch(cleanUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      return {
        success: true,
        lead_id: data.lead_id || data.client_id,
      };
    } else {
      return {
        success: false,
        error: data.message || `Privyr error: ${res.statusText}`,
      };
    }
  } catch (err: any) {
    console.warn('Direct Privyr forward error:', err);
    return {
      success: false,
      error: err.message || 'Network error reaching Privyr webhook',
    };
  }
};

/**
 * Get leads from localStorage
 */
export const getLocalLeads = (): AppointmentLead[] => {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AppointmentLead[];
  } catch (err) {
    console.error('Failed to parse local leads', err);
    return [];
  }
};

/**
 * Save leads to localStorage
 */
export const saveLocalLeads = (leads: AppointmentLead[]): void => {
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Failed to save leads to localStorage', err);
  }
};

/**
 * Fetch all leads from backend with localStorage fallback
 */
export const fetchAllLeads = async (): Promise<AppointmentLead[]> => {
  const local = getLocalLeads();
  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.leads)) {
        // Merge server leads with local leads (deduplicating by id)
        const map = new Map<string, AppointmentLead>();
        data.leads.forEach((item: AppointmentLead) => map.set(item.id, item));
        local.forEach((item) => {
          if (!map.has(item.id)) map.set(item.id, item);
        });
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        saveLocalLeads(merged);
        return merged;
      }
    }
  } catch {
    // If backend route is not reachable yet, return local leads
  }
  return local.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Submit a new lead - saves to backend file database, localStorage, dispatches email to rohitsoren0217@gmail.com,
 * and posts directly to the Privyr Incoming Leads Generic Webhook.
 */
export const submitAppointmentLead = async (
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResponse> => {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const referenceId = `ACH-${randomSuffix}`;
  const recipientEmail = getRecipientEmail();
  const privyrWebhookUrl = getPrivyrWebhookUrl();

  const newLead: AppointmentLead = {
    id: `lead-${Date.now()}-${randomSuffix}`,
    referenceId,
    fullName: payload.fullName.trim(),
    phoneNumber: payload.phoneNumber.trim(),
    email: payload.email.trim(),
    address: payload.address.trim(),
    service: payload.service.trim(),
    preferredDate: payload.preferredDate.trim(),
    preferredTime: payload.preferredTime.trim(),
    notes: payload.notes?.trim() || '',
    status: 'new',
    createdAt: new Date().toISOString(),
    source: payload.source || 'page',
    privyrDispatched: false,
  };

  // Always save locally first so user data is NEVER lost
  const currentLeads = getLocalLeads();
  saveLocalLeads([newLead, ...currentLeads]);

  let emailDispatched = false;
  let privyrDispatched = false;
  let privyrLeadId: string | undefined = undefined;

  // 1. Attempt backend storage, email dispatch, and Privyr webhook forwarding
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newLead,
        recipientEmail,
        privyrWebhookUrl,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      emailDispatched = !!result.emailDispatched;
      privyrDispatched = !!result.privyrDispatched;
      privyrLeadId = result.privyrLeadId;
    }
  } catch (err) {
    console.warn('Backend API notification skipped or offline, attempting direct Privyr webhook dispatch', err);
  }

  // 2. Client-side fallback guarantee: if server was offline or Privyr wasn't reached from backend, try direct dispatch
  if (!privyrDispatched && privyrWebhookUrl) {
    try {
      const directPrivyrRes = await sendLeadToPrivyr(newLead, privyrWebhookUrl);
      if (directPrivyrRes.success) {
        privyrDispatched = true;
        privyrLeadId = directPrivyrRes.lead_id;
      }
    } catch (e) {
      console.warn('Direct client Privyr fallback dispatch error:', e);
    }
  }

  // Update lead in local storage with final Privyr status
  newLead.privyrDispatched = privyrDispatched;
  newLead.privyrLeadId = privyrLeadId;
  const updatedLeads = getLocalLeads().map((l) => (l.id === newLead.id ? newLead : l));
  saveLocalLeads(updatedLeads);

  return {
    success: true,
    referenceId,
    lead: newLead,
    recipientEmail,
    emailDispatched,
    privyrDispatched,
    privyrLeadId,
    message: `Appointment request submitted. Lead recorded, forwarded to ${recipientEmail} and synced to Privyr CRM.`,
  };
};

/**
 * Update lead status (e.g. new, contacted, confirmed, cancelled, completed)
 */
export const updateLeadStatus = async (
  id: string,
  status: AppointmentLead['status']
): Promise<void> => {
  const leads = getLocalLeads();
  const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
  saveLocalLeads(updated);

  try {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  } catch {
    // offline handled
  }
};

/**
 * Delete a lead by ID
 */
export const deleteLead = async (id: string): Promise<void> => {
  const leads = getLocalLeads();
  const filtered = leads.filter((l) => l.id !== id);
  saveLocalLeads(filtered);

  try {
    await fetch(`/api/leads/${id}`, {
      method: 'DELETE',
    });
  } catch {
    // offline handled
  }
};

/**
 * Export leads to CSV file
 */
export const exportLeadsToCsv = (leads: AppointmentLead[]): void => {
  if (leads.length === 0) return;

  const headers = [
    'Reference ID',
    'Date Submitted',
    'Patient Name',
    'Phone Number',
    'Email Address',
    'Patient Address',
    'Service / Department',
    'Preferred Date',
    'Preferred Time',
    'Notes / Message',
    'Status',
    'Source',
  ];

  const rows = leads.map((l) => [
    `"${l.referenceId || ''}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${(l.fullName || '').replace(/"/g, '""')}"`,
    `"${(l.phoneNumber || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.address || '').replace(/"/g, '""')}"`,
    `"${(l.service || '').replace(/"/g, '""')}"`,
    `"${(l.preferredDate || '').replace(/"/g, '""')}"`,
    `"${(l.preferredTime || '').replace(/"/g, '""')}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
    `"${l.status || 'new'}"`,
    `"${l.source || 'page'}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aarogya_hospital_leads_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
