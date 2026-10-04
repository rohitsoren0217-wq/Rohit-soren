import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { HospitalBuildingVisual } from './HospitalVisuals';

interface AboutSectionProps {
  onOpenStory: () => void;
  onNavigateAbout?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenStory, onNavigateAbout }) => {
  const handleClick = () => {
    if (onNavigateAbout) {
      onNavigateAbout();
    } else {
      onOpenStory();
    }
  };
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hospital Architectural & Campus Visual */}
          <div className="lg:col-span-6 relative">
            <HospitalBuildingVisual />

            {/* Subtle decorative badge */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-heading font-semibold text-slate-900 leading-tight">City Centre Campus</p>
                <p className="text-[11px] text-slate-500">Dhanbad, Jharkhand</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Small Label */}
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>ABOUT AAROGYA CITY HOSPITAL</span>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-5 text-balance">
              Healthcare With Compassion, Trust & Care
            </h2>

            {/* Paragraph */}
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Aarogya City Hospital is designed around a simple principle — healthcare should feel professional, accessible and patient-focused. Our approach combines a welcoming environment with dedicated healthcare support for individuals and families.
            </p>

            {/* 3 Feature Points */}
            <div className="space-y-3.5 mb-8 w-full">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Patient-focused approach</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Every care plan is formulated with transparent consultation and patient wellbeing at its core.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Professional healthcare environment</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Maintained clinical premises, sterile diagnostic facilities, and qualified medical practitioners.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Convenient access in City Centre, Dhanbad</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Easily accessible for residents across Dhanbad and nearby districts with convenient transit connectivity.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleClick}
              type="button"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
