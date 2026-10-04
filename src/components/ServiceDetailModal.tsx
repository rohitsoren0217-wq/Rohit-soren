import React from 'react';
import { X, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B2545] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider block mb-1">
              Aarogya Healthcare Service
            </span>
            <h3 className="font-heading text-xl font-bold">{service.title}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Service Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-slate-700 leading-relaxed mb-6">
            {service.fullDesc}
          </p>

          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Key Care Highlights
          </h4>

          <div className="space-y-2.5 mb-6">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Availability:</span>
            </div>
            <span className="font-medium text-slate-800">{service.availability}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for {service.title}</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
