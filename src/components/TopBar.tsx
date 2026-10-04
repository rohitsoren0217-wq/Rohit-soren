import React from 'react';
import { Phone, Clock, MapPin, AlertCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#07172C] text-slate-300 text-xs border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left: Location & OPD Hours */}
        <div className="flex items-center flex-wrap gap-x-5 gap-y-1">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{HOSPITAL_INFO.location.address}, Dhanbad, Jharkhand</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>OPD: 9:00 AM – 7:00 PM (Mon – Sat)</span>
          </div>
        </div>

        {/* Right: Emergency Line */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-rose-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              24/7 Emergency:
            </span>
            <a
              href={`tel:${HOSPITAL_INFO.contact.emergency24x7}`}
              className="text-white hover:text-teal-300 font-semibold tracking-wide transition-colors"
            >
              {HOSPITAL_INFO.contact.emergency24x7}
            </a>
          </div>

          <span className="hidden sm:inline text-slate-600">|</span>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <a
              href={`tel:${HOSPITAL_INFO.contact.phonePrimary}`}
              className="hover:text-teal-300 transition-colors"
            >
              {HOSPITAL_INFO.contact.phonePrimary}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
