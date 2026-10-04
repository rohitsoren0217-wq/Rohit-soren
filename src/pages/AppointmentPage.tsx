import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building2,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  PhoneCall,
  Send,
  HeartHandshake,
  ShieldCheck,
  ClipboardCheck,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Info,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import {
  HOSPITAL_INFO,
  APPOINTMENT_PAGE_DATA,
} from '../data/hospitalData';
import { PageRoute, AppointmentPageFormData } from '../types';
import { AppointmentHeroVisual } from '../components/HospitalVisuals';
import { submitAppointmentLead, getRecipientEmail } from '../services/leadService';

interface AppointmentPageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onSuccessToast?: (msg: string) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({
  onNavigate,
  onSuccessToast,
}) => {
  // Form State
  const [formData, setFormData] = useState<AppointmentPageFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    service: 'General Consultation',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM – 12:00 PM)',
    doctorDepartment: '[DOCTOR / DEPARTMENT 01] General Medicine / Physician',
    message: '',
    agreedToPolicy: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // FAQ Accordion State (first open by default)
  const [openFaqId, setOpenFaqId] = useState<string | null>('app-faq-1');

  // Today's minimum date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const handleInputChange = (
    field: keyof AppointmentPageFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field upon edit
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address format.';
      }
    }

    if (!formData.service) {
      errors.service = 'Please select a healthcare service category.';
    }

    if (!formData.preferredDate) {
      errors.preferredDate = 'Please select your preferred consultation date.';
    } else if (formData.preferredDate < todayStr) {
      errors.preferredDate = 'Appointment date cannot be in the past.';
    }

    if (!formData.preferredTime) {
      errors.preferredTime = 'Please select your preferred time slot.';
    }

    if (!formData.agreedToPolicy) {
      errors.agreedToPolicy = 'Please agree to the privacy policy to submit your appointment request.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus on first error element
      const firstErrorField = document.querySelector('[data-has-error="true"]');
      if (firstErrorField) {
        (firstErrorField as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitAppointmentLead({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        service: formData.service,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        notes: formData.message,
        source: 'page',
      });

      setReferenceId(result.referenceId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (onSuccessToast) {
        onSuccessToast(`Lead saved! Forwarded to ${result.recipientEmail} and synced to Privyr CRM.`);
      }

      // Smooth scroll to confirmation card
      const formEl = document.getElementById('appointment-form-card');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      service: 'General Consultation',
      preferredDate: '',
      preferredTime: 'Morning (9:00 AM – 12:00 PM)',
      doctorDepartment: '[DOCTOR / DEPARTMENT 01] General Medicine / Physician',
      message: '',
      agreedToPolicy: false,
    });
    setFormErrors({});
    setIsSubmitted(false);
    setReferenceId('');
  };

  const scrollToForm = () => {
    const el = document.getElementById('appointment-form-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-body">
      {/* ============================================================
          SECTION 1: HERO SECTION
          - Small label: APPOINTMENT
          - Main H1: "Book Your Appointment"
          - Subheading: "Take the first step toward receiving professional and patient-focused healthcare support."
          - Breadcrumb: Home / Appointment
          - Doctor consultation / hospital image on one side
          - Clean navy-to-teal visual treatment with medical design elements
      ============================================================ */}
      <section className="relative bg-[#031634] text-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden border-b border-slate-800">
        {/* Ambient medical abstract background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#031634] via-[#0B2545] to-[#0F766E]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-300">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-500">/</span>
            <span className="text-teal-400 font-semibold" aria-current="page">
              Appointment
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading and Subtitle */}
            <div className="lg:col-span-7">
              {/* Small Label */}
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>{APPOINTMENT_PAGE_DATA.hero.label}</span>
              </div>

              {/* Main H1 */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-5 text-balance">
                {APPOINTMENT_PAGE_DATA.hero.heading}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body mb-8 max-w-2xl">
                {APPOINTMENT_PAGE_DATA.hero.subheading}
              </p>

              {/* Action Buttons & Reassurance */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToForm}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request an Appointment</span>
                </button>

                <a
                  href={`tel:${HOSPITAL_INFO.contact.phonePrimary.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-xl border border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-98 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-teal-300" />
                  <span>Call {HOSPITAL_INFO.contact.phonePrimary}</span>
                </a>
              </div>

              {/* Key Trust Meta */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Verified Client Premises · City Centre, Dhanbad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Scene Illustration */}
            <div className="lg:col-span-5">
              <AppointmentHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: APPOINTMENT INTRODUCTION
          - Heading: "Schedule Your Visit With Us"
          - Description: "Use the appointment request form below to share your preferred details..."
          - 3 Small Feature Cards:
            1. Easy Appointment Request
            2. Patient-Focused Support
            3. Confirmation Support
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>CONSULTATION SCHEDULING</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4 text-balance">
              {APPOINTMENT_PAGE_DATA.intro.heading}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {APPOINTMENT_PAGE_DATA.intro.description}
            </p>
          </div>

          {/* 3 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {APPOINTMENT_PAGE_DATA.intro.features.map((feature) => (
              <div
                key={feature.number}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-heading font-bold text-sm mb-4">
                  {feature.number}
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0B2545] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-teal-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Aarogya Patient Support</span>
                </div>
              </div>
            ))}
          </div>

          {/* Important Clarity Note */}
          <div className="mt-8 max-w-2xl mx-auto p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs text-amber-900 flex items-center gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Please Note:</strong> Submitting this form constitutes an appointment request. Our administration team will review schedule availability and contact you via phone or email for confirmation.
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: MAIN APPOINTMENT FORM & INFORMATION PANEL
          - Two-column layout on desktop
          - Left: White rounded card with subtle shadow
          - Section heading: "Appointment Request"
          - Complete validated form fields with accessible inputs
          - Right: "Before Your Visit" information panel + Helpdesk
      ============================================================ */}
      <section id="appointment-form-section" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: The Appointment Request Form (col-span-7) */}
            <div className="lg:col-span-7">
              <div
                id="appointment-form-card"
                className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-md relative"
              >
                {/* Header */}
                <div className="mb-8 pb-5 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>CONSULTATION INTAKE</span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545]">
                    Appointment Request
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill in your details below and our hospital scheduling desk will get in touch with you.
                  </p>
                </div>

                {/* Success Confirmation State */}
                {isSubmitted ? (
                  <div className="py-6 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                      Request ID: {referenceId}
                    </span>

                    <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#0B2545] mb-3">
                      Request Received
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                      Thank you. Your appointment request has been received. Our team will contact you regarding availability and next steps.
                    </p>

                    {/* Summary of submitted details */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 mb-4">
                      <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
                        <span className="text-slate-500 font-medium">Patient Name:</span>
                        <span className="font-semibold text-slate-800">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
                        <span className="text-slate-500 font-medium">Contact Phone:</span>
                        <span className="font-semibold text-slate-800">{formData.phoneNumber}</span>
                      </div>
                      {formData.email && (
                        <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
                          <span className="text-slate-500 font-medium">Email:</span>
                          <span className="font-semibold text-slate-800">{formData.email}</span>
                        </div>
                      )}
                      {formData.address && (
                        <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
                          <span className="text-slate-500 font-medium">Address:</span>
                          <span className="font-semibold text-slate-800">{formData.address}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
                        <span className="text-slate-500 font-medium">Selected Service:</span>
                        <span className="font-semibold text-teal-700">{formData.service}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
                        <span className="text-slate-500 font-medium">Requested Date:</span>
                        <span className="font-semibold text-slate-800">{formData.preferredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Preferred Slot:</span>
                        <span className="font-semibold text-slate-800">{formData.preferredTime}</span>
                      </div>
                    </div>

                    {/* Email & Privyr CRM Routing Notice */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 max-w-md mx-auto text-left text-xs text-emerald-900 mb-6 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Lead Saved & Privyr CRM Synced:</strong>
                        <p className="text-[11px] text-emerald-800 mt-0.5">
                          All appointment details have been recorded, forwarded to <strong>{getRecipientEmail()}</strong>, and synced to <strong>Privyr CRM</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/919431188990?text=${encodeURIComponent(
                          `Hello Aarogya City Hospital, I have booked an appointment (Ref: ${referenceId}) for ${formData.fullName} (${formData.service}) on ${formData.preferredDate}. Please confirm my slot.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Confirm via WhatsApp</span>
                      </a>

                      <button
                        onClick={handleResetForm}
                        type="button"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Submit Another Request</span>
                      </button>

                      <button
                        onClick={() => onNavigate('contact')}
                        type="button"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Contact Hospital</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Main Interactive Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Row 1: Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div data-has-error={!!formErrors.fullName}>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 ${
                              formErrors.fullName
                                ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                                : 'border-slate-300 hover:border-slate-400 focus:border-teal-600'
                            }`}
                            aria-invalid={!!formErrors.fullName}
                            aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                          />
                        </div>
                        {formErrors.fullName && (
                          <p id="fullName-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{formErrors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div data-has-error={!!formErrors.phoneNumber}>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            placeholder="10-digit mobile number"
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 ${
                              formErrors.phoneNumber
                                ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                                : 'border-slate-300 hover:border-slate-400 focus:border-teal-600'
                            }`}
                            aria-invalid={!!formErrors.phoneNumber}
                            aria-describedby={formErrors.phoneNumber ? 'phoneNumber-error' : undefined}
                          />
                        </div>
                        {formErrors.phoneNumber && (
                          <p id="phoneNumber-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{formErrors.phoneNumber}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email Address & Select Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email Address */}
                      <div data-has-error={!!formErrors.email}>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="e.g. yourname@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 ${
                            formErrors.email
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-slate-300 hover:border-slate-400 focus:border-teal-600'
                          }`}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Select Service */}
                      <div data-has-error={!!formErrors.service}>
                        <label
                          htmlFor="service"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Select Service <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={(e) => handleInputChange('service', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-teal-600 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
                        >
                          {APPOINTMENT_PAGE_DATA.servicesList.map((svc) => (
                            <option key={svc} value={svc}>
                              {svc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Patient Address / Locality */}
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Patient Address / Locality <span className="text-slate-400 font-normal">(e.g. City Centre, Luby Circular Road, Dhanbad)</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter your residence or local address"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-teal-600 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
                        />
                      </div>
                    </div>

                    {/* Row 3: Preferred Date & Preferred Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Preferred Date */}
                      <div data-has-error={!!formErrors.preferredDate}>
                        <label
                          htmlFor="preferredDate"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Preferred Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          min={todayStr}
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white ${
                            formErrors.preferredDate
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-slate-300 hover:border-slate-400 focus:border-teal-600'
                          }`}
                          aria-invalid={!!formErrors.preferredDate}
                          aria-describedby={formErrors.preferredDate ? 'preferredDate-error' : undefined}
                        />
                        {formErrors.preferredDate && (
                          <p id="preferredDate-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{formErrors.preferredDate}</span>
                          </p>
                        )}
                      </div>

                      {/* Preferred Time Slot */}
                      <div data-has-error={!!formErrors.preferredTime}>
                        <label
                          htmlFor="preferredTime"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Preferred Time <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-teal-600 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
                        >
                          {APPOINTMENT_PAGE_DATA.timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Doctor / Department Dropdown (Placeholder compliant) */}
                    <div>
                      <label
                        htmlFor="doctorDepartment"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Doctor / Department <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <select
                        id="doctorDepartment"
                        name="doctorDepartment"
                        value={formData.doctorDepartment}
                        onChange={(e) => handleInputChange('doctorDepartment', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-teal-600 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
                      >
                        {APPOINTMENT_PAGE_DATA.doctorDepartmentsList.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Doctor allocation is reviewed and confirmed based on clinical scheduling.
                      </p>
                    </div>

                    {/* Row 5: Message / Reason for Visit */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Message / Reason for Visit
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us briefly how we can assist you (symptoms, checkup history, queries)..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-teal-600 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                      />
                    </div>

                    {/* Privacy Policy Checkbox */}
                    <div data-has-error={!!formErrors.agreedToPolicy} className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          id="agreedToPolicy"
                          name="agreedToPolicy"
                          checked={formData.agreedToPolicy}
                          onChange={(e) => handleInputChange('agreedToPolicy', e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 shrink-0 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600 leading-normal group-hover:text-slate-800">
                          I agree to the Privacy Policy and consent to being contacted regarding my appointment request.
                        </span>
                      </label>
                      {formErrors.agreedToPolicy && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.agreedToPolicy}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 active:scale-98 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing Request...</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            <span>Request Appointment</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Appointment Information Panel (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* "Before Your Visit" Card */}
              <div className="bg-slate-50/90 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
                <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>PATIENT PREPARATION</span>
                </div>

                <h4 className="font-heading text-xl font-bold text-[#0B2545] mb-5">
                  Before Your Visit
                </h4>

                <div className="space-y-4">
                  {APPOINTMENT_PAGE_DATA.beforeVisitInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 pb-3.5 border-b border-slate-200/70 last:border-0 last:pb-0">
                      <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="font-heading font-semibold text-xs sm:text-sm text-slate-900">
                          {info.title}
                        </h5>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Appointment Assistance Panel */}
              <div className="bg-[#0B2545] text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-md">
                <div className="flex items-center gap-2.5 mb-3 text-xs font-semibold text-teal-300 uppercase tracking-wider">
                  <PhoneCall className="w-4 h-4 text-teal-400" />
                  <span>PREFER TO BOOK BY PHONE?</span>
                </div>

                <h4 className="font-heading text-lg font-bold text-white mb-2">
                  Call Hospital Helpdesk
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Our patient registration desk is staffed Monday to Saturday from 9:00 AM to 7:00 PM for direct scheduling.
                </p>

                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <a
                    href={`tel:${HOSPITAL_INFO.contact.phonePrimary.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-teal-500/50 transition-colors"
                  >
                    <div>
                      <span className="text-[11px] text-slate-400 block">General OPD Enquiries</span>
                      <span className="font-heading font-semibold text-sm text-teal-200">
                        {HOSPITAL_INFO.contact.phonePrimary}
                      </span>
                    </div>
                    <Phone className="w-4 h-4 text-teal-400" />
                  </a>

                  <a
                    href={`tel:${HOSPITAL_INFO.contact.emergency24x7.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-red-950/40 border border-red-800/60 hover:border-red-500/50 transition-colors"
                  >
                    <div>
                      <span className="text-[11px] text-red-300 block">24/7 Emergency Casualty</span>
                      <span className="font-heading font-semibold text-sm text-red-200">
                        {HOSPITAL_INFO.contact.emergency24x7}
                      </span>
                    </div>
                    <span className="text-[10px] bg-red-800/80 text-white px-2 py-0.5 rounded font-bold uppercase">
                      24x7
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: HOW IT WORKS (3-STEP HORIZONTAL PROCESS)
          - 01: "Submit Request" - Fill in the appointment form.
          - 02: "Team Review" - Our team reviews your request.
          - 03: "Appointment Confirmation" - The hospital team contacts you...
          - Clean numbered icons and subtle connecting lines.
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>THE PROCESS</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] leading-tight mb-3">
              How It Works
            </h3>

            <p className="text-sm sm:text-base text-slate-600">
              Three clear steps to arrange your clinical visit at Aarogya City Hospital, Dhanbad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {APPOINTMENT_PAGE_DATA.howItWorks.map((step, idx) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-heading font-bold text-lg shadow-sm">
                      {step.step}
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                      Step {idx + 1}
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-bold text-[#0B2545] mb-2">
                    {step.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Standard Hospital Protocol</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: WHY CHOOSE OUR APPOINTMENT EXPERIENCE
          - Heading: "Simple. Convenient. Patient-Focused."
          - 4 Cards:
            1. Easy Request Process
            2. Convenient Enquiry
            3. Professional Support
            4. Clear Communication
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>PATIENT SATISFACTION</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] leading-tight mb-3">
              Simple. Convenient. Patient-Focused.
            </h3>

            <p className="text-sm sm:text-base text-slate-600">
              Our appointment scheduling is designed to make your hospital visit smooth, comfortable, and well organized.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPOINTMENT_PAGE_DATA.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center mb-4">
                  {idx === 0 && <ClipboardCheck className="w-5 h-5 text-teal-600" />}
                  {idx === 1 && <Calendar className="w-5 h-5 text-teal-600" />}
                  {idx === 2 && <ShieldCheck className="w-5 h-5 text-teal-600" />}
                  {idx === 3 && <MessageSquare className="w-5 h-5 text-teal-600" />}
                </div>

                <h4 className="font-heading text-base font-bold text-[#0B2545] mb-2">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: FAQ SECTION (ACCORDION)
          - 5 Specified Questions & Answers
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] leading-tight mb-3">
              Appointment Questions & Clarifications
            </h3>

            <p className="text-sm sm:text-base text-slate-600">
              Find answers to common questions about our appointment requests and hospital consultation process.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {APPOINTMENT_PAGE_DATA.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    type="button"
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base text-[#0B2545] hover:text-teal-700 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: CONTACT SUPPORT SECTION
          - "Need Help With Your Appointment?"
          - Verified Phone, Email, Location
          - "Call Now" & "Contact Us" buttons
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50/90 rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-xs">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-2">
                HOSPITAL ASSISTANCE
              </span>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] mb-3">
                Need Help With Your Appointment?
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                If you have questions before submitting an appointment request, contact our hospital team.
              </p>

              {/* Verified Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-xs sm:text-sm">
                {/* Phone */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold block mb-1">Phone</span>
                  <a
                    href={`tel:${HOSPITAL_INFO.contact.phonePrimary.replace(/[^0-9+]/g, '')}`}
                    className="font-heading font-semibold text-[#0B2545] hover:text-teal-600 transition-colors"
                  >
                    {HOSPITAL_INFO.contact.phonePrimary}
                  </a>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Reception Desk</span>
                </div>

                {/* Email */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold block mb-1">Email</span>
                  <a
                    href={`mailto:${HOSPITAL_INFO.contact.emailAppointments}`}
                    className="font-heading font-semibold text-[#0B2545] hover:text-teal-600 transition-colors break-all"
                  >
                    {HOSPITAL_INFO.contact.emailAppointments}
                  </a>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Appointment Desk</span>
                </div>

                {/* Location */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold block mb-1">Location</span>
                  <p className="font-heading font-semibold text-[#0B2545]">
                    Aarogya City Hospital
                  </p>
                  <span className="block text-[11px] text-slate-400 mt-0.5">
                    City Centre, Dhanbad, Jharkhand, India
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${HOSPITAL_INFO.contact.phonePrimary.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8: GOOGLE MAP SECTION
          - Heading: "Find Our Hospital"
          - Location: Aarogya City Hospital, City Centre, Dhanbad, Jharkhand, India
          - Button: "Get Directions"
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>LOCATION & MAP</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545]">
                Find Our Hospital
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Aarogya City Hospital · City Centre, Dhanbad, Jharkhand, India — 826001
              </p>
            </div>

            <a
              href={HOSPITAL_INFO.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 shadow-xs transition-colors shrink-0"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
            </a>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm relative bg-slate-200">
            <iframe
              title="Aarogya City Hospital Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.046908581691!2d86.425838!3d23.817024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6bc9a807d9bb7%3A0xc3b236104bc12658!2sCity%20Centre%2C%20Dhanbad%2C%20Jharkhand%20826001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 9: FINAL CTA BANNER
          - Premium dark navy CTA banner
          - Heading: "Your Healthcare Journey Starts With a Simple Request"
          - Description: "Submit your appointment request and connect with our hospital team."
          - Button: "Request an Appointment"
          - Secondary button: "Contact Us"
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[#031634] via-[#0B2545] to-teal-950 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 rounded-full bg-teal-500/10 pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-300 mb-3">
              COMPASSIONATE HEALTHCARE IN DHANBAD
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
              Your Healthcare Journey Starts With a Simple Request
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto font-body">
              Submit your appointment request and connect with our hospital team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={scrollToForm}
                type="button"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:scale-98 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Request an Appointment</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                type="button"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-xl border border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-teal-300" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
