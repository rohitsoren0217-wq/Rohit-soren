import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  Sparkles,
  Camera,
  Heart,
  ArrowRight,
  Info,
  Layers,
  ZoomIn,
} from 'lucide-react';
import {
  HOSPITAL_INFO,
  GALLERY_PAGE_DATA,
  GALLERY_ITEMS,
} from '../data/hospitalData';
import { GalleryItem, PageRoute } from '../types';
import {
  GalleryCardImage,
  GalleryIntroVisual,
  GallerySceneVisual,
} from '../components/HospitalVisuals';

interface GalleryPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onSuccessToast?: (msg: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
  // Filter category state ('all' | 'hospital' | 'facilities' | 'doctors' | 'patient-care' | 'events')
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Lightbox Modal state
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Touch tracking for swipe support on mobile lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Filter items based on active category
  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.filterCategory === activeCategory);

  // Open lightbox at specific item
  const handleOpenLightbox = (item: GalleryItem) => {
    const globalIdx = GALLERY_ITEMS.findIndex((it) => it.id === item.id);
    setSelectedItem(item);
    setSelectedIndex(globalIdx >= 0 ? globalIdx : 0);
    setIsZoomed(false);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedItem(null);
    setIsZoomed(false);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      const nextIdx = (prev + 1) % GALLERY_ITEMS.length;
      setSelectedItem(GALLERY_ITEMS[nextIdx]);
      setIsZoomed(false);
      return nextIdx;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      const prevIdx = (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      setSelectedItem(GALLERY_ITEMS[prevIdx]);
      setIsZoomed(false);
      return prevIdx;
    });
  }, []);

  // Keyboard navigation for lightbox (Escape, ArrowRight, ArrowLeft)
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, handleCloseLightbox, handleNext, handlePrev]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ============================================================
          SECTION 1: PAGE HERO
          - Small label: OUR GALLERY
          - Main H1: "Inside Aarogya City Hospital"
          - Subheading: "Explore our healthcare environment, facilities, team and patient-focused spaces through our gallery."
          - Breadcrumb: Home / Gallery
          - Dark navy transparent overlay over authentic hospital interior photography
      ============================================================ */}
      <section className="relative bg-[#031634] text-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden border-b border-slate-800">
        {/* Background photo with deep navy transparent overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80"
            alt="Aarogya City Hospital Campus"
            className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-105"
          />
          {/* Subtle multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#031634]/95 via-[#0B2545]/90 to-[#0F766E]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-300">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-500">/</span>
            <span className="text-teal-400 font-semibold" aria-current="page">
              Gallery
            </span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>{GALLERY_PAGE_DATA.hero.label}</span>
            </div>

            {/* Main H1 */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-5 text-balance">
              {GALLERY_PAGE_DATA.hero.heading}
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-body mb-8">
              {GALLERY_PAGE_DATA.hero.subheading}
            </p>

            {/* Quick Hero Highlights Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/70 px-3.5 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>City Centre, Dhanbad, Jharkhand</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/70 px-3.5 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Verified Hospital Facilities</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/70 px-3.5 py-2 rounded-lg">
                <Layers className="w-4 h-4 text-teal-400 shrink-0" />
                <span>12 Detailed Hospital Scenes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: GALLERY INTRODUCTION
          - Section Heading: "Healthcare Environment Designed Around Care"
          - Description & Two-Column Layout
          - Left: Short text & 3 care pillars
          - Right: Large premium image with rounded corners + floating card "Compassion • Care • Comfort"
      ============================================================ */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Introduction & Principles (col-span-7) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
                <span>{GALLERY_PAGE_DATA.intro.label}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-5 text-balance">
                {GALLERY_PAGE_DATA.intro.heading}
              </h2>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-4">
                {GALLERY_PAGE_DATA.intro.description}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                {GALLERY_PAGE_DATA.intro.paragraph1}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                {GALLERY_PAGE_DATA.intro.paragraph2}
              </p>

              {/* 3 Core Architectural Pillars */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                {GALLERY_PAGE_DATA.intro.pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 border border-teal-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-semibold text-[#0B2545]">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual with Floating Badge (col-span-5) */}
            <div className="lg:col-span-5">
              <GalleryIntroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: GALLERY CATEGORY FILTER & MAIN MASONRY GRID
          - Categories: All, Hospital, Facilities, Doctors & Team, Patient Care, Events
          - Smooth filtering animation
          - 12 authentic scenes with hover overlays, zoom icons, and metadata
      ============================================================ */}
      <section id="gallery-grid" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Controls */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
              <span>EXPLORE CAMPUS ARCHITECTURE & CARE SPACES</span>
              <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] leading-tight mb-3">
              Photo Gallery & Clinical Facilities
            </h3>

            <p className="text-sm sm:text-base text-slate-600">
              Select a category below to view specific departments, patient care areas, and healthcare environments.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {GALLERY_PAGE_DATA.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-900/10'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-md font-semibold ${
                      isActive
                        ? 'bg-teal-800 text-teal-100'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main 12-Card Grid (3 columns desktop, 2 tablet, 1 mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white p-2.5 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Visual Frame */}
                <div className="relative overflow-hidden rounded-xl bg-slate-900">
                  <GalleryCardImage item={item} />

                  {/* Hover Overlay with Category, Title & View Icon */}
                  <div className="absolute inset-0 bg-[#0B2545]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-5 text-center text-white">
                    {/* View Icon Badge */}
                    <div className="w-11 h-11 rounded-full bg-teal-600 text-white flex items-center justify-center mb-3 shadow-md transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>

                    <span className="text-[11px] font-semibold text-teal-300 uppercase tracking-wider mb-1">
                      {item.category}
                    </span>

                    <h4 className="font-heading font-semibold text-sm sm:text-base leading-snug mb-2 max-w-xs text-balance">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 max-w-xs leading-relaxed">
                      {item.description}
                    </p>

                    <span className="mt-3 text-[11px] text-teal-200 inline-flex items-center gap-1 font-medium group-hover:underline">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to enlarge photo</span>
                    </span>
                  </div>
                </div>

                {/* Card Metadata below photo */}
                <div className="px-3 pt-3.5 pb-2 flex items-start justify-between gap-3 text-xs flex-1">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-heading font-semibold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.locationTag || 'City Centre, Dhanbad Campus'}
                    </p>
                  </div>

                  <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold shrink-0 uppercase tracking-wider border border-teal-100">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Result Counter */}
          <div className="mt-8 text-center text-xs text-slate-500 font-medium">
            Showing {filteredItems.length} of {GALLERY_ITEMS.length} verified hospital scenes
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="ml-2 text-teal-700 hover:text-teal-900 underline font-semibold cursor-pointer"
              >
                Reset to View All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: HOSPITAL SPACES AT A GLANCE (FLOOR DIRECTORY)
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>CAMPUS DIRECTORY</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] leading-tight mb-3">
              Campus Spaces at a Glance
            </h3>

            <p className="text-sm sm:text-base text-slate-600">
              Our multistory hospital complex in City Centre, Dhanbad, is structured for smooth navigation and prompt clinical assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_PAGE_DATA.spacesOverview.map((space, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-heading font-bold text-teal-700 tracking-wider">
                      {space.code}
                    </span>
                    <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600">
                      {space.floor}
                    </span>
                  </div>

                  <h4 className="font-heading text-base font-bold text-[#0B2545] mb-2">
                    {space.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {space.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 space-y-1.5">
                  {space.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: VISITOR & PATIENT PRIVACY GUIDELINES
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Guidance Header (col-span-5) */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <Camera className="w-4 h-4 text-teal-600" />
                <span>VISITOR & PHOTO POLICY</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4">
                Respecting Patient Privacy & Healing
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Aarogya City Hospital prioritizes patient dignity and infection-controlled environments above all else. We welcome visitors while ensuring an undisturbed, quiet healing atmosphere.
              </p>

              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200/70 text-xs text-teal-900 leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  For clinical queries, inpatient visit passes, or appointment schedules, please visit the ground floor Helpdesk or contact reception at <strong className="font-semibold text-teal-950">{HOSPITAL_INFO.contact.phonePrimary}</strong>.
                </span>
              </div>
            </div>

            {/* Right Guidance Cards (col-span-7) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GALLERY_PAGE_DATA.guidelines.map((guide, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-teal-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <h5 className="font-heading font-semibold text-sm text-[#0B2545]">
                      {guide.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    {guide.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: CALL TO ACTION BANNER
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[#031634] via-[#0B2545] to-teal-950 text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 rounded-full bg-teal-500/10 pointer-events-none blur-3xl" />
        <div className="absolute left-0 bottom-0 -translate-x-1/3 translate-y-1/3 w-96 h-96 rounded-full bg-cyan-500/10 pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-300 mb-3">
              EXPERIENCE AAROGYA CITY HOSPITAL FIRSTHAND
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
              Plan a Visit or Book a Doctor Consultation
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto font-body">
              Whether you need routine healthcare, specialist consultation, or assistance with patient admission, our healthcare team in City Centre, Dhanbad, is ready to support you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenBooking}
                type="button"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:scale-98 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                type="button"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-xl border border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-98 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                <span>Contact Hospital Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: LIGHTBOX IMAGE VIEWER MODAL
          - Fullscreen overlay with dark transparent blur
          - Previous / Next buttons
          - Keyboard navigation (Escape, Left, Right)
          - Touch swipe support
          - Image counter (e.g., 3 of 12)
          - Image category, title, detailed caption, location tag
          - Action buttons: "Book Appointment", "Ask a Question"
      ============================================================ */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={handleCloseLightbox}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950/90 border-b border-slate-800 text-white shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 font-medium">
                  Scene {selectedIndex + 1} of {GALLERY_ITEMS.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom toggle button */}
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  type="button"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
                  title={isZoomed ? 'Reset Zoom' : 'Zoom In'}
                  aria-label={isZoomed ? 'Reset Zoom' : 'Zoom In'}
                >
                  <ZoomIn className={`w-4 h-4 ${isZoomed ? 'text-teal-400' : ''}`} />
                </button>

                {/* Close Button */}
                <button
                  onClick={handleCloseLightbox}
                  type="button"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Preview Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[380px] max-h-[55vh]">
              {selectedItem.imageUrl ? (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className={`max-w-full max-h-[55vh] object-contain transition-transform duration-300 ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              ) : (
                <div className="w-full max-w-lg aspect-[4/3] p-4">
                  <GallerySceneVisual type={selectedItem.id} title={selectedItem.title} />
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-teal-600 text-white flex items-center justify-center transition-all border border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-teal-600 text-white flex items-center justify-center transition-all border border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Footer & Details */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white border-t border-slate-800 shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="max-w-xl">
                  <h3
                    id="lightbox-title"
                    className="font-heading text-base sm:text-lg font-bold text-white mb-1"
                  >
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedItem.detailedCaption || selectedItem.description}
                  </p>
                  <p className="text-[11px] text-teal-400 mt-2 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedItem.locationTag || 'City Centre, Dhanbad, Jharkhand — 826001'}</span>
                  </p>
                </div>

                {/* Direct Action CTAs inside Lightbox */}
                <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => {
                      handleCloseLightbox();
                      onOpenBooking();
                    }}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>

                  <button
                    onClick={() => {
                      handleCloseLightbox();
                      onNavigate('contact');
                    }}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-400" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
