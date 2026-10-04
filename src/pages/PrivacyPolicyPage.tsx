import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
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
  Sparkles,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { PageRoute } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  onOpenBooking: () => void;
}

interface PolicySection {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigate,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('section-1');
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  const lastUpdatedDate = 'September 30, 2026';

  const policySections: PolicySection[] = [
    {
      id: 'section-1',
      number: '1',
      title: 'Information We May Collect',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Aarogya City Hospital collects information that you voluntarily choose to submit when utilizing our website, completing forms, or contacting our administration and healthcare staff. This information may include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Full Name</strong> (or name of the patient's representative)</li>
            <li><strong>Telephone / Mobile Number</strong> for consultation and enquiry callbacks</li>
            <li><strong>Email Address</strong> where provided for correspondence or document receipt</li>
            <li><strong>Appointment Request Details</strong> (selected service, department, preferred consultation date and time slot)</li>
            <li><strong>Enquiry Details & Notes</strong> (general healthcare inquiries, feedback, or administrative questions)</li>
            <li><strong>Other Information</strong> voluntarily communicated by the visitor through open text fields or communication channels</li>
          </ul>
          <p>
            Additionally, when you access our website, our web servers and standard hosting infrastructure may collect limited, non-identifying technical data. This technical information may include browser type and version, device category (mobile/desktop), operating system, language preferences, referring URLs, date/time timestamps of visits, and general internet protocol (IP) addresses or similar technical logs necessary for network routing and security.
          </p>
        </div>
      ),
    },
    {
      id: 'section-2',
      number: '2',
      title: 'How We May Use Information',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Information collected through our website is utilized strictly for legitimate operational, patient communication, and service administration purposes, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Responding to Enquiries:</strong> Reviewing and answering questions submitted regarding hospital services, facilities, or visiting hours.</li>
            <li><strong>Processing Appointment Requests:</strong> Checking scheduling availability with clinical departments and contacting you to discuss suitable consultation slots.</li>
            <li><strong>Communication:</strong> Providing essential hospital notices, scheduling updates, or instructions relevant to your requested visit.</li>
            <li><strong>Website Maintenance & Security:</strong> Monitoring platform performance, preventing malicious activity, diagnosing technical errors, and safeguarding website integrity.</li>
            <li><strong>Service Quality Improvement:</strong> Understanding general aggregate website usability patterns to improve patient information access.</li>
          </ul>
          <p>
            Aarogya City Hospital does not utilize personal information gathered through standard appointment or contact forms for unsolicited commercial marketing without prior consent.
          </p>
        </div>
      ),
    },
    {
      id: 'section-3',
      number: '3',
      title: 'Contact & Enquiry Information',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            When you complete a contact or general enquiry form on this website, your submitted name, phone number, email address, and message are routed to our patient coordination desk to provide an appropriate response.
          </p>
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-0.5">Important Safety & Privacy Advisory:</strong>
              Visitors should avoid entering unnecessary sensitive personal health information, private clinical diagnoses, or detailed medical histories into general website enquiry forms. Detailed clinical discussions should be conducted confidentially in-person with consulting physicians or through verified clinical channels.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'section-4',
      number: '4',
      title: 'Appointment Requests',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Our online appointment form collects the information necessary to evaluate and schedule your requested hospital consultation.
          </p>
          <p className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-sm font-medium">
            <strong>Clear Notice on Appointment Status:</strong> Submitting an online appointment request does not necessarily mean that an appointment has been confirmed. Confirmation may depend on the hospital's actual booking process, doctor consultation schedules, and department availability. Our administration team will contact you to verify details before an appointment is finalized.
          </p>
        </div>
      ),
    },
    {
      id: 'section-5',
      number: '5',
      title: 'Website Usage Information',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            To ensure reliable website availability and deliver an optimized browsing experience across various devices, technical usage information may be collected automatically during your visit. This data is evaluated in aggregate form for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Maintaining operational uptime and responsive server delivery</li>
            <li>Identifying and preventing cyber threats or unauthorized intrusions</li>
            <li>Diagnosing system performance issues and link discrepancies</li>
            <li>Evaluating overall page load responsiveness on mobile and desktop networks</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'section-6',
      number: '6',
      title: 'Cookies & Similar Technologies',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Our website may use standard internet cookies or similar session storage technologies to enable core website functionalities, retain user interface preferences, maintain accessibility choices, or analyze website interaction patterns.
          </p>
          <p>
            Cookies are small text files placed on your device by your web browser. You have the ability to control, restrict, or disable cookies at any time through your individual browser settings. Please note that disabling essential cookies may impact the proper presentation or functioning of certain interactive features on our site.
          </p>
        </div>
      ),
    },
    {
      id: 'section-7',
      number: '7',
      title: 'How Information May Be Protected',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Aarogya City Hospital implements reasonable technical and organizational safeguards designed to protect personal information submitted through our website against unauthorized access, loss, misuse, modification, or disclosure. These measures include encrypted HTTPS protocol transmission, access-controlled administration environments, and standard network firewalls.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
            <strong>Security Notice:</strong> We take reasonable steps designed to help protect information from unauthorized access, misuse, alteration or disclosure. However, no internet transmission or electronic storage system can be guaranteed to be completely secure, and we cannot warrant absolute, unconditional immunity from all potential risks.
          </div>
        </div>
      ),
    },
    {
      id: 'section-8',
      number: '8',
      title: 'Data Sharing',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Aarogya City Hospital does not sell, rent, or lease personal information collected through this website to third-party commercial brokers or advertisers. Information may be shared only where appropriate and legally permissible for legitimate operational purposes, such as:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Authorized Technical Service Providers:</strong> Trusted third-party hosting infrastructure, database maintenance, or communication platforms operating under confidentiality agreements.</li>
            <li><strong>Hospital Personnel:</strong> Authorized administrative, reception, and medical staff members who require the information to review requests and coordinate care.</li>
            <li><strong>Legal & Regulatory Requirements:</strong> When mandated by applicable statutory laws, governmental directives, court orders, or law enforcement authorities.</li>
            <li><strong>Protection of Rights:</strong> Where necessary to investigate potential fraud, enforce terms of service, or protect the health, safety, and legal rights of patients, personnel, or the public.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'section-9',
      number: '9',
      title: 'Third-Party Services',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Our website integrates select third-party services to deliver enhanced functionality for visitors, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>Google Maps:</strong> Interactive location mapping to assist patients with campus directions to City Centre, Dhanbad.</li>
            <li><strong>Google Fonts:</strong> Web typography delivery for clean readability.</li>
            <li><strong>Social Media Links:</strong> Outbound reference links to official hospital social platforms.</li>
          </ul>
          <p>
            When utilizing third-party services integrated on our site, those external providers may collect certain technical data in accordance with their independent privacy policies. We encourage visitors to review the privacy terms of those respective providers.
          </p>
        </div>
      ),
    },
    {
      id: 'section-10',
      number: '10',
      title: 'Data Retention',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Information may be retained only for as long as reasonably necessary for the purpose for which it was collected, to meet applicable legal or operational requirements, or as otherwise determined by the responsible hospital organization.
          </p>
          <p>
            Once information is no longer needed to fulfill an enquiry, process an appointment, or satisfy statutory record-keeping responsibilities, reasonable measures are taken to securely archive or delete such data.
          </p>
        </div>
      ),
    },
    {
      id: 'section-11',
      number: '11',
      title: 'User Rights & Choices',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Depending on applicable legal frameworks and individual circumstances, you may have specific rights regarding your personal information submitted to us. Subject to identity verification and regulatory stipulations, these rights may include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Requesting access to the personal contact details you have provided to us</li>
            <li>Requesting correction or updates to incomplete or inaccurate contact records</li>
            <li>Requesting deletion of your general website enquiry records where legally permissible</li>
            <li>Submitting questions or expressing concerns regarding our data handling practices</li>
          </ul>
          <p>
            To submit an inquiry regarding your personal information, please reach out to our administration desk using the verified contact details outlined in Section 15.
          </p>
        </div>
      ),
    },
    {
      id: 'section-12',
      number: '12',
      title: "Children's Privacy",
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            This website is intended for general informational use by adults and families. We do not knowingly solicit or collect unnecessary personal data directly from children under the age of 18 through general website forms without parental or guardian involvement.
          </p>
          <p>
            If appointment or healthcare services are required for a minor child, all inquiries and submissions should be conducted by a parent, legal guardian, or authorized adult representative through official hospital procedures.
          </p>
        </div>
      ),
    },
    {
      id: 'section-13',
      number: '13',
      title: 'External Links',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            The website may contain hyperlinks to external websites, services, or platforms not operated or managed by Aarogya City Hospital.
          </p>
          <p>
            Aarogya City Hospital is not responsible for the privacy practices, cookie configurations, data management, or content of external websites that it does not control. Visitors should exercise caution and review the privacy notices of any external site they visit.
          </p>
        </div>
      ),
    },
    {
      id: 'section-14',
      number: '14',
      title: 'Policy Updates',
      content: (
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            This Privacy Policy may be updated from time to time to reflect changes in website functionality, operational practices, hospital procedures, or applicable regulatory requirements.
          </p>
          <p>
            Any modifications will become effective upon being published on this page, with the revised date indicated at the top of the policy under "Last Updated." We recommend periodic review of this page to stay informed about our privacy measures.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Current Document Effective Date: <span className="font-semibold text-slate-700">{lastUpdatedDate}</span>
          </p>
        </div>
      ),
    },
    {
      id: 'section-15',
      number: '15',
      title: 'Contact Us About Privacy',
      content: (
        <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            If you have questions, feedback, or requests regarding this Privacy Policy or our information handling practices, please contact our hospital administrative office:
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
              <Mail className="w-4 h-4 text-teal-600 shrink-0" />
              <a
                href={`mailto:${HOSPITAL_INFO.contact.emailGeneral}`}
                className="hover:text-teal-700 transition-colors font-medium text-teal-800"
              >
                {HOSPITAL_INFO.contact.emailGeneral}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-teal-600 shrink-0" />
              <a
                href={`tel:${HOSPITAL_INFO.contact.phonePrimary.replace(/[^0-9+]/g, '')}`}
                className="hover:text-teal-700 transition-colors font-medium text-teal-800"
              >
                {HOSPITAL_INFO.contact.phonePrimary}
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
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
      for (const section of policySections) {
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
          - Small label: LEGAL & PRIVACY
          - Main H1: "Privacy Policy"
          - Subheading: "Your privacy and the responsible handling of your information matter to us."
          - Breadcrumb: Home / Privacy Policy
          - Clean navy background with subtle medical abstract design
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
              Privacy Policy
            </span>
          </nav>

          <div className="max-w-3xl">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>LEGAL & PRIVACY</span>
            </div>

            {/* Main H1 */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Privacy Policy
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-body">
              Your privacy and the responsible handling of your information matter to us.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: POLICY INTRODUCTION & METADATA BAR
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
              <span className="text-slate-500 hidden sm:inline">Effective Version 1.2</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
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
                <span>Table of Contents (15 Sections)</span>
              </div>
              {mobileTocOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {mobileTocOpen && (
              <div className="px-5 pb-4 pt-2 border-t border-slate-200/80 space-y-1 text-xs">
                {policySections.map((sec) => (
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
                  {policySections.map((sec) => {
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
                  <p className="font-semibold text-slate-700 mb-1">Need Clarification?</p>
                  <p>Our administrative desk in City Centre, Dhanbad, is available for assistance.</p>
                </div>
              </div>
            </aside>

            {/* Main Policy Content (col-span-8) */}
            <main className="lg:col-span-8 max-w-3xl">
              {/* Introduction Paragraph */}
              <div className="mb-10 pb-8 border-b border-slate-200">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-body">
                  This Privacy Policy describes how <strong>AAROGYA CITY HOSPITAL</strong> ("we", "our", or "the hospital"), situated in City Centre, Dhanbad, Jharkhand, may collect, use, store, and protect information when visitors use this website or contact the hospital through its online enquiry and appointment request channels.
                </p>
                <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  We are committed to operating in a manner that values patient and visitor dignity, confidentiality, and transparency. By accessing or using our website, you acknowledge the terms described in this Privacy Policy.
                </p>
              </div>

              {/* 15 Detailed Policy Sections */}
              <div className="space-y-12">
                {policySections.map((sec) => (
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
                  LEGAL DISCLAIMER NOTICE
                  - Subtle but readable notice at the bottom of the content
              ============================================================ */}
              <div className="mt-12 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-500 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Legal Notice:</strong> This website Privacy Policy is intended as general website information and should be reviewed and approved by the hospital's authorized representative or legal adviser before publication.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};
