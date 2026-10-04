import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DoctorCustomItem {
  id: string;
  name: string;
  department: string;
  qualification: string;
  specialization: string;
  photoUrl: string;
  status: string;
}

export interface ServiceCustomItem {
  id: string;
  title: string;
  department: string;
  shortDesc: string;
  availability: string;
}

export interface GalleryCustomItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ThemeColors {
  preset: string;
  primaryColor: string;
  primaryDark: string;
  tealColor: string;
  tealDark: string;
  accentColor: string;
  borderRadius: string;
}

export interface BrandSettings {
  name: string;
  shortName: string;
  tagline: string;
  logoType: 'emblem' | 'image' | 'image-only' | 'both' | 'text-only';
  logoImageUrl: string;
  logoIconStyle: 'cross' | 'shield' | 'heart' | 'caduceus' | 'pulse';
  logoSubtitle: string;
  logoHeight?: number;
  showLogoSubtitle?: boolean;
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  phonePrimary: string;
  emergency24x7: string;
  emailGeneral: string;
  whatsApp: string;
  opdTimings: string;
  emergencyTimings: string;
}

export interface SitePhotos {
  heroConsultation: string;
  heroConsultationFallback: string;
  hospitalBuilding: string;
  hospitalBuildingFallback: string;
  hospitalReception: string;
  hospitalReceptionFallback: string;
  aboutHero: string;
  aboutHeroFallback: string;
  servicesHero: string;
  servicesHeroFallback: string;
  featuredService: string;
  featuredServiceFallback: string;
  contactHero: string;
  contactHeroFallback: string;
  appointmentHero: string;
  appointmentHeroFallback: string;
}

export interface AnnouncementSettings {
  enabled: boolean;
  text: string;
  type: 'emergency' | 'notice' | 'camp';
  actionText: string;
  actionPhone: string;
}

export interface SiteSettings {
  brand: BrandSettings;
  theme: ThemeColors;
  photos: SitePhotos;
  announcement: AnnouncementSettings;
  doctors: DoctorCustomItem[];
  services: ServiceCustomItem[];
  gallery: GalleryCustomItem[];
}

export const PRESET_THEMES: Record<string, { name: string; colors: ThemeColors }> = {
  'aarogya-classic': {
    name: 'Aarogya Classic (Deep Navy & Medical Teal)',
    colors: {
      preset: 'aarogya-classic',
      primaryColor: '#0B2545',
      primaryDark: '#031634',
      tealColor: '#0D9488',
      tealDark: '#0F766E',
      accentColor: '#38BDF8',
      borderRadius: 'rounded-xl',
    },
  },
  'emerald-care': {
    name: 'Emerald Healthcare (Deep Forest & Emerald)',
    colors: {
      preset: 'emerald-care',
      primaryColor: '#062C22',
      primaryDark: '#021B14',
      tealColor: '#059669',
      tealDark: '#047857',
      accentColor: '#34D399',
      borderRadius: 'rounded-xl',
    },
  },
  'royal-sapphire': {
    name: 'Royal Sapphire (Navy Blue & Medical Cyan)',
    colors: {
      preset: 'royal-sapphire',
      primaryColor: '#172554',
      primaryDark: '#0F172A',
      tealColor: '#0284C7',
      tealDark: '#0369A1',
      accentColor: '#38BDF8',
      borderRadius: 'rounded-xl',
    },
  },
  'crimson-ruby': {
    name: 'Crimson Red Cross (Burgundy & Medical Ruby)',
    colors: {
      preset: 'crimson-ruby',
      primaryColor: '#4C0519',
      primaryDark: '#2A020D',
      tealColor: '#BE123C',
      tealDark: '#9F1239',
      accentColor: '#FB7185',
      borderRadius: 'rounded-xl',
    },
  },
  'midnight-slate': {
    name: 'Midnight Modern (Charcoal Slate & Vibrant Cyan)',
    colors: {
      preset: 'midnight-slate',
      primaryColor: '#1E293B',
      primaryDark: '#0F172A',
      tealColor: '#0891B2',
      tealDark: '#0E7490',
      accentColor: '#22D3EE',
      borderRadius: 'rounded-xl',
    },
  },
};

export const PRESET_IMAGE_LIBRARY = [
  {
    id: 'consultation-1',
    title: 'Senior Doctor Patient Consultation',
    category: 'Consultation',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'consultation-2',
    title: 'Attentive Clinical Discussion',
    category: 'Consultation',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'building-1',
    title: 'Modern Hospital Glass Campus Building',
    category: 'Building',
    url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'building-2',
    title: 'Multi-specialty Hospital Centre',
    category: 'Building',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'reception-1',
    title: 'Modern Hospital Reception Lounge',
    category: 'Reception',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'reception-2',
    title: 'Clean Front Desk Helpdesk',
    category: 'Reception',
    url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'team-1',
    title: 'Professional Medical Doctors Team',
    category: 'Team',
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'team-2',
    title: 'Clinical Operation & Patient Care',
    category: 'Team',
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'diagnostics-1',
    title: 'Advanced Medical Diagnostics & Monitoring',
    category: 'Diagnostics',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'nursing-1',
    title: 'Empathetic Nursing & Patient Care',
    category: 'Care',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'laboratory-1',
    title: 'Clinical Pathology Laboratory',
    category: 'Diagnostics',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'room-1',
    title: 'Private Patient Hospital Ward',
    category: 'Facilities',
    url: 'https://images.unsplash.com/photo-1586773860383-dab5f3bc1bcc?auto=format&fit=crop&w=1200&q=80',
  },
];

export const PRESET_LOGO_LIBRARY = [
  {
    id: 'preset-cross-badge',
    title: 'Emerald Teal Cross Crest',
    category: 'Classic Medical',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%230D9488"/><rect x="42" y="20" width="16" height="60" rx="8" fill="%23ffffff"/><rect x="20" y="42" width="60" height="16" rx="8" fill="%23ffffff"/><circle cx="50" cy="50" r="7" fill="%2338BDF8"/></svg>',
  },
  {
    id: 'preset-caduceus-navy',
    title: 'Royal Asclepius Staff & Gold Glow',
    category: 'Specialist Emblem',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%230B2545"/><circle cx="50" cy="50" r="42" fill="none" stroke="%2338BDF8" stroke-width="2" stroke-dasharray="4 2"/><line x1="50" y1="20" x2="50" y2="80" stroke="%23F59E0B" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="22" r="7" fill="%23FCD34D"/><path d="M30 38 C40 28 60 28 70 38 C60 48 40 48 30 58 C40 68 60 68 70 78" stroke="%2338BDF8" stroke-width="4" stroke-linecap="round" fill="none"/></svg>',
  },
  {
    id: 'preset-heart-pulse',
    title: 'Cardio Pulse & Vital Health Heart',
    category: 'Cardiology & Emergency',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%23BE123C"/><path d="M50 82 S18 62 18 38 a18 18 0 0 1 32 -10 a18 18 0 0 1 32 10 c0 24 -32 44 -32 44 Z" fill="%23ffffff"/><path d="M26 44 H38 L43 32 L53 58 L59 40 L64 44 H74" stroke="%23BE123C" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  },
  {
    id: 'preset-shield-care',
    title: 'Healthcare Protection Shield',
    category: 'Hospital Protection',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 12 L82 24 V50 C82 68 68 82 50 88 C32 82 18 68 18 50 V24 Z" fill="%230284C7"/><path d="M50 28 V72 M28 50 H72" stroke="%23ffffff" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="50" r="6" fill="%2338BDF8"/></svg>',
  },
  {
    id: 'preset-clinic-minimal',
    title: 'Minimal Modern Clinical Plus',
    category: 'Clean Clinic',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23F8FAFC" stroke="%23E2E8F0" stroke-width="2"/><circle cx="50" cy="50" r="34" fill="%230F766E"/><path d="M50 30 V70 M30 50 H70" stroke="%23ffffff" stroke-width="7" stroke-linecap="round"/></svg>',
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brand: {
    name: 'AAROGYA CITY HOSPITAL',
    shortName: 'Aarogya Hospital',
    tagline: 'Trusted Care. Better Health. A Healthier Tomorrow.',
    logoType: 'emblem',
    logoImageUrl: '',
    logoIconStyle: 'cross',
    logoSubtitle: 'City Centre, Dhanbad',
    logoHeight: 42,
    showLogoSubtitle: true,
    heroBadge: 'COMPASSIONATE HEALTHCARE IN DHANBAD',
    heroHeadline: 'Trusted Care. Better Health. A Healthier Tomorrow.',
    heroSubtitle:
      'Providing a welcoming healthcare environment where patients and families can connect with professional medical care and support.',
    address: 'City Centre, Luby Circular Road',
    city: 'Dhanbad',
    state: 'Jharkhand',
    pincode: '826001',
    fullAddress: 'City Centre, Dhanbad, Jharkhand, India — 826001',
    phonePrimary: '+91 326 230 4567',
    emergency24x7: '+91 94311 88990',
    emailGeneral: 'info@aarogyacityhospital.com',
    whatsApp: '+919431188990',
    opdTimings: 'Monday – Saturday: 9:00 AM – 7:00 PM',
    emergencyTimings: '24 Hours / 7 Days Open',
  },
  theme: PRESET_THEMES['aarogya-classic'].colors,
  photos: {
    heroConsultation:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
    heroConsultationFallback:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    hospitalBuilding:
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
    hospitalBuildingFallback:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    hospitalReception:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    hospitalReceptionFallback:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    aboutHero:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    aboutHeroFallback:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    servicesHero:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    servicesHeroFallback:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    featuredService:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    featuredServiceFallback:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    contactHero:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    contactHeroFallback:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    appointmentHero:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    appointmentHeroFallback:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  },
  announcement: {
    enabled: true,
    text: '🚨 24/7 Casualty & Emergency Trauma Centre Active · OPD Consultations Monday–Saturday · City Centre, Dhanbad',
    type: 'emergency',
    actionText: 'Emergency Helpline',
    actionPhone: '+91 94311 88990',
  },
  doctors: [
    {
      id: 'doc-1',
      name: 'Dr. Rajesh Sharma',
      department: 'General Medicine',
      qualification: 'MBBS, MD (Internal Medicine)',
      specialization: 'Senior Consultant Physician',
      photoUrl:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      status: 'OPD Active · 10:00 AM – 4:00 PM',
    },
    {
      id: 'doc-2',
      name: 'Dr. Sunita Patel',
      department: 'Consultation Services',
      qualification: 'MBBS, DNB (Family Medicine)',
      specialization: 'Primary & Preventive Care Specialist',
      photoUrl:
        'https://images.unsplash.com/photo-1594824813583-b541d4c20798?auto=format&fit=crop&w=800&q=80',
      status: 'OPD Active · 11:00 AM – 5:00 PM',
    },
    {
      id: 'doc-3',
      name: 'Dr. Arvind Verma',
      department: 'Specialist Healthcare',
      qualification: 'MS (General Surgery), FMAS',
      specialization: 'Consultant Specialist Surgeon',
      photoUrl:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
      status: 'Consultations by Appointment',
    },
  ],
  services: [
    {
      id: 'gen-med',
      title: 'General Medicine & OPD',
      department: 'Clinical Consultations',
      shortDesc: 'Comprehensive clinical evaluation and personalized patient care for adult illnesses.',
      availability: 'Mon – Sat: 9:00 AM – 7:00 PM',
    },
    {
      id: 'crit-care',
      title: '24/7 Emergency & Casualty',
      department: 'Emergency Medicine',
      shortDesc: 'Immediate trauma and emergency response services with dedicated ambulance support.',
      availability: '24 Hours / 7 Days Active',
    },
    {
      id: 'diagnostics',
      title: 'Diagnostic & Laboratory Services',
      department: 'Pathology & Imaging',
      shortDesc: 'Accurate clinical diagnostics, routine blood testing, and essential health checkup packages.',
      availability: 'Daily: 8:00 AM – 8:00 PM',
    },
    {
      id: 'inpatient',
      title: 'Inpatient Care & Day Care',
      department: 'Nursing & Recovery',
      shortDesc: 'Comfortable recovery wards with round-the-clock nursing supervision and medical support.',
      availability: '24/7 Inpatient Supervision',
    },
  ],
  gallery: [
    {
      id: 'g-1',
      title: 'Main Hospital Campus Exterior',
      category: 'Hospital Exterior',
      imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
      description: 'Modern healthcare infrastructure located in City Centre, Dhanbad.',
    },
    {
      id: 'g-2',
      title: 'Central Reception & Helpdesk',
      category: 'Hospital Facilities',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      description: 'Welcoming reception and patient registration counter.',
    },
    {
      id: 'g-3',
      title: 'Sanitized Clinical Consultation Room',
      category: 'Consultation',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      description: 'Private doctor chambers equipped for clinical consultations.',
    },
    {
      id: 'g-4',
      title: 'Diagnostic Testing Facility',
      category: 'Diagnostics',
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
      description: 'Certified pathology and diagnostic examination room.',
    },
  ],
};

const STORAGE_KEY = 'aarogya_hospital_cms_settings_v2';
const ADMIN_AUTH_KEY = 'aarogya_admin_auth_status';

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateBrand: (brand: Partial<BrandSettings>) => void;
  updateTheme: (theme: Partial<ThemeColors>) => void;
  updatePhotos: (photos: Partial<SitePhotos>) => void;
  updateAnnouncement: (announcement: Partial<AnnouncementSettings>) => void;
  updateDoctors: (doctors: DoctorCustomItem[]) => void;
  updateServices: (services: ServiceCustomItem[]) => void;
  updateGallery: (gallery: GalleryCustomItem[]) => void;
  setPresetTheme: (presetKey: string) => void;
  resetToDefaults: () => void;
  exportJson: () => string;
  importJson: (jsonString: string) => boolean;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...parsed,
          brand: { ...DEFAULT_SITE_SETTINGS.brand, ...parsed.brand },
          theme: { ...DEFAULT_SITE_SETTINGS.theme, ...parsed.theme },
          photos: { ...DEFAULT_SITE_SETTINGS.photos, ...parsed.photos },
          announcement: { ...DEFAULT_SITE_SETTINGS.announcement, ...parsed.announcement },
          doctors: parsed.doctors || DEFAULT_SITE_SETTINGS.doctors,
          services: parsed.services || DEFAULT_SITE_SETTINGS.services,
          gallery: parsed.gallery || DEFAULT_SITE_SETTINGS.gallery,
        };
      }
    } catch (e) {
      console.error('Error loading stored hospital CMS settings:', e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Apply CSS Variables to :root when theme changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }

    const root = document.documentElement;
    root.style.setProperty('--hospital-primary', settings.theme.primaryColor);
    root.style.setProperty('--hospital-primary-dark', settings.theme.primaryDark);
    root.style.setProperty('--hospital-teal', settings.theme.tealColor);
    root.style.setProperty('--hospital-teal-dark', settings.theme.tealDark);
    root.style.setProperty('--hospital-accent', settings.theme.accentColor);
  }, [settings]);

  const updateBrand = (newBrand: Partial<BrandSettings>) => {
    setSettings((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...newBrand },
    }));
  };

  const updateTheme = (newTheme: Partial<ThemeColors>) => {
    setSettings((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme },
    }));
  };

  const updatePhotos = (newPhotos: Partial<SitePhotos>) => {
    setSettings((prev) => ({
      ...prev,
      photos: { ...prev.photos, ...newPhotos },
    }));
  };

  const updateAnnouncement = (newAnnouncement: Partial<AnnouncementSettings>) => {
    setSettings((prev) => ({
      ...prev,
      announcement: { ...prev.announcement, ...newAnnouncement },
    }));
  };

  const updateDoctors = (newDoctors: DoctorCustomItem[]) => {
    setSettings((prev) => ({
      ...prev,
      doctors: newDoctors,
    }));
  };

  const updateServices = (newServices: ServiceCustomItem[]) => {
    setSettings((prev) => ({
      ...prev,
      services: newServices,
    }));
  };

  const updateGallery = (newGallery: GalleryCustomItem[]) => {
    setSettings((prev) => ({
      ...prev,
      gallery: newGallery,
    }));
  };

  const setPresetTheme = (presetKey: string) => {
    const preset = PRESET_THEMES[presetKey];
    if (preset) {
      updateTheme(preset.colors);
    }
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const exportJson = () => {
    return JSON.stringify(settings, null, 2);
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setSettings({
          ...DEFAULT_SITE_SETTINGS,
          ...parsed,
          brand: { ...DEFAULT_SITE_SETTINGS.brand, ...parsed.brand },
          theme: { ...DEFAULT_SITE_SETTINGS.theme, ...parsed.theme },
          photos: { ...DEFAULT_SITE_SETTINGS.photos, ...parsed.photos },
          announcement: { ...DEFAULT_SITE_SETTINGS.announcement, ...parsed.announcement },
          doctors: parsed.doctors || DEFAULT_SITE_SETTINGS.doctors,
          services: parsed.services || DEFAULT_SITE_SETTINGS.services,
          gallery: parsed.gallery || DEFAULT_SITE_SETTINGS.gallery,
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  const loginAdmin = (password: string): boolean => {
    // Default password 'admin123' or 'admin'
    if (password.trim() === 'admin123' || password.trim() === 'admin') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
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
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
