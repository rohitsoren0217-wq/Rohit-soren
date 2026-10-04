import React from 'react';
import { HeartHandshake, Stethoscope, Building2, CalendarCheck } from 'lucide-react';
import { HIGHLIGHTS } from '../data/hospitalData';

export const TrustStrip: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-teal-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-teal-600" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-teal-600" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-5 h-5 text-teal-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section className="bg-white border-b border-slate-200/80 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.number}
              className="relative p-5 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-sm transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-teal-700 transition-colors font-mono tabular-nums">
                  {item.number}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-base font-semibold text-[#0B2545] mb-1.5 group-hover:text-teal-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
