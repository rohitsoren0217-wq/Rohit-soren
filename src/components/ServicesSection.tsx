import React from 'react';
import {
  Activity,
  UserCheck,
  Microscope,
  BedDouble,
  Award,
  ShieldPlus,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { SERVICES } from '../data/hospitalData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenAllServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenAllServices,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-teal-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-teal-600" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-teal-600" />;
      case 'BedDouble':
        return <BedDouble className="w-6 h-6 text-teal-600" />;
      case 'Award':
        return <Award className="w-6 h-6 text-teal-600" />;
      case 'ShieldPlus':
        return <ShieldPlus className="w-6 h-6 text-teal-600" />;
      default:
        return <Activity className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
            <span>OUR SERVICES</span>
            <span className="w-5 h-[2px] bg-teal-600 rounded-full" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B2545] leading-tight mb-4 text-balance">
            Healthcare Services Designed Around You
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Explore the healthcare services and support available at Aarogya City Hospital.
          </p>
        </div>

        {/* 3-Column Service Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Medical Line Icon */}
                <div className="w-12 h-12 rounded-xl bg-teal-50/80 border border-teal-100 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-teal-100/70 transition-all duration-200">
                  {getServiceIcon(service.iconName)}
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-lg font-bold text-[#0B2545] mb-2.5 group-hover:text-teal-800 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              {/* Card Footer: Learn More Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 group-hover:translate-x-0.5 transition-all cursor-pointer focus:outline-none focus-visible:underline"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>OPD & Support</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <button
            onClick={onOpenAllServices}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl border border-slate-300 hover:border-slate-400 shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 text-teal-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
