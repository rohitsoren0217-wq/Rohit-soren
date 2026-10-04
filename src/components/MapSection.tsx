import React from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Phone } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const MapSection: React.FC = () => {
  return (
    <section className="relative bg-slate-100 border-b border-slate-200 overflow-hidden">
      {/* Map Header Strip */}
      <div className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
              <span className="w-4 h-[2px] bg-teal-600 rounded-full" />
              <span>LOCATION & ACCESS</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0B2545]">
              Find Us in Dhanbad
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=City+Centre+Dhanbad+Jharkhand"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Map Embed Container */}
      <div className="relative w-full h-[400px] lg:h-[460px] bg-slate-200">
        <iframe
          title="Aarogya City Hospital Location Map - City Centre, Dhanbad"
          src="https://www.openstreetmap.org/export/embed.html?bbox=86.4150%2C23.7850%2C86.4450%2C23.8100&amp;layer=mapnik&amp;marker=23.7957%2C86.4304"
          className="w-full h-full border-0 filter contrast-[1.02]"
          loading="lazy"
        />

        {/* Floating Hospital Location Card on Map */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-slate-200 z-10 hidden sm:block">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-[#0B2545] leading-tight">
                Aarogya City Hospital
              </h3>
              <p className="text-xs text-teal-700 font-medium mt-0.5">
                City Centre, Dhanbad, Jharkhand
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Conveniently positioned in the central district of Dhanbad, easily accessible via public and private transport.
          </p>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>OPD: Mon – Sat (9:00 AM – 7:00 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Casualty: 24/7 Helpline Active</span>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=City+Centre+Dhanbad+Jharkhand"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-semibold rounded-xl transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 text-teal-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
