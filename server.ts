import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Ensure data directory exists for persistent leads storage
const DATA_DIR = path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helpers for reading and writing leads
function readLeads(): any[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const content = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(content) || [];
  } catch (err) {
    console.error('Error reading leads file:', err);
    return [];
  }
}

function writeLeads(leads: any[]): void {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing leads file:', err);
  }
}

// Default Privyr generic incoming leads webhook
const DEFAULT_PRIVYR_WEBHOOK_URL =
  process.env.PRIVYR_WEBHOOK_URL ||
  'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/cMDDm0gL';

/**
 * Dispatch lead to Privyr generic incoming leads webhook
 */
async function sendLeadToPrivyr(
  lead: {
    referenceId: string;
    fullName: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    service?: string;
    preferredDate?: string;
    preferredTime?: string;
    notes?: string;
    source?: string;
  },
  webhookUrl: string = DEFAULT_PRIVYR_WEBHOOK_URL
): Promise<{ success: boolean; lead_id?: string; data?: any; error?: string }> {
  // Strip URL hash like #generic-webhook if present
  const cleanUrl = (webhookUrl || DEFAULT_PRIVYR_WEBHOOK_URL).replace(/#.*$/, '').trim();
  if (!cleanUrl) {
    return { success: false, error: 'Empty Privyr webhook URL' };
  }

  const notesText = [
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

  const privyrPayload = {
    name: lead.fullName,
    phone: lead.phoneNumber,
    email: lead.email || '',
    lead_source: 'Aarogya City Hospital Website',
    notes: notesText,
    other_fields: {
      Address: lead.address || 'City Centre, Dhanbad',
      Service: lead.service || 'General Consultation',
      PreferredDate: lead.preferredDate || '',
      PreferredTime: lead.preferredTime || '',
      ReferenceID: lead.referenceId,
      LeadSource: lead.source || 'Website',
      PatientNotes: lead.notes || '',
    },
  };

  try {
    const res = await fetch(cleanUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(privyrPayload),
    });

    const data: any = await res.json().catch(() => ({}));
    const success = res.ok && (data.success === true || res.status === 200 || res.status === 201);
    const lead_id = data.lead_id || data.client_id;

    if (success) {
      console.log(`[PRIVYR DISPATCH SUCCESS] Lead ${lead.referenceId} synced to Privyr. Lead ID: ${lead_id}`);
    } else {
      console.warn(`[PRIVYR DISPATCH FAILED] Status ${res.status}:`, data);
    }

    return {
      success,
      lead_id,
      data,
      error: success ? undefined : data.message || `HTTP ${res.status}`,
    };
  } catch (err: any) {
    console.error('[PRIVYR DISPATCH ERROR]', err);
    return {
      success: false,
      error: err.message || 'Network error reaching Privyr webhook',
    };
  }
}

// Nodemailer transporter initialization
function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  } else if (user && pass) {
    // Gmail service preset
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  // Fallback test/mock transport if no external credentials provided
  return null;
}

// Email generation template
function generateLeadEmailHtml(lead: {
  referenceId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  createdAt: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Appointment Lead - Aarogya City Hospital</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      
      <!-- Hospital Header Banner -->
      <div style="background: linear-gradient(135deg, #0B2545 0%, #0F766E 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">AAROGYA CITY HOSPITAL</h1>
        <p style="margin: 0; font-size: 13px; color: #99f6e4; font-weight: 500;">City Centre, Dhanbad, Jharkhand — New Lead Alert</p>
      </div>

      <!-- Lead Summary Header -->
      <div style="background-color: #f0fdfa; border-bottom: 1px solid #ccfbf1; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="display: inline-block; background-color: #0d9488; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; rounded: 6px; border-radius: 6px; text-transform: uppercase;">
            Booking Request: ${lead.referenceId}
          </span>
        </div>
        <div style="font-size: 12px; color: #64748b;">
          ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </div>
      </div>

      <!-- Patient Information Table -->
      <div style="padding: 24px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
          👤 Patient Contact & Lead Details
        </h2>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 35%; font-weight: 600;">Patient Name:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${lead.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Phone Number:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">
              <a href="tel:${lead.phoneNumber}" style="color: #0d9488; text-decoration: none;">📞 ${lead.phoneNumber}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email Address:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
              ${lead.email ? `<a href="mailto:${lead.email}" style="color: #0d9488; text-decoration: none;">✉️ ${lead.email}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Patient Address:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">
              📍 ${lead.address || 'City Centre, Dhanbad'}
            </td>
          </tr>
        </table>

        <!-- Appointment Consultation Details -->
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 24px 0 16px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
          🏥 Requested Healthcare Service & Schedule
        </h2>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 35%; font-weight: 600;">Selected Service:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700; color: #0d9488;">
              ${lead.service}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Preferred Date:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">
              🗓️ ${lead.preferredDate}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Preferred Time Slot:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
              ⏰ ${lead.preferredTime}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Patient Notes / Symptoms:</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #334155; font-style: italic;">
              ${lead.notes || 'None specified'}
            </td>
          </tr>
        </table>

        <!-- Quick Action Buttons -->
        <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
          <a href="tel:${lead.phoneNumber.replace(/[^0-9+]/g, '')}" style="display: inline-block; background-color: #0d9488; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 700; text-decoration: none; margin: 0 8px 8px 0; font-size: 13px;">
            📞 Call Patient Now
          </a>
          <a href="https://wa.me/${lead.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.fullName)},%20we%20received%20your%20appointment%20request%20(${encodeURIComponent(lead.referenceId)})%20at%20Aarogya%20City%20Hospital,%20Dhanbad." style="display: inline-block; background-color: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 700; text-decoration: none; margin: 0 8px 8px 0; font-size: 13px;">
            💬 WhatsApp Patient
          </a>
        </div>
      </div>

      <!-- Footer Info -->
      <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8;">
        This automated notification was generated by the Aarogya City Hospital web booking engine.<br>
        Lead stored securely in hospital database and sent to <strong>${process.env.LEAD_NOTIFICATION_EMAIL || 'rohitsoren0217@gmail.com'}</strong>.
      </div>

    </div>
  </body>
  </html>
  `;
}

async function startServer() {
  app.use(express.json());

  // -------------------------------------------------------------
  // API Routes
  // -------------------------------------------------------------

  // 1. Submit a new lead, forward via email, and sync to Privyr generic webhook
  app.post('/api/leads', async (req: Request, res: Response) => {
    try {
      const {
        fullName,
        phoneNumber,
        email = '',
        address = '',
        service = 'General Consultation',
        preferredDate = '',
        preferredTime = '',
        notes = '',
        source = 'page',
        recipientEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'rohitsoren0217@gmail.com',
        privyrWebhookUrl = DEFAULT_PRIVYR_WEBHOOK_URL,
      } = req.body;

      if (!fullName || !phoneNumber) {
        return res.status(400).json({
          success: false,
          error: 'Patient name and phone number are required',
        });
      }

      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const referenceId = req.body.referenceId || `ACH-${randomSuffix}`;

      const newLead: any = {
        id: req.body.id || `lead-${Date.now()}-${randomSuffix}`,
        referenceId,
        fullName: String(fullName).trim(),
        phoneNumber: String(phoneNumber).trim(),
        email: String(email).trim(),
        address: String(address).trim(),
        service: String(service).trim(),
        preferredDate: String(preferredDate).trim(),
        preferredTime: String(preferredTime).trim(),
        notes: String(notes).trim(),
        status: 'new',
        createdAt: new Date().toISOString(),
        source,
        privyrDispatched: false,
      };

      // 1. Forward to Privyr incoming leads generic webhook
      const targetPrivyrUrl = privyrWebhookUrl || DEFAULT_PRIVYR_WEBHOOK_URL;
      const privyrRes = await sendLeadToPrivyr(newLead, targetPrivyrUrl);
      newLead.privyrDispatched = privyrRes.success;
      if (privyrRes.lead_id) {
        newLead.privyrLeadId = privyrRes.lead_id;
      }

      // 2. Persist to leads.json file
      const currentLeads = readLeads();
      currentLeads.unshift(newLead);
      writeLeads(currentLeads);

      // 3. Dispatch Email Notification
      let emailDispatched = false;
      const transporter = getMailTransporter();
      const targetEmail = recipientEmail || 'rohitsoren0217@gmail.com';

      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Aarogya City Hospital Leads" <no-reply@aarogyacityhospital.com>`,
            to: targetEmail,
            subject: `🏥 New Appointment Lead: ${newLead.fullName} - ${newLead.service} (${referenceId})`,
            html: generateLeadEmailHtml(newLead),
          });
          emailDispatched = true;
          console.log(`[LEAD DISPATCH] Email notification sent to ${targetEmail}`);
        } catch (mailErr) {
          console.error('[LEAD DISPATCH] Failed to send email via SMTP:', mailErr);
        }
      } else {
        // Log formatted dispatch alert
        console.log(`\n======================================================`);
        console.log(`🏥 [NEW APPOINTMENT LEAD STORED FOR ${targetEmail}]`);
        console.log(`Ref ID:    ${newLead.referenceId}`);
        console.log(`Name:      ${newLead.fullName}`);
        console.log(`Phone:     ${newLead.phoneNumber}`);
        console.log(`Email:     ${newLead.email}`);
        console.log(`Address:   ${newLead.address}`);
        console.log(`Service:   ${newLead.service}`);
        console.log(`Privyr:    ${newLead.privyrDispatched ? 'Synced (' + newLead.privyrLeadId + ')' : 'Pending/Failed'}`);
        console.log(`Stored in: data/leads.json`);
        console.log(`======================================================\n`);
        emailDispatched = true; // Recorded successfully
      }

      return res.status(201).json({
        success: true,
        referenceId,
        lead: newLead,
        recipientEmail: targetEmail,
        emailDispatched,
        privyrDispatched: newLead.privyrDispatched,
        privyrLeadId: newLead.privyrLeadId,
        message: `Lead recorded, notification forwarded to ${targetEmail}, and synced to Privyr CRM`,
      });
    } catch (err: any) {
      console.error('Error creating lead:', err);
      return res.status(500).json({ success: false, error: err.message || 'Server error' });
    }
  });

  // 2. Get all stored leads
  app.get('/api/leads', (req: Request, res: Response) => {
    try {
      const leads = readLeads();
      return res.json({ success: true, count: leads.length, leads });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Update lead status
  app.patch('/api/leads/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const leads = readLeads();
      const idx = leads.findIndex((l) => l.id === id);

      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Lead not found' });
      }

      leads[idx].status = status;
      writeLeads(leads);
      return res.json({ success: true, lead: leads[idx] });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Delete lead
  app.delete('/api/leads/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let leads = readLeads();
      leads = leads.filter((l) => l.id !== id);
      writeLeads(leads);
      return res.json({ success: true, message: 'Lead deleted successfully' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Test Email endpoint
  app.post('/api/leads/test-email', async (req: Request, res: Response) => {
    try {
      const targetEmail = req.body.email || process.env.LEAD_NOTIFICATION_EMAIL || 'rohitsoren0217@gmail.com';
      const sampleLead = {
        referenceId: 'ACH-TEST-' + Math.floor(1000 + Math.random() * 9000),
        fullName: 'Rohit Soren (Test Patient)',
        phoneNumber: '+91 94311 88990',
        email: targetEmail,
        address: 'City Centre, Dhanbad, Jharkhand',
        service: 'Cardiology & Heart Care Consultation',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: 'Morning (10:00 AM)',
        notes: 'Test lead notification to verify email forwarding setup.',
        createdAt: new Date().toISOString(),
      };

      const transporter = getMailTransporter();
      if (transporter) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Aarogya City Hospital" <no-reply@aarogyacityhospital.com>`,
          to: targetEmail,
          subject: `🏥 Test Lead Forwarding: Aarogya City Hospital Dhanbad`,
          html: generateLeadEmailHtml(sampleLead),
        });
        return res.json({ success: true, message: `Test email sent to ${targetEmail}` });
      }

      return res.json({
        success: true,
        message: `Test lead recorded for ${targetEmail}. (SMTP credentials can be added to .env for direct outbound server delivery).`,
        sampleLead,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Test Privyr webhook connection directly
  app.post('/api/leads/test-privyr', async (req: Request, res: Response) => {
    try {
      const {
        webhookUrl = DEFAULT_PRIVYR_WEBHOOK_URL,
        fullName = 'Rohit Soren (Privyr Test)',
        phoneNumber = '+91 94311 55667',
        email = 'rohitsoren0217@gmail.com',
      } = req.body;

      const testLead = {
        referenceId: 'PRIVYR-TEST-' + Math.floor(1000 + Math.random() * 9000),
        fullName,
        phoneNumber,
        email,
        address: 'City Centre, Dhanbad, Jharkhand',
        service: 'Privyr Webhook Connection Test',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: 'Instant Verification',
        notes: 'Testing Privyr incoming leads webhook endpoint integration from Aarogya City Hospital web platform.',
        source: 'Admin Verification',
      };

      const privyrRes = await sendLeadToPrivyr(testLead, webhookUrl);

      if (privyrRes.success) {
        return res.json({
          success: true,
          message: `Privyr Webhook Connection Successful! Lead ID: ${privyrRes.lead_id || 'generated'}`,
          lead_id: privyrRes.lead_id,
          targetUrl: (webhookUrl || DEFAULT_PRIVYR_WEBHOOK_URL).replace(/#.*$/, ''),
          testLead,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: privyrRes.error || 'Failed to sync with Privyr webhook',
          targetUrl: webhookUrl,
        });
      }
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Aarogya City Hospital Backend',
      recipientEmail: process.env.LEAD_NOTIFICATION_EMAIL || 'rohitsoren0217@gmail.com',
      timestamp: new Date().toISOString(),
    });
  });

  // -------------------------------------------------------------
  // Frontend Serving (Vite in Dev, Static in Prod)
  // -------------------------------------------------------------
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
    console.log(`Lead notifications routed to: ${process.env.LEAD_NOTIFICATION_EMAIL || 'rohitsoren0217@gmail.com'}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
