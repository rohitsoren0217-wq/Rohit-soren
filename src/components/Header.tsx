import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronRight, Shield } from 'lucide-react';
import { BrandLogo } from './HospitalVisuals';
import { PageRoute } from '../types';

interface HeaderProps {
  onOpenBooking: () => void;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  currentPage,
  onNavigate,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute; section: string; href: string }[] = [
    { label: 'Home', page: 'home', section: 'home', href: '/' },
    { label: 'About Us', page: 'about', section: 'about', href: '/about-us' },
    { label: 'Services', page: 'services', section: 'services', href: '/services' },
    { label: 'Gallery', page: 'gallery', section: 'gallery', href: '/gallery' },
    { label: 'Contact Us', page: 'contact', section: 'contact', href: '/contact' },
  ];

  const handleLinkClick = (page: PageRoute, section: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(page, section);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
        scrolled
          ? 'shadow-md border-b border-slate-200/90 py-2.5'
          : 'border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Wordmark / Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('home', 'home', e)}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1 cursor-pointer"
            aria-label="Aarogya City Hospital Home"
          >
            <BrandLogo size="md" />
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700"
          >
            {navLinks.map((link) => {
              const isPageActive =
                link.page === 'gallery'
                  ? currentPage === 'gallery'
                  : link.page === 'contact'
                  ? currentPage === 'contact'
                  : link.page === 'services'
                  ? currentPage === 'services'
                  : link.page === 'about'
                  ? currentPage === 'about'
                  : currentPage === 'home' && (activeSection === link.section || (link.section === 'home' && (!activeSection || activeSection === 'home')));

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.page, link.section, e)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                    isPageActive
                      ? 'text-teal-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isPageActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Admin CMS Button */}
            <button
              onClick={() => onNavigate('admin')}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Hospital CMS Admin Panel"
            >
              <Shield className={`w-3.5 h-3.5 ${currentPage === 'admin' ? 'text-white' : 'text-teal-600'}`} />
              <span className="hidden xl:inline">Admin CMS</span>
              <span className="xl:hidden">Admin</span>
            </button>

            <button
              onClick={() => onNavigate('appointment')}
              type="button"
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600 active:scale-98 cursor-pointer ${
                currentPage === 'appointment'
                  ? 'bg-teal-600 hover:bg-teal-700 text-white ring-2 ring-teal-400/80 ring-offset-2 ring-offset-white shadow-teal-900/15'
                  : 'bg-[#0B2545] hover:bg-[#07172C] text-white'
              }`}
            >
              <Calendar className={`w-4 h-4 ${currentPage === 'appointment' ? 'text-white' : 'text-teal-400'}`} />
              <span>Book an Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 pb-4 space-y-1">
            {navLinks.map((link) => {
              const isPageActive =
                link.page === 'gallery'
                  ? currentPage === 'gallery'
                  : link.page === 'contact'
                  ? currentPage === 'contact'
                  : link.page === 'services'
                  ? currentPage === 'services'
                  : link.page === 'about'
                  ? currentPage === 'about'
                  : currentPage === 'home' && (activeSection === link.section || (link.section === 'home' && (!activeSection || activeSection === 'home')));

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.page, link.section, e)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isPageActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}

            <div className="pt-3 px-3 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('appointment');
                }}
                type="button"
                className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer ${
                  currentPage === 'appointment'
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-[#0B2545] hover:bg-[#07172C] text-white'
                }`}
              >
                <Calendar className={`w-4 h-4 ${currentPage === 'appointment' ? 'text-white' : 'text-teal-400'}`} />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('admin');
                }}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                <span>Admin CMS Control Panel</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
