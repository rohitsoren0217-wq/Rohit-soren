import React from 'react';
import { Phone, AlertCircle, Calendar, Sparkles } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export const AnnouncementBar: React.FC<{
  onOpenBooking?: () => void;
}> = ({ onOpenBooking }) => {
  const { settings } = useSiteSettings();
  const { announcement } = settings;

  if (!announcement || !announcement.enabled) return null;

  return (
    <div
      role="banner"
      className="relative z-40 text-xs py-2 px-4 transition-colors"
      style={{
        backgroundColor:
          announcement.type === 'emergency'
            ? '#031634'
            : announcement.type === 'camp'
            ? '#0F766E'
            : '#0B2545',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          {announcement.type === 'emergency' ? (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white animate-pulse uppercase tracking-wide">
              Emergency
            </span>
          ) : announcement.type === 'camp' ? (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wide">
              <Sparkles className="w-3 h-3 mr-1 inline" /> Special Camp
            </span>
          ) : (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-600 text-white uppercase tracking-wide">
              <AlertCircle className="w-3 h-3 mr-1 inline" /> Notice
            </span>
          )}

          <p className="font-medium text-slate-100 text-xs tracking-tight line-clamp-1">
            {announcement.text}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {announcement.actionPhone && (
            <a
              href={`tel:${announcement.actionPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-teal-300 hover:text-white font-semibold transition-colors text-[11px] underline underline-offset-2"
            >
              <Phone className="w-3 h-3" />
              <span>{announcement.actionText}: {announcement.actionPhone}</span>
            </a>
          )}

          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              type="button"
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-teal-600/30 hover:bg-teal-600/50 text-teal-200 text-[11px] font-medium border border-teal-500/40 transition-colors cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>Book OPD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
