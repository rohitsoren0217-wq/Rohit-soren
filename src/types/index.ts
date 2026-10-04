export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  availability: string;
}

export type PageRoute = 'home' | 'about' | 'services' | 'gallery' | 'appointment' | 'contact' | 'privacy' | 'terms' | 'admin';

export interface AppointmentPageFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  doctorDepartment: string;
  message: string;
  agreedToPolicy: boolean;
}

export interface AppointmentLead {
  id: string;
  referenceId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  source: 'modal' | 'page' | 'contact';
  privyrDispatched?: boolean;
  privyrLeadId?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  filterCategory: 'hospital' | 'facilities' | 'doctors' | 'patient-care' | 'events';
  description: string;
  detailedCaption?: string;
  aspect: string;
  imageUrl?: string;
  locationTag?: string;
}

export interface HighlightItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AppointmentFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  department: string;
  preferredDate: string;
  preferredSlot: string;
  notes: string;
}

export interface EnquiryFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
}

export interface ApproachItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DoctorPlaceholderItem {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  department: string;
  experiencePlaceholder: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  isVerified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StepProcessItem {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DepartmentPlaceholderItem {
  id: string;
  code: string;
  name: string;
  description: string;
  iconName: string;
}

export interface ContactChannelItem {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  actionUrl: string;
  actionLabel: string;
  iconName: string;
  badge?: string;
  highlight?: boolean;
}

export interface TransportItem {
  id: string;
  title: string;
  distance: string;
  duration: string;
  description: string;
  iconName: string;
}

export interface ContactPageFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  serviceCategory: string;
  preferredMethod: 'phone' | 'email' | 'whatsapp';
  message: string;
}



