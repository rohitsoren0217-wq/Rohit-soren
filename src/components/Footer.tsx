import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  ShieldCheck,
  ArrowUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { BrandLogo } from './HospitalVisuals';
import { PageRoute } from '../types';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin?: () => void;
  onNavigate?: (page: PageRoute, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin,
  onNavigate,
}) => {
  const handleLink = (page: PageRoute, section: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, section);
    }
  };
  return (
    <footer className="bg-[#07172C] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand Info (col-span-4) */}
          <div className="lg:col-span-4">
            <BrandLogo size="md" variant="light" className="mb-4" />
            <p className="text-teal-300 text-xs font-medium tracking-wide mb-3">
              "{HOSPITAL_INFO.tagline}"
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Providing patient-focused healthcare in City Centre, Dhanbad. Committed to clinical professionalism, transparent communication, and compassionate care for families across Jharkhand.
            </p>

            {/* Accreditations / Assurances */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Standard Healthcare Protocols · NABH Compliant Care</span>
            </div>
          </div>

          {/* Column 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink('home', 'home', e)}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  onClick={(e) => handleLink('about', 'about', e)}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleLink('services', 'services', e)}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#why-us"
                  onClick={(e) => handleLink('home', 'why-us', e)}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  onClick={(e) => handleLink('gallery', 'gallery', e)}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/appointment"
                  onClick={(e) => handleLink('appointment', 'appointment', e)}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Appointment
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink('contact', 'contact', e)}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Information (col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Patient Information
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('appointment');
                    } else {
                      onOpenBooking();
                    }
                  }}
                  className="text-slate-400 hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Book an Appointment
                </button>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-slate-400 hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="text-slate-400 hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <span className="text-slate-400">
                  Visiting Hours: 11 AM – 1 PM / 5 PM – 7 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details & Social Media (col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.location.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.contact.phonePrimary}`} className="hover:text-white transition-colors">
                  {HOSPITAL_INFO.contact.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.contact.emergency24x7}`} className="hover:text-white transition-colors text-rose-300 font-medium">
                  {HOSPITAL_INFO.contact.emergency24x7} (24/7)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${HOSPITAL_INFO.contact.emailGeneral}`} className="hover:text-white transition-colors truncate">
                  {HOSPITAL_INFO.contact.emailGeneral}
                </a>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Aarogya City Hospital. All Rights Reserved. City Centre, Dhanbad, Jharkhand.
          </p>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin || (() => onNavigate && onNavigate('admin'))}
              className="hover:text-teal-400 text-slate-400 transition-colors cursor-pointer flex items-center gap-1 font-medium"
            >
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
