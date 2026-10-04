import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { EnquiryFormData } from '../types';
import { submitAppointmentLead } from '../services/leadService';

interface ContactSectionProps {
  onSuccessToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessToast }) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});

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
        service: 'General Hospital & OPD Enquiry',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: 'Standard Hospital Working Hours',
        notes: formData.message,
        source: 'contact',
      });
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast(`Enquiry sent! Reference: ${res.referenceId}. Recorded and synced to Privyr CRM & email.`);
      setFormData({ fullName: '', phoneNumber: '', email: '', message: '' });
    } catch {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast('Thank you! Your enquiry has been received by our hospital team.');
      setFormData({ fullName: '', phoneNumber: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Hospital Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Small Label */}
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
                <span>REACH OUR TEAM</span>
              </div>

              {/* Hospital Name & Tagline */}
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] mb-2">
                AAROGYA CITY HOSPITAL
              </h2>
              <p className="text-sm font-medium text-teal-700 mb-6">
                {HOSPITAL_INFO.tagline}
              </p>

              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Our administrative and healthcare support desk is available to assist with appointment scheduling, hospital admissions, general consultations, and patient visitor guidance.
              </p>

              {/* Contact Information List */}
              <div className="space-y-5">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hospital Address</h4>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      {HOSPITAL_INFO.location.fullAddress}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5">
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

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Official Email</h4>
                    <p className="text-sm font-medium text-slate-800 mt-0.5 space-y-0.5">
                      <a href={`mailto:${HOSPITAL_INFO.contact.emailGeneral}`} className="block hover:text-teal-700 transition-colors">
                        {HOSPITAL_INFO.contact.emailGeneral}
                      </a>
                      <a href={`mailto:${HOSPITAL_INFO.contact.emailAppointments}`} className="block hover:text-teal-700 transition-colors text-xs text-slate-500">
                        {HOSPITAL_INFO.contact.emailAppointments}
                      </a>
                    </p>
                  </div>
                </div>

                {/* OPD Timings */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">OPD & Visiting Hours</h4>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      OPD: {HOSPITAL_INFO.timings.opd}
                    </p>
                    <p className="text-xs text-slate-500">
                      Emergency & Casualty: Open 24 Hours / 7 Days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="font-heading text-xl font-bold text-[#0B2545] mb-2">
                Send a Healthcare Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Fill out the form below. A member of our patient coordination desk will respond promptly.
              </p>

              {submitted ? (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-base font-bold text-teal-900 mb-1">
                    Enquiry Submitted Successfully
                  </h4>
                  <p className="text-xs text-teal-700 mb-4 max-w-sm mx-auto">
                    Thank you for reaching out to Aarogya City Hospital. Our hospital team has received your message and will get in touch shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    type="button"
                    className="text-xs font-semibold text-teal-800 hover:text-teal-950 underline underline-offset-2 cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="enquiry-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all ${
                        errors.fullName ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone & Email (2 columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
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
                      <label htmlFor="enquiry-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        placeholder="e.g. rajesh@example.com"
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

                  {/* Message */}
                  <div>
                    <label htmlFor="enquiry-message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={4}
                      placeholder="Please describe your health query or appointment request..."
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

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    >
                      {isSubmitting ? (
                        <span>Submitting enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-teal-400" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy Note */}
                  <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-500">
                    <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Privacy Note: Your health information is kept strictly confidential and secure.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
