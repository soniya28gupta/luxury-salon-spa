import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f8f5ee] border-t border-[#e8e2d4] text-neutral-600 text-xs py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#e2dac8]">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-neutral-950">
              AURA <span className="text-[#bfa15f]">SANCTUARY</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9e7d23] font-bold">
              The Epitome of Haute Wellness
            </span>
          </div>
          <p className="text-neutral-600 font-light leading-relaxed text-[11px]">
            A private haute coiffure sanctuary and cellular spa clinic where master French aesthetics converge with Moroccan heated marble hammam therapies.
          </p>
          <div className="flex items-center gap-1 text-[#9e7d23] text-[11px] font-bold">
            <Star className="w-3.5 h-3.5 fill-[#c59b27] text-[#c59b27]" />
            <span>4.98 Stars on Google Business Profile (840+ Reviews)</span>
          </div>
        </div>

        {/* Rituals */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm text-neutral-950 uppercase tracking-wider">
            Signature Rituals
          </h4>
          <ul className="space-y-2 text-[11px] font-medium text-neutral-600">
            <li className="hover:text-[#9e7d23] cursor-pointer transition">24K Gold Cellular Renewal Facial</li>
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Haute Balayage Couture & Caviar Mask</li>
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Royal Moroccan Heated Hammam</li>
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Chakra Balancing Warm Volcanic Stone</li>
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Sovereign Empress Penthouse Suite</li>
          </ul>
        </div>

        {/* Master Artisans */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm text-neutral-950 uppercase tracking-wider">
            Master Curators
          </h4>
          <ul className="space-y-2 text-[11px] font-medium text-neutral-600">
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Laurent Mercier — Creative Director</li>
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Dr. Elena Rostova — Lead Dermal Biochemist</li>
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Somsri Phan — Balinese Temple Master</li>
            <li className="hover:text-[#9e7d23] cursor-pointer transition">Ananya Deshmukh — Bridal Couture Stylist</li>
          </ul>
        </div>

        {/* Concierge & Address */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm text-neutral-950 uppercase tracking-wider">
            VIP Sanctuary Concierge
          </h4>
          <div className="space-y-2 text-[11px] font-light leading-relaxed text-neutral-700">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#bfa15f] shrink-0 mt-0.5" />
              <span>The Penthouse Sanctuary, 28 Crescent Road, High Street District</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#bfa15f] shrink-0" />
              <span>+91 11 4982 7700 (Direct VIP Line)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#bfa15f] shrink-0" />
              <span>concierge@auraspa.luxury</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
        <p>© 2026 Aura Sanctuary & Haute Coiffure LLC. All Rights Reserved.</p>
        <p className="text-[#9e7d23] font-semibold">Reserve with Google™ Official Partner</p>
      </div>
    </footer>
  );
};
