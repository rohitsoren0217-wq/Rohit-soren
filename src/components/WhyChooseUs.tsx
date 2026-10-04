import React from 'react';
import { Heart, CheckCircle2, MapPin, Smile } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/hospitalData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-teal-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-teal-400" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-teal-400" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-teal-400" />;
      default:
        return <Heart className="w-6 h-6 text-teal-400" />;
    }
  };

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#0B2545] text-white relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-300">
            <span className="w-5 h-[2px] bg-teal-400 rounded-full" />
            <span>EXCELLENCE IN PATIENT CARE</span>
            <span className="w-5 h-[2px] bg-teal-400 rounded-full" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-4 text-balance">
            Why Choose Aarogya City Hospital?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Because healthcare is not only about treatment — it is also about trust, communication and care.
          </p>
        </div>

        {/* 4 Feature Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_CHOOSE_ITEMS.map((item) => (
            <div
              key={item.number}
              className="bg-[#07172C]/70 hover:bg-[#07172C] border border-slate-700/60 hover:border-teal-500/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
            >
              <div>
                {/* Header row: Icon & Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="font-mono text-sm font-semibold text-teal-400/70 tracking-wider">
                    {item.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-white mb-2.5 group-hover:text-teal-200 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <span className="text-[11px] text-teal-400/80 uppercase tracking-wider font-medium">
                  Aarogya Standard
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
