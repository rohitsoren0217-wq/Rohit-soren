import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B2545] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPrivacy ? (
              <Shield className="w-5 h-5 text-teal-400" />
            ) : (
              <FileText className="w-5 h-5 text-teal-400" />
            )}
            <h3 className="font-heading text-base font-bold">
              {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Hospital Service'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto">
          {isPrivacy ? (
            <>
              <p className="font-medium text-slate-800">
                Aarogya City Hospital ({HOSPITAL_INFO.location.fullAddress}) is committed to safeguarding patient confidentiality and the security of all personal and clinical healthcare records.
              </p>
              <h4 className="font-heading font-semibold text-slate-900 text-sm mt-3">1. Information Collection</h4>
              <p>
                We collect personal identifiable information (name, telephone, email address, age) strictly for outpatient registration, medical history records, diagnostic consultations, and emergency coordination.
              </p>
              <h4 className="font-heading font-semibold text-slate-900 text-sm mt-3">2. Medical Confidentiality</h4>
              <p>
                Patient diagnostic records, physician notes, and laboratory findings are strictly restricted to licensed treating medical staff. We adhere to applicable medical ethics and privacy guidelines in India.
              </p>
              <h4 className="font-heading font-semibold text-slate-900 text-sm mt-3">3. Communication & Enquiries</h4>
              <p>
                Contact details submitted through appointment booking or enquiry forms will only be utilized by our patient coordination desk for booking confirmation, OPD schedule changes, or health assistance.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-slate-800">
                Welcome to Aarogya City Hospital. These terms govern patient admissions, outpatient appointments, visitor protocols, and digital consultations.
              </p>
              <h4 className="font-heading font-semibold text-slate-900 text-sm mt-3">1. Appointments & Timings</h4>
              <p>
                Outpatient Department (OPD) slots are subject to physician availability and urgent clinical triage. Emergency cases always take priority in clinical resource allocation.
              </p>
              <h4 className="font-heading font-semibold text-slate-900 text-sm mt-3">2. Hospital Visitor Regulations</h4>
              <p>
                To maintain a clean and restful healing environment, visiting hours (11:00 AM – 1:00 PM and 5:00 PM – 7:00 PM) must be observed. Only designated attendants may remain in inpatient rooms.
              </p>
              <h4 className="font-heading font-semibold text-slate-900 text-sm mt-3">3. Clinical Transparency</h4>
              <p>
                Our medical team discusses recommended tests, treatments, and costs openly with patients or their authorized family guardians prior to initiating elective interventions.
              </p>
            </>
          )}

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
