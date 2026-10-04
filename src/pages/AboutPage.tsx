import React from 'react';
import {
  Heart,
  Smile,
  ShieldCheck,
  CheckCircle2,
  Building2,
  MapPin,
  HeartHandshake,
  Calendar,
  MessageSquare,
  ArrowRight,
  Navigation,
  ExternalLink,
  Target,
  Compass,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  HOSPITAL_INFO,
  ABOUT_PAGE_DATA,
  APPROACH_CARDS,
  WHY_PATIENTS_CHOOSE,
  DOCTOR_TEAM_PLACEHOLDERS,
  FACILITIES_PREVIEW_LIST,
} from '../data/hospitalData';
import {
  AboutHeroVisual,
  HospitalBuildingVisual,
  HospitalExperienceVisual,
  DoctorPlaceholderVisual,
  GallerySceneVisual,
} from '../components/HospitalVisuals';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { PageRoute } from '../types';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
  const { settings } = useSiteSettings();
  const doctorsList = settings.doctors && settings.doctors.length > 0 ? settings.doctors : DOCTOR_TEAM_PLACEHOLDERS;
  const getApproachIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-teal-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-teal-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-teal-600" />;
      default:
        return <Heart className="w-5 h-5 text-teal-600" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-teal-400" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-teal-400" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-teal-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-teal-400" />;
      default:
        return <Heart className="w-6 h-6 text-teal-400" />;
    }
  };

  return (
    <div className="bg-white">
      {/* ==================================================
          1. PAGE HERO
          ================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
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
            {/* Left Column: Heading & Subtitle */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-2.5 mb-4 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-6 h-[2px] bg-teal-600 rounded-full" />
                <span>{ABOUT_PAGE_DATA.hero.label}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B2545] leading-[1.18] mb-6 max-w-2xl text-balance">
                {ABOUT_PAGE_DATA.hero.heading}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                {ABOUT_PAGE_DATA.hero.subtitle}
              </p>

              {/* Quick Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80 w-full text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>City Centre, Dhanbad</span>
                </div>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Patient-Centred Protocol</span>
                </div>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>24/7 Casualty Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual in subtle rounded frame */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-500/20 via-sky-500/10 to-transparent rounded-3xl blur-md" />
                <AboutHeroVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. INTRODUCTION SECTION (WHO WE ARE)
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Hospital Building Visual */}
            <div className="lg:col-span-6 relative">
              <HospitalBuildingVisual />
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-slate-900 leading-tight">
                    City Centre Premises
                  </p>
                  <p className="text-[11px] text-slate-500">Dhanbad, Jharkhand</p>
                </div>
              </div>
            </div>

            {/* Right: Who We Are Text */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
                <span>{ABOUT_PAGE_DATA.intro.label}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-5 text-balance">
                {ABOUT_PAGE_DATA.intro.heading}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {ABOUT_PAGE_DATA.intro.paragraph1}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-8">
                {ABOUT_PAGE_DATA.intro.paragraph2}
              </p>

              <button
                onClick={() => onNavigate('home', 'services')}
                type="button"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. OUR APPROACH
          ================================================== */}
      <section className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>OUR APPROACH</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4 text-balance">
              Putting People at the Centre of Healthcare
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Every process and interaction at Aarogya City Hospital is guided by core healthcare principles.
            </p>
          </div>

          {/* 4 Premium Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {APPROACH_CARDS.map((card) => (
              <div
                key={card.number}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {getApproachIcon(card.iconName)}
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 group-hover:text-teal-700 transition-colors">
                      {card.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-[#0B2545] mb-2 group-hover:text-teal-800 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-teal-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Aarogya Value</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. MISSION & VISION
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Card: Mission */}
            <div className="relative rounded-2xl p-8 lg:p-10 bg-gradient-to-br from-slate-50 to-teal-50/40 border border-teal-100/80 shadow-xs overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Target className="w-32 h-32 text-teal-900" />
              </div>

              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3 font-mono">
                {ABOUT_PAGE_DATA.missionVision.mission.badge}
              </span>

              <h3 className="font-heading text-2xl font-bold text-[#0B2545] mb-4">
                {ABOUT_PAGE_DATA.missionVision.mission.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed relative z-10">
                {ABOUT_PAGE_DATA.missionVision.mission.description}
              </p>
            </div>

            {/* Right Card: Vision */}
            <div className="relative rounded-2xl p-8 lg:p-10 bg-gradient-to-br from-slate-50 to-sky-50/40 border border-sky-100/80 shadow-xs overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Compass className="w-32 h-32 text-sky-900" />
              </div>

              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-700 mb-3 font-mono">
                {ABOUT_PAGE_DATA.missionVision.vision.badge}
              </span>

              <h3 className="font-heading text-2xl font-bold text-[#0B2545] mb-4">
                {ABOUT_PAGE_DATA.missionVision.vision.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed relative z-10">
                {ABOUT_PAGE_DATA.missionVision.vision.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. WHY AAROGYA CITY HOSPITAL (Dark Navy Section)
          ================================================== */}
      <section className="py-20 lg:py-28 bg-[#0B2545] text-white relative overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-300">
              <span className="w-5 h-[2px] bg-teal-400 rounded-full" />
              <span>DEDICATION TO EXCELLENCE</span>
              <span className="w-5 h-[2px] bg-teal-400 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-4 text-balance">
              Why Patients Choose a Caring Healthcare Environment
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Healthcare is more than a medical appointment. It is about communication, comfort, trust and support.
            </p>
          </div>

          {/* 4 Visual Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {WHY_PATIENTS_CHOOSE.map((block) => (
              <div
                key={block.number}
                className="bg-[#07172C]/70 hover:bg-[#07172C] border border-slate-700/60 hover:border-teal-500/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {getWhyIcon(block.iconName)}
                    </div>
                    <span className="font-mono text-sm font-semibold text-teal-400/70 tracking-wider">
                      {block.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-white mb-2.5 group-hover:text-teal-200 transition-colors">
                    {block.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] text-teal-400/80 uppercase tracking-wider font-medium">
                    Aarogya Foundation
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          6. HOSPITAL ENVIRONMENT
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Hospital Interior Visual */}
            <div className="lg:col-span-6 relative">
              <HospitalExperienceVisual />
              <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-slate-900 leading-tight">
                    Patient Comfort Focus
                  </p>
                  <p className="text-[11px] text-slate-500">Sanitized & serene waiting spaces</p>
                </div>
              </div>
            </div>

            {/* Right: Content & 3 feature points */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
                <span>{ABOUT_PAGE_DATA.environment.label}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-5 text-balance">
                {ABOUT_PAGE_DATA.environment.heading}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {ABOUT_PAGE_DATA.environment.text}
              </p>

              {/* 3 Feature Points */}
              <div className="space-y-3.5 mb-8 w-full">
                {ABOUT_PAGE_DATA.environment.points.map((pt) => (
                  <div key={pt.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{pt.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 italic">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Design statements represent our environmental commitment and hospitality values.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. MEDICAL TEAM SECTION (Verified Placeholders)
          ================================================== */}
      <section className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>CLINICAL EXCELLENCE</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4">
              Our Medical Team
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Meet the professionals who support our healthcare services.
            </p>
          </div>

          {/* Transparent Placeholder Notice Bar */}
          <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-xl bg-white border border-teal-200/80 shadow-xs flex items-start gap-3 text-xs text-slate-600">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p>
              <strong>Administration Notice:</strong> In accordance with healthcare transparency, doctor identities, certified degrees, and daily OPD chamber rosters are displayed upon formal administration onboarding in City Centre, Dhanbad.
            </p>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {doctorsList.map((doc: any) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-slate-200 bg-slate-900 relative group">
                    <img
                      src={
                        doc.photoUrl ||
                        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-white/95 rounded-md text-[10px] font-semibold text-slate-800 shadow-xs border border-slate-200">
                      {doc.department}
                    </span>
                  </div>

                  <div className="mt-2">
                    <h3 className="font-heading text-lg font-bold text-[#0B2545] mb-1">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700 mb-0.5">
                      {doc.qualification}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      {doc.specialization}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{doc.department}</span>
                  <span className="text-[11px] text-teal-600 font-medium">
                    {doc.status || 'OPD Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onOpenBooking}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl border border-slate-300 hover:border-slate-400 shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Consult with Duty Physician</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. FACILITIES PREVIEW
          ================================================== */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>OUR FACILITIES</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4">
              Healthcare Spaces Built for Care
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Explore the healthcare spaces and facilities available at our hospital.
            </p>
          </div>

          {/* 6 Visual Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {FACILITIES_PREVIEW_LIST.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <GallerySceneVisual
                    type={
                      facility.id === 'reception'
                        ? 'reception'
                        : facility.id === 'consultation'
                        ? 'doctors'
                        : facility.id === 'waiting'
                        ? 'waiting'
                        : facility.id === 'patient-rooms'
                        ? 'patient-care'
                        : facility.id === 'diagnostic-area'
                        ? 'facilities'
                        : 'exterior'
                    }
                    title={facility.title}
                  />

                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-heading text-base font-bold text-[#0B2545] group-hover:text-teal-800 transition-colors">
                        {facility.title}
                      </h3>
                      {facility.isVerified ? (
                        <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                          Verified Area
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          Hospital Allocation
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('home', 'gallery')}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl border border-slate-300 hover:border-slate-400 shadow-xs transition-colors cursor-pointer"
            >
              <span>View Our Gallery</span>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. OUR LOCATION SECTION
          ================================================== */}
      <section className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>LOCATION & ACCESS</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4">
              Conveniently Located in City Centre, Dhanbad
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Centrally situated to ensure quick transit and easy accessibility for patients across Dhanbad and nearby districts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Address Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-6">
                  <MapPin className="w-6 h-6" />
                </div>

                <h3 className="font-heading text-xl font-bold text-[#0B2545] mb-2">
                  AAROGYA CITY HOSPITAL
                </h3>
                <p className="text-sm font-medium text-teal-700 mb-6">
                  City Centre, Dhanbad, Jharkhand, India
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 mb-8">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Full Address
                    </span>
                    <p className="text-slate-800 font-medium">{HOSPITAL_INFO.location.fullAddress}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Consultation Hours
                    </span>
                    <p className="text-slate-800 font-medium">OPD: {HOSPITAL_INFO.timings.opd}</p>
                    <p className="text-rose-600 font-medium">Emergency & Casualty: 24/7 All Days</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Helpline Numbers
                    </span>
                    <p className="text-slate-800 font-medium">
                      Primary: {HOSPITAL_INFO.contact.phonePrimary} · Emergency: {HOSPITAL_INFO.contact.emergency24x7}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=City+Centre+Dhanbad+Jharkhand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4 text-teal-400" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Right: Interactive Map Frame */}
            <div className="lg:col-span-7 bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 min-h-[350px]">
              <iframe
                title="Aarogya City Hospital - City Centre Dhanbad Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=86.4150%2C23.7850%2C86.4450%2C23.8100&amp;layer=mapnik&amp;marker=23.7957%2C86.4304"
                className="w-full h-full min-h-[350px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          10. CALL TO ACTION (Dark Navy/Teal Gradient)
          ================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#0F766E] text-white">
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
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-300 mb-3 font-mono">
              CONNECT WITH OUR TEAM
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
              Looking for Trusted Healthcare in Dhanbad?
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl mx-auto text-balance">
              Connect with Aarogya City Hospital for appointments and general healthcare enquiries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={onOpenBooking}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-teal-900/30 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm rounded-xl transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-teal-300" />
                <span>Contact Us</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              <span>OPD Consultations: Monday to Saturday (9:00 AM – 7:00 PM)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
