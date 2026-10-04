import React from 'react';
import { X, Heart, Shield, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B2545] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider block mb-1">
              About Aarogya City Hospital
            </span>
            <h3 className="font-heading text-xl font-bold">Our Philosophy & Journey</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Story Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-600 leading-relaxed">
          <p>
            Founded with a vision to bring trustworthy, accessible, and dignified medical care to the heart of Dhanbad, Jharkhand, <strong>AAROGYA CITY HOSPITAL</strong> stands as a dedicated healthcare partner for individuals and families.
          </p>

          <p>
            Located conveniently in City Centre, our facility is engineered around the principle that healthcare should never feel impersonal or confusing. From the first warm greeting at our reception to thoughtful clinical consultations and transparent communication, every detail is focused on patient comfort and healing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 font-semibold">
                <Heart className="w-4 h-4 text-teal-600" />
                <span>Patient Dignity</span>
              </div>
              <p className="text-xs text-slate-500">
                Listening with empathy and respecting patient choice throughout the healthcare journey.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-1.5 text-slate-900 font-semibold">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Clinical Integrity</span>
              </div>
              <p className="text-xs text-slate-500">
                Evidence-based medical advice without unnecessary procedures or ambiguous billing.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
              Our Core Promise to Dhanbad
            </h4>
            <p className="text-xs text-teal-800">
              "{HOSPITAL_INFO.tagline}" We will continue to invest in clean infrastructure, dedicated medical talent, and patient-first protocols for our community.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
