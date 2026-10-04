import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Aarogya City Hospital, I would like to enquire about doctor consultation and hospital services.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          type="button"
          className="w-11 h-11 rounded-full bg-white text-slate-700 hover:text-teal-700 shadow-lg border border-slate-200/80 hover:border-teal-300 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Support Button */}
      <a
        href={`https://wa.me/${HOSPITAL_INFO.contact.whatsApp}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        aria-label="Chat with Aarogya Hospital on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />

        {/* Hover Tooltip */}
        <span className="hidden md:group-hover:block absolute right-14 whitespace-nowrap bg-[#0B2545] text-white text-xs px-3 py-1.5 rounded-lg shadow-md pointer-events-none">
          WhatsApp Helpdesk
        </span>
      </a>
    </div>
  );
};
