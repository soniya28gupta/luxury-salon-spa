import React, { useState } from 'react';
import { Clock, Sparkles, Check, ArrowRight, Bot, Home, Crown, Tag } from 'lucide-react';
import { SpaService } from '../../types';

interface ServiceMenuProps {
  services: SpaService[];
  onSelectServiceToBook: (service: SpaService) => void;
  onAskAIAboutService: (service: SpaService) => void;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({
  services,
  onSelectServiceToBook,
  onAskAIAboutService
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Facial Couture',
    'Haute Coiffure',
    'Hammam & Hydrotherapy',
    'Chakra Massages',
    'Bridal Suites',
    'Hair',
    'Skin',
    'Spa',
    'Grooming',
    'Nails'
  ];

  const filtered = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 px-4 max-w-7xl mx-auto bg-white">
      <div className="text-center space-y-3 mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#9e7d23]">
          Curated Treatment Collections
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950">
          The Elysian Spa & Coiffure Menu
        </h2>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 font-light">
          Each ritual is formulated using the world’s most potent bioactive botanicals, 24K gold nano-leaf, and master artisanal touch.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition ${
                selectedCategory === c
                  ? 'bg-[#d4af37] text-slate-950 font-bold shadow-md'
                  : 'bg-[#faf8f4] text-neutral-600 hover:text-neutral-950 border border-[#e8e2d4] hover:bg-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((service) => (
          <div
            key={service.id}
            className="group bg-[#fcfaf6] border border-[#e8e2d4] hover:border-[#d4af37] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Image banner */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="bg-white/90 backdrop-blur-md text-slate-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs border border-white/40">
                  {service.highlights}
                </span>
                {service.homeServiceEligible && (
                  <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                    <Home className="w-2.5 h-2.5" /> At-Home
                  </span>
                )}
                {service.membershipDiscountEligible && (
                  <span className="bg-[#1c1c24]/80 backdrop-blur-md text-[#d4af37] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#d4af37]/40 flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5" /> 50% Member
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{service.durationMinutes} Minutes</span>
                </span>
                <span className="font-serif font-bold text-lg text-[#f3e5ab] drop-shadow-sm">
                  ₹{service.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#9e7d23] font-bold">
                    {service.category}
                  </span>
                  <button
                    onClick={() => onAskAIAboutService(service)}
                    className="text-[11px] text-[#9e7d23] hover:text-[#6f5615] font-semibold flex items-center gap-1 bg-[#faf6ed] hover:bg-[#f5ecda] px-2.5 py-1 rounded-full border border-[#e8ddbe] transition"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#bfa15f]" />
                    <span>Ask AI</span>
                  </button>
                </div>

                <h3 className="font-serif text-xl font-bold text-neutral-950 group-hover:text-[#9e7d23] transition">
                  {service.name}
                </h3>

                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits list */}
                <div className="pt-2 border-t border-[#ece7dc] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Curated Efficacy:
                  </span>
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-[#bfa15f] shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#ece7dc] flex items-center gap-3">
                <button
                  onClick={() => onSelectServiceToBook(service)}
                  className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-sm hover:brightness-105 transition flex items-center justify-center gap-2"
                >
                  <span>Book Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
