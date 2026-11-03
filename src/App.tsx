import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { HeroSection } from './components/home/HeroSection';
import { ServiceMenu } from './components/services/ServiceMenu';
import { ComboPackagesSection } from './components/combos/ComboPackagesSection';
import { StylistGallery } from './components/stylists/StylistGallery';
import { AcademySection } from './components/academy/AcademySection';
import { GoogleBusinessWidget } from './components/google/GoogleBusinessWidget';
import { AIBookingConcierge } from './components/ai/AIBookingConcierge';
import { AppointmentModal } from './components/booking/AppointmentModal';
import { ConsultationModal } from './components/consultation/ConsultationModal';
import { HomeServiceModal } from './components/home-service/HomeServiceModal';
import { MembershipModal } from './components/membership/MembershipModal';
import { CustomerDashboardModal } from './components/customer/CustomerDashboardModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { Footer } from './components/common/Footer';

import { salonStore } from './services/salonStore';
import { SpaService, MasterStylist, ComboPackage, Appointment } from './types';

export function App() {
  const [services, setServices] = useState<SpaService[]>(salonStore.getServices());
  const [stylists, setStylists] = useState<MasterStylist[]>(salonStore.getStylists());

  // Modal controls
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiContextService, setAIContextService] = useState<SpaService | null>(null);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<SpaService | null>(null);
  const [selectedStylistToBook, setSelectedStylistToBook] = useState<MasterStylist | null>(null);
  const [isGoogleReserveFlow, setIsGoogleReserveFlow] = useState(false);

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isHomeServiceOpen, setIsHomeServiceOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isCustomerPortalOpen, setIsCustomerPortalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setServices(salonStore.getServices());
      setStylists(salonStore.getStylists());
    };
    return salonStore.subscribe(sync);
  }, []);

  const handleBookingConfirmed = (apt: Appointment) => {
    // Already synchronized in salonStore
  };

  const handleBookCombo = (combo: ComboPackage) => {
    // Find first included service or synthesize combo booking
    const matching = services.find((s) => combo.includedServiceIds.includes(s.id)) || services[0];
    const comboServiceWrapper: SpaService = {
      ...matching,
      name: combo.name,
      price: combo.offerPrice,
      durationMinutes: combo.totalDurationMinutes,
      highlights: combo.badge
    };
    setSelectedServiceToBook(comboServiceWrapper);
    setSelectedStylistToBook(null);
    setIsGoogleReserveFlow(false);
    setIsBookingModalOpen(true);
  };

  const handleRebook = (service: SpaService, stylist: MasterStylist) => {
    setSelectedServiceToBook(service);
    setSelectedStylistToBook(stylist);
    setIsGoogleReserveFlow(false);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#d4af37] selection:text-white">
      {/* Header */}
      <Header
        onOpenAIConcierge={() => {
          setAIContextService(null);
          setIsAIOpen(true);
        }}
        onOpenBookingModal={() => {
          setSelectedServiceToBook(null);
          setSelectedStylistToBook(null);
          setIsGoogleReserveFlow(false);
          setIsBookingModalOpen(true);
        }}
        onOpenClientPortal={() => setIsCustomerPortalOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenHomeService={() => setIsHomeServiceOpen(true)}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenAI={() => {
            setAIContextService(null);
            setIsAIOpen(true);
          }}
          onOpenBooking={() => {
            setSelectedServiceToBook(null);
            setSelectedStylistToBook(null);
            setIsGoogleReserveFlow(false);
            setIsBookingModalOpen(true);
          }}
        />

        <ServiceMenu
          services={services}
          onSelectServiceToBook={(srv) => {
            setSelectedServiceToBook(srv);
            setSelectedStylistToBook(null);
            setIsGoogleReserveFlow(false);
            setIsBookingModalOpen(true);
          }}
          onAskAIAboutService={(srv) => {
            setAIContextService(srv);
            setIsAIOpen(true);
          }}
        />

        <ComboPackagesSection onBookCombo={handleBookCombo} />

        <StylistGallery
          stylists={stylists}
          onSelectStylist={(stylist) => {
            setSelectedStylistToBook(stylist);
            setSelectedServiceToBook(null);
            setIsGoogleReserveFlow(false);
            setIsBookingModalOpen(true);
          }}
        />

        <AcademySection />

        <GoogleBusinessWidget
          onDirectGoogleBook={() => {
            setSelectedServiceToBook(null);
            setSelectedStylistToBook(null);
            setIsGoogleReserveFlow(true);
            setIsBookingModalOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Booking Concierge Modal */}
      <AIBookingConcierge
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
        initialServiceContext={aiContextService}
      />

      {/* Unified Multi-Step Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedService={selectedServiceToBook}
        selectedStylist={selectedStylistToBook}
        onConfirmBooking={handleBookingConfirmed}
        isGoogleReserveFlow={isGoogleReserveFlow}
      />

      {/* Paid Hair & Skin Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Salon-at-Home (15 km Radius) Modal */}
      <HomeServiceModal
        isOpen={isHomeServiceOpen}
        onClose={() => setIsHomeServiceOpen(false)}
      />

      {/* E-Membership Modal & Digital Card */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
      />

      {/* Customer Account / Dashboard Portal */}
      <CustomerDashboardModal
        isOpen={isCustomerPortalOpen}
        onClose={() => setIsCustomerPortalOpen(false)}
        onRebook={handleRebook}
      />

      {/* Connected Salon CRM & Admin Management Panel */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />
    </div>
  );
}

export default App;
