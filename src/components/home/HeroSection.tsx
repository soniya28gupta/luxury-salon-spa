import React from 'react';
import { Sparkles, Calendar, Bot, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface HeroSectionProps {
  onOpenAI: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAI, onOpenBooking }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#faf6ef] to-white text-center px-4 py-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#d4af37]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[250px] bg-[#b76e79]/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-6 z-10">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e2d5bc] text-xs font-semibold text-[#8c6b16] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#bfa15f]" />
          <span>Autonomous AI Booking & Master Stylist Consultation</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.15]">
          Transcend The Ordinary. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#9e7d23] via-[#c59b27] to-[#9e7d23]">
            Indulge In Pure Elysian Grace.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          Where Paris runway coiffure meets ancestral Moroccan hydrotherapy and cellular gold dermacology. Experience personalized wellness orchestrated by our autonomous AI Concierge.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenAI}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs tracking-widest uppercase shadow-md hover:brightness-105 flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <Bot className="w-4 h-4" />
            <span>Consult with AI Stylist</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#d5ccbc] hover:border-[#bfa15f] bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-xs tracking-widest uppercase transition flex items-center justify-center gap-2 shadow-xs"
          >
            <Calendar className="w-4 h-4 text-[#bfa15f]" />
            <span>Reserve Appointment</span>
          </button>
        </div>

        {/* Google Business Credibility Strip */}
        <div className="pt-8 border-t border-[#e8e4dc] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="flex text-[#c59b27]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c59b27]" />
              ))}
            </div>
            <span className="font-bold text-neutral-950">4.98 Rating</span>
            <span>on Google Maps</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-neutral-800">Verified Google Reserve Partner</span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#bfa15f]" />
            <span>Private VIP Penthouse Suites</span>
          </div>
        </div>
      </div>
    </section>
  );
};
