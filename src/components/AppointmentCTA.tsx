import React from 'react';
import { Calendar, PhoneCall, ArrowRight, MessageSquare } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface AppointmentCTAProps {
  onOpenBooking: () => void;
  onContactClick: () => void;
  onNavigateContact?: () => void;
}

export const AppointmentCTA: React.FC<AppointmentCTAProps> = ({
  onOpenBooking,
  onContactClick,
  onNavigateContact,
}) => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#0F766E] text-white">
      {/* Decorative background ambient glows */}
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
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-300 mb-3">
            AAROGYA PATIENT SUPPORT
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
            Your Health Deserves Trusted Care
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl mx-auto text-balance">
            Connect with Aarogya City Hospital for appointments and general healthcare enquiries.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={onOpenBooking}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-teal-900/30 transition-all duration-200 active:scale-98 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            <button
              onClick={onNavigateContact || onContactClick}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageSquare className="w-4 h-4 text-teal-300" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Phone Call Strip */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-200">
            <PhoneCall className="w-4 h-4 text-teal-300 animate-pulse" />
            <span>Call our hospital team:</span>
            <a
              href={`tel:${HOSPITAL_INFO.contact.phonePrimary}`}
              className="font-semibold text-white hover:text-teal-300 underline underline-offset-4 decoration-teal-400/60 transition-colors"
            >
              {HOSPITAL_INFO.contact.phonePrimary}
            </a>
            <span className="text-white/40 px-1">/</span>
            <a
              href={`tel:${HOSPITAL_INFO.contact.emergency24x7}`}
              className="font-semibold text-teal-200 hover:text-white transition-colors"
            >
              {HOSPITAL_INFO.contact.emergency24x7} (24/7)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
