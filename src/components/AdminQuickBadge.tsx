import React from 'react';
import { Shield } from 'lucide-react';
import { PageRoute } from '../types';

export const AdminQuickBadge: React.FC<{
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}> = ({ currentPage, onNavigate }) => {
  if (currentPage === 'admin') return null;

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={() => onNavigate('admin')}
        type="button"
        className="group flex items-center gap-2 bg-[#0B2545]/90 hover:bg-[#0B2545] text-white backdrop-blur-md px-3.5 py-2 rounded-full border border-teal-500/40 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-semibold cursor-pointer"
        title="Open Hospital Admin CMS"
      >
        <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
          <Shield className="w-3 h-3" />
        </div>
        <span className="text-slate-200 group-hover:text-white transition-colors">
          Admin CMS
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>
    </div>
  );
};
