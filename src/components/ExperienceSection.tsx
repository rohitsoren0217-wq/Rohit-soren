import React from 'react';
import { Sparkles, MessageSquare, Clock, Heart, Users, ShieldCheck } from 'lucide-react';
import { HospitalExperienceVisual } from './HospitalVisuals';

interface ExperienceSectionProps {
  onContactClick: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onContactClick }) => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hospital Interior Visual */}
          <div className="lg:col-span-6 relative">
            <HospitalExperienceVisual />

            {/* Floating Reassurance Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-heading font-semibold text-slate-900 leading-tight">Patient Assistance Desk</p>
                <p className="text-[11px] text-slate-500">Dedicated staff support at reception</p>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Details */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Small Label */}
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>YOUR COMFORT MATTERS</span>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-5 text-balance">
              A Healthcare Environment Designed Around People
            </h2>

            {/* Paragraph */}
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              From the moment you enter the hospital, every interaction should feel clear, respectful and welcoming.
            </p>

            {/* Experience Touchpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-900">Welcoming Reception</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Clear registration protocols and friendly staff to assist patients upon arrival.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-900">Sanitized Spaces</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Regularly disinfected waiting lounges, consultation rooms, and common zones.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-900">Organized Scheduling</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Structured consultation queues to minimize waiting anxiety and optimize visits.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-900">Dignified Care</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Compassionate communication respecting every patient and family member.
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onContactClick}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>Contact Our Team</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
