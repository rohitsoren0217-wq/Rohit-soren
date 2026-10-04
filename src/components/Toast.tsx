import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-white border border-teal-200 rounded-xl shadow-xl p-4 flex items-start gap-3 animate-fade-in">
      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs text-slate-800 font-medium leading-relaxed">
        {message}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
