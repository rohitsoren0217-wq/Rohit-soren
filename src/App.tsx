import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { AnnouncementBar } from './components/AnnouncementBar';
import { AdminQuickBadge } from './components/AdminQuickBadge';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { AppointmentModal } from './components/AppointmentModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AboutModal } from './components/AboutModal';
import { LegalModal } from './components/LegalModals';
import { FloatingActions } from './components/FloatingActions';
import { Toast } from './components/Toast';
import { ServiceItem, PageRoute } from './types';
import { SERVICES } from './data/hospitalData';

export default function App() {
  // Navigation & Page State ('home' | 'about' | 'services' | 'gallery' | 'contact')
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeSection, setActiveSection] = useState('home');

  // Modals & Feedback State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize page from URL and handle browser popstate
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes('admin')) {
        setCurrentPage('admin');
        document.title = 'Admin CMS Control Panel | Aarogya City Hospital';
        updateMetaDescription(
          'Hospital CMS Control Panel - Manage photos, content, theme colors, and medical team.'
        );
      } else if (path.includes('terms')) {
        setCurrentPage('terms');
        document.title = 'Terms & Conditions | Aarogya City Hospital';
        updateMetaDescription(
          'Read the Terms & Conditions applicable to the use of the Aarogya City Hospital website.'
        );
      } else if (path.includes('privacy')) {
        setCurrentPage('privacy');
        document.title = 'Privacy Policy | Aarogya City Hospital';
        updateMetaDescription(
          'Read the Privacy Policy of Aarogya City Hospital and learn how information submitted through our website may be handled.'
        );
      } else if (path.includes('appointment')) {
        setCurrentPage('appointment');
        document.title = 'Book Hospital Appointment in Dhanbad | Aarogya City Hospital';
        updateMetaDescription(
          'Schedule an appointment with doctor consultation, specialist guidance, and healthcare services at Aarogya City Hospital in City Centre, Dhanbad.'
        );
      } else if (path.includes('contact')) {
        setCurrentPage('contact');
        document.title = 'Contact Us | Aarogya City Hospital - City Centre, Dhanbad';
        updateMetaDescription(
          'Get in touch with Aarogya City Hospital in City Centre, Dhanbad. Call our 24/7 emergency helpline, book an OPD appointment, or visit our hospital campus.'
        );
      } else if (path.includes('gallery')) {
        setCurrentPage('gallery');
        document.title = 'Hospital Gallery & Facilities | Aarogya City Hospital - Dhanbad';
        updateMetaDescription(
          'Explore our healthcare environment, facilities, consultation chambers, patient care wards and team at Aarogya City Hospital in City Centre, Dhanbad.'
        );
      } else if (path.includes('services') || hash.includes('services')) {
        setCurrentPage('services');
        document.title = 'Hospital Services in Dhanbad | Aarogya City Hospital';
        updateMetaDescription(
          'Explore the healthcare services available at Aarogya City Hospital in City Centre, Dhanbad, and connect with our team for service information and appointments.'
        );
      } else if (path.includes('about') || hash.includes('about')) {
        setCurrentPage('about');
        document.title = 'About Aarogya City Hospital | Healthcare in Dhanbad';
        updateMetaDescription(
          'Learn about Aarogya City Hospital in City Centre, Dhanbad, our patient-focused approach, healthcare environment and commitment to compassionate care.'
        );
      } else {
        setCurrentPage('home');
        document.title = 'Aarogya City Hospital | Trusted Healthcare in Dhanbad';
        updateMetaDescription(
          'Discover Aarogya City Hospital in City Centre, Dhanbad — a patient-focused healthcare environment offering professional healthcare services and support.'
        );
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  const updateMetaDescription = (content: string) => {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', content);
  };

  const handleNavigate = (page: PageRoute, sectionId?: string) => {
    if (page === 'admin') {
      setCurrentPage('admin');
      window.history.pushState(null, '', '/admin');
      document.title = 'Admin CMS Control Panel | Aarogya City Hospital';
      updateMetaDescription(
        'Hospital CMS Control Panel - Manage photos, content, theme colors, and medical team.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'terms') {
      setCurrentPage('terms');
      window.history.pushState(null, '', '/terms-and-conditions');
      document.title = 'Terms & Conditions | Aarogya City Hospital';
      updateMetaDescription(
        'Read the Terms & Conditions applicable to the use of the Aarogya City Hospital website.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'privacy') {
      setCurrentPage('privacy');
      window.history.pushState(null, '', '/privacy-policy');
      document.title = 'Privacy Policy | Aarogya City Hospital';
      updateMetaDescription(
        'Read the Privacy Policy of Aarogya City Hospital and learn how information submitted through our website may be handled.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'appointment') {
      setCurrentPage('appointment');
      window.history.pushState(null, '', '/appointment');
      document.title = 'Book Hospital Appointment in Dhanbad | Aarogya City Hospital';
      updateMetaDescription(
        'Schedule an appointment with doctor consultation, specialist guidance, and healthcare services at Aarogya City Hospital in City Centre, Dhanbad.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'contact') {
      setCurrentPage('contact');
      window.history.pushState(null, '', '/contact');
      document.title = 'Contact Us | Aarogya City Hospital - City Centre, Dhanbad';
      updateMetaDescription(
        'Get in touch with Aarogya City Hospital in City Centre, Dhanbad. Call our 24/7 emergency helpline, book an OPD appointment, or visit our hospital campus.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'gallery') {
      setCurrentPage('gallery');
      window.history.pushState(null, '', '/gallery');
      document.title = 'Hospital Gallery & Facilities | Aarogya City Hospital - Dhanbad';
      updateMetaDescription(
        'Explore our healthcare environment, facilities, consultation chambers, patient care wards and team at Aarogya City Hospital in City Centre, Dhanbad.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'services') {
      setCurrentPage('services');
      window.history.pushState(null, '', '/services');
      document.title = 'Hospital Services in Dhanbad | Aarogya City Hospital';
      updateMetaDescription(
        'Explore the healthcare services available at Aarogya City Hospital in City Centre, Dhanbad, and connect with our team for service information and appointments.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'about') {
      setCurrentPage('about');
      window.history.pushState(null, '', '/about-us');
      document.title = 'About Aarogya City Hospital | Healthcare in Dhanbad';
      updateMetaDescription(
        'Learn about Aarogya City Hospital in City Centre, Dhanbad, our patient-focused approach, healthcare environment and commitment to compassionate care.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
      document.title = 'Aarogya City Hospital | Trusted Healthcare in Dhanbad';
      updateMetaDescription(
        'Discover Aarogya City Hospital in City Centre, Dhanbad — a patient-focused healthcare environment offering professional healthcare services and support.'
      );

      if (sectionId && sectionId !== 'home') {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Active section scroll spy when on home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'why-us', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleOpenAllServices = () => {
    handleNavigate('services');
  };

  return (
    <SiteSettingsProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-800 font-body">
        {/* Top Emergency Announcement Bar (when enabled in CMS) */}
        {currentPage !== 'admin' && (
          <AnnouncementBar onOpenBooking={() => handleNavigate('appointment')} />
        )}

        {/* 24/7 Casualty & OPD Top Notice Bar */}
        {currentPage !== 'admin' && <TopBar />}

        {/* Sticky Main Navigation */}
        {currentPage !== 'admin' && (
          <Header
            onOpenBooking={() => handleOpenBooking()}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            activeSection={activeSection}
          />
        )}

        <main className="flex-1">
          {currentPage === 'admin' && (
            <AdminPanelPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'home' && (
            <HomePage
              onOpenBooking={handleOpenBooking}
              onOpenStory={() => setIsStoryOpen(true)}
              onNavigateAbout={() => handleNavigate('about')}
              onNavigateContact={() => handleNavigate('contact')}
              onNavigateGallery={() => handleNavigate('gallery')}
              onSelectService={handleSelectService}
              onOpenAllServices={handleOpenAllServices}
              onSuccessToast={(msg) => setToastMessage(msg)}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage
              onOpenBooking={handleOpenBooking}
              onSelectService={handleSelectService}
              onNavigate={handleNavigate}
              onSuccessToast={(msg) => setToastMessage(msg)}
            />
          )}

          {currentPage === 'gallery' && (
            <GalleryPage
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={handleNavigate}
              onSuccessToast={(msg) => setToastMessage(msg)}
            />
          )}

          {currentPage === 'appointment' && (
            <AppointmentPage
              onNavigate={handleNavigate}
              onSuccessToast={(msg) => setToastMessage(msg)}
            />
          )}

          {currentPage === 'privacy' && (
            <PrivacyPolicyPage
              onNavigate={handleNavigate}
              onOpenBooking={() => handleNavigate('appointment')}
            />
          )}

          {currentPage === 'terms' && (
            <TermsPage
              onNavigate={handleNavigate}
              onOpenBooking={() => handleNavigate('appointment')}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={handleNavigate}
              onSuccessToast={(msg) => setToastMessage(msg)}
            />
          )}
        </main>

        {/* Footer */}
        {currentPage !== 'admin' && (
          <Footer
            onOpenBooking={() => handleNavigate('appointment')}
            onOpenPrivacy={() => handleNavigate('privacy')}
            onOpenTerms={() => handleNavigate('terms')}
            onOpenAdmin={() => handleNavigate('admin')}
            onNavigate={handleNavigate}
          />
        )}

        {/* Floating Elements (WhatsApp & Back to Top) */}
        {currentPage !== 'admin' && <FloatingActions />}

        {/* Floating Admin CMS Quick-Access Badge */}
        <AdminQuickBadge
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />

        {/* Toast Notification */}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

        {/* Book an Appointment Modal */}
        <AppointmentModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialServiceId={bookingServiceId}
          onSuccess={(msg) => setToastMessage(msg)}
        />

        {/* Service Detail Modal */}
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBookService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* Discover Our Story Modal */}
        <AboutModal
          isOpen={isStoryOpen}
          onClose={() => setIsStoryOpen(false)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Legal Modals (Privacy & Terms) */}
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </SiteSettingsProvider>
  );
}
