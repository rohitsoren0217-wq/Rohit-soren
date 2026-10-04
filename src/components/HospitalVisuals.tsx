import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

/**
 * Aarogya City Hospital Official Brand Logo
 */
export const BrandLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}> = ({ size = 'md', variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';

  // Read dynamic branding from SiteSettings
  const { settings } = useSiteSettings();
  const hospitalName = settings?.brand?.name || 'AAROGYA CITY HOSPITAL';
  const hospitalCity = settings?.brand?.city || 'Dhanbad';
  const logoType = settings?.brand?.logoType || 'emblem';
  const logoImageUrl = settings?.brand?.logoImageUrl || '';
  const logoIconStyle = settings?.brand?.logoIconStyle || 'cross';
  const logoSubtitle = settings?.brand?.logoSubtitle || `City Centre, ${hospitalCity}`;
  const showLogoSubtitle = settings?.brand?.showLogoSubtitle !== false;
  const customHeight = settings?.brand?.logoHeight || 42;

  const [imgError, setImgError] = useState(false);

  // Compute calculated dimensions based on size prop and customHeight
  const baseHeight =
    size === 'sm'
      ? Math.max(28, Math.round(customHeight * 0.8))
      : size === 'lg'
      ? Math.max(48, Math.round(customHeight * 1.25))
      : customHeight;

  const iconSize = size === 'sm' ? 34 : size === 'lg' ? 48 : 42;

  const renderEmblemIcon = (style: string) => {
    switch (style) {
      case 'shield':
        return (
          <svg viewBox="0 0 40 40" className="w-3/4 h-3/4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L32 11V21C32 28 26.8 33.6 20 35C13.2 33.6 8 28 8 21V11L20 6Z" fill="#0D9488" />
            <path d="M20 13V27M13 20H27" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="20" cy="20" r="2.5" fill="#38BDF8" />
          </svg>
        );
      case 'heart':
        return (
          <svg viewBox="0 0 40 40" className="w-3/4 h-3/4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 33S7 25 7 16a7 7 0 0 1 12-4.9A7 7 0 0 1 31 16c0 9-11 17-11 17Z" fill="#0D9488" />
            <path d="M11 18H16L18 13L22 23L24 18H29" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'caduceus':
        return (
          <svg viewBox="0 0 40 40" className="w-3/4 h-3/4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="8" x2="20" y2="34" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="20" cy="9" r="3" fill="#38BDF8" />
            <path d="M12 18C15 14 25 14 28 18C25 22 15 22 12 26C15 30 25 30 28 26" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'pulse':
        return (
          <svg viewBox="0 0 40 40" className="w-3/4 h-3/4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="14" fill="#0D9488" />
            <path d="M10 20H15L17 14L21 26L24 17L26 20H30" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'cross':
      default:
        return (
          <svg viewBox="0 0 40 40" className="w-3/4 h-3/4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="8" width="8" height="24" rx="3" fill="#0D9488" />
            <rect x="8" y="16" width="24" height="8" rx="3" fill="#0D9488" />
            <path d="M20 12L24 20L20 28L16 20Z" fill="#38BDF8" opacity="0.9" />
            <path d="M20 14C23 14 27 16 27 20C27 24 23 26 20 26C17 26 13 24 13 20C13 16 17 14 20 14Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
          </svg>
        );
    }
  };

  const emblemBadge = (
    <div
      className="relative flex items-center justify-center rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0"
      style={{
        width: iconSize,
        height: iconSize,
        background: isLight
          ? 'linear-gradient(135deg, #0F766E 0%, #0D9488 100%)'
          : 'linear-gradient(135deg, #0B2545 0%, #133E6E 100%)',
        boxShadow: isLight
          ? '0 4px 14px rgba(13, 148, 136, 0.25)'
          : '0 4px 14px rgba(11, 37, 69, 0.25)',
      }}
    >
      {renderEmblemIcon(logoIconStyle)}
    </div>
  );

  const customImgElement = logoImageUrl && !imgError && (
    <div className="relative shrink-0 flex items-center">
      <img
        src={logoImageUrl}
        alt={hospitalName}
        style={{ height: `${baseHeight}px`, maxHeight: `${baseHeight}px` }}
        className="w-auto object-contain transition-transform duration-200 group-hover:scale-105 rounded-md"
        onError={() => setImgError(true)}
      />
    </div>
  );

  // CASE 1: Image Only mode (User has a complete logo graphic including title)
  if (logoType === 'image-only' && logoImageUrl && !imgError) {
    return (
      <div className={`flex items-center select-none group cursor-pointer ${className}`}>
        <img
          src={logoImageUrl}
          alt={hospitalName}
          style={{ height: `${baseHeight}px`, maxHeight: `${baseHeight}px` }}
          className="w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Icon/Image Element */}
      {logoType === 'text-only' ? null : logoType === 'both' ? (
        <div className="flex items-center gap-2">
          {emblemBadge}
          {customImgElement}
        </div>
      ) : (logoType === 'image' || logoType === 'image-only') && logoImageUrl && !imgError ? (
        customImgElement
      ) : (
        emblemBadge
      )}

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-heading font-bold tracking-tight ${
            isLight ? 'text-white' : 'text-slate-900'
          } ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'}`}
        >
          {hospitalName.startsWith('AAROGYA') ? (
            <>
              AAROGYA
              <span className="text-teal-600 font-semibold ml-1.5">
                {hospitalName.replace(/^AAROGYA\s*/i, '') || 'CITY HOSPITAL'}
              </span>
            </>
          ) : (
            hospitalName
          )}
        </span>
        {showLogoSubtitle && logoSubtitle && (
          <span
            className={`text-[11px] font-medium tracking-wider uppercase ${
              isLight ? 'text-teal-200' : 'text-slate-500'
            }`}
          >
            {logoSubtitle}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Hero Section Clinical Consultation Scene Visual - Real Photography
 */
export const HeroConsultationVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Read dynamically from SiteSettings
  const primaryImageUrl = settings.photos.heroConsultation;
  const fallbackImageUrl = settings.photos.heroConsultationFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-[#0B2545] group">
      {/* Background skeleton while loading */}
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Real High-Resolution Doctor Consultation Photograph */}
      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt="Doctor consultation at Aarogya City Hospital, Dhanbad"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
      />

      {/* Subtle bottom gradient overlay for contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/30 to-transparent pointer-events-none" />

      {/* Hospital Watermark & Location Badge (Bottom Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping absolute" />
        </div>
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            Aarogya City Hospital
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            Doctor Consultation · City Centre, Dhanbad
          </p>
        </div>
      </div>

      {/* Verified Consultation Badge (Top Right) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hidden sm:flex items-center gap-1.5 bg-[#031634]/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 shadow-sm text-[10px] font-medium text-slate-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>OPD Clinical Review</span>
      </div>
    </div>
  );
};

/**
 * About Section Hospital Architectural Visual - Real Photography
 */
export const HospitalBuildingVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImageUrl = settings.photos.hospitalBuilding;
  const fallbackImageUrl = settings.photos.hospitalBuildingFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-[#0B2545] group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt="Aarogya City Hospital Campus - City Centre, Dhanbad"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/25 to-transparent pointer-events-none" />

      {/* Hospital Watermark & Location Badge (Bottom Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping absolute" />
        </div>
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            {settings.brand.name}
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            Main Campus · City Centre, {settings.brand.city}
          </p>
        </div>
      </div>

      {/* 24/7 Casualty & OPD Badge (Top Left) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 bg-[#0B2545]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-sm text-[11px] font-semibold text-white">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>24/7 Emergency & OPD</span>
      </div>
    </div>
  );
};

/**
 * Healthcare Experience Interior Reception & Lounge Visual - Real Photography
 */
export const HospitalExperienceVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImageUrl = settings.photos.hospitalReception;
  const fallbackImageUrl = settings.photos.hospitalReceptionFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-[#0B2545] group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt="Central Reception & Patient Helpdesk at Aarogya City Hospital"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/25 to-transparent pointer-events-none" />

      {/* Hospital Watermark & Location Badge (Bottom Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping absolute" />
        </div>
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            Aarogya City Hospital
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            Patient Care & Helpdesk · City Centre, Dhanbad
          </p>
        </div>
      </div>

      {/* OPD Token System Active Badge (Top Right) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hidden sm:flex items-center gap-1.5 bg-[#0B2545]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-sm text-[11px] font-semibold text-white">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Live OPD Helpdesk</span>
      </div>
    </div>
  );
};

const GALLERY_PHOTO_MAP: Record<string, { url: string; fallback: string }> = {
  exterior: {
    url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  reception: {
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  },
  waiting: {
    url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  'consultation-room': {
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
  },
  'doctor-consultation': {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
  },
  'nursing-care': {
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  },
  'diagnostic-lab': {
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
  },
  corridor: {
    url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  },
  'patient-room': {
    url: 'https://images.unsplash.com/photo-1586773860383-dab5f3bc1bcc?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  },
  'healthcare-team': {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  'hospital-event': {
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
  },
  'facility-clean': {
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
};

/**
 * Gallery Image Visual Generator for all 12 authentic hospital scenes - Real Photography
 */
export const GallerySceneVisual: React.FC<{
  type: string;
  title: string;
  className?: string;
}> = ({ type, title, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const photoInfo = GALLERY_PHOTO_MAP[type] || GALLERY_PHOTO_MAP.exterior;

  return (
    <div className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs group-hover:shadow-md transition-all duration-300 ${className}`}>
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? photoInfo.fallback : photoInfo.url}
        alt={title}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Scrim and Overlay Title */}
      <div className="absolute inset-x-0 bottom-0 pt-8 pb-3 px-3.5 bg-gradient-to-t from-[#07172C]/90 via-[#07172C]/60 to-transparent pointer-events-none">
        <p className="text-white text-xs sm:text-sm font-heading font-semibold leading-tight truncate">
          {title}
        </p>
        <p className="text-teal-300 text-[10px] sm:text-[11px] font-medium mt-0.5">
          Aarogya City Hospital · Verified Premises
        </p>
      </div>
    </div>
  );
};

/**
 * Intelligent Gallery Card Image with smooth photographic rendering & fallback
 */
export const GalleryCardImage: React.FC<{
  item: { id: string; title: string; imageUrl?: string; category: string };
  className?: string;
}> = ({ item, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const fallbackUrl = 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80';
  const imageSource = imgError ? fallbackUrl : (item.imageUrl || fallbackUrl);

  return (
    <div className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs group-hover:shadow-md transition-all duration-300 ${className}`}>
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imageSource}
        alt={item.title}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Subtle bottom gradient scrim */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 pointer-events-none">
        <span className="font-heading font-medium truncate max-w-[70%]">{item.title}</span>
        <span className="text-teal-300 font-medium shrink-0 text-[10px]">{item.category}</span>
      </div>
    </div>
  );
};

/**
 * Gallery Hero Healthcare Interior Visual
 */
export const GalleryHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-[#0B2545]">
      {/* Photo base with dark navy overlay */}
      <img
        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"
        alt="Aarogya City Hospital Interior"
        className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105"
      />
      {/* Deep Navy + Medical Teal multi-stop gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#031634]/95 via-[#0B2545]/85 to-[#0D9488]/40" />

      {/* Abstract Medical Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 450" fill="none">
          <circle cx="1000" cy="120" r="280" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="1000" cy="120" r="180" stroke="#38BDF8" strokeWidth="1" />
          <path d="M700 350 L850 150 L1050 350 Z" stroke="#14B8A6" strokeWidth="1.2" opacity="0.4" />
          <rect x="150" y="80" width="300" height="2" fill="#0D9488" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
};

/**
 * Gallery Introduction 2-Column Right Visual with Floating Card
 */
export const GalleryIntroVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 group">
      <img
        src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80"
        alt="Aarogya City Hospital Environment"
        className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
      />
      {/* Subtle lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/60 via-transparent to-transparent pointer-events-none" />

      {/* Floating Reassurance Badge: "Compassion • Care • Comfort" */}
      <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-100 shadow-lg flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-teal-600/10 text-teal-700 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-heading font-bold text-[#0B2545] tracking-wide">
            Compassion • Care • Comfort
          </p>
          <p className="text-[11px] text-slate-500 font-body">
            Aarogya City Hospital · City Centre, Dhanbad
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * About Page Hero Healthcare Scene Visual - Real Photography
 */
export const AboutHeroVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImageUrl = settings.photos.aboutHero;
  const fallbackImageUrl = settings.photos.aboutHeroFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-[#0B2545] group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt={`Healthcare Team and Clinical Facilities at ${settings.brand.name}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/30 to-transparent pointer-events-none" />

      {/* Hospital Watermark & Location Badge (Bottom Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping absolute" />
        </div>
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            {settings.brand.shortName} Care Team
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            Dedicated Healthcare Staff · City Centre, {settings.brand.city}
          </p>
        </div>
      </div>

      {/* Established Campus Badge (Top Right) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hidden sm:flex items-center gap-1.5 bg-[#0B2545]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-sm text-[11px] font-semibold text-white">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Care & Compassion</span>
      </div>
    </div>
  );
};

/**
 * Dignified Doctor Medical Portrait Visual - Real Photography
 */
export const DoctorPlaceholderVisual: React.FC<{
  department: string;
}> = ({ department }) => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Look for a doctor in settings with this department
  const doctorInDept = settings.doctors.find(
    (d) => d.department.toLowerCase() === department.toLowerCase()
  );

  const defaultPhoto =
    doctorInDept?.photoUrl ||
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80';
  const fallbackPhoto =
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center relative border border-slate-200 bg-slate-900 group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackPhoto : defaultPhoto}
        alt={`Doctor in ${department} at ${settings.brand.name}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

      {/* Department badge */}
      <span className="absolute bottom-2.5 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-md text-[10px] font-semibold text-slate-800 shadow-xs border border-slate-200">
        {department}
      </span>

      {/* Verified Doctor Stethoscope Indicator */}
      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-xs">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </div>
  );
};

/**
 * Services Page Hero Visual - Real Photography
 */
export const ServicesHeroVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImageUrl = settings.photos.servicesHero;
  const fallbackImageUrl = settings.photos.servicesHeroFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-[#0B2545] group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt={`Advanced Healthcare and Clinical Diagnostics at ${settings.brand.name}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/30 to-transparent pointer-events-none" />

      {/* Hospital Watermark & Department Badge (Bottom Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping absolute" />
        </div>
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            Structured Clinical Care
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            OPD & Diagnostic Facilities · City Centre, {settings.brand.city}
          </p>
        </div>
      </div>

      {/* Live Service Indicator Badge (Top Right) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hidden sm:flex items-center gap-1.5 bg-[#0B2545]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-sm text-[11px] font-semibold text-white">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Clinical Consultation Ready</span>
      </div>
    </div>
  );
};

/**
 * Featured Service Section Visual - Real Photography
 */
export const FeaturedServiceVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImageUrl = settings.photos.featuredService;
  const fallbackImageUrl = settings.photos.featuredServiceFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-[#0B2545] group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt={`Patient-Centred Medical Care at ${settings.brand.name}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/30 to-transparent pointer-events-none" />

      {/* Hospital Care Badge */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            Patient-Centred Care
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            {settings.brand.name} · {settings.brand.city}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Contact Us Page Hero Visual: Hospital Reception & Healthcare Communication - Real Photography
 */
export const ContactHeroVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImageUrl = settings.photos.contactHero;
  const fallbackImageUrl = settings.photos.contactHeroFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-[#0B2545] group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt={`Front Desk Reception and Helpdesk at ${settings.brand.name}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/30 to-transparent pointer-events-none" />

      {/* Patient Desk Badge (Bottom Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping absolute" />
        </div>
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            Direct Patient Assistance Desk
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            City Centre, {settings.brand.city} · Helpline Active
          </p>
        </div>
      </div>

      {/* Live Helpdesk Active Indicator (Top Right) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hidden sm:flex items-center gap-1.5 bg-[#0B2545]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-sm text-[11px] font-semibold text-white">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>OPD Registration & Enquiry</span>
      </div>
    </div>
  );
};

/**
 * Appointment Page Hero Clinical Consultation Scene Visual - Real Photography
 */
export const AppointmentHeroVisual: React.FC = () => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const primaryImageUrl = settings.photos.appointmentHero;
  const fallbackImageUrl = settings.photos.appointmentHeroFallback;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-[#031634] group">
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#031634] via-[#0B2545] to-teal-950 flex items-center justify-center">
          <div className="w-9 h-9 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <img
        src={imgError ? fallbackImageUrl : primaryImageUrl}
        alt={`Doctor Consultation at ${settings.brand.name}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#031634]/90 via-[#031634]/30 to-transparent pointer-events-none" />

      {/* Reassurance Badge */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 bg-[#0B2545]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-500/30 shadow-lg">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <div className="text-left">
          <p className="text-xs font-heading font-semibold text-white leading-tight">
            Consultation & OPD Scheduling
          </p>
          <p className="text-[10px] text-teal-300 font-medium">
            City Centre, {settings.brand.city}, {settings.brand.state}
          </p>
        </div>
      </div>
    </div>
  );
};



