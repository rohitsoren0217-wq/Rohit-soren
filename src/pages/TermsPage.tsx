import React, { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Info,
  CheckCircle2,
  Calendar,
  Lock,
  Scale,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { PageRoute } from '../types';

interface TermsPageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onOpenBooking: () => void;
}

interface TermSection {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('term-1');
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  const lastUpdatedDate = 'September 30, 2026';

  const termSections: TermSection[] = [
    {
      id: 'term-1',
      number: '1',
      title: 'Website Use',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            This website is provided to offer general informational guidance regarding <strong>AAROGYA CITY HOSPITAL</strong>, our clinical facilities, healthcare services, hospital location in City Centre, Dhanbad, and available contact and appointment request channels.
          </p>
          <p>
            Users agree to access and utilize this website responsibly and solely for legitimate, non-commercial healthcare enquiry purposes. Any misuse of the website, its communication forms, or technical infrastructure is strictly prohibited. Specifically, users must not:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Engage in unauthorized access to server environments, databases, or non-public administrative interfaces</li>
            <li>Attempt to interfere with, disrupt, overburden, or compromise website network integrity or security</li>
            <li>Upload or transmit malicious code, viruses, spyware, or harmful software payloads</li>
            <li>Misuse appointment or contact forms by submitting spam, abusive language, or intentionally fabricated data</li>
            <li>Utilize the website or any of its published contact details for unlawful, misleading, or fraudulent purposes</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'term-2',
      number: '2',
      title: 'Website Information',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            All information published on this website—including descriptions of clinical services, diagnostic capabilities, hospital amenities, visiting guidelines, and general healthcare topics—is presented for general informational purposes only.
          </p>
          <p>
            While reasonable care is taken to maintain current and informative website materials, hospital services, visiting specialist rotations, operational timings, and clinical facilities may evolve. Aarogya City Hospital does not represent or warrant that all information displayed on this website is perpetually exhaustive, complete, or updated at every given moment. Visitors and patients are advised to contact the hospital directly to verify specific clinical schedules or service availability.
          </p>
        </div>
      ),
    },
    {
      id: 'term-3',
      number: '3',
      title: 'Medical Information Disclaimer',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-sm sm:text-base font-medium flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Information provided on this website is not intended to replace professional medical consultation, diagnosis or treatment.</strong>
            </div>
          </div>
          <p>
            No text, graphic, video, or response published on or received through this website should be treated as individualized clinical advice or medical diagnosis. Healthcare decisions require thorough in-person evaluation by qualified medical practitioners who can examine vital indicators, review medical histories, and formulate tailored treatment strategies.
          </p>
          <p>
            If you are experiencing acute health symptoms, severe injury, chest pain, difficulty breathing, or a medical emergency, do not wait for a website form response. Please call our 24/7 Emergency Casualty Desk immediately at <strong>{HOSPITAL_INFO.contact.emergency24x7}</strong> or visit our 24/7 Casualty Wing at City Centre, Dhanbad.
          </p>
        </div>
      ),
    },
    {
      id: 'term-4',
      number: '4',
      title: 'Appointments & Enquiries',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            The website offers convenient online submission forms allowing visitors to request appointments or submit administrative inquiries to our hospital coordination team.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs sm:text-sm space-y-2">
            <div className="flex items-start gap-2 text-teal-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Key Appointment Terms:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Submitting an appointment request form does not automatically guarantee or constitute a confirmed clinical appointment.</li>
              <li>Appointment confirmation is subject to actual doctor schedules, department capacity, and verification by our reception desk.</li>
              <li>Our hospital team will attempt to contact you via telephone or email to discuss and finalize appointment details.</li>
              <li>Visitors are responsible for providing valid, accurate contact details to enable communication.</li>
              <li>Consultation timings may be adjusted or rescheduled due to urgent clinical priorities or unforeseen circumstances.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'term-5',
      number: '5',
      title: 'User Responsibilities',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            By accessing or utilizing our website, you agree to uphold basic responsibilities essential for a respectful and secure digital environment, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Providing accurate, truthful, and non-misleading contact information when submitting forms or communications</li>
            <li>Using the website in compliance with all applicable local, national, and international laws and regulations</li>
            <li>Respecting the privacy and intellectual property rights of Aarogya City Hospital and fellow website visitors</li>
            <li>Refraining from transmitting abusive, defamatory, threatening, or unlawful content through website input fields</li>
            <li>Avoiding any attempts to probe, scan, or test the vulnerability of the website system or breach security measures</li>
            <li>Using online features strictly for their intended healthcare enquiry or appointment scheduling objectives</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'term-6',
      number: '6',
      title: 'Intellectual Property',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            All content appearing on this website—including but not limited to the "AAROGYA CITY HOSPITAL" name, emblems, logos, trade dress, text, photographic works, custom vector illustrations, graphic designs, icons, layout structures, and underlying software code—is owned by or licensed to Aarogya City Hospital and is protected by applicable copyright, trademark, and intellectual property statutes.
          </p>
          <p>
            Visitors may view and print individual web pages for personal, non-commercial informational use only. You may not copy, reproduce, republish, alter, distribute, transmit, or commercially exploit any website content without prior written permission from an authorized hospital representative. Third-party brand names or trademarks referenced on the site remain the property of their respective owners.
          </p>
        </div>
      ),
    },
    {
      id: 'term-7',
      number: '7',
      title: 'Third-Party Links',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            For your convenience and information, this website may include hyperlinks to external third-party services and platforms, such as Google Maps (for hospital navigation directions) and official social media platforms.
          </p>
          <p>
            Aarogya City Hospital does not manage, monitor, or endorse external third-party websites and assumes no responsibility for their content, accuracy, availability, or operational policies. Accessing third-party links is at your own discretion, and we encourage you to review the separate terms of use and privacy policies governing those independent sites.
          </p>
        </div>
      ),
    },
    {
      id: 'term-8',
      number: '8',
      title: 'Website Availability',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Aarogya City Hospital endeavors to maintain continuous and dependable website availability. However, the website is delivered on an "as is" and "as available" basis without guarantees of uninterrupted or error-free accessibility.
          </p>
          <p>
            Temporary interruptions, delays, or service suspensions may occur periodically due to scheduled server maintenance, software updates, telecommunication disruptions, hosting provider outages, or unforeseen circumstances beyond our reasonable control. The hospital reserves the right to modify, suspend, or discontinue any aspect of the website at any time without prior notice.
          </p>
        </div>
      ),
    },
    {
      id: 'term-9',
      number: '9',
      title: 'Limitation of Liability',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            To the maximum extent permitted by applicable law, Aarogya City Hospital, its trustees, directors, medical staff, employees, and authorized agents shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising out of or in connection with:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Your access to, use of, or inability to access or use this website</li>
            <li>Any reliance placed upon general informational content published on the site</li>
            <li>Technical errors, system delays, server interruptions, or computer viruses</li>
            <li>Communications transmitted via third-party telecommunications networks or internet pathways</li>
          </ul>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
            <strong>Important Review Notice:</strong> Nothing in these terms is intended to limit or exclude liability for matters that cannot be lawfully excluded under applicable jurisdiction laws. This section is provided as a framework and must be reviewed and approved by the hospital's authorized legal representative.
          </div>
        </div>
      ),
    },
    {
      id: 'term-10',
      number: '10',
      title: 'Privacy',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Information submitted through this website may be handled in accordance with our <strong>Privacy Policy</strong>.
          </p>
          <p>
            Our Privacy Policy provides full details regarding the types of contact and appointment information we may collect, the operational purposes for which it is processed, safeguards utilized, and choices available to you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('privacy')}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Read Privacy Policy</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'term-11',
      number: '11',
      title: 'Changes to These Terms',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Aarogya City Hospital reserves the right to revise, update, or replace these Terms & Conditions from time to time to accommodate evolving website features, clinical service adjustments, operational policies, or legal requirements.
          </p>
          <p>
            Any modifications will take effect immediately upon being posted to this page, with the updated date clearly indicated under "Last Updated." Continued use of the website following published updates signifies acknowledgment and acceptance of the revised terms.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Current Document Version: <span className="font-semibold text-slate-700">{lastUpdatedDate}</span>
          </p>
        </div>
      ),
    },
    {
      id: 'term-12',
      number: '12',
      title: 'Governing Law',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <Scale className="w-4 h-4 text-teal-600 mb-2" />
            <p className="font-medium text-slate-800 mb-1">Applicable Jurisdiction Framework:</p>
            <p>
              These Terms & Conditions shall be interpreted in accordance with the applicable laws and jurisdiction determined by the hospital and its legal advisers.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            <strong>Legal Counsel Notice:</strong> The final governing-law and dispute jurisdiction clause must be reviewed, finalized, and approved by the hospital's authorized legal counsel prior to formal publication.
          </p>
        </div>
      ),
    },
    {
      id: 'term-13',
      number: '13',
      title: 'Contact Us',
      content: (
        <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            If you have questions, feedback, or require clarification regarding these Terms & Conditions or our hospital website services, please contact our administrative desk:
          </p>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-sm">
            <h4 className="font-heading font-bold text-base text-[#0B2545]">
              {HOSPITAL_INFO.name}
            </h4>

            <div className="flex items-start gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>{HOSPITAL_INFO.location.fullAddress}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-teal-600 shrink-0" />
              <a
                href={`tel:${HOSPITAL_INFO.contact.phonePrimary.replace(/[^0-9+]/g, '')}`}
                className="hover:text-teal-700 transition-colors font-medium text-teal-800"
              >
                {HOSPITAL_INFO.contact.phonePrimary}
              </a>
              <span className="text-xs text-slate-400">· OPD Helpdesk</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Mail className="w-4 h-4 text-teal-600 shrink-0" />
              <a
                href={`mailto:${HOSPITAL_INFO.contact.emailGeneral}`}
                className="hover:text-teal-700 transition-colors font-medium text-teal-800"
              >
                {HOSPITAL_INFO.contact.emailGeneral}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('appointment')}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      ),
    },
  ];

  // Scrollspy to update active table of contents section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of termSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-body">
      {/* ============================================================
          SECTION 1: HERO SECTION
          - Small label: LEGAL INFORMATION
          - Main H1: "Terms & Conditions"
          - Subheading: "Please review the terms that apply when using the AAROGYA CITY HOSPITAL website."
          - Breadcrumb: Home / Terms & Conditions
          - Clean Deep Navy background with subtle healthcare-inspired abstract graphics
          - Compact and content-focused
      ============================================================ */}
      <section className="relative bg-[#031634] text-white pt-14 pb-16 lg:pt-20 lg:pb-20 overflow-hidden border-b border-slate-800">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#031634] via-[#0B2545] to-[#0F766E]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs font-medium text-slate-300">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-500">/</span>
            <span className="text-teal-400 font-semibold" aria-current="page">
              Terms & Conditions
            </span>
          </nav>

          <div className="max-w-3xl">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-teal-400" />
              <span>LEGAL INFORMATION</span>
            </div>

            {/* Main H1 */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Terms & Conditions
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-body">
              Please review the terms that apply when using the AAROGYA CITY HOSPITAL website.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: DOCUMENT METADATA BAR
      ============================================================ */}
      <section className="bg-slate-50/90 border-b border-slate-200/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                Last Updated: <strong className="font-semibold text-slate-800">{lastUpdatedDate}</strong>
              </span>
              <span className="text-slate-400 hidden sm:inline">·</span>
              <span className="text-slate-500 hidden sm:inline">Standard Website Terms Version 1.2</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FileText className="w-4 h-4 text-teal-600" />
              <span>Aarogya City Hospital · City Centre, Dhanbad</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: MAIN POLICY BODY WITH TABLE OF CONTENTS SIDEBAR
          - Desktop: Two-column layout (sticky TOC on left, content on right)
          - Mobile: Single-column with collapsible TOC accordion
      ============================================================ */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Collapsible Table of Contents */}
          <div className="lg:hidden mb-8 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              type="button"
              className="w-full px-5 py-3.5 flex items-center justify-between text-left font-heading font-semibold text-sm text-[#0B2545]"
              aria-expanded={mobileTocOpen}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Table of Contents (13 Sections)</span>
              </div>
              {mobileTocOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {mobileTocOpen && (
              <div className="px-5 pb-4 pt-2 border-t border-slate-200/80 space-y-1 text-xs">
                {termSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    type="button"
                    className={`block w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                      activeSectionId === sec.id
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {sec.number}. {sec.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Desktop Table of Contents Sidebar (col-span-4) */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 bg-slate-50/90 rounded-2xl p-6 border border-slate-200 shadow-xs max-h-[82vh] overflow-y-auto">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 text-xs font-heading font-bold uppercase tracking-wider text-teal-800">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span>Table of Contents</span>
                </div>

                <nav aria-label="Table of Contents" className="space-y-1">
                  {termSections.map((sec) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        type="button"
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-teal-700 text-white font-semibold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate pr-2">
                          {sec.number}. {sec.title}
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
                  <p className="font-semibold text-slate-700 mb-1">Have Questions?</p>
                  <p>Our hospital administrative team in City Centre, Dhanbad, is available for assistance.</p>
                </div>
              </div>
            </aside>

            {/* Main Terms Content (col-span-8) */}
            <main className="lg:col-span-8 max-w-3xl">
              {/* Introduction Paragraph */}
              <div className="mb-10 pb-8 border-b border-slate-200">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-body">
                  These Terms & Conditions describe the general terms applicable to your use of the <strong>AAROGYA CITY HOSPITAL</strong> website. By accessing or using this website, you agree to use it responsibly and in accordance with these terms.
                </p>
                <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  If you do not agree with any part of these terms, please refrain from using the website. We encourage visitors to review these conditions regularly as they govern digital interactions, form submissions, and general information access.
                </p>
              </div>

              {/* 13 Detailed Terms Sections */}
              <div className="space-y-12">
                {termSections.map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-28 pb-8 border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                        {sec.number}
                      </span>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#0B2545]">
                        {sec.number}. {sec.title}
                      </h2>
                    </div>

                    <div className="pl-0 sm:pl-9 mt-3">
                      {sec.content}
                    </div>
                  </article>
                ))}
              </div>

              {/* ============================================================
                  IMPORTANT NOTICE
                  - Subtle but readable notice at the bottom of the content
              ============================================================ */}
              <div className="mt-12 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-500 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Important Notice:</strong> This Terms & Conditions page is provided as a website-content framework and should be reviewed and approved by the hospital's authorized representative or qualified legal adviser before publication.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA SECTION
          - Small premium CTA section
          - Heading: "Have Questions About Our Website or Services?"
          - Description: "Contact our hospital team for additional information."
          - Buttons: "Contact Us" & "Book an Appointment"
      ============================================================ */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B2545] mb-2.5">
            Have Questions About Our Website or Services?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-xl mx-auto">
            Contact our hospital team for additional information or assistance with appointment requests.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('contact')}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('appointment')}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
