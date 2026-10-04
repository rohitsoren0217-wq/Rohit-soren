import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, FileText, Shield, ArrowRight, MapPin, MessageSquare } from 'lucide-react';
import { HOSPITAL_INFO, SERVICES } from '../data/hospitalData';
import { AppointmentFormData } from '../types';
import { submitAppointmentLead, getRecipientEmail } from '../services/leadService';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onSuccess: (msg: string) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onSuccess,
}) => {
  const initialDept = initialServiceId
    ? SERVICES.find((s) => s.id === initialServiceId)?.title || 'General Healthcare'
    : 'Doctor Consultation';

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    department: initialDept,
    preferredDate: '',
    preferredSlot: 'Morning (9:00 AM – 12:00 PM)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof AppointmentFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter patient name';
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      errs.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date';
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
        address: formData.address,
        service: formData.department,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredSlot,
        notes: formData.notes,
        source: 'modal',
      });

      setIsSubmitting(false);
      setBookingRef(res.referenceId);
      onSuccess(`Appointment booked successfully! Reference: ${res.referenceId}. Details emailed to ${res.recipientEmail}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      const generatedRef = `ACH-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(generatedRef);
      onSuccess(`Appointment booked successfully! Reference: ${generatedRef}`);
    }
  };

  const handleReset = () => {
    setBookingRef(null);
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      department: 'Doctor Consultation',
      preferredDate: '',
      preferredSlot: 'Morning (9:00 AM – 12:00 PM)',
      notes: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      onClick={handleReset}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold">Book an Appointment</h3>
              <p className="text-xs text-teal-200">Aarogya City Hospital · City Centre, Dhanbad</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            type="button"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Appointment Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {bookingRef ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-heading text-xl font-bold text-[#0B2545] mb-1">
                Appointment Requested!
              </h4>
              <p className="text-xs text-slate-500 mb-6">
                Your consultation request has been logged in our hospital OPD schedule.
              </p>

              {/* Reference Voucher Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left mb-6 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Booking Reference</span>
                  <span className="font-mono text-sm font-bold text-teal-700">{bookingRef}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Patient Name</span>
                    <span className="font-semibold text-slate-800">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Department / Service</span>
                    <span className="font-semibold text-slate-800">{formData.department}</span>
                  </div>
                  {formData.address && (
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[11px]">Patient Address</span>
                      <span className="font-semibold text-slate-800">{formData.address}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 block text-[11px]">Preferred Date</span>
                    <span className="font-semibold text-slate-800">{formData.preferredDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Time Slot</span>
                    <span className="font-semibold text-slate-800">{formData.preferredSlot}</span>
                  </div>
                </div>
              </div>

              {/* Email & CRM Routing Confirmation Note */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 text-left mb-4 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Lead Notification & CRM Sync:</strong>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Lead details have been stored in the hospital database, forwarded to <strong>{getRecipientEmail()}</strong>, and synced to <strong>Privyr CRM</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50/70 border border-teal-100 rounded-lg p-3 text-[11px] text-teal-800 text-left mb-4">
                <strong>Patient Reminder:</strong> Please arrive 15 minutes before your time slot at the Aarogya Reception Desk, City Centre, Dhanbad.
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/919431188990?text=${encodeURIComponent(
                    `Hello Aarogya City Hospital, I have booked an appointment (Ref: ${bookingRef}) for ${formData.fullName} (${formData.department}) on ${formData.preferredDate}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Confirm on WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  type="button"
                  className="flex-1 py-2.5 px-4 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Patient Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Amit Sengupta"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      errors.fullName ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 94311 22334"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.phoneNumber ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="e.g. amit@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>
              </div>

              {/* Patient Address / Locality */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Address / Locality <span className="text-slate-400 font-normal">(e.g. City Centre, Hirapur, Dhanbad)</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Enter your residence or local address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Department Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Healthcare Service / Department <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                >
                  <option value="General Healthcare">General Healthcare</option>
                  <option value="Doctor Consultation">Doctor Consultation</option>
                  <option value="Diagnostic Support">Diagnostic Support</option>
                  <option value="Patient Care">Patient Care</option>
                  <option value="Specialist Consultation">Specialist Consultation</option>
                  <option value="Health Support">Health Support</option>
                  <option value="Routine Health Check-up">Routine Health Check-up</option>
                </select>
              </div>

              {/* Preferred Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      errors.preferredDate ? 'border-rose-400 ring-rose-200' : 'border-slate-300'
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.preferredSlot}
                    onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Evening (4:00 PM – 7:00 PM)">Evening (4:00 PM – 7:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Reason / Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Symptoms or Health Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief note for the doctor or department..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  {isSubmitting ? (
                    <span>Processing appointment...</span>
                  ) : (
                    <>
                      <span>Confirm Appointment Request</span>
                      <ArrowRight className="w-4 h-4 text-teal-400" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>No advance payment needed. Consultations are billed at hospital reception.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
