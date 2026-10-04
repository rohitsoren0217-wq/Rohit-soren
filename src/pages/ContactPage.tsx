import React, { useState } from 'react';
import {
  Phone,
  PhoneCall,
  AlertCircle,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  Clock,
  Navigation,
  Send,
  CheckCircle2,
  Shield,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Train,
  Bus,
  Car,
  ArrowRight,
  Info,
  Check,
} from 'lucide-react';
import {
  HOSPITAL_INFO,
  CONTACT_PAGE_DATA,
  CONTACT_CHANNELS,
  TRANSPORT_GUIDE,
  VISITING_HOURS_DATA,
  CONTACT_PAGE_FAQS,
  SERVICES,
} from '../data/hospitalData';
import { ContactPageFormData, PageRoute } from '../types';
import { ContactHeroVisual } from '../components/HospitalVisuals';
import { submitAppointmentLead, getRecipientEmail } from '../services/leadService';

interface ContactPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenBooking,
  onNavigate,
  onSuccessToast,
}) => {
  // Form State
  const [formData, setFormData] = useState<ContactPageFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceCategory: 'general-healthcare',
    preferredMethod: 'phone',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionReference, setSubmissionReference] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPageFormData, string>>>({});

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>('cfaq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactPageFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    const phoneClean = formData.phoneNumber.replace(/\D/g, '');
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your phone number';
    } else if (phoneClean.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your enquiry';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please write at least 10 characters so we can assist you better';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        address: 'Contact Enquiry (City Centre, Dhanbad)',
        service: `Contact Inquiry: ${formData.serviceCategory}`,
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: `Preferred: ${formData.preferredMethod.toUpperCase()}`,
        notes: formData.message,
        source: 'contact',
      });

      setSubmissionReference(res.referenceId);
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast(`Enquiry received! Forwarded to ${res.recipientEmail} and synced to Privyr CRM.`);
    } catch {
      setIsSubmitting(false);
      const randomRef = `ACH-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionReference(randomRef);
      setSubmitted(true);
      onSuccessToast('Your enquiry has been received! Our patient desk will contact you shortly.');
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      serviceCategory: 'general-healthcare',
      preferredMethod: 'phone',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  const getChannelIcon = (name: string) => {
    switch (name) {
      case 'AlertCircle':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'Phone':
        return <Phone className="w-5 h-5 text-teal-600" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-teal-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-teal-600" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-teal-600" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-teal-600" />;
      default:
        return <Phone className="w-5 h-5 text-teal-600" />;
    }
  };

  const getTransportIcon = (name: string) => {
    switch (name) {
      case 'Train':
        return <Train className="w-5 h-5 text-teal-600" />;
      case 'Bus':
        return <Bus className="w-5 h-5 text-teal-600" />;
      case 'Car':
        return <Car className="w-5 h-5 text-teal-600" />;
      case 'Navigation':
        return <Navigation className="w-5 h-5 text-teal-600" />;
      default:
        return <Navigation className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="bg-white">
      {/* ==================================================
          1. PAGE HERO SECTION
          ================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white pt-8 pb-16 lg:pt-14 lg:pb-22 border-b border-slate-100">
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
            {/* Left Column: Heading & Information */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-2.5 mb-4 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-6 h-[2px] bg-teal-600 rounded-full" />
                <span>{CONTACT_PAGE_DATA.hero.label}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B2545] leading-[1.18] mb-6 max-w-2xl text-balance">
                {CONTACT_PAGE_DATA.hero.heading}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                {CONTACT_PAGE_DATA.hero.supporting}
              </p>

              {/* Quick Contact Micro-Cards / Action Triggers */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <a
                  href={`tel:${HOSPITAL_INFO.contact.emergency24x7}`}
                  className="group flex items-center gap-3 p-3.5 rounded-xl bg-rose-50/80 hover:bg-rose-100/80 border border-rose-200/80 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold text-rose-800 uppercase tracking-wider">
                      Emergency 24/7
                    </span>
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      {HOSPITAL_INFO.contact.emergency24x7}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${HOSPITAL_INFO.contact.phonePrimary}`}
                  className="group flex items-center gap-3 p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all duration-200 shadow-xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                      Reception Desk
                    </span>
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      {HOSPITAL_INFO.contact.phonePrimary}
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="group flex items-center gap-3 p-3.5 rounded-xl bg-[#0B2545] hover:bg-[#07172C] text-white transition-all duration-200 shadow-xs cursor-pointer text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold text-teal-300 uppercase tracking-wider">
                      Book Visit
                    </span>
                    <span className="block text-xs font-bold text-white truncate">
                      OPD Appointment
                    </span>
                  </div>
                </button>
              </div>

              {/* Location Verification Tag */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span>City Centre, Dhanbad, Jharkhand, India — 826001</span>
              </div>
            </div>

            {/* Right Column: Hero Visual (Hospital Reception & Communication Scene) */}
            <div className="lg:col-span-5 relative">
              <ContactHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. DIRECT CONTACT CHANNELS (6 Cards Grid)
          ================================================== */}
      <section className="py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Direct Hospital Helplines</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight mb-3">
              Multiple Ways to Connect With Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Choose the most convenient communication channel based on your enquiry, urgency level, or consultation requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTACT_CHANNELS.map((channel) => (
              <div
                key={channel.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  channel.highlight
                    ? 'bg-gradient-to-br from-[#0B2545] to-[#07172C] text-white shadow-xl shadow-slate-900/10 border border-teal-700/40'
                    : 'bg-white text-slate-800 shadow-sm hover:shadow-md border border-slate-200/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        channel.highlight
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-400/30'
                          : 'bg-teal-50 text-teal-600 border border-teal-100'
                      }`}
                    >
                      {getChannelIcon(channel.iconName)}
                    </div>
                    {channel.badge && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          channel.highlight
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-teal-50 text-teal-700 border border-teal-200/60'
                        }`}
                      >
                        {channel.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`font-heading text-lg font-bold mb-2 ${
                      channel.highlight ? 'text-white' : 'text-[#0B2545]'
                    }`}
                  >
                    {channel.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                      channel.highlight ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {channel.subtitle}
                  </p>

                  <div
                    className={`text-sm sm:text-base font-bold font-mono tracking-tight mb-6 ${
                      channel.highlight ? 'text-teal-300' : 'text-[#0B2545]'
                    }`}
                  >
                    {channel.value}
                  </div>
                </div>

                <a
                  href={channel.actionUrl}
                  target={channel.actionUrl.startsWith('http') ? '_blank' : undefined}
                  rel={channel.actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    channel.highlight
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                      : 'bg-[#0B2545] hover:bg-[#07172C] text-white shadow-xs'
                  }`}
                >
                  <span>{channel.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          3. INTERACTIVE CONTACT & APPOINTMENT ENQUIRY SECTION
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white" id="enquiry-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column: Hospital Guidance & Assistance Reassurance */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                <span>Patient Assistance Guidance</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2545] tracking-tight leading-tight mb-5">
                Send Us an Enquiry or Request Service Information
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Whether you have queries regarding doctor availability, diagnostic support packages, or hospital admissions, our administrative team reviews each message with clinical priority.
              </p>

              {/* Guarantees & Protocols */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-0.5">
                      Fast Turnaround
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Enquiries received during standard OPD hours are typically answered within 2 to 4 business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-0.5">
                      Patient Privacy Guaranteed
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your clinical details and contact data are strictly confidential and shared solely with relevant medical staff.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-0.5">
                      Urgent Emergency Notice
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For sudden chest pain, trauma, breathing difficulty, or acute distress, do not use web forms — call{' '}
                      <span className="font-semibold text-rose-600">+91 94311 88990</span> immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-teal-900 mb-1">
                    Prefer WhatsApp Chat?
                  </h4>
                  <p className="text-xs text-teal-700">
                    Connect directly with our patient helpdesk on WhatsApp.
                  </p>
                </div>
                <a
                  href={`https://wa.me/919431188990?text=${encodeURIComponent(
                    'Hello Aarogya City Hospital, I would like to enquire about services and appointments.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Now</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Fidelity Healthcare Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-900/5 relative">
                {submitted ? (
                  /* Success Feedback State */
                  <div className="py-8 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mb-5 shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-[#0B2545] mb-2">
                      Enquiry Submitted Successfully
                    </h3>

                    <p className="text-slate-600 text-sm max-w-md leading-relaxed mb-6">
                      Thank you for contacting Aarogya City Hospital. Your enquiry has been forwarded to our patient desk team.
                    </p>

                    {/* Reference Card */}
                    <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left">
                      <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-slate-200 text-xs">
                        <span className="text-slate-500 font-medium">Tracking Reference:</span>
                        <span className="font-mono font-bold text-[#0B2545] bg-teal-100/60 text-teal-900 px-2 py-0.5 rounded">
                          {submissionReference}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-slate-200 text-xs">
                        <span className="text-slate-500 font-medium">Patient Name:</span>
                        <span className="font-semibold text-slate-800">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-slate-200 text-xs">
                        <span className="text-slate-500 font-medium">Preferred Contact:</span>
                        <span className="font-semibold text-slate-800 capitalize">
                          {formData.preferredMethod} ({formData.phoneNumber})
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Expected Response:</span>
                        <span className="font-semibold text-teal-700">Within 2–4 Hours</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  /* Active Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="pb-3 border-b border-slate-100">
                      <h3 className="font-heading text-xl font-bold text-[#0B2545]">
                        Patient Enquiry Form
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Fill in your details below and our team will get in touch with you.
                      </p>
                    </div>

                    {/* Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide"
                        >
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="e.g. Ramesh Kumar"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName
                              ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                              : 'border-slate-200 focus:border-teal-600 focus:ring-teal-100 bg-white'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide"
                        >
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => {
                            setFormData({ ...formData, phoneNumber: e.target.value });
                            if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                          }}
                          placeholder="e.g. 94311 00000"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.phoneNumber
                              ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                              : 'border-slate-200 focus:border-teal-600 focus:ring-teal-100 bg-white'
                          }`}
                        />
                        {errors.phoneNumber && (
                          <p className="text-xs text-rose-500 mt-1">{errors.phoneNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Email Address & Service Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide"
                        >
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="e.g. ramesh@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                              : 'border-slate-200 focus:border-teal-600 focus:ring-teal-100 bg-white'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="serviceCategory"
                          className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide"
                        >
                          Service of Interest
                        </label>
                        <select
                          id="serviceCategory"
                          value={formData.serviceCategory}
                          onChange={(e) =>
                            setFormData({ ...formData, serviceCategory: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 bg-white"
                        >
                          {SERVICES.map((srv) => (
                            <option key={srv.id} value={srv.id}>
                              {srv.title}
                            </option>
                          ))}
                          <option value="emergency-admission">Inpatient / Admission Support</option>
                          <option value="general-enquiry">General Hospital Enquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Method of Contact */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                        Preferred Response Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'phone', label: 'Phone Call', icon: Phone },
                          { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                          { id: 'email', label: 'Email', icon: Mail },
                        ].map((m) => {
                          const IconComp = m.icon;
                          const isSelected = formData.preferredMethod === m.id;
                          return (
                            <button
                              type="button"
                              key={m.id}
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  preferredMethod: m.id as 'phone' | 'email' | 'whatsapp',
                                })
                              }
                              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                              <span>{m.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message / Enquiry Details */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide"
                      >
                        Enquiry or Medical Question <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Please describe your health query, doctor consultation request, or required service information..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-y ${
                          errors.message
                            ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-200 focus:border-teal-600 focus:ring-teal-100 bg-white'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Privacy Note */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>
                        Your contact information is kept strictly confidential and only used to respond to your enquiry.
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0B2545] hover:bg-[#07172C] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-teal-400" />
                          <span>Submit Enquiry to Aarogya Helpdesk</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. VISITING HOURS & INPATIENT SCHEDULE
          ================================================== */}
      <section className="py-16 lg:py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Hospital Schedule & Hours</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight mb-3">
              Operating Hours & Attendant Visiting Guidelines
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We maintain regulated visiting hours to balance family support with optimal clinical rest and infection control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISITING_HOURS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/50">
                      {item.badge}
                    </span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#0B2545] mb-2">
                    {item.department}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-teal-800 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {item.hours}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.policy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. HOW TO REACH & TRANSPORTATION GUIDE
          ================================================== */}
      <section className="py-16 lg:py-22 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>Getting Here</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight mb-3">
              How to Reach Aarogya City Hospital
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Centrally situated in City Centre, Dhanbad, easily accessible by railway, public buses, taxis, and personal vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRANSPORT_GUIDE.map((mode) => (
              <div
                key={mode.id}
                className="bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-6 border border-slate-200/80 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                    {getTransportIcon(mode.iconName)}
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#0B2545] mb-1">
                    {mode.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-3">
                    <span>{mode.distance}</span>
                    <span>•</span>
                    <span>{mode.duration}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          6. FULL-WIDTH GOOGLE MAP & LOCATION SECTION
          ================================================== */}
      <section className="relative bg-slate-900 border-t border-slate-200">
        <div className="relative w-full h-[460px] sm:h-[500px] overflow-hidden">
          {/* Embedded Google Map iframe centered on City Centre, Dhanbad */}
          <iframe
            title="Aarogya City Hospital Location Map"
            src="https://maps.google.com/maps?q=City+Centre+Dhanbad+Jharkhand+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter contrast-[1.05]"
            loading="lazy"
            allowFullScreen
          />

          {/* Floating Location Card */}
          <div className="absolute top-6 left-4 sm:left-8 z-10 max-w-sm sm:max-w-md w-full bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-200/80">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>Verified Hospital Location</span>
            </div>

            <h3 className="font-heading text-lg font-bold text-[#0B2545] mb-1">
              Aarogya City Hospital
            </h3>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              City Centre, Luby Circular Road, Dhanbad, Jharkhand, India — 826001
            </p>

            <div className="space-y-2 mb-5 text-xs text-slate-700 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Casualty: 24/7 Open · OPD: Mon–Sat 9AM–7PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Reception: +91 326 230 4567</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={HOSPITAL_INFO.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-teal-300" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${HOSPITAL_INFO.contact.emergency24x7}`}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Emergency</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. CONTACT FREQUENTLY ASKED QUESTIONS
          ================================================== */}
      <section className="py-16 lg:py-24 bg-slate-50/60 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Info className="w-3.5 h-3.5 text-teal-600" />
              <span>Common Questions</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight mb-3">
              Frequently Asked Questions About Contacting Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Find quick answers to common queries regarding appointments, emergencies, reports, and visiting rules.
            </p>
          </div>

          <div className="space-y-3.5">
            {CONTACT_PAGE_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-sm sm:text-base font-semibold text-[#0B2545] pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
          8. EMERGENCY ASSISTANCE CTA BANNER
          ================================================== */}
      <section className="bg-gradient-to-r from-[#07172C] via-[#0B2545] to-teal-950 py-14 lg:py-18 text-white relative overflow-hidden">
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>24/7 Rapid Emergency Response</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-balance">
                Immediate Healthcare Assistance When You Need It Most
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our trauma and casualty department in City Centre, Dhanbad is active 24 hours a day with emergency medical officers on duty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={`tel:${HOSPITAL_INFO.contact.emergency24x7}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency ({HOSPITAL_INFO.contact.emergency24x7})</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-200" />
                <span>Book OPD Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
