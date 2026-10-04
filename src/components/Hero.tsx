import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Heart, Stethoscope, Sparkles } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { HeroConsultationVisual } from './HospitalVisuals';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { settings } = useSiteSettings();
  const heroLabel = settings?.brand?.heroBadge || HOSPITAL_INFO.heroLabel;
  const heroHeadline = settings?.brand?.heroHeadline || HOSPITAL_INFO.heroHeadline;
  const heroSubtitle = settings?.brand?.heroSubtitle || HOSPITAL_INFO.heroSubtitle;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100"
    >
      {/* Subtle background ambient mesh */}
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
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Small Label (Clean unboxed text with line marker) */}
            <div className="flex items-center gap-2.5 mb-4 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-6 h-[2px] bg-teal-600 rounded-full" />
              <span>{heroLabel}</span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B2545] leading-[1.18] mb-6 max-w-2xl text-balance">
              {heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              {heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenBooking}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 active:scale-98 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium rounded-xl border border-slate-300 hover:border-slate-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
              </a>
            </div>

            {/* Subtle Reassurance Trust Markers */}
            <div className="pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>NABH Standard Compliance</span>
              </div>
              <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-teal-600" />
                <span>Patient-First Clinical Protocol</span>
              </div>
              <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Dedicated Medical Staff</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame with Floating UI Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Container Frame */}
            <div className="relative w-full max-w-lg">
              {/* Subtle back ambient border glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-500/20 via-sky-500/10 to-transparent rounded-3xl blur-md" />

              {/* The Hero Clinical Consultation Scene */}
              <HeroConsultationVisual />

              {/* Floating UI Card 1: "Patient First" (Top Left) */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5 animate-float-slow">
                <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <div className="text-xs font-heading font-semibold text-slate-900 leading-tight">Patient First</div>
                  <div className="text-[10px] text-slate-500">Compassionate care</div>
                </div>
              </div>

              {/* Floating UI Card 2: "Professional Care" (Bottom Right) */}
              <div className="absolute -bottom-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5 animate-float-delayed">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <Stethoscope className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-heading font-semibold text-slate-900 leading-tight">Professional Care</div>
                  <div className="text-[10px] text-slate-500">Experienced clinicians</div>
                </div>
              </div>

              {/* Floating UI Card 3: "Modern Healthcare" (Middle Right) */}
              <div className="hidden sm:flex absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-100 items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-sky-50 flex items-center justify-center text-sky-600">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="text-xs font-medium text-slate-800">
                  Modern Healthcare
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
