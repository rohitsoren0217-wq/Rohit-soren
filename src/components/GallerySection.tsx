import React, { useState } from 'react';
import { Maximize2, ArrowRight, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hospitalData';
import { GalleryItem } from '../types';
import { GallerySceneVisual } from './HospitalVisuals';

export const GallerySection: React.FC<{ onNavigateGallery?: () => void }> = ({ onNavigateGallery }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleOpenLightbox = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % GALLERY_ITEMS.length;
    setSelectedIndex(nextIdx);
    setSelectedItem(GALLERY_ITEMS[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedIndex(prevIdx);
    setSelectedItem(GALLERY_ITEMS[prevIdx]);
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            <span>OUR GALLERY</span>
            <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4 text-balance">
            Take a Look Inside
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            A glimpse into the clean, calm, and modern healthcare facilities at Aarogya City Hospital, Dhanbad.
          </p>
        </div>

        {/* 6-Image Premium Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item, index)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white p-2.5 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl">
                <GallerySceneVisual type={item.id} title={item.title} />

                {/* Hover overlay with action button */}
                <div className="absolute inset-0 bg-[#0B2545]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-teal-200 line-clamp-2">{item.description}</p>
                </div>
              </div>

              {/* Card Meta below image */}
              <div className="px-2 pt-3 pb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">{item.title}</span>
                <span className="text-[11px] text-teal-700 font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              if (onNavigateGallery) {
                onNavigateGallery();
              } else {
                handleOpenLightbox(GALLERY_ITEMS[0], 0);
              }
            }}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl border border-slate-300 hover:border-slate-400 shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <Eye className="w-4 h-4 text-teal-600" />
            <span>Explore Full Hospital Gallery</span>
          </button>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h3 className="font-heading text-lg font-bold">{selectedItem.title}</h3>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Visual Viewport */}
            <div className="relative p-4 sm:p-6 flex items-center justify-center bg-slate-950">
              <div className="w-full max-w-2xl">
                <GallerySceneVisual type={selectedItem.id} title={selectedItem.title} />
              </div>

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-2 rounded-full bg-slate-800/80 text-white hover:bg-teal-600 transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 p-2 rounded-full bg-slate-800/80 text-white hover:bg-teal-600 transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer with Details */}
            <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <p className="max-w-xl">{selectedItem.description}</p>
              <span className="font-mono text-slate-400 tabular-nums">
                {selectedIndex + 1} of {GALLERY_ITEMS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
