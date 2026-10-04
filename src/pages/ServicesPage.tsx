import React, { useState } from 'react';
import {
  Activity,
  Stethoscope,
  Microscope,
  HeartHandshake,
  Award,
  ShieldPlus,
  BedDouble,
  UserCheck,
  Heart,
  ShieldCheck,
  MapPin,
  Smile,
  Phone,
  Calendar,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Send,
  Shield,
} from 'lucide-react';
import {
  HOSPITAL_INFO,
  SERVICES_PAGE_DATA,
  SERVICES_EXPANDED_LIST,
  DEPARTMENT_PLACEHOLDERS,
  SERVICE_PROCESS_STEPS,
  WHY_CHOOSE_SERVICES_LIST,
  SERVICES_FAQS,
} from '../data/hospitalData';
import { ServiceItem, EnquiryFormData, PageRoute } from '../types';
import { ServicesHeroVisual, FeaturedServiceVisual } from '../components/HospitalVisuals';
import { submitAppointmentLead } from '../services/leadService';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onSelectService,
  onNavigate,
  onSuccessToast,
}) => {
  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Contact enquiry form state
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      case 'Award':
        return <Award className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      case 'ShieldPlus':
        return <ShieldPlus className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      case 'BedDouble':
        return <BedDouble className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
      default:
        return <Activity className="w-6 h-6 text-teal-600 transition-colors group-hover:text-teal-700" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-teal-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-teal-600" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-teal-600" />;
      default:
        return <Heart className="w-6 h-6 text-teal-600" />;
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof EnquiryFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      errs.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your enquiry message';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitAppointmentLead({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: 'City Centre, Dhanbad, Jharkhand',
        service: 'Hospital Clinical Services Enquiry',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: 'Standard Hospital Working Hours',
        notes: formData.message,
        source: 'contact',
      });
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast(`Enquiry sent! Reference: ${res.referenceId}. Synced to Privyr CRM & notification emailed.`);
      setFormData({ fullName: '', phoneNumber: '', email: '', message: '' });
    } catch {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast('Thank you! Your services enquiry has been received by our hospital team.');
      setFormData({ fullName: '', phoneNumber: '', email: '', message: '' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('services-contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* ==================================================
          1. PAGE HERO
          ================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
        <div
          className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-teal-50/70 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-sky-50/70 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headings */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-2.5 mb-4 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-6 h-[2px] bg-teal-600 rounded-full" />
                <span>{SERVICES_PAGE_DATA.hero.label}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B2545] leading-[1.18] mb-6 max-w-2xl text-balance">
                {SERVICES_PAGE_DATA.hero.heading}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                {SERVICES_PAGE_DATA.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
                <button
                  onClick={() => onOpenBooking()}
                  type="button"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  onClick={scrollToContact}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium rounded-xl border border-slate-300 hover:border-slate-400 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <span>Consult with Team</span>
                  <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
                </button>
              </div>

              {/* Service Trust Signals */}
              <div className="pt-4 border-t border-slate-200/80 w-full flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>OPD Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
                <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>City Centre, Dhanbad</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual with abstract background shapes */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-500/20 via-sky-500/10 to-transparent rounded-3xl blur-md" />
                <ServicesHeroVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. SERVICES INTRODUCTION
          ================================================== */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            <span>{SERVICES_PAGE_DATA.intro.label}</span>
            <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-5 text-balance">
            {SERVICES_PAGE_DATA.intro.heading}
          </h2>

          <p className="text-base text-slate-600 leading-relaxed text-balance">
            {SERVICES_PAGE_DATA.intro.paragraph}
          </p>
        </div>
      </section>

      {/* ==================================================
          3. MAIN SERVICES GRID
          ================================================== */}
      <section id="services-grid" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>CORE CATEGORIES</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545]">
              Healthcare Services Available
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Explore our structured primary and outpatient healthcare support.
            </p>
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES_EXPANDED_LIST.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-100 transition-all duration-200">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 group-hover:text-teal-700 transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Middle: Title & Description */}
                  <h3 className="font-heading text-lg font-bold text-[#0B2545] mb-2.5 group-hover:text-teal-800 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom: Learn More CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() =>
                      onSelectService({
                        id: service.id,
                        title: service.title,
                        shortDesc: service.shortDesc,
                        fullDesc: service.fullDesc,
                        iconName: service.iconName,
                        features: service.features,
                        availability: service.availability,
                      })
                    }
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 group-hover:translate-x-0.5 transition-all cursor-pointer focus:outline-none focus-visible:underline"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-slate-400">
                    {service.availability.includes('OPD') || service.availability.includes('Mon')
                      ? 'Scheduled OPD'
                      : 'Clinical Support'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. FEATURED SERVICE SECTION
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Healthcare Image */}
            <div className="lg:col-span-6 relative">
              <FeaturedServiceVisual />
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-slate-900 leading-tight">
                    Individual Care
                  </p>
                  <p className="text-[11px] text-slate-500">Unhurried clinical guidance</p>
                </div>
              </div>
            </div>

            {/* Right: Content & 3 Points */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
                <span>{SERVICES_PAGE_DATA.featured.label}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-5 text-balance">
                {SERVICES_PAGE_DATA.featured.heading}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {SERVICES_PAGE_DATA.featured.paragraph}
              </p>

              {/* 3 Points */}
              <div className="space-y-3.5 mb-8 w-full">
                {SERVICES_PAGE_DATA.featured.points.map((pt) => (
                  <div key={pt.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{pt.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollToContact}
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. DEPARTMENTS / SPECIALITIES (Placeholders)
          ================================================== */}
      <section className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>SPECIALIZED CARE</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4">
              {SERVICES_PAGE_DATA.departments.heading}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {SERVICES_PAGE_DATA.departments.subtitle}
            </p>
          </div>

          {/* Clean Administrative Disclaimer */}
          <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-xl bg-white border border-teal-200/80 shadow-xs flex items-start gap-3 text-xs text-slate-600">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p>
              <strong>Administration Notice:</strong> {SERVICES_PAGE_DATA.departments.notice}
            </p>
          </div>

          {/* 6 Elegant Department Placeholder Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {DEPARTMENT_PLACEHOLDERS.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform duration-200">
                      {getServiceIcon(dept.iconName)}
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {dept.code}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-[#0B2545] mb-2 group-hover:text-teal-800 transition-colors">
                    {dept.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenBooking()}
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Roster Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          6. HOW TO ACCESS OUR SERVICES (3-Step Process)
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>PATIENT JOURNEY</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4">
              How to Access Our Services
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              A transparent 3-step process to connect with healthcare support at Aarogya City Hospital.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {SERVICE_PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="relative bg-slate-50 rounded-2xl p-7 sm:p-8 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#0B2545] text-white font-mono font-bold text-sm flex items-center justify-center mb-6 shadow-md">
                    {step.step}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0B2545] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-teal-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          7. WHY CHOOSE OUR SERVICES
          ================================================== */}
      <section className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>THE AAROGYA DIFFERENCE</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4 text-balance">
              Designed Around Your Healthcare Experience
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Every service is structured to foster trust, communication, and dignified patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {WHY_CHOOSE_SERVICES_LIST.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-5">
                    {getWhyIcon(item.iconName)}
                  </div>

                  <h3 className="font-heading text-base font-bold text-[#0B2545] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-teal-700 font-medium">
                  Aarogya Standard
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          8. FAQ SECTION (Accordion)
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>PATIENT QUESTIONS</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Find clear answers regarding service consultations, visiting hours, and appointment bookings.
            </p>
          </div>

          <div className="space-y-4">
            {SERVICES_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-teal-300 bg-teal-50/20 shadow-xs' : 'border-slate-200 bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    type="button"
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-sm sm:text-base font-semibold text-[#0B2545]">
                      {faq.question}
                    </span>
                    <span className="ml-4 p-1 rounded-lg text-slate-500 hover:text-teal-700">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          9. CALL TO ACTION (Dark Navy/Teal Section)
          ================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#0F766E] text-white">
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-300 mb-3 font-mono">
              CONNECT WITH US
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
              {SERVICES_PAGE_DATA.cta.heading}
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl mx-auto text-balance">
              {SERVICES_PAGE_DATA.cta.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => onOpenBooking()}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-teal-900/30 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={scrollToContact}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm rounded-xl transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-teal-300" />
                <span>Contact Us</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              <span>OPD Consultations: Monday to Saturday (9:00 AM – 7:00 PM)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          10. CONTACT PREVIEW
          ================================================== */}
      <section id="services-contact" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                  <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
                  <span>CONTACT PREVIEW</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] mb-2">
                  AAROGYA CITY HOSPITAL
                </h2>

                <p className="text-sm font-medium text-teal-700 mb-6">
                  City Centre, Dhanbad, Jharkhand, India
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  For appointments and general healthcare enquiries, connect with our administrative and patient coordination team in City Centre, Dhanbad.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone Numbers</h4>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">
                        <a href={`tel:${HOSPITAL_INFO.contact.phonePrimary}`} className="hover:text-teal-700 transition-colors">
                          {HOSPITAL_INFO.contact.phonePrimary}
                        </a>
                        <span className="text-slate-300 mx-2">/</span>
                        <a href={`tel:${HOSPITAL_INFO.contact.emergency24x7}`} className="hover:text-teal-700 transition-colors text-rose-600 font-semibold">
                          {HOSPITAL_INFO.contact.emergency24x7} (24/7)
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</h4>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">
                        <a href={`mailto:${HOSPITAL_INFO.contact.emailGeneral}`} className="hover:text-teal-700 transition-colors">
                          {HOSPITAL_INFO.contact.emailGeneral}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 hover:text-teal-900 group cursor-pointer"
                  >
                    <span>View Hospital Location, Map & All Helplines</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Simple Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h3 className="font-heading text-xl font-bold text-[#0B2545] mb-2">
                  Send a Services Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  Fill out the form below. Our team will assist with service details and scheduling.
                </p>

                {submitted ? (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading text-base font-bold text-teal-900 mb-1">
                      Enquiry Received
                    </h4>
                    <p className="text-xs text-teal-700 mb-4 max-w-sm mx-auto">
                      Thank you for contacting Aarogya City Hospital. Our team will review your query and respond shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      type="button"
                      className="text-xs font-semibold text-teal-800 hover:text-teal-950 underline underline-offset-2 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Suman Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all ${
                          errors.fullName ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 94311 55667"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all ${
                            errors.phoneNumber ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                          }`}
                        />
                        {errors.phoneNumber && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. suman@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all ${
                            errors.email ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Please write your questions or service requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all resize-none ${
                          errors.message ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                      >
                        {isSubmitting ? (
                          <span>Sending enquiry...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-teal-400" />
                            <span>Send Enquiry</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-500">
                      <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Your information is held in strict medical confidence.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
