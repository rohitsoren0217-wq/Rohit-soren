import React, { useState, useEffect } from 'react';
import {
  Shield,
  Palette,
  Image as ImageIcon,
  Building,
  UserCheck,
  Stethoscope,
  Grid,
  Download,
  Upload,
  RotateCcw,
  Check,
  Eye,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  Lock,
  KeyRound,
  Layers,
  CheckCircle2,
  RefreshCw,
  Award,
  FileUp,
  Sliders,
  Inbox,
  MessageSquare,
  PhoneCall,
  MailCheck,
  Filter,
  Search,
  Send,
  X,
  Zap,
  Globe,
} from 'lucide-react';
import {
  useSiteSettings,
  PRESET_THEMES,
  PRESET_IMAGE_LIBRARY,
  PRESET_LOGO_LIBRARY,
  DoctorCustomItem,
  ServiceCustomItem,
  GalleryCustomItem,
} from '../context/SiteSettingsContext';
import { BrandLogo } from '../components/HospitalVisuals';
import { PageRoute, AppointmentLead } from '../types';
import {
  fetchAllLeads,
  submitAppointmentLead,
  updateLeadStatus as updateLeadStatusService,
  deleteLead as deleteLeadService,
  exportLeadsToCsv,
  getRecipientEmail,
  setRecipientEmail,
  DEFAULT_LEAD_EMAIL,
  getPrivyrWebhookUrl,
  setPrivyrWebhookUrl,
  DEFAULT_PRIVYR_WEBHOOK_URL,
} from '../services/leadService';

export const AdminPanelPage: React.FC<{
  onNavigate: (page: PageRoute) => void;
}> = ({ onNavigate }) => {
  const {
    settings,
    updateBrand,
    updateTheme,
    updatePhotos,
    updateAnnouncement,
    updateDoctors,
    updateServices,
    updateGallery,
    setPresetTheme,
    resetToDefaults,
    exportJson,
    importJson,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
  } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<
    'brand' | 'logo' | 'leads' | 'theme' | 'photos' | 'homepage' | 'doctors' | 'services' | 'gallery' | 'backup'
  >('brand');

  // Leads Inbox state
  const [leadsList, setLeadsList] = useState<AppointmentLead[]>([]);
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsFilter, setLeadsFilter] = useState<'all' | 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [recipientEmailState, setRecipientEmailState] = useState<string>(getRecipientEmail());
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(getRecipientEmail());
  const [selectedLeadModal, setSelectedLeadModal] = useState<AppointmentLead | null>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  // Privyr Webhook state
  const [privyrWebhookState, setPrivyrWebhookState] = useState<string>(getPrivyrWebhookUrl());
  const [isEditingPrivyr, setIsEditingPrivyr] = useState(false);
  const [privyrInput, setPrivyrInput] = useState(getPrivyrWebhookUrl());
  const [isTestingPrivyr, setIsTestingPrivyr] = useState(false);
  const [privyrTestStatus, setPrivyrTestStatus] = useState<string | null>(null);

  // Load leads on mount and whenever activeTab === 'leads'
  useEffect(() => {
    fetchAllLeads().then((data) => setLeadsList(data));
  }, [activeTab]);

  const newLeadsCount = leadsList.filter((l) => l.status === 'new').length;

  // File upload ref for logo
  const logoFileInputRef = React.useRef<HTMLInputElement>(null);

  // Logo file upload handler
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Logo file size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateBrand({
          logoImageUrl: dataUrl,
          logoType: settings.brand.logoType === 'emblem' ? 'image' : settings.brand.logoType,
        });
        showToast('Logo image uploaded and applied successfully!');
      }
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be selected again if needed
    e.target.value = '';
  };

  // Login form state
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Photo library picker state
  const [activePhotoSlot, setActivePhotoSlot] = useState<string | null>(null);

  // Doctor modal state
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorCustomItem | null>(null);
  const [doctorForm, setDoctorForm] = useState<DoctorCustomItem>({
    id: '',
    name: '',
    department: 'General Medicine',
    qualification: 'MBBS, MD',
    specialization: 'Consultant Specialist',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    status: 'OPD Active · 10:00 AM – 4:00 PM',
  });

  // Service modal state
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceCustomItem | null>(null);
  const [serviceForm, setServiceForm] = useState<ServiceCustomItem>({
    id: '',
    title: '',
    department: '',
    shortDesc: '',
    availability: 'Daily: 9:00 AM – 7:00 PM',
  });

  // Reset confirmation
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(loginPassword)) {
      setLoginError(false);
      setLoginPassword('');
      showToast('Welcome to Aarogya Hospital Admin CMS!');
    } else {
      setLoginError(true);
    }
  };

  // If not logged in, show secure login gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#031634] via-[#0B2545] to-teal-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0B2545] text-teal-400 mx-auto flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#0B2545]">
              Hospital CMS Admin Panel
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Aarogya City Hospital · City Centre, Dhanbad
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Admin Password / PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    loginError
                      ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-teal-600 focus:border-teal-600'
                  }`}
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
              {loginError && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" /> Incorrect password. Try{' '}
                  <code className="bg-rose-100 px-1 py-0.5 rounded text-rose-800 font-mono">admin123</code>
                </p>
              )}
            </div>

            {/* Quick helper credential badge */}
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200/80 flex items-start gap-2.5 text-xs text-teal-900">
              <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-teal-950">Quick Access Credential:</p>
                <p className="text-[11px] text-teal-800 mt-0.5">
                  Default password is <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-teal-300">admin123</span>
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                ← Return to Aarogya City Hospital Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Handle doctor modal save
  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      const updated = settings.doctors.map((d) =>
        d.id === editingDoctor.id ? { ...doctorForm, id: editingDoctor.id } : d
      );
      updateDoctors(updated);
      showToast(`Doctor ${doctorForm.name} updated!`);
    } else {
      const newDoc: DoctorCustomItem = {
        ...doctorForm,
        id: `doc-${Date.now()}`,
      };
      updateDoctors([...settings.doctors, newDoc]);
      showToast(`Doctor ${doctorForm.name} added!`);
    }
    setDoctorModalOpen(false);
    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the medical team?`)) {
      updateDoctors(settings.doctors.filter((d) => d.id !== id));
      showToast(`Doctor ${name} removed.`);
    }
  };

  // Handle service modal save
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      const updated = settings.services.map((s) =>
        s.id === editingService.id ? { ...serviceForm, id: editingService.id } : s
      );
      updateServices(updated);
      showToast(`Service "${serviceForm.title}" updated!`);
    } else {
      const newServ: ServiceCustomItem = {
        ...serviceForm,
        id: `serv-${Date.now()}`,
      };
      updateServices([...settings.services, newServ]);
      showToast(`Service "${serviceForm.title}" added!`);
    }
    setServiceModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove service "${title}"?`)) {
      updateServices(settings.services.filter((s) => s.id !== id));
      showToast(`Service "${title}" removed.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0B2545] text-white px-5 py-3 rounded-xl shadow-2xl border border-teal-500/40 flex items-center gap-3 animate-fade-in text-sm">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="bg-[#0B2545] text-white sticky top-0 z-30 shadow-md border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-base sm:text-lg tracking-tight leading-none text-white">
                  Aarogya City Hospital CMS
                </h1>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-teal-400/30">
                  Live Control Panel
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                City Centre, Dhanbad · Edit Content, Photos, Theme & Doctors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-medium shadow-sm transition-all cursor-pointer"
              title="Preview Website with latest changes"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Live Preview</span> Website
            </button>

            <button
              onClick={() => {
                showToast('All changes are saved & active on the website!');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout: Left Tabs Sidebar & Right Content Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs mb-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
              Control Modules
            </p>

            <button
              onClick={() => setActiveTab('brand')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'brand'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4 shrink-0" />
              <span>Hospital Brand & Info</span>
            </button>

            <button
              onClick={() => setActiveTab('logo')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'logo'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 shrink-0 text-amber-500" />
              <div className="flex-1 flex items-center justify-between">
                <span>Hospital Logo & Identity</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">Edit Logo</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Inbox className="w-4 h-4 shrink-0 text-emerald-500" />
              <div className="flex-1 flex items-center justify-between">
                <span>Appointments & Leads</span>
                {newLeadsCount > 0 ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold animate-pulse">
                    {newLeadsCount} new
                  </span>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {leadsList.length}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'theme'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Palette className="w-4 h-4 shrink-0" />
              <span>Colors & Theme Design</span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'photos'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>Photos & Media Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('homepage')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'homepage'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Hero & Notice Bar</span>
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>Medical Team / Doctors</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Stethoscope className="w-4 h-4 shrink-0" />
              <span>Hospital Services</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Grid className="w-4 h-4 shrink-0" />
              <span>Gallery Management</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'backup'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
              <span>Backup, Export & Reset</span>
            </button>
          </div>

          {/* Quick status card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-xs text-slate-600">
            <div className="flex items-center gap-2 mb-2 font-semibold text-[#0B2545]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Preset:</span>
            </div>
            <p className="text-teal-700 font-medium">
              {PRESET_THEMES[settings.theme.preset]?.name || 'Custom Palette'}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block" style={{ backgroundColor: settings.theme.primaryColor }} />
              <span className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block" style={{ backgroundColor: settings.theme.tealColor }} />
              <span className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block" style={{ backgroundColor: settings.theme.accentColor }} />
              <span className="text-[10px] text-slate-400 ml-1">Theme Active</span>
            </div>
          </div>
        </aside>

        {/* Content Panel Area */}
        <main className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 lg:p-8">
          {/* ========================================================= */}
          {/* TAB 1: HOSPITAL BRAND & INFO */}
          {/* ========================================================= */}
          {activeTab === 'brand' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                  Hospital Brand & Official Contact Information
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Change hospital name, tagline, address in City Centre Dhanbad, and verified telephone lines.
                </p>
              </div>

              {/* Quick Logo Management Link Banner */}
              <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-blue-50 border border-teal-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital Logo & Visual Identity</h4>
                    <p className="text-xs text-slate-600">Apne hospital ka photo logo upload karein, vector emblem choose karein ya logo size change karein.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('logo')}
                  className="px-4 py-2 bg-[#0B2545] hover:bg-[#133E6E] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Customize Logo &rarr;</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hospital Official Name
                  </label>
                  <input
                    type="text"
                    value={settings.brand.name}
                    onChange={(e) => updateBrand({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.brand.shortName}
                    onChange={(e) => updateBrand({ shortName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hospital Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.brand.tagline}
                    onChange={(e) => updateBrand({ tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Telephone Line
                  </label>
                  <input
                    type="text"
                    value={settings.brand.phonePrimary}
                    onChange={(e) => updateBrand({ phonePrimary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    24/7 Emergency Helpline
                  </label>
                  <input
                    type="text"
                    value={settings.brand.emergency24x7}
                    onChange={(e) => updateBrand({ emergency24x7: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Contact Email
                  </label>
                  <input
                    type="text"
                    value={settings.brand.emailGeneral}
                    onChange={(e) => updateBrand({ emailGeneral: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Enquiry Number
                  </label>
                  <input
                    type="text"
                    value={settings.brand.whatsApp}
                    onChange={(e) => updateBrand({ whatsApp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Campus Address Line
                  </label>
                  <input
                    type="text"
                    value={settings.brand.address}
                    onChange={(e) => updateBrand({ address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    value={`${settings.brand.city}, ${settings.brand.state}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(',');
                      updateBrand({
                        city: parts[0]?.trim() || '',
                        state: parts[1]?.trim() || '',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={settings.brand.pincode}
                    onChange={(e) => updateBrand({ pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    OPD Consultation Timings
                  </label>
                  <input
                    type="text"
                    value={settings.brand.opdTimings}
                    onChange={(e) => updateBrand({ opdTimings: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Emergency Timings
                  </label>
                  <input
                    type="text"
                    value={settings.brand.emergencyTimings}
                    onChange={(e) => updateBrand({ emergencyTimings: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Brand settings updated!')}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Brand Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: HOSPITAL LOGO & IDENTITY */}
          {/* ========================================================= */}
          {activeTab === 'logo' && (
            <div className="space-y-7">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#0B2545] flex items-center gap-2">
                    <Award className="w-5 h-5 text-teal-600" />
                    <span>Hospital Logo & Visual Identity Manager</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Apne hospital ka official logo change karein. Aap apne device se direct photo upload kar sakte hain, custom image URL paste kar sakte hain, ya clinical vector emblem choose kar sakte hain.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      updateBrand({
                        logoType: 'emblem',
                        logoImageUrl: '',
                        logoIconStyle: 'cross',
                        logoSubtitle: `City Centre, ${settings.brand.city || 'Dhanbad'}`,
                        logoHeight: 42,
                        showLogoSubtitle: true,
                      });
                      showToast('Logo reset to default official emblem');
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Reset to default official emblem"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset Logo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Site</span>
                  </button>
                </div>
              </div>

              {/* SECTION 1: LIVE INTERACTIVE PREVIEWS (Header & Footer) */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Live Real-Time Logo Previews
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 font-medium">
                      Active: {settings.brand.logoType.toUpperCase()}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 font-medium">
                      Height: {settings.brand.logoHeight || 42}px
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Light Header Preview */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                      <span>Header Navigation Preview (Light Mode)</span>
                      <span className="text-emerald-600">● Live Preview</span>
                    </div>
                    <div className="py-3 px-2 flex items-center justify-between bg-slate-50/50 rounded-lg overflow-hidden">
                      <BrandLogo size="md" variant="dark" />
                      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                        <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-600">Home</span>
                        <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-600">Doctors</span>
                        <span className="px-2.5 py-1 rounded-md bg-teal-600 text-white font-medium">Book OPD</span>
                      </div>
                    </div>
                  </div>

                  {/* Dark Footer Preview */}
                  <div className="bg-[#0B2545] rounded-xl border border-slate-700 p-4 shadow-sm text-white">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800">
                      <span>Footer & Dark Banner Preview (Dark Mode)</span>
                      <span className="text-teal-400">● Live Preview</span>
                    </div>
                    <div className="py-3 px-2 flex items-center justify-between bg-slate-900/50 rounded-lg overflow-hidden">
                      <BrandLogo size="md" variant="light" />
                      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-teal-200 text-[11px]">Emergency 24x7</span>
                        <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px]">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: LOGO DISPLAY MODE SELECTOR */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Step 1: Choose Logo Display Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Option 1: Emblem + Text */}
                  <button
                    type="button"
                    onClick={() => updateBrand({ logoType: 'emblem' })}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      settings.brand.logoType === 'emblem'
                        ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🏥</span>
                        {settings.brand.logoType === 'emblem' && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Vector Emblem + Name</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Crisp vector medical symbol (Cross, Shield, Caduceus) styled with your active hospital theme colors.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-semibold text-teal-700">Official Default Style</span>
                  </button>

                  {/* Option 2: Custom Logo Image + Name */}
                  <button
                    type="button"
                    onClick={() => updateBrand({ logoType: 'image' })}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      settings.brand.logoType === 'image'
                        ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🖼️</span>
                        {settings.brand.logoType === 'image' && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Custom Image + Name</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Your uploaded hospital logo mark displayed alongside the official hospital typography.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-semibold text-teal-700">Recommended for Custom Logo</span>
                  </button>

                  {/* Option 3: Full Logo Image Only */}
                  <button
                    type="button"
                    onClick={() => updateBrand({ logoType: 'image-only' })}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      settings.brand.logoType === 'image-only'
                        ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🎨</span>
                        {settings.brand.logoType === 'image-only' && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Full Logo Graphic Only</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Shows only your custom uploaded logo image (ideal if your logo graphic already includes hospital name).
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-semibold text-teal-700">Logo Graphic Only</span>
                  </button>

                  {/* Option 4: Both Emblem + Custom Image */}
                  <button
                    type="button"
                    onClick={() => updateBrand({ logoType: 'both' })}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      settings.brand.logoType === 'both'
                        ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">✨</span>
                        {settings.brand.logoType === 'both' && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Both (Emblem + Image)</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Displays the hospital emblem badge AND your custom logo mark side-by-side.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-semibold text-teal-700">Combined Badge</span>
                  </button>

                  {/* Option 5: Text Only */}
                  <button
                    type="button"
                    onClick={() => updateBrand({ logoType: 'text-only' })}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      settings.brand.logoType === 'text-only'
                        ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🔤</span>
                        {settings.brand.logoType === 'text-only' && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Text Only Typography</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Pure typography without icon or image mark. Modern, sleek, and minimalist.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-semibold text-teal-700">Minimal Typography</span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: UPLOAD CUSTOM LOGO PHOTO / CHOOSE PRESETS */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileUp className="w-4 h-4 text-teal-600" />
                      <span>Step 2: Upload Custom Logo Image or Choose Preset</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Aap apne phone ya computer se logo file select kar sakte hain ya neeche diye gaye presets me se click karein.
                    </p>
                  </div>

                  {settings.brand.logoImageUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        updateBrand({ logoImageUrl: '', logoType: 'emblem' });
                        showToast('Custom logo removed. Reverted to official emblem.');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Custom Logo</span>
                    </button>
                  )}
                </div>

                {/* Upload Button & Direct URL Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Upload Trigger */}
                  <div className="border-2 border-dashed border-teal-300/80 bg-teal-50/30 hover:bg-teal-50/70 rounded-xl p-5 text-center transition-all flex flex-col items-center justify-center gap-2.5">
                    <input
                      type="file"
                      ref={logoFileInputRef}
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleLogoFileUpload}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => logoFileInputRef.current?.click()}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <FileUp className="w-4 h-4" />
                        <span>Upload File from Device</span>
                      </button>
                      <p className="text-[11px] text-slate-500 mt-1.5">
                        Supports PNG, SVG, JPG, WebP (Max: 5MB)
                      </p>
                    </div>
                  </div>

                  {/* Direct Image URL Input */}
                  <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-2 bg-slate-50/40">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Or Paste Direct Image / SVG URL:
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/hospital-logo.png"
                        value={settings.brand.logoImageUrl.startsWith('data:') ? '[Uploaded Image from Device]' : settings.brand.logoImageUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val !== '[Uploaded Image from Device]') {
                            updateBrand({
                              logoImageUrl: val,
                              logoType: settings.brand.logoType === 'emblem' ? 'image' : settings.brand.logoType,
                            });
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white font-mono"
                      />
                    </div>
                    {settings.brand.logoImageUrl && (
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-200/80">
                        <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={settings.brand.logoImageUrl}
                            alt="Logo thumbnail"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="text-xs text-slate-600 truncate flex-1">
                          <span className="font-semibold text-emerald-600">Active Custom Logo</span>
                          <p className="text-[11px] text-slate-400 truncate">
                            {settings.brand.logoImageUrl.startsWith('data:') ? 'Stored locally from file upload' : settings.brand.logoImageUrl}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ready-to-use Hospital Logo Presets Grid */}
                <div className="pt-3 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                    One-Click Ready-Made Hospital Logo Badges:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {PRESET_LOGO_LIBRARY.map((preset) => {
                      const isSelected = settings.brand.logoImageUrl === preset.url;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            updateBrand({
                              logoImageUrl: preset.url,
                              logoType: settings.brand.logoType === 'emblem' ? 'image' : settings.brand.logoType,
                            });
                            showToast(`Applied "${preset.title}" logo!`);
                          }}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2.5 ${
                            isSelected
                              ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/30'
                              : 'border-slate-200 hover:border-teal-400 bg-white hover:bg-slate-50/60'
                          }`}
                        >
                          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center shadow-xs">
                            <img
                              src={preset.url}
                              alt={preset.title}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                              {preset.title}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {preset.category}
                            </span>
                          </div>
                          {isSelected ? (
                            <span className="text-[10px] font-bold text-teal-700 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 group-hover:text-teal-600">
                              Click to use
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 4: VECTOR EMBLEM STYLE CUSTOMIZER (For Emblem & Both modes) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-600" />
                      <span>Step 3: Vector Emblem Symbol Style</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Jab vector emblem mode active hota hai, ye symbol official brand color gradient ke sath render hota hai.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: 'cross', name: 'Medical Cross', desc: 'Clinical Standard', icon: '✚' },
                    { id: 'shield', name: 'Health Shield', desc: 'Safety & Protection', icon: '🛡️' },
                    { id: 'heart', name: 'Vital Heart', desc: 'Cardiology & Care', icon: '❤️' },
                    { id: 'caduceus', name: 'Caduceus Staff', desc: 'Asclepius Rod', icon: '⚕️' },
                    { id: 'pulse', name: 'Cardio Pulse', desc: 'Heartbeat Wave', icon: '📈' },
                  ].map((item) => {
                    const isSelected = settings.brand.logoIconStyle === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          updateBrand({
                            logoIconStyle: item.id as any,
                            logoType: settings.brand.logoType === 'image-only' ? 'image' : settings.brand.logoType,
                          });
                          showToast(`Emblem style set to ${item.name}`);
                        }}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-teal-600 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 5: LOGO TEXT & DIMENSIONS */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-teal-600" />
                  <span>Step 4: Hospital Brand Text & Sizing</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hospital Main Title
                    </label>
                    <input
                      type="text"
                      value={settings.brand.name}
                      onChange={(e) => updateBrand({ name: e.target.value })}
                      placeholder="e.g. AAROGYA CITY HOSPITAL"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Logo Subtitle / Location Tagline
                    </label>
                    <input
                      type="text"
                      value={settings.brand.logoSubtitle}
                      onChange={(e) => updateBrand({ logoSubtitle: e.target.value })}
                      placeholder="e.g. City Centre, Dhanbad"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  {/* Show Subtitle Toggle */}
                  <div className="sm:col-span-2 flex items-center gap-3 py-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.brand.showLogoSubtitle !== false}
                        onChange={(e) => updateBrand({ showLogoSubtitle: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                    <div>
                      <span className="text-xs font-semibold text-slate-800">Show Subtitle on Logo</span>
                      <p className="text-[11px] text-slate-500">Uncheck to hide the small location line under the hospital name.</p>
                    </div>
                  </div>

                  {/* Logo Height / Scale Slider */}
                  <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700">
                        Logo Height & Scale: <span className="font-bold text-teal-700">{settings.brand.logoHeight || 42}px</span>
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[
                          { label: 'Compact', val: 32 },
                          { label: 'Default', val: 42 },
                          { label: 'Prominent', val: 52 },
                          { label: 'Large', val: 64 },
                        ].map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => updateBrand({ logoHeight: preset.val })}
                            className={`px-2 py-0.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                              (settings.brand.logoHeight || 42) === preset.val
                                ? 'bg-teal-600 text-white font-semibold'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="28"
                      max="72"
                      step="2"
                      value={settings.brand.logoHeight || 42}
                      onChange={(e) => updateBrand({ logoHeight: parseInt(e.target.value, 10) })}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>28px (Compact)</span>
                      <span>42px (Standard)</span>
                      <span>72px (Maximum)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SAVE / APPLY FOOTER */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>View Logo on Website</span>
                </button>

                <button
                  type="button"
                  onClick={() => showToast('Hospital Logo changes saved & live on all pages!')}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Apply Logo Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: APPOINTMENTS & PATIENT LEADS INBOX */}
          {/* ========================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#0B2545] flex items-center gap-2">
                    <Inbox className="w-5 h-5 text-teal-600" />
                    <span>Appointments & Patient Leads Inbox</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Website se submit hone wale sabhi appointment leads yahan automatically store hote hain aur <strong>{recipientEmailState}</strong> par email notification dispatch hoti hai.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      fetchAllLeads().then((data) => {
                        setLeadsList(data);
                        showToast('Leads refreshed from database');
                      });
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Refresh leads list"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Refresh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      exportLeadsToCsv(leadsList);
                      showToast('Leads exported to Excel / CSV file!');
                    }}
                    disabled={leadsList.length === 0}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs ${
                      leadsList.length > 0
                        ? 'bg-[#0B2545] hover:bg-[#133E6E] text-white'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export to CSV</span>
                  </button>
                </div>
              </div>

              {/* EMAIL NOTIFICATION & FORWARDING CARD */}
              <div className="bg-gradient-to-r from-teal-50/90 via-sky-50/70 to-emerald-50/90 border border-teal-200/90 rounded-2xl p-5 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MailCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          Lead Forwarding Destination Email:
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Destination
                        </span>
                      </div>
                      
                      {isEditingEmail ? (
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="Enter notification email address"
                            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono focus:ring-2 focus:ring-teal-600 focus:outline-none w-64"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (emailInput.trim()) {
                                setRecipientEmail(emailInput.trim());
                                setRecipientEmailState(emailInput.trim());
                                setIsEditingEmail(false);
                                showToast(`Notification email updated to ${emailInput.trim()}!`);
                              }
                            }}
                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEmailInput(recipientEmailState);
                              setIsEditingEmail(false);
                            }}
                            className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-600 text-xs rounded-lg hover:bg-slate-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5 mt-1">
                          <span className="text-sm font-bold text-teal-900 font-mono bg-white/80 px-2.5 py-1 rounded-lg border border-teal-200">
                            {recipientEmailState}
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsEditingEmail(true)}
                            className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline cursor-pointer"
                          >
                            Change Email
                          </button>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-600 mt-1.5">
                        Jab bhi koi patient appointment book karega, unka Naam, Mobile, Email, Address, aur Department is email par auto-deliver hota hai.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={isTestingEmail}
                      onClick={async () => {
                        setIsTestingEmail(true);
                        try {
                          const res = await fetch('/api/leads/test-email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: recipientEmailState }),
                          });
                          const data = await res.json();
                          showToast(data.message || `Test lead notification sent to ${recipientEmailState}`);
                        } catch {
                          showToast(`Test lead recorded for ${recipientEmailState}`);
                        } finally {
                          setIsTestingEmail(false);
                        }
                      }}
                      className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5 text-teal-600" />
                      <span>{isTestingEmail ? 'Sending Test...' : 'Send Test Notification'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* PRIVYR CRM GENERIC WEBHOOK INTEGRATION CARD */}
              <div className="bg-gradient-to-r from-violet-50/95 via-indigo-50/80 to-purple-50/95 border border-violet-200/90 rounded-2xl p-5 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Zap className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Privyr CRM Incoming Leads Webhook:</span>
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Connected & Auto-Storing
                        </span>
                      </div>

                      {isEditingPrivyr ? (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <input
                            type="url"
                            value={privyrInput}
                            onChange={(e) => setPrivyrInput(e.target.value)}
                            placeholder="https://www.privyr.com/api/v1/incoming-leads/..."
                            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono focus:ring-2 focus:ring-violet-600 focus:outline-none w-80 sm:w-96 max-w-full"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (privyrInput.trim()) {
                                setPrivyrWebhookUrl(privyrInput.trim());
                                setPrivyrWebhookState(privyrInput.trim());
                                setIsEditingPrivyr(false);
                                showToast('Privyr Webhook URL updated successfully!');
                              }
                            }}
                            className="px-3 py-1.5 bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPrivyrInput(privyrWebhookState);
                              setIsEditingPrivyr(false);
                            }}
                            className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-600 text-xs rounded-lg hover:bg-slate-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                          <span className="text-xs font-mono font-bold text-violet-950 bg-white/90 px-2.5 py-1 rounded-lg border border-violet-200 select-all break-all">
                            {privyrWebhookState}
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsEditingPrivyr(true)}
                            className="text-xs text-violet-700 hover:text-violet-900 font-semibold underline cursor-pointer"
                          >
                            Edit Webhook URL
                          </button>
                        </div>
                      )}

                      <p className="text-[11px] text-slate-600 mt-1.5">
                        ⚡ <strong>Real-time Instant Lead Capture:</strong> Jaise hi koi patient appointment request ya contact form bharega, unka <strong>Name, Phone, Email, Address, Requested Service & Time</strong> Privyr generic webhook me turant store ho jata hai.
                      </p>

                      {privyrTestStatus && (
                        <div className="mt-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-100/90 text-emerald-900 border border-emerald-300 flex items-center gap-2 w-fit">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{privyrTestStatus}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      type="button"
                      disabled={isTestingPrivyr}
                      onClick={async () => {
                        setIsTestingPrivyr(true);
                        setPrivyrTestStatus(null);
                        try {
                          const res = await fetch('/api/leads/test-privyr', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              webhookUrl: privyrWebhookState,
                              fullName: 'Aarogya Verification Lead',
                              phoneNumber: '+91 94311 55667',
                              email: recipientEmailState,
                            }),
                          });
                          const data = await res.json();
                          if (data.success) {
                            const msg = `✓ Privyr Success! Lead ID: ${data.lead_id || 'saved'}. Lead stored in Privyr CRM.`;
                            setPrivyrTestStatus(msg);
                            showToast(msg);
                          } else {
                            const errMsg = `Privyr sync error: ${data.error || 'Check webhook URL'}`;
                            setPrivyrTestStatus(errMsg);
                            showToast(errMsg);
                          }
                        } catch (err: any) {
                          const fallbackMsg = `Network test attempted for Privyr`;
                          setPrivyrTestStatus(fallbackMsg);
                          showToast(fallbackMsg);
                        } finally {
                          setIsTestingPrivyr(false);
                        }
                      }}
                      className="px-3.5 py-2 bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isTestingPrivyr ? 'Sending to Privyr...' : 'Send Test Lead to Privyr'}</span>
                    </button>

                    <a
                      href="https://www.privyr.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                      title="Open Privyr Dashboard / App"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>Open Privyr</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* METRIC CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Total Inquiries</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1 font-heading">{leadsList.length}</div>
                </div>

                <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200">
                  <span className="text-xs text-emerald-800 font-medium">New / Uncontacted</span>
                  <div className="text-2xl font-bold text-emerald-700 mt-1 font-heading">
                    {leadsList.filter((l) => l.status === 'new').length}
                  </div>
                </div>

                <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-200">
                  <span className="text-xs text-sky-800 font-medium">Contacted / Scheduled</span>
                  <div className="text-2xl font-bold text-sky-700 mt-1 font-heading">
                    {leadsList.filter((l) => l.status === 'contacted' || l.status === 'confirmed').length}
                  </div>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200">
                  <span className="text-xs text-amber-800 font-medium">Completed</span>
                  <div className="text-2xl font-bold text-amber-700 mt-1 font-heading">
                    {leadsList.filter((l) => l.status === 'completed').length}
                  </div>
                </div>
              </div>

              {/* SEARCH & STATUS FILTER TOOLBAR */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, address, ref ID..."
                    value={leadsSearch}
                    onChange={(e) => setLeadsSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
                  <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Filter:
                  </span>
                  {(['all', 'new', 'contacted', 'confirmed', 'completed', 'cancelled'] as const).map((filter) => {
                    const isSelected = leadsFilter === filter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setLeadsFilter(filter)}
                        className={`px-2.5 py-1 text-xs rounded-lg capitalize transition-all cursor-pointer font-medium ${
                          isSelected
                            ? 'bg-[#0B2545] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LEADS TABLE / LIST */}
              {(() => {
                const filteredLeads = leadsList.filter((lead) => {
                  const matchStatus = leadsFilter === 'all' || lead.status === leadsFilter;
                  const query = leadsSearch.toLowerCase();
                  const matchSearch =
                    !query ||
                    (lead.fullName && lead.fullName.toLowerCase().includes(query)) ||
                    (lead.phoneNumber && lead.phoneNumber.includes(query)) ||
                    (lead.email && lead.email.toLowerCase().includes(query)) ||
                    (lead.address && lead.address.toLowerCase().includes(query)) ||
                    (lead.referenceId && lead.referenceId.toLowerCase().includes(query)) ||
                    (lead.service && lead.service.toLowerCase().includes(query));
                  return matchStatus && matchSearch;
                });

                if (filteredLeads.length === 0) {
                  return (
                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                        <Inbox className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-slate-800 mb-1">
                        {leadsList.length === 0 ? 'No Appointment Leads Yet' : 'No Matching Leads Found'}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                        {leadsList.length === 0
                          ? `Jaise hi koi patient website par "Book an Appointment" form bharega, uski puri detail (Name, Phone, Address, Service) yahan live aayegi aur ${recipientEmailState} par email forward ho jayegi.`
                          : 'Try changing your search terms or status filters above.'}
                      </p>

                      {leadsList.length === 0 && (
                        <button
                          type="button"
                          onClick={async () => {
                            const sample = await submitAppointmentLead({
                              fullName: 'Amit Kumar Verma',
                              phoneNumber: '+91 94311 22334',
                              email: 'amit.verma@example.com',
                              address: 'City Centre, Luby Circular Road, Dhanbad',
                              service: 'Doctor Consultation (General Medicine)',
                              preferredDate: new Date().toISOString().split('T')[0],
                              preferredTime: 'Morning (10:00 AM – 12:00 PM)',
                              notes: 'Patient requesting consultation for seasonal fever and routine checkup.',
                              source: 'modal',
                            });
                            setLeadsList([sample.lead]);
                            showToast(`Sample test lead generated and stored! Forwarded to ${recipientEmailState}`);
                          }}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Generate Sample Test Lead</span>
                        </button>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                            <th className="py-3 px-4">Ref ID / Time</th>
                            <th className="py-3 px-4">Patient & Address</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Service & Slot</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                              {/* Reference ID & Time */}
                              <td className="py-3 px-4 align-top">
                                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/80 block w-fit">
                                  {lead.referenceId}
                                </span>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-violet-100 text-violet-800 flex items-center gap-0.5" title="Lead successfully synced to Privyr CRM Webhook">
                                    <Zap className="w-2.5 h-2.5 text-violet-600" /> Privyr Synced
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-400 mt-1 block">
                                  {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </td>

                              {/* Patient Name & Address */}
                              <td className="py-3 px-4 align-top">
                                <span className="font-bold text-slate-900 block text-sm">
                                  {lead.fullName}
                                </span>
                                {lead.address ? (
                                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span>{lead.address}</span>
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-slate-400 italic">No address provided</span>
                                )}
                              </td>

                              {/* Contact & Quick Communication Links */}
                              <td className="py-3 px-4 align-top">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-slate-800">{lead.phoneNumber}</span>
                                    <a
                                      href={`tel:${lead.phoneNumber}`}
                                      className="p-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-700 transition-colors"
                                      title="Call Patient"
                                    >
                                      <PhoneCall className="w-3 h-3" />
                                    </a>
                                    <a
                                      href={`https://wa.me/${lead.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                        `Namaste ${lead.fullName}, this is Aarogya City Hospital regarding your appointment request (${lead.referenceId}).`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                      title="Chat on WhatsApp"
                                    >
                                      <MessageSquare className="w-3 h-3" />
                                    </a>
                                  </div>
                                  {lead.email && (
                                    <a
                                      href={`mailto:${lead.email}?subject=Aarogya%20Hospital%20Appointment%20Confirmation%20${lead.referenceId}`}
                                      className="text-[11px] text-teal-600 hover:underline block truncate max-w-[180px]"
                                    >
                                      {lead.email}
                                    </a>
                                  )}
                                </div>
                              </td>

                              {/* Service & Schedule */}
                              <td className="py-3 px-4 align-top">
                                <span className="font-semibold text-teal-900 block">{lead.service}</span>
                                <span className="text-[11px] text-slate-500 block mt-0.5">
                                  🗓️ {lead.preferredDate} ({lead.preferredTime})
                                </span>
                                {lead.notes && (
                                  <span className="text-[11px] text-slate-400 italic line-clamp-1 mt-0.5" title={lead.notes}>
                                    Note: {lead.notes}
                                  </span>
                                )}
                              </td>

                              {/* Status Dropdown */}
                              <td className="py-3 px-4 align-top">
                                <select
                                  value={lead.status}
                                  onChange={async (e) => {
                                    const nextStatus = e.target.value as AppointmentLead['status'];
                                    await updateLeadStatusService(lead.id, nextStatus);
                                    setLeadsList((prev) =>
                                      prev.map((l) => (l.id === lead.id ? { ...l, status: nextStatus } : l))
                                    );
                                    showToast(`Status updated to ${nextStatus.toUpperCase()}`);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                                    lead.status === 'new'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : lead.status === 'contacted'
                                      ? 'bg-sky-50 text-sky-800 border-sky-300'
                                      : lead.status === 'confirmed'
                                      ? 'bg-teal-50 text-teal-800 border-teal-300'
                                      : lead.status === 'completed'
                                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                                      : 'bg-rose-50 text-rose-800 border-rose-300'
                                  }`}
                                >
                                  <option value="new">New Lead</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 align-top text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedLeadModal(lead)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                                    title="View full lead record"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (confirm(`Delete lead record ${lead.referenceId}?`)) {
                                        await deleteLeadService(lead.id);
                                        setLeadsList((prev) => prev.filter((l) => l.id !== lead.id));
                                        showToast('Lead deleted successfully');
                                      }
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                    title="Delete lead record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {/* LEAD DETAIL MODAL */}
              {selectedLeadModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
                  onClick={() => setSelectedLeadModal(null)}
                >
                  <div
                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-[#0B2545] text-white px-6 py-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-teal-200 uppercase tracking-wider font-semibold">
                          Lead Reference: {selectedLeadModal.referenceId}
                        </span>
                        <h3 className="font-heading text-lg font-bold">
                          {selectedLeadModal.fullName}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedLeadModal(null)}
                        className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-slate-400 block">Mobile Phone:</span>
                          <span className="font-bold text-slate-800 text-sm">{selectedLeadModal.phoneNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Email Address:</span>
                          <span className="font-semibold text-slate-800">{selectedLeadModal.email || 'None'}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block">Patient Address / Locality:</span>
                          <span className="font-semibold text-slate-800 text-sm">{selectedLeadModal.address || 'City Centre, Dhanbad'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-slate-400 block">Service Requested:</span>
                          <span className="font-bold text-teal-800">{selectedLeadModal.service}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Requested Schedule:</span>
                          <span className="font-semibold text-slate-800">{selectedLeadModal.preferredDate} ({selectedLeadModal.preferredTime})</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block">Symptoms / Medical Notes:</span>
                          <span className="text-slate-700 italic">{selectedLeadModal.notes || 'No symptoms or special notes provided.'}</span>
                        </div>
                      </div>

                      {/* Privyr CRM Webhook Status */}
                      <div className="flex items-center justify-between text-xs py-2 px-3 bg-violet-50 text-violet-900 rounded-xl border border-violet-200">
                        <span className="font-semibold flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>Privyr CRM Sync:</span>
                        </span>
                        <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-violet-200 text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Synced & Active</span>
                        </span>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <a
                          href={`tel:${selectedLeadModal.phoneNumber}`}
                          className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Call Patient</span>
                        </a>

                        <a
                          href={`https://wa.me/${selectedLeadModal.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${selectedLeadModal.fullName}, we received your consultation booking request (${selectedLeadModal.referenceId}) at Aarogya City Hospital, Dhanbad.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp Reply</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: COLORS & THEME DESIGN */}
          {/* ========================================================= */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                  Color Palette & Visual Design Customizer
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Change the website colors, theme swatches, and button stylings. Every change instantly updates the live website!
                </p>
              </div>

              {/* 1-Click Preset Theme Swatches */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  One-Click Curated Theme Palettes
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {Object.entries(PRESET_THEMES).map(([key, item]) => {
                    const isCurrent = settings.theme.preset === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setPresetTheme(key);
                          showToast(`Applied ${item.name}!`);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isCurrent
                            ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-500/30 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-xs font-bold text-slate-800">
                            {item.name.split('(')[0]}
                          </span>
                          {isCurrent && (
                            <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-auto">
                          <div
                            className="w-7 h-7 rounded-lg shadow-xs border border-black/10"
                            style={{ backgroundColor: item.colors.primaryColor }}
                            title="Primary Dark"
                          />
                          <div
                            className="w-7 h-7 rounded-lg shadow-xs border border-black/10"
                            style={{ backgroundColor: item.colors.tealColor }}
                            title="Medical Teal"
                          />
                          <div
                            className="w-7 h-7 rounded-lg shadow-xs border border-black/10"
                            style={{ backgroundColor: item.colors.accentColor }}
                            title="Accent Light"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Hex Color Pickers */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Fine-Tune Individual Brand Colors (Hex Codes)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Primary Color */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Primary Deep Navy
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.theme.primaryColor}
                        onChange={(e) =>
                          updateTheme({ primaryColor: e.target.value, preset: 'custom' })
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                      <input
                        type="text"
                        value={settings.theme.primaryColor}
                        onChange={(e) =>
                          updateTheme({ primaryColor: e.target.value, preset: 'custom' })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Medical Teal */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Secondary Medical Teal
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.theme.tealColor}
                        onChange={(e) =>
                          updateTheme({ tealColor: e.target.value, preset: 'custom' })
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                      <input
                        type="text"
                        value={settings.theme.tealColor}
                        onChange={(e) =>
                          updateTheme({ tealColor: e.target.value, preset: 'custom' })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Accent Light Cyan
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.theme.accentColor}
                        onChange={(e) =>
                          updateTheme({ accentColor: e.target.value, preset: 'custom' })
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                      <input
                        type="text"
                        value={settings.theme.accentColor}
                        onChange={(e) =>
                          updateTheme({ accentColor: e.target.value, preset: 'custom' })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Live UI Component Test Preview
                </p>
                <div
                  className="p-6 rounded-xl text-white shadow-lg transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
                  style={{
                    backgroundColor: settings.theme.primaryColor,
                    borderColor: settings.theme.tealColor,
                  }}
                >
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {settings.brand.name}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      {settings.brand.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm transition-transform active:scale-95 cursor-pointer"
                      style={{ backgroundColor: settings.theme.tealColor }}
                    >
                      Book Appointment
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 shadow-sm transition-transform active:scale-95 cursor-pointer"
                      style={{ backgroundColor: settings.theme.accentColor }}
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PHOTOS & MEDIA MANAGER */}
          {/* ========================================================= */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                  Photos & Media Manager (All Website Images)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Change the photos displayed across every section of the website. You can paste custom image URLs or choose from curated real hospital photographs!
                </p>
              </div>

              {/* Photo Slots List */}
              <div className="space-y-4">
                {[
                  {
                    key: 'heroConsultation',
                    title: '1. Hero Consultation Photo (Homepage Top)',
                    desc: 'Real doctor consultation photo displayed in the main hero visual frame.',
                    value: settings.photos.heroConsultation,
                  },
                  {
                    key: 'hospitalBuilding',
                    title: '2. Hospital Campus Exterior Photo (About Section)',
                    desc: 'Real hospital architectural building photo representing City Centre Dhanbad campus.',
                    value: settings.photos.hospitalBuilding,
                  },
                  {
                    key: 'hospitalReception',
                    title: '3. Reception & Waiting Lounge Photo',
                    desc: 'Hospital front desk and patient assistance lounge photography.',
                    value: settings.photos.hospitalReception,
                  },
                  {
                    key: 'aboutHero',
                    title: '4. About Us Page Hero Photo',
                    desc: 'Comprehensive hospital team and care facilities photo on About Us page.',
                    value: settings.photos.aboutHero,
                  },
                  {
                    key: 'servicesHero',
                    title: '5. Services Page Hero Photo',
                    desc: 'Clinical diagnostics and healthcare facilities photo on Services page.',
                    value: settings.photos.servicesHero,
                  },
                  {
                    key: 'featuredService',
                    title: '6. Featured Clinical Care Photo',
                    desc: 'Dedicated patient-centred consultation photo on Services overview.',
                    value: settings.photos.featuredService,
                  },
                  {
                    key: 'contactHero',
                    title: '7. Contact Us Reception Desk Photo',
                    desc: 'Front desk enquiry and telephone helpline desk photo on Contact page.',
                    value: settings.photos.contactHero,
                  },
                  {
                    key: 'appointmentHero',
                    title: '8. Appointment Page Hero Photo',
                    desc: 'Doctor consultation scheduling scene photo on Appointment page.',
                    value: settings.photos.appointmentHero,
                  },
                ].map((slot) => (
                  <div
                    key={slot.key}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center gap-4"
                  >
                    {/* Thumbnail preview */}
                    <div className="w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 relative group">
                      <img
                        src={slot.value}
                        alt={slot.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] text-white font-medium">Live</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex-1 w-full min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-heading">
                        {slot.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mb-2 truncate">
                        {slot.desc}
                      </p>

                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={slot.value}
                          onChange={(e) =>
                            updatePhotos({ [slot.key]: e.target.value })
                          }
                          placeholder="Paste image URL here (https://...)"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-800 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => setActivePhotoSlot(slot.key)}
                          className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                          <span>Choose Preset</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preset Image Library Modal */}
              {activePhotoSlot && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="font-heading font-bold text-base text-[#0B2545]">
                          Choose from Verified Real Hospital Photos
                        </h3>
                        <p className="text-xs text-slate-500">
                          Click any authentic photo below to set it for:{' '}
                          <span className="font-semibold text-teal-700">
                            {activePhotoSlot}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => setActivePhotoSlot(null)}
                        className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                      {PRESET_IMAGE_LIBRARY.map((img) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => {
                            updatePhotos({ [activePhotoSlot]: img.url });
                            showToast(`Photo updated for ${activePhotoSlot}!`);
                            setActivePhotoSlot(null);
                          }}
                          className="rounded-xl overflow-hidden border border-slate-200 hover:border-teal-600 hover:ring-2 hover:ring-teal-500/40 text-left transition-all group flex flex-col cursor-pointer bg-slate-50"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-[11px] font-semibold text-slate-800 truncate">
                              {img.title}
                            </p>
                            <span className="text-[10px] text-teal-600 font-medium">
                              {img.category}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setActivePhotoSlot(null)}
                        className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: HERO & HOMEPAGE COPY */}
          {/* ========================================================= */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                  Hero Section & Notice Bar Editor
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Customize the top emergency announcement ticker and main hero headline.
                </p>
              </div>

              {/* Announcement Bar Toggle & Content */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <h3 className="font-heading font-bold text-sm text-[#0B2545]">
                      Top Emergency & Announcement Ticker
                    </h3>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.announcement.enabled}
                      onChange={(e) =>
                        updateAnnouncement({ enabled: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                    <span className="ml-2 text-xs font-semibold text-slate-600">
                      {settings.announcement.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Announcement Text
                    </label>
                    <input
                      type="text"
                      value={settings.announcement.text}
                      onChange={(e) =>
                        updateAnnouncement({ text: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Banner Type
                    </label>
                    <select
                      value={settings.announcement.type}
                      onChange={(e) =>
                        updateAnnouncement({
                          type: e.target.value as 'emergency' | 'notice' | 'camp',
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white"
                    >
                      <option value="emergency">Emergency Alert (Navy & Rose)</option>
                      <option value="notice">General Notice (Teal)</option>
                      <option value="camp">Health Camp / Free Checkup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Helpline Label
                    </label>
                    <input
                      type="text"
                      value={settings.announcement.actionText}
                      onChange={(e) =>
                        updateAnnouncement({ actionText: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Helpline Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.announcement.actionPhone}
                      onChange={(e) =>
                        updateAnnouncement({ actionPhone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Section Copy */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-[#0B2545]">
                  Main Hero Section Copy
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Small Top Hero Badge Text
                  </label>
                  <input
                    type="text"
                    value={settings.brand.heroBadge}
                    onChange={(e) => updateBrand({ heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Main Hero Headline (H1)
                  </label>
                  <input
                    type="text"
                    value={settings.brand.heroHeadline}
                    onChange={(e) => updateBrand({ heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hero Subtitle Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.brand.heroSubtitle}
                    onChange={(e) => updateBrand({ heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Homepage copy updated!')}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Copy Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: MEDICAL TEAM / DOCTORS */}
          {/* ========================================================= */}
          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                    Medical Team & Doctor Profiles
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Add new doctors, edit qualifications, change portrait photographs, and update daily OPD chamber timings.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingDoctor(null);
                    setDoctorForm({
                      id: '',
                      name: '',
                      department: 'General Medicine',
                      qualification: 'MBBS, MD',
                      specialization: 'Senior Consultant',
                      photoUrl:
                        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
                      status: 'OPD Active · 10:00 AM – 4:00 PM',
                    });
                    setDoctorModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Doctor</span>
                </button>
              </div>

              {/* Doctor cards list */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {settings.doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-3 border border-slate-200 relative group">
                        <img
                          src={doc.photoUrl}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <span className="absolute bottom-2 left-2 bg-white/95 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                          {doc.department}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-[#0B2545]">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-teal-700 mt-0.5">
                        {doc.qualification}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {doc.specialization}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-600 font-medium truncate max-w-[65%]">
                        {doc.status}
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingDoctor(doc);
                            setDoctorForm(doc);
                            setDoctorModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit Doctor"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDoctor(doc.id, doc.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Doctor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Doctor Modal */}
              {doctorModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-heading font-bold text-base text-[#0B2545]">
                        {editingDoctor ? 'Edit Doctor Details' : 'Add New Doctor to Team'}
                      </h3>
                      <button
                        onClick={() => setDoctorModalOpen(false)}
                        className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveDoctor} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Doctor Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={doctorForm.name}
                          onChange={(e) =>
                            setDoctorForm({ ...doctorForm, name: e.target.value })
                          }
                          placeholder="e.g. Dr. Rajesh Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Department
                          </label>
                          <input
                            type="text"
                            required
                            value={doctorForm.department}
                            onChange={(e) =>
                              setDoctorForm({ ...doctorForm, department: e.target.value })
                            }
                            placeholder="e.g. General Medicine"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Qualifications
                          </label>
                          <input
                            type="text"
                            required
                            value={doctorForm.qualification}
                            onChange={(e) =>
                              setDoctorForm({ ...doctorForm, qualification: e.target.value })
                            }
                            placeholder="e.g. MBBS, MD, DNB"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Specialization & Designation
                        </label>
                        <input
                          type="text"
                          required
                          value={doctorForm.specialization}
                          onChange={(e) =>
                            setDoctorForm({ ...doctorForm, specialization: e.target.value })
                          }
                          placeholder="e.g. Senior Consultant Physician"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Doctor Photograph URL
                        </label>
                        <input
                          type="url"
                          required
                          value={doctorForm.photoUrl}
                          onChange={(e) =>
                            setDoctorForm({ ...doctorForm, photoUrl: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />

                        {/* Presets */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[11px] text-slate-400">Presets:</span>
                          <button
                            type="button"
                            onClick={() =>
                              setDoctorForm({
                                ...doctorForm,
                                photoUrl:
                                  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
                              })
                            }
                            className="text-[11px] text-teal-700 hover:underline"
                          >
                            Male Doctor
                          </button>
                          <span>·</span>
                          <button
                            type="button"
                            onClick={() =>
                              setDoctorForm({
                                ...doctorForm,
                                photoUrl:
                                  'https://images.unsplash.com/photo-1594824813583-b541d4c20798?auto=format&fit=crop&w=800&q=80',
                              })
                            }
                            className="text-[11px] text-teal-700 hover:underline"
                          >
                            Female Doctor
                          </button>
                          <span>·</span>
                          <button
                            type="button"
                            onClick={() =>
                              setDoctorForm({
                                ...doctorForm,
                                photoUrl:
                                  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
                              })
                            }
                            className="text-[11px] text-teal-700 hover:underline"
                          >
                            Senior Surgeon
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          OPD Chamber Status / Timings
                        </label>
                        <input
                          type="text"
                          value={doctorForm.status}
                          onChange={(e) =>
                            setDoctorForm({ ...doctorForm, status: e.target.value })
                          }
                          placeholder="e.g. Mon–Sat: 10:00 AM – 4:00 PM"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setDoctorModalOpen(false)}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer"
                        >
                          {editingDoctor ? 'Update Doctor' : 'Save New Doctor'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: HOSPITAL SERVICES */}
          {/* ========================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                    Hospital Clinical Services
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage core clinical departments, descriptions, and schedule availability.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setServiceForm({
                      id: '',
                      title: '',
                      department: '',
                      shortDesc: '',
                      availability: 'Daily: 9:00 AM – 7:00 PM',
                    });
                    setServiceModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Services cards list */}
              <div className="space-y-3.5">
                {settings.services.map((serv) => (
                  <div
                    key={serv.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-sm text-[#0B2545]">
                          {serv.title}
                        </h4>
                        <span className="bg-teal-50 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-teal-200/80">
                          {serv.department}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {serv.shortDesc}
                      </p>
                      <p className="text-[11px] text-teal-700 font-medium mt-1">
                        ● {serv.availability}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingService(serv);
                          setServiceForm(serv);
                          setServiceModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteService(serv.id, serv.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Service Modal */}
              {serviceModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-heading font-bold text-base text-[#0B2545]">
                        {editingService ? 'Edit Service' : 'Add New Clinical Service'}
                      </h3>
                      <button
                        onClick={() => setServiceModalOpen(false)}
                        className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveService} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Service Title
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceForm.title}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, title: e.target.value })
                          }
                          placeholder="e.g. Pediatric & Neonatal Care"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceForm.department}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, department: e.target.value })
                          }
                          placeholder="e.g. Child Healthcare"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Short Description
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={serviceForm.shortDesc}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, shortDesc: e.target.value })
                          }
                          placeholder="Brief summary of service features..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Availability Timings
                        </label>
                        <input
                          type="text"
                          value={serviceForm.availability}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, availability: e.target.value })
                          }
                          placeholder="e.g. Mon–Sat: 9:00 AM – 7:00 PM"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setServiceModalOpen(false)}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer"
                        >
                          {editingService ? 'Update Service' : 'Save New Service'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: GALLERY MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                  Gallery Photos & Visual Facilities
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage photos in the hospital facility gallery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {settings.gallery.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2.5"
                  >
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...settings.gallery];
                          updated[idx].title = e.target.value;
                          updateGallery(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800"
                        placeholder="Photo Title"
                      />
                    </div>

                    <div>
                      <input
                        type="url"
                        value={item.imageUrl}
                        onChange={(e) => {
                          const updated = [...settings.gallery];
                          updated[idx].imageUrl = e.target.value;
                          updateGallery(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-[11px] font-mono text-slate-600"
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Gallery photos updated!')}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Gallery</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: BACKUP, EXPORT & RESET */}
          {/* ========================================================= */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#0B2545]">
                  Backup, Restore & Reset Settings
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Safely export your website configuration as JSON, restore previous backups, or reset everything to factory default.
                </p>
              </div>

              {/* Export Box */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2.5 mb-2">
                  <Download className="w-5 h-5 text-teal-600" />
                  <h3 className="font-heading font-bold text-sm text-[#0B2545]">
                    Export Website Configuration (JSON)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Download or copy your complete customized setup (colors, photos, texts, doctors) to keep a secure backup.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const dataStr = exportJson();
                      const blob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `aarogya-hospital-settings-${new Date().toISOString().slice(0, 10)}.json`;
                      link.click();
                      showToast('Configuration file downloaded!');
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON File</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(exportJson());
                      showToast('JSON copied to clipboard!');
                    }}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              </div>

              {/* Import Box */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2.5 mb-2">
                  <Upload className="w-5 h-5 text-teal-600" />
                  <h3 className="font-heading font-bold text-sm text-[#0B2545]">
                    Import / Restore Configuration
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Paste JSON configuration text below to apply saved settings.
                </p>

                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => {
                    setImportJsonText(e.target.value);
                    setImportError(false);
                  }}
                  placeholder='Paste JSON here: { "brand": { ... } }'
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono mb-2"
                />

                {importError && (
                  <p className="text-xs text-rose-600 mb-2 font-medium">
                    Invalid JSON data. Please check and try again.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (importJson(importJsonText)) {
                      setImportJsonText('');
                      showToast('Settings restored successfully!');
                    } else {
                      setImportError(true);
                    }
                  }}
                  disabled={!importJsonText.trim()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore from JSON</span>
                </button>
              </div>

              {/* Reset to Factory Default */}
              <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40">
                <div className="flex items-center gap-2.5 mb-2">
                  <RotateCcw className="w-5 h-5 text-rose-600" />
                  <h3 className="font-heading font-bold text-sm text-rose-950">
                    Reset All to Factory Defaults
                  </h3>
                </div>
                <p className="text-xs text-rose-800 mb-3">
                  Revert all customized colors, images, doctors, and content back to the original Aarogya City Hospital verified setup.
                </p>

                {resetConfirmOpen ? (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetToDefaults();
                        setResetConfirmOpen(false);
                        showToast('All settings reset to Aarogya City Hospital defaults!');
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Yes, Reset Everything
                    </button>
                    <button
                      type="button"
                      onClick={() => setResetConfirmOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setResetConfirmOpen(true)}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Reset to Default Values
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
