import {
  ServiceItem,
  HighlightItem,
  WhyChooseItem,
  GalleryItem,
  ApproachItem,
  DoctorPlaceholderItem,
  FacilityItem,
  FaqItem,
  StepProcessItem,
  DepartmentPlaceholderItem,
  ContactChannelItem,
  TransportItem,
} from '../types';

export const HOSPITAL_INFO = {
  name: 'AAROGYA CITY HOSPITAL',
  shortName: 'Aarogya Hospital',
  tagline: 'Trusted Care. Better Health. A Healthier Tomorrow.',
  heroLabel: 'COMPASSIONATE HEALTHCARE IN DHANBAD',
  heroHeadline: 'Trusted Care. Better Health. A Healthier Tomorrow.',
  heroSubtitle:
    'Providing a welcoming healthcare environment where patients and families can connect with professional medical care and support.',
  location: {
    address: 'City Centre, Luby Circular Road',
    city: 'Dhanbad',
    state: 'Jharkhand',
    country: 'India',
    pincode: '826001',
    fullAddress: 'City Centre, Dhanbad, Jharkhand, India — 826001',
    mapUrl: 'https://maps.google.com/?q=City+Centre+Dhanbad+Jharkhand',
  },
  contact: {
    phonePrimary: '+91 326 230 4567',
    emergency24x7: '+91 94311 88990',
    emailGeneral: 'info@aarogyacityhospital.com',
    emailAppointments: 'appointments@aarogyacityhospital.com',
    whatsApp: '+919431188990',
  },
  timings: {
    opd: 'Monday – Saturday: 9:00 AM – 7:00 PM',
    emergency: '24 Hours / 7 Days Open',
    visitingHoursMorning: '11:00 AM – 1:00 PM',
    visitingHoursEvening: '5:00 PM – 7:00 PM',
  },
};

export const HIGHLIGHTS: HighlightItem[] = [
  {
    number: '01',
    title: 'Patient-Centred Care',
    description: 'Healthcare decisions and clinical attention tailored around patient dignity and comfort.',
    iconName: 'HeartHandshake',
  },
  {
    number: '02',
    title: 'Professional Healthcare',
    description: 'Experienced medical practitioners dedicated to evidence-based healthcare delivery.',
    iconName: 'Stethoscope',
  },
  {
    number: '03',
    title: 'Comfortable Environment',
    description: 'Clean, serene and well-maintained clinical spaces designed for peace of mind.',
    iconName: 'Building2',
  },
  {
    number: '04',
    title: 'Easy Appointment Support',
    description: 'Streamlined scheduling assistance for consultations and hospital visits.',
    iconName: 'CalendarCheck',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'general-healthcare',
    title: 'General Healthcare',
    shortDesc: 'Professional healthcare support for everyday medical needs.',
    fullDesc:
      'Our general healthcare unit provides essential primary medical consultations, routine evaluations, preventive health check-ups, and outpatient management for patients of all ages.',
    iconName: 'Activity',
    features: [
      'Comprehensive primary health assessments',
      'Preventive health screenings and lifestyle guidance',
      'Management of acute infections and seasonal illnesses',
      'Coordination for continuing care and referrals',
    ],
    availability: 'Mon – Sat: 9:00 AM – 7:00 PM',
  },
  {
    id: 'doctor-consultation',
    title: 'Doctor Consultation',
    shortDesc: 'Connect with healthcare professionals for consultation and guidance.',
    fullDesc:
      'Consult with qualified physicians who take the time to listen, review clinical history thoroughly, and discuss diagnosis and treatment pathways in clear, understandable language.',
    iconName: 'UserCheck',
    features: [
      'Thorough clinical history and physical evaluations',
      'Clear, unhurried patient-doctor communication',
      'Follow-up review sessions and medication counseling',
      'Family health advisory and wellness guidance',
    ],
    availability: 'Scheduled OPD slots daily',
  },
  {
    id: 'diagnostic-support',
    title: 'Diagnostic Support',
    shortDesc: 'Healthcare diagnostic support based on available hospital facilities.',
    fullDesc:
      'Facilitating reliable clinical diagnostics to aid physicians in accurate assessments and effective treatment planning in accordance with hospital infrastructure.',
    iconName: 'Microscope',
    features: [
      'Standard clinical pathology and biochemistry tests',
      'Digital diagnostic imaging and routine screenings',
      'Timely test turnaround and report delivery',
      'Strict quality controls and sterile sample handling',
    ],
    availability: 'Mon – Sat: 8:00 AM – 8:00 PM',
  },
  {
    id: 'patient-care',
    title: 'Patient Care',
    shortDesc: 'A comfortable and supportive environment focused on patient needs.',
    fullDesc:
      'Compassionate inpatient and day-care nursing support prioritizing patient hygiene, comfort, pain management, and nutritional care throughout recovery.',
    iconName: 'BedDouble',
    features: [
      'Attentive round-the-clock nursing care',
      'Clean, well-ventilated patient rooms and recovery areas',
      'Assistance with patient mobility and routine hygiene',
      'Clear updates and transparent communication with family members',
    ],
    availability: '24/7 Inpatient Support',
  },
  {
    id: 'specialist-consultation',
    title: 'Specialist Consultation',
    shortDesc: 'Professional consultation services based on available specialties.',
    fullDesc:
      'Access experienced visiting and resident medical specialists across key clinical disciplines to evaluate complex conditions and specialized health requirements.',
    iconName: 'Award',
    features: [
      'Focused clinical evaluations by credentialed specialists',
      'Evidence-based clinical recommendations and second opinions',
      'Long-term management plans for chronic medical conditions',
      'Cross-departmental collaboration for holistic care',
    ],
    availability: 'By prior appointment',
  },
  {
    id: 'health-support',
    title: 'Health Support',
    shortDesc: 'Healthcare assistance designed around patients and their families.',
    fullDesc:
      'Guidance and dedicated support services for patients navigating health journeys, including medication compliance advice, dietary counselling, and discharge planning.',
    iconName: 'ShieldPlus',
    features: [
      'Post-consultation guidance and prescription clarification',
      'Nutritional and dietary orientation for recovery',
      'Assistance with medical record requests and billing transparency',
      'Guidance on follow-up appointments and preventive measures',
    ],
    availability: 'Mon – Sat: 9:00 AM – 6:00 PM',
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Patient First',
    description: 'A patient-focused approach throughout the healthcare journey.',
    iconName: 'Heart',
  },
  {
    number: '02',
    title: 'Professional Environment',
    description: 'A clean and welcoming environment designed around patient comfort.',
    iconName: 'CheckCircle2',
  },
  {
    number: '03',
    title: 'Accessible Location',
    description: 'Conveniently located in City Centre, Dhanbad.',
    iconName: 'MapPin',
  },
  {
    number: '04',
    title: 'Caring Support',
    description: 'A supportive experience for patients and their families.',
    iconName: 'Smile',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'exterior',
    title: 'Hospital Exterior & Dedicated Entrance',
    category: 'Hospital Environment',
    filterCategory: 'hospital',
    description: 'Modern healthcare facility located in City Centre, Dhanbad, planned with dedicated ambulance docking and covered patient drop-off porch.',
    detailedCaption: 'Our main hospital building along Luby Circular Road in City Centre, Dhanbad, featuring barrier-free ramp access, dedicated ambulance docking, and covered patient drop-off designed for all weather conditions.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Main Campus Entrance, Ground Floor',
  },
  {
    id: 'reception',
    title: 'Central Reception & Patient Helpdesk',
    category: 'Hospital Facilities',
    filterCategory: 'facilities',
    description: 'Spacious, welcoming lobby counter with bilingual support staff for appointments, registrations, and patient queries.',
    detailedCaption: 'An open-concept, welcoming lobby featuring patient registration counters, clear queue numbers, and friendly patient coordinators ready to guide patients and family members.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Central Atrium, Ground Floor',
  },
  {
    id: 'waiting',
    title: 'Patient & Family Waiting Lounge',
    category: 'Hospital Facilities',
    filterCategory: 'facilities',
    description: 'Quiet, air-cooled waiting lounge equipped with ergonomic seating, clean drinking water points, and digital queue monitors.',
    detailedCaption: 'Thoughtfully designed to keep patient attendants relaxed and informed. Features comfortable seating rows, chilled RO purified water dispensers, clean restrooms, and quiet acoustic zoning.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'OPD Concourse, Level 1',
  },
  {
    id: 'consultation-room',
    title: 'Doctor Consultation Chamber',
    category: 'Doctors & Team',
    filterCategory: 'doctors',
    description: 'Private, sanitized clinical consultation chambers equipped for comprehensive patient examinations and consultations.',
    detailedCaption: 'Confidential clinical chambers where patients can speak freely with consulting doctors. Maintained with strict daily sanitization, ergonomic examination couches, and digital medical record access.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Consultation Wing A, Level 1',
  },
  {
    id: 'doctor-consultation',
    title: 'Doctor Consultation & Clinical Review',
    category: 'Doctors & Team',
    filterCategory: 'doctors',
    description: 'Attentive, unhurried clinical consultations focused on thorough evaluations, patient questions, and tailored treatment plans.',
    detailedCaption: 'Our medical consultants prioritise respectful, patient-first care. Every consultation is structured to listen to patient concerns, examine vital indicators, and explain treatment recommendations clearly.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Specialist OPD Chambers',
  },
  {
    id: 'nursing-care',
    title: 'Nursing Station & Inpatient Floor',
    category: 'Patient Care',
    filterCategory: 'patient-care',
    description: '24/7 centralized nursing counter ensuring continuous patient monitoring, prompt medication schedules, and compassionate care.',
    detailedCaption: 'Staffed 24 hours a day by qualified nursing caregivers. Equipped with direct bedside call intercoms, emergency medication carts, and centralized patient vitals tracking.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Inpatient Ward, Level 2',
  },
  {
    id: 'diagnostic-lab',
    title: 'Diagnostic Support & Pathology Lab',
    category: 'Hospital Facilities',
    filterCategory: 'facilities',
    description: 'Diagnostic laboratory equipped for routine clinical pathology, biochemistry, and timely reporting to assist physician decisions.',
    detailedCaption: 'High-standard laboratory testing facilities operating under stringent quality control protocols. Provides rapid turnaround times to ensure treating physicians make timely clinical assessments.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Diagnostics Wing, Ground Floor',
  },
  {
    id: 'corridor',
    title: 'Sanitized Hospital Corridors & Ward Wings',
    category: 'Hospital Environment',
    filterCategory: 'hospital',
    description: 'Spacious, well-illuminated corridors featuring continuous anti-bacterial handrails and clear bilingual directional signs.',
    detailedCaption: 'Wide, obstacle-free transit corridors designed for easy movement of stretchers and wheelchairs. Features non-skid floors, hospital-grade air exchange, and daily multi-shift sterilization.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Central Concourse, Level 1 & 2',
  },
  {
    id: 'patient-room',
    title: 'Comfortable Patient Recovery Room',
    category: 'Patient Care',
    filterCategory: 'patient-care',
    description: 'Clean, peaceful inpatient recovery room with adjustable hospital bed, private sanitized washroom, and attendant space.',
    detailedCaption: 'Calming inpatient rooms designed to facilitate rapid recovery. Fitted with natural lighting, climate control, oxygen points, bedside nurse alert system, and dedicated family attendant seating.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1586773860383-dab5f3bc1bcc?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Inpatient Block, Level 2',
  },
  {
    id: 'healthcare-team',
    title: 'Multidisciplinary Healthcare Team',
    category: 'Doctors & Team',
    filterCategory: 'doctors',
    description: 'Dedicated medical practitioners, nursing staff, and patient care associates working together for optimal health outcomes.',
    detailedCaption: 'Our team embodies our core philosophy of "Trusted Care. Better Health." Combining professional clinical expertise with sincere empathy, warm bedside manners, and mutual teamwork.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Clinical Advisory Board',
  },
  {
    id: 'hospital-event',
    title: 'Community Health Awareness Camp',
    category: 'Hospital Events',
    filterCategory: 'events',
    description: 'Community health drives, preventative wellness camps, and interactive health awareness programs in Dhanbad.',
    detailedCaption: 'Aarogya City Hospital routinely organizes free health screening drives, hypertension and diabetes checks, and health literacy sessions to promote wellness across the local Dhanbad community.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Community Outreach Wing',
  },
  {
    id: 'facility-clean',
    title: 'Clean Healthcare Facility & Casualty Bay',
    category: 'Hospital Environment',
    filterCategory: 'hospital',
    description: 'Sterilized triage bay and 24/7 casualty area maintained for immediate patient intake and medical stabilization.',
    detailedCaption: 'Our casualty and immediate assessment area is maintained 24 hours a day with sterile surgical grade hygiene, emergency oxygen, crash carts, and dedicated emergency doctors.',
    aspect: '4:3',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    locationTag: '24/7 Casualty Wing, Ground Floor',
  },
];

export const GALLERY_PAGE_DATA = {
  hero: {
    label: 'OUR GALLERY',
    heading: 'Inside Aarogya City Hospital',
    subheading: 'Explore our healthcare environment, facilities, team and patient-focused spaces through our gallery.',
    breadcrumb: [
      { label: 'Home', page: 'home' as const },
      { label: 'Gallery', page: 'gallery' as const },
    ],
  },
  intro: {
    label: 'CARE THAT STARTS WITH YOU',
    heading: 'Healthcare Environment Designed Around Care',
    description:
      'Take a closer look at the environment, spaces and people that help create a comfortable and professional healthcare experience.',
    paragraph1:
      'At Aarogya City Hospital, we understand that physical surroundings play an essential role in patient peace of mind and recovery. Every corner of our campus in City Centre, Dhanbad, is organized to foster calm, clinical cleanliness, and rapid accessibility.',
    paragraph2:
      'From well-lit reception halls to quiet inpatient rooms and sanitized clinical chambers, our spaces reflect our deep commitment to patient dignity and attentive family care.',
    floatingBadge: 'Compassion • Care • Comfort',
    pillars: [
      {
        title: 'Thoughtful Architectural Design',
        description: 'Wide, obstacle-free corridors, accessible ramps, and clear bilingual signage.',
      },
      {
        title: 'Rigorous Hygiene & Cleanliness',
        description: 'Scheduled sanitization rounds and hospital-grade infection control protocols.',
      },
      {
        title: 'Patient-Centric Comfort',
        description: 'Private consultation suites, natural lighting, and climate-regulated patient zones.',
      },
    ],
  },
  categories: [
    { id: 'all', label: 'All', count: 12 },
    { id: 'hospital', label: 'Hospital', count: 3 },
    { id: 'facilities', label: 'Facilities', count: 3 },
    { id: 'doctors', label: 'Doctors & Team', count: 3 },
    { id: 'patient-care', label: 'Patient Care', count: 2 },
    { id: 'events', label: 'Events', count: 1 },
  ],
  spacesOverview: [
    {
      code: 'ZONE 01',
      title: 'Reception & Helpdesk',
      floor: 'Ground Floor',
      description: 'Central admissions, registration helpdesk, billing assistance, and inquiry coordination.',
      features: ['Queue token management', 'Bilingual reception coordinators', 'Wheelchair assistance point'],
    },
    {
      code: 'ZONE 02',
      title: 'Doctor Consultation Suites',
      floor: 'Level 1',
      description: 'Private outpatient examination chambers for general physicians and visiting specialists.',
      features: ['Confidential examination areas', 'Digital clinical records access', 'Sanitized patient couches'],
    },
    {
      code: 'ZONE 03',
      title: 'Diagnostic Support Lab',
      floor: 'Ground Floor',
      description: 'Fully equipped clinical pathology and specimen processing for timely test results.',
      features: ['Sterile blood collection', 'Routine hematology & biochemistry', 'Prompt report turnaround'],
    },
    {
      code: 'ZONE 04',
      title: 'Inpatient Floor & Wards',
      floor: 'Level 2',
      description: 'Comfortable recovery rooms with continuous nursing supervision and attendant facilities.',
      features: ['Centralized nursing station', 'Emergency bedside intercom', 'Natural daylight & climate control'],
    },
  ],
  guidelines: [
    {
      title: 'Patient Privacy & Dignity',
      desc: 'To protect the privacy and comfort of patients and staff, photography and videography in consultation rooms and inpatient floors is strictly prohibited.',
    },
    {
      title: 'Designated Visiting Hours',
      desc: 'Inpatient visiting is welcomed daily from 11:00 AM – 1:00 PM and 5:00 PM – 7:00 PM to ensure patients have uninterrupted rest during treatment.',
    },
    {
      title: 'Quiet & Serene Campus',
      desc: 'We kindly request visitors to maintain low speaking volumes and keep mobile devices on silent mode inside corridors and waiting areas.',
    },
    {
      title: 'Sanitization & Hand Hygiene',
      desc: 'Hand sanitizer dispensers are mounted at every ward entrance, elevator bank, and consultation corridor for patient safety.',
    },
  ],
};

export const ABOUT_PAGE_DATA = {
  hero: {
    label: 'ABOUT AAROGYA CITY HOSPITAL',
    heading: 'Compassionate Healthcare Built Around You',
    subtitle:
      'Discover our approach to healthcare, our commitment to patients and the values that shape the Aarogya City Hospital experience.',
  },
  intro: {
    label: 'WHO WE ARE',
    heading: 'Healthcare With Compassion, Trust & Care',
    paragraph1:
      'Aarogya City Hospital is built around a patient-focused approach to healthcare. We aim to provide a professional, welcoming and supportive environment where patients and families can feel comfortable while accessing healthcare services.',
    paragraph2:
      'Our focus is on creating a healthcare experience where professionalism, communication and respect remain central to every interaction.',
  },
  missionVision: {
    mission: {
      badge: 'MISSION',
      title: 'Our Mission',
      description:
        'To create a patient-focused healthcare environment where professional care, compassion and respect come together to support individuals and families.',
    },
    vision: {
      badge: 'VISION',
      title: 'Our Vision',
      description:
        'To build a trusted healthcare presence in Dhanbad known for a welcoming environment, responsible healthcare support and a strong commitment to patient needs.',
    },
  },
  environment: {
    label: 'OUR ENVIRONMENT',
    heading: 'A Space Designed to Feel Welcoming',
    text: 'From reception and waiting areas to consultation spaces, a comfortable healthcare environment can make every visit feel more organised and reassuring.',
    points: [
      {
        title: 'Clean visual environment',
        desc: 'Maintained and orderly clinical surroundings that promote calm and peace of mind.',
      },
      {
        title: 'Patient-friendly spaces',
        desc: 'Thoughtfully planned corridors, signage, and waiting areas designed for ease of movement.',
      },
      {
        title: 'Welcoming atmosphere',
        desc: 'Respectful and supportive hospital team members ready to assist at every step.',
      },
    ],
  },
};

export const APPROACH_CARDS: ApproachItem[] = [
  {
    number: '01',
    title: 'PATIENT FIRST',
    description: 'We believe every patient deserves respectful and attentive care.',
    iconName: 'Heart',
  },
  {
    number: '02',
    title: 'COMPASSION',
    description: 'A caring approach helps create a more comfortable healthcare experience.',
    iconName: 'Smile',
  },
  {
    number: '03',
    title: 'PROFESSIONALISM',
    description: 'We aim to maintain a professional and respectful environment for patients and families.',
    iconName: 'ShieldCheck',
  },
  {
    number: '04',
    title: 'TRUST',
    description: 'Clear communication and responsible care help build lasting trust.',
    iconName: 'CheckCircle2',
  },
];

export const WHY_PATIENTS_CHOOSE = [
  {
    number: '01',
    title: 'PATIENT-FOCUSED',
    description: 'Healthcare decisions and clinical support centered around individual patient dignity.',
    iconName: 'Heart',
  },
  {
    number: '02',
    title: 'PROFESSIONAL ENVIRONMENT',
    description: 'A clean, well-organized and welcoming clinical atmosphere for families.',
    iconName: 'Building2',
  },
  {
    number: '03',
    title: 'CONVENIENT LOCATION',
    description: 'Centrally situated in City Centre, Dhanbad, easily reached from all city quarters.',
    iconName: 'MapPin',
  },
  {
    number: '04',
    title: 'CARING SUPPORT',
    description: 'Empathetic guidance from registration through consultation and discharge planning.',
    iconName: 'HeartHandshake',
  },
];

export const DOCTOR_TEAM_PLACEHOLDERS: DoctorPlaceholderItem[] = [
  {
    id: 'doc-1',
    name: 'Dr. [DOCTOR NAME]',
    qualification: '[QUALIFICATION]',
    specialization: '[SPECIALIZATION]',
    department: 'General Medicine',
    experiencePlaceholder: 'Credentialed Medical Professional',
  },
  {
    id: 'doc-2',
    name: 'Dr. [DOCTOR NAME]',
    qualification: '[QUALIFICATION]',
    specialization: '[SPECIALIZATION]',
    department: 'Consultation Services',
    experiencePlaceholder: 'Credentialed Medical Professional',
  },
  {
    id: 'doc-3',
    name: 'Dr. [DOCTOR NAME]',
    qualification: '[QUALIFICATION]',
    specialization: '[SPECIALIZATION]',
    department: 'Specialist Healthcare',
    experiencePlaceholder: 'Credentialed Medical Professional',
  },
];

export const FACILITIES_PREVIEW_LIST: FacilityItem[] = [
  {
    id: 'reception',
    title: 'Hospital Reception',
    description: 'A dedicated helpdesk area for patient registration, enquiry assistance, and appointment check-ins.',
    isVerified: true,
  },
  {
    id: 'consultation',
    title: 'Consultation Area',
    description: 'Private and sanitized clinical consultation spaces designed for unhurried doctor-patient discussions.',
    isVerified: true,
  },
  {
    id: 'waiting',
    title: 'Waiting Area',
    description: 'Comfortable, well-ventilated waiting lounge designed to provide a calm and restful resting space.',
    isVerified: true,
  },
  {
    id: 'patient-rooms',
    title: 'Patient Rooms',
    description: 'Clean, supportive recovery rooms designed for patient rest, hygiene, and attentive nursing supervision.',
    isVerified: true,
  },
  {
    id: 'diagnostic-area',
    title: 'Diagnostic Area',
    description: 'Reliable clinical diagnostic and testing support based on verified hospital facility infrastructure.',
    isVerified: true,
  },
  {
    id: 'verified-facility',
    title: '[VERIFIED FACILITY]',
    description: 'Clinical facility space allocated as verified and scheduled by Aarogya City Hospital administration.',
    isVerified: false,
  },
];

export const SERVICES_PAGE_DATA = {
  hero: {
    label: 'OUR SERVICES',
    heading: 'Healthcare Services Designed Around You',
    subtitle: 'Explore the healthcare services and professional support available at Aarogya City Hospital.',
  },
  intro: {
    label: 'CARE THAT STARTS WITH YOU',
    heading: 'Professional Healthcare With a Patient-Focused Approach',
    paragraph:
      'At Aarogya City Hospital, our services are presented around the needs of patients and families. Explore the healthcare support available through our hospital and connect with our team for more information.',
  },
  featured: {
    label: 'PATIENT-CENTRED CARE',
    heading: 'Healthcare Support With a Personal Touch',
    paragraph:
      "Every patient's needs are different. Our healthcare environment is designed to make communication, consultation and support feel clear and comfortable.",
    points: [
      {
        title: 'Patient-focused communication',
        desc: 'Clear, unhurried explanations and attentive listening during medical visits.',
      },
      {
        title: 'Professional healthcare environment',
        desc: 'Hygienic facilities, organized consultation rooms, and experienced staff.',
      },
      {
        title: 'Support for patients and families',
        desc: 'Compassionate assistance guiding individuals through every care step.',
      },
    ],
  },
  departments: {
    heading: 'Medical Departments & Specialities',
    subtitle: 'Explore the departments and specialist services available at Aarogya City Hospital.',
    notice: 'Department information will be updated soon as verified by hospital administration.',
  },
  cta: {
    heading: 'Need More Information About Our Services?',
    subtitle: 'Our team is available to help you understand the healthcare services available at Aarogya City Hospital.',
  },
};

export const SERVICES_EXPANDED_LIST = [
  {
    number: '01',
    id: 'general-healthcare',
    title: 'GENERAL HEALTHCARE',
    shortDesc: 'Professional healthcare support for general medical needs and routine consultations.',
    fullDesc:
      'Our general healthcare unit provides essential primary medical consultations, routine evaluations, preventive health check-ups, and outpatient management for patients of all ages.',
    iconName: 'Activity',
    features: [
      'Comprehensive primary health assessments',
      'Preventive health screenings and lifestyle guidance',
      'Management of acute infections and seasonal illnesses',
      'Coordination for continuing care and referrals',
    ],
    availability: 'Mon – Sat: 9:00 AM – 7:00 PM',
  },
  {
    number: '02',
    id: 'doctor-consultation',
    title: 'DOCTOR CONSULTATION',
    shortDesc: 'Connect with healthcare professionals for consultation, guidance and appropriate medical support.',
    fullDesc:
      'Consult with qualified physicians who take the time to listen, review clinical history thoroughly, and discuss diagnosis and treatment pathways in clear, understandable language.',
    iconName: 'Stethoscope',
    features: [
      'Thorough clinical history and physical evaluations',
      'Clear, unhurried patient-doctor communication',
      'Follow-up review sessions and medication counseling',
      'Family health advisory and wellness guidance',
    ],
    availability: 'Scheduled OPD slots daily',
  },
  {
    number: '03',
    id: 'diagnostic-support',
    title: 'DIAGNOSTIC SUPPORT',
    shortDesc: "Access diagnostic support available through the hospital's verified healthcare facilities.",
    fullDesc:
      'Facilitating reliable clinical diagnostics to aid physicians in accurate assessments and effective treatment planning in accordance with hospital infrastructure.',
    iconName: 'Microscope',
    features: [
      'Standard clinical pathology and biochemistry tests',
      'Digital diagnostic imaging and routine screenings',
      'Timely test turnaround and report delivery',
      'Strict quality controls and sterile sample handling',
    ],
    availability: 'Mon – Sat: 8:00 AM – 8:00 PM',
  },
  {
    number: '04',
    id: 'patient-care',
    title: 'PATIENT CARE',
    shortDesc: 'A supportive healthcare environment designed around patient comfort and care.',
    fullDesc:
      'Compassionate inpatient and day-care nursing support prioritizing patient hygiene, comfort, pain management, and nutritional care throughout recovery.',
    iconName: 'HeartHandshake',
    features: [
      'Attentive round-the-clock nursing care',
      'Clean, well-ventilated patient rooms and recovery areas',
      'Assistance with patient mobility and routine hygiene',
      'Clear updates and transparent communication with family members',
    ],
    availability: '24/7 Inpatient Support',
  },
  {
    number: '05',
    id: 'specialist-consultation',
    title: 'SPECIALIST CONSULTATION',
    shortDesc: 'Professional consultation based on the specialties and doctors available at the hospital.',
    fullDesc:
      'Access experienced visiting and resident medical specialists across key clinical disciplines to evaluate complex conditions and specialized health requirements.',
    iconName: 'Award',
    features: [
      'Focused clinical evaluations by credentialed specialists',
      'Evidence-based clinical recommendations and second opinions',
      'Long-term management plans for chronic medical conditions',
      'Cross-departmental collaboration for holistic care',
    ],
    availability: 'By prior appointment',
  },
  {
    number: '06',
    id: 'health-support',
    title: 'HEALTH SUPPORT',
    shortDesc: 'Healthcare assistance and support for patients and their families.',
    fullDesc:
      'Guidance and dedicated support services for patients navigating health journeys, including medication compliance advice, dietary counselling, and discharge planning.',
    iconName: 'ShieldPlus',
    features: [
      'Post-consultation guidance and prescription clarification',
      'Nutritional and dietary orientation for recovery',
      'Assistance with medical record requests and billing transparency',
      'Guidance on follow-up appointments and preventive measures',
    ],
    availability: 'Mon – Sat: 9:00 AM – 6:00 PM',
  },
];

export const DEPARTMENT_PLACEHOLDERS: DepartmentPlaceholderItem[] = [
  {
    id: 'dept-01',
    code: '01',
    name: '[DEPARTMENT 01]',
    description: 'Clinical department space allocated as verified by Aarogya City Hospital administration.',
    iconName: 'Activity',
  },
  {
    id: 'dept-02',
    code: '02',
    name: '[DEPARTMENT 02]',
    description: 'Specialist consultation suite scheduled in accordance with medical staffing.',
    iconName: 'UserCheck',
  },
  {
    id: 'dept-03',
    code: '03',
    name: '[DEPARTMENT 03]',
    description: 'Outpatient diagnostic support wing aligned with hospital operational standards.',
    iconName: 'Microscope',
  },
  {
    id: 'dept-04',
    code: '04',
    name: '[DEPARTMENT 04]',
    description: 'Clinical care unit dedicated to patient comfort and supervised nursing oversight.',
    iconName: 'BedDouble',
  },
  {
    id: 'dept-05',
    code: '05',
    name: '[DEPARTMENT 05]',
    description: 'Consultation discipline structured around resident and visiting clinical specialists.',
    iconName: 'Award',
  },
  {
    id: 'dept-06',
    code: '06',
    name: '[DEPARTMENT 06]',
    description: 'Patient health coordination and wellness advisory department space.',
    iconName: 'ShieldPlus',
  },
];

export const SERVICE_PROCESS_STEPS: StepProcessItem[] = [
  {
    step: '01',
    title: 'CONTACT',
    description: 'Get in touch with our hospital team.',
    iconName: 'Phone',
  },
  {
    step: '02',
    title: 'CONSULT',
    description: 'Discuss your healthcare requirement with the appropriate professional.',
    iconName: 'UserCheck',
  },
  {
    step: '03',
    title: 'CARE',
    description: 'Receive guidance and healthcare support according to your needs.',
    iconName: 'HeartHandshake',
  },
];

export const WHY_CHOOSE_SERVICES_LIST = [
  {
    title: 'PATIENT FIRST',
    description: 'Respectful and patient-focused communication.',
    iconName: 'Heart',
  },
  {
    title: 'PROFESSIONAL',
    description: 'A clean and professional healthcare environment.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'CONVENIENT',
    description: 'Easy access to healthcare services in City Centre, Dhanbad.',
    iconName: 'MapPin',
  },
  {
    title: 'SUPPORTIVE',
    description: 'A welcoming experience for patients and families.',
    iconName: 'Smile',
  },
];

export const SERVICES_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How can I book an appointment?',
    answer:
      'Use the appointment/contact option on the website or contact the hospital team using the verified phone number.',
  },
  {
    id: 'faq-2',
    question: 'How can I contact the hospital?',
    answer:
      "Use the Contact Us page for the hospital's verified phone number, email and location.",
  },
  {
    id: 'faq-3',
    question: 'How do I know which service I need?',
    answer:
      'Contact the hospital team for appropriate information and guidance regarding available services.',
  },
  {
    id: 'faq-4',
    question: 'Are all services available every day?',
    answer:
      'Service availability may vary. Please contact the hospital for current availability.',
  },
  {
    id: 'faq-5',
    question: 'Where is Aarogya City Hospital located?',
    answer:
      'The hospital is located in City Centre, Dhanbad, Jharkhand.',
  },
];

export const CONTACT_PAGE_DATA = {
  hero: {
    label: 'CONTACT US',
    heading: "We're Here to Help",
    supporting:
      'Have a question, need service information or want to enquire about an appointment? Get in touch with Aarogya City Hospital.',
  },
  introBadge: 'DIRECT PATIENT HELPDESK',
  introSubtitle:
    'Whether you need urgent emergency casualty support, routine OPD doctor consultations, or guidance regarding diagnostic tests, our patient assistance team is ready to assist you.',
};

export const CONTACT_CHANNELS: ContactChannelItem[] = [
  {
    id: 'channel-emergency',
    title: '24/7 Emergency & Casualty',
    subtitle: 'Immediate round-the-clock emergency assistance and ambulance coordination.',
    value: '+91 94311 88990',
    actionUrl: 'tel:+919431188990',
    actionLabel: 'Call Emergency Helpline',
    iconName: 'AlertCircle',
    badge: '24/7 Casualty Active',
    highlight: true,
  },
  {
    id: 'channel-reception',
    title: 'Hospital Reception & OPD',
    subtitle: 'General doctor consultation enquiries, OPD token booking, and visitor guidance.',
    value: '+91 326 230 4567',
    actionUrl: 'tel:+913262304567',
    actionLabel: 'Call Reception Desk',
    iconName: 'Phone',
    badge: 'Mon–Sat: 9 AM – 7 PM',
  },
  {
    id: 'channel-appointments',
    title: 'Appointment Desk Email',
    subtitle: 'Submit planned consultation requests, doctor availability enquiries, and follow-ups.',
    value: 'appointments@aarogyacityhospital.com',
    actionUrl: 'mailto:appointments@aarogyacityhospital.com',
    actionLabel: 'Send Appointment Email',
    iconName: 'Calendar',
    badge: 'Response in 2–4 Hours',
  },
  {
    id: 'channel-whatsapp',
    title: 'WhatsApp Patient Support',
    subtitle: 'Direct WhatsApp messaging for appointment queries and quick hospital information.',
    value: '+91 94311 88990',
    actionUrl: 'https://wa.me/919431188990?text=Hello%20Aarogya%20City%20Hospital,%20I%20would%20like%20to%20enquire%20about%20an%20appointment',
    actionLabel: 'Chat via WhatsApp',
    iconName: 'MessageSquare',
    badge: 'Quick Response',
  },
  {
    id: 'channel-general-email',
    title: 'General Administration',
    subtitle: 'Feedback, administrative documentation, billing queries, and official communication.',
    value: 'info@aarogyacityhospital.com',
    actionUrl: 'mailto:info@aarogyacityhospital.com',
    actionLabel: 'Email Administration',
    iconName: 'Mail',
  },
  {
    id: 'channel-location',
    title: 'Hospital Campus Location',
    subtitle: 'Centrally situated with convenient access from all parts of Dhanbad and surrounding districts.',
    value: 'City Centre, Dhanbad, Jharkhand, India — 826001',
    actionUrl: 'https://maps.google.com/?q=City+Centre+Dhanbad+Jharkhand',
    actionLabel: 'Open Google Maps',
    iconName: 'MapPin',
    badge: 'City Centre Landmark',
  },
];

export const TRANSPORT_GUIDE: TransportItem[] = [
  {
    id: 'train',
    title: 'By Train (Dhanbad Junction)',
    distance: '~2.5 km from Station',
    duration: '8–10 Minutes',
    description: 'Dhanbad Junction (DHN) is well connected. Direct autorickshaws and app-cabs connect the railway station directly to City Centre via Luby Circular Road.',
    iconName: 'Train',
  },
  {
    id: 'bus',
    title: 'By Bus / Public Transit',
    distance: '~3.0 km from Bus Stand',
    duration: '10–12 Minutes',
    description: 'Buses from Bokaro, Ranchi, Asansol, and Purulia arrive at Dhanbad Bus Stand. Local town e-rickshaws and auto-rickshaws stop directly at City Centre.',
    iconName: 'Bus',
  },
  {
    id: 'car',
    title: 'By Private Car / Ambulance',
    distance: 'Direct Highway Access',
    duration: 'Clear Access Road',
    description: 'Direct approach via Luby Circular Road with a dedicated, unobstructed ambulance entrance ramp and designated visitor parking bays on premise.',
    iconName: 'Car',
  },
  {
    id: 'landmark',
    title: 'Prominent Local Landmarks',
    distance: 'Heart of the City',
    duration: 'Central Location',
    description: 'Located in the City Centre commercial district, within easy walking distance of major banking branches, pharmacies, and administrative offices in Dhanbad.',
    iconName: 'Navigation',
  },
];

export const VISITING_HOURS_DATA = [
  {
    department: 'General Inpatient Wards',
    hours: '11:00 AM – 1:00 PM & 5:00 PM – 7:00 PM',
    policy: 'Maximum 2 attendants per patient at a time to maintain restful recovery.',
    badge: 'Daily',
  },
  {
    department: 'Outpatient (OPD) Consultations',
    hours: '9:00 AM – 7:00 PM (Monday to Saturday)',
    policy: 'Prior booking recommended; walk-in tokens subject to doctor schedule.',
    badge: 'Mon – Sat',
  },
  {
    department: '24/7 Casualty & Emergency Wing',
    hours: '24 Hours / 7 Days Open (All 365 Days)',
    policy: 'Immediate triage and stabilization for acute injuries and emergencies.',
    badge: '24x7 Priority',
  },
  {
    department: 'Diagnostic Laboratory & Imaging',
    hours: '8:00 AM – 8:00 PM (Sample Collection)',
    policy: 'Routine and fasting blood sample collections start promptly at 8:00 AM.',
    badge: 'All Days',
  },
];

export const CONTACT_PAGE_FAQS: FaqItem[] = [
  {
    id: 'cfaq-1',
    question: 'How do I book an OPD doctor appointment in advance?',
    answer:
      'You can book an appointment directly through our online "Book an Appointment" button on the website, by calling our reception desk at +91 326 230 4567, or by sending a message on our official WhatsApp helpdesk (+91 94311 88990).',
  },
  {
    id: 'cfaq-2',
    question: 'What is the procedure for emergency admissions or night casualty visits?',
    answer:
      'Our Casualty & Emergency entrance is staffed 24 hours a day, 7 days a week. For emergency transit or urgent queries, call our 24/7 Emergency Line (+91 94311 88990). Patients arriving at casualty undergo immediate clinical triage without administrative delay.',
  },
  {
    id: 'cfaq-3',
    question: 'Where can I park my vehicle when visiting Aarogya City Hospital?',
    answer:
      'The hospital provides dedicated on-site parking for patients and visiting family members. Clear signages guide vehicles to the visitor parking zone while keeping the emergency ambulance bay completely free.',
  },
  {
    id: 'cfaq-4',
    question: 'What documents should I bring for my first consultation or hospital visit?',
    answer:
      'Please bring a government photo ID (such as Aadhaar Card, Voter ID, or Driving License), any previous medical prescriptions or discharge summaries, recent diagnostic reports, and details of any ongoing medications or known allergies.',
  },
  {
    id: 'cfaq-5',
    question: 'How quickly will the hospital respond to enquiries submitted via this page?',
    answer:
      'Our patient assistance team monitors online enquiries continuously. You will typically receive a phone call or email response within 2 to 4 business hours during working days. For urgent medical queries, please call our 24/7 emergency line immediately.',
  },
  {
    id: 'cfaq-6',
    question: 'Can I collect diagnostic lab reports online or by phone?',
    answer:
      'Yes, patients can request their diagnostic reports to be sent via WhatsApp or email upon verification, or collect physical stamped copies directly from the Diagnostic Support desk during operating hours.',
  },
];

export const APPOINTMENT_PAGE_DATA = {
  hero: {
    label: 'APPOINTMENT',
    heading: 'Book Your Appointment',
    subheading:
      'Take the first step toward receiving professional and patient-focused healthcare support.',
  },
  intro: {
    heading: 'Schedule Your Visit With Us',
    description:
      'Use the appointment request form below to share your preferred details with our hospital team. Our team can review your request and contact you regarding availability.',
    features: [
      {
        number: '01',
        title: 'Easy Appointment Request',
        description: 'Submit your preferred appointment details through our simple form.',
        iconName: 'Calendar',
      },
      {
        number: '02',
        title: 'Patient-Focused Support',
        description: 'Share your requirements so our team can better understand your enquiry.',
        iconName: 'HeartHandshake',
      },
      {
        number: '03',
        title: 'Confirmation Support',
        description: 'Our team can contact you to confirm the appointment details.',
        iconName: 'PhoneCall',
      },
    ],
  },
  servicesList: [
    'General Consultation',
    'Doctor Consultation',
    'Specialist Consultation',
    'Diagnostic Support',
    'Patient Care',
    'Other',
  ],
  doctorDepartmentsList: [
    'Select Doctor / Department',
    '[DOCTOR / DEPARTMENT 01] General Medicine / Physician',
    '[DOCTOR / DEPARTMENT 02] Specialist Clinical Consultation',
    '[DOCTOR / DEPARTMENT 03] Diagnostic & Pathology Support',
    '[DOCTOR / DEPARTMENT 04] Inpatient Care & Nursing Unit',
  ],
  timeSlots: [
    'Morning (9:00 AM – 12:00 PM)',
    'Afternoon (12:00 PM – 4:00 PM)',
    'Evening (4:00 PM – 7:00 PM)',
  ],
  beforeVisitInfo: [
    {
      title: 'Bring Relevant Information',
      description: 'Keep any relevant previous reports or documents available if applicable.',
      iconName: 'FileText',
    },
    {
      title: 'Arrive Prepared',
      description: 'Keep your appointment details ready when visiting the hospital.',
      iconName: 'Clock',
    },
    {
      title: 'Ask Questions',
      description: 'Feel free to discuss your concerns with the healthcare team.',
      iconName: 'MessageSquare',
    },
    {
      title: 'Contact Support',
      description: 'For appointment-related assistance, contact the hospital through the verified contact details.',
      iconName: 'Phone',
    },
  ],
  howItWorks: [
    {
      step: '01',
      title: 'Submit Request',
      description: 'Fill in the appointment form with your preferred details.',
      iconName: 'FileEdit',
    },
    {
      step: '02',
      title: 'Team Review',
      description: 'Our hospital administration team reviews your requested slot and department.',
      iconName: 'UserCheck',
    },
    {
      step: '03',
      title: 'Appointment Confirmation',
      description: 'The hospital team contacts you regarding doctor availability and confirmation.',
      iconName: 'CalendarCheck',
    },
  ],
  whyChooseUs: [
    {
      title: 'Easy Request Process',
      description: 'Clean and simple appointment form designed for smooth submission.',
      iconName: 'ClipboardCheck',
    },
    {
      title: 'Convenient Enquiry',
      description: 'Share your preferred date and time slot that suits your schedule.',
      iconName: 'Calendar',
    },
    {
      title: 'Professional Support',
      description: 'Connect with our experienced healthcare team in City Centre, Dhanbad.',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Clear Communication',
      description: 'Receive respectful and prompt appointment-related communication.',
      iconName: 'MessageSquare',
    },
  ],
  faqs: [
    {
      id: 'app-faq-1',
      question: 'How do I request an appointment?',
      answer:
        'Fill in the appointment request form and submit your details. The hospital team can contact you regarding availability and confirmation.',
    },
    {
      id: 'app-faq-2',
      question: 'Is submitting the form an appointment confirmation?',
      answer:
        'No. The form is an appointment request. Confirmation depends on the hospital’s actual availability and booking process.',
    },
    {
      id: 'app-faq-3',
      question: 'Can I request a preferred doctor?',
      answer:
        'If doctor selection is available, choose the relevant doctor or department from the form. Otherwise, contact the hospital team for assistance.',
    },
    {
      id: 'app-faq-4',
      question: 'Can I change my appointment request?',
      answer:
        'Contact the hospital using the verified phone or email details to discuss changes.',
    },
    {
      id: 'app-faq-5',
      question: 'What information should I provide?',
      answer:
        'Provide your name, contact details, preferred service, preferred date and time, and any relevant enquiry message.',
    },
  ],
};



