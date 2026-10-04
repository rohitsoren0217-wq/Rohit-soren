import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ExperienceSection } from '../components/ExperienceSection';
import { GallerySection } from '../components/GallerySection';
import { AppointmentCTA } from '../components/AppointmentCTA';
import { ContactSection } from '../components/ContactSection';
import { MapSection } from '../components/MapSection';
import { ServiceItem } from '../types';

interface HomePageProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenStory: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigateGallery?: () => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenAllServices: () => void;
  onSuccessToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onOpenStory,
  onNavigateAbout,
  onNavigateContact,
  onNavigateGallery,
  onSelectService,
  onOpenAllServices,
  onSuccessToast,
}) => {
  const handleContactClick = () => {
    if (onNavigateContact) {
      onNavigateContact();
      return;
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero onOpenBooking={() => onOpenBooking()} />

      {/* Trust / Highlight Strip (01 to 04) */}
      <TrustStrip />

      {/* About Preview Section */}
      <AboutSection onOpenStory={onOpenStory} onNavigateAbout={onNavigateAbout} />

      {/* Services Preview Section */}
      <ServicesSection
        onSelectService={onSelectService}
        onOpenAllServices={onOpenAllServices}
      />

      {/* Why Choose Us (Dark Navy Section) */}
      <WhyChooseUs />

      {/* Healthcare Experience Section */}
      <ExperienceSection onContactClick={handleContactClick} />

      {/* Gallery Preview Section */}
      <GallerySection onNavigateGallery={onNavigateGallery} />

      {/* Contact / Appointment CTA Banner */}
      <AppointmentCTA
        onOpenBooking={() => onOpenBooking()}
        onContactClick={handleContactClick}
        onNavigateContact={onNavigateContact}
      />

      {/* Contact Details & Enquiry Form */}
      <ContactSection onSuccessToast={onSuccessToast} />

      {/* Google Map Section */}
      <MapSection />
    </>
  );
};
