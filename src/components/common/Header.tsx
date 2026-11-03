import React from 'react';
import { Sparkles, Calendar, Bot, Star, User, Home, Video, Crown, GraduationCap, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenAIConcierge: () => void;
  onOpenBookingModal: () => void;
  onOpenClientPortal: () => void;
  onOpenConsultation: () => void;
  onOpenHomeService: () => void;
  onOpenMembership: () => void;
  onOpenAdminDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAIConcierge,
  onOpenBookingModal,
  onOpenClientPortal,
  onOpenConsultation,
  onOpenHomeService,
  onOpenMembership,
  onOpenAdminDashboard
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8e4dc] text-neutral-900 shadow-xs">
      {/* Top micro bar */}
      <div className="bg-[#faf8f4] text-[11px] py-1.5 px-4 text-center border-b border-[#ece7dc] text-neutral-600 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[#9e7d23] font-semibold">
            <Sparkles className="w-3 h-3 text-[#bfa15f]" /> The Penthouse Sanctuary, 28 Crescent Road
          </span>
          <span className="hidden sm:inline">• Complimentary Valet & Dom Pérignon Lounge</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdminDashboard}
            className="flex items-center gap-1 text-[#8e6c15] hover:text-black font-semibold text-[10px] bg-[#fbf8f0] px-2 py-0.5 rounded-full border border-[#e8ddbe] transition"
          >
            <Shield className="w-3 h-3 text-[#bfa15f]" />
            <span>Admin CRM</span>
          </button>
          <span className="hidden md:flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Reserve with Google Partner
          </span>
          <span className="flex items-center gap-0.5 text-[#9e7d23] font-semibold">
            <Star className="w-3 h-3 fill-[#c59b27] text-[#c59b27]" /> 4.98 (840+ Google Reviews)
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-[0.2em] text-neutral-950">
            AURA <span className="text-[#bfa15f]">SANCTUARY</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#9e7d23] font-bold">
            Haute Coiffure • Spa & Aesthetic Wellness
          </span>
        </div>

        {/* Center Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold tracking-wider uppercase text-neutral-700">
          <a href="#services" className="hover:text-[#9e7d23] transition">Rituals</a>
          <a href="#combos" className="hover:text-[#9e7d23] transition">Combos</a>
          <a href="#stylists" className="hover:text-[#9e7d23] transition">Curators</a>
          <a href="#academy" className="hover:text-[#9e7d23] transition">Academy</a>
          
          <button
            onClick={onOpenConsultation}
            className="hover:text-[#9e7d23] transition flex items-center gap-1 font-semibold"
          >
            <Video className="w-3 h-3 text-[#bfa15f]" />
            <span>Consultation</span>
          </button>

          <button
            onClick={onOpenHomeService}
            className="hover:text-[#9e7d23] transition flex items-center gap-1 font-semibold"
          >
            <Home className="w-3 h-3 text-[#bfa15f]" />
            <span>Salon at Home</span>
          </button>

          <button
            onClick={onOpenMembership}
            className="hover:text-[#9e7d23] transition flex items-center gap-1 font-semibold"
          >
            <Crown className="w-3 h-3 text-[#bfa15f]" />
            <span>E-Membership</span>
          </button>

          <button
            onClick={onOpenAIConcierge}
            className="flex items-center gap-1 text-[#9e7d23] hover:text-[#6f5615] transition font-bold"
          >
            <Bot className="w-3.5 h-3.5 text-[#bfa15f]" />
            <span>AI Concierge</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onOpenClientPortal}
            className="px-3.5 py-2 rounded-full border border-[#dcd6c8] hover:border-[#bfa15f] bg-white text-neutral-700 hover:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
          >
            <User className="w-3.5 h-3.5 text-[#bfa15f]" />
            <span className="hidden sm:inline">My Account</span>
          </button>

          <button
            onClick={onOpenBookingModal}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md hover:brightness-105 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Ritual</span>
          </button>
        </div>
      </div>
    </header>
  );
};
