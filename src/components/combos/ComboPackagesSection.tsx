import React from 'react';
import { Sparkles, Clock, Check, ArrowRight, Tag } from 'lucide-react';
import { ComboPackage, SpaService } from '../../types';
import { salonStore } from '../../services/salonStore';

interface ComboPackagesSectionProps {
  onBookCombo: (combo: ComboPackage) => void;
}

export const ComboPackagesSection: React.FC<ComboPackagesSectionProps> = ({ onBookCombo }) => {
  const combos = salonStore.getComboPackages();
  const allServices = salonStore.getServices();

  return (
    <section id="combos" className="py-20 px-4 max-w-7xl mx-auto bg-[#faf8f4] border-y border-[#ece7dc]">
      <div className="text-center space-y-3 mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#9e7d23] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#bfa15f]" />
          Synergistic Ritual Suites
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950">
          Curated Elysian Combo Packages
        </h2>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 font-light">
          Harmoniously paired treatments formulated for holistic transformation with curated ceremonial savings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {combos.map((combo) => {
          const includedServices = allServices.filter((s) => combo.includedServiceIds.includes(s.id));

          return (
            <div
              key={combo.id}
              className="bg-white border border-[#e8e2d4] hover:border-[#d4af37] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={combo.imageUrl}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md text-[#d4af37] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#d4af37]/40 uppercase tracking-wider">
                  {combo.badge}
                </span>
                <span className="absolute bottom-3 left-3 bg-[#d4af37] text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Tag className="w-3 h-3" />
                  Save ₹{combo.savings.toLocaleString()}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-base text-neutral-950 leading-snug">
                    {combo.name}
                  </h3>
                  <p className="text-[11px] text-[#8e6c15] font-semibold">{combo.tagline}</p>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {combo.description}
                  </p>

                  <div className="pt-2 border-t border-[#f0ebe0] space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Included Rituals:
                    </span>
                    {includedServices.map((srv) => (
                      <div key={srv.id} className="text-xs text-neutral-700 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#bfa15f] shrink-0" />
                        <span className="truncate">{srv.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ece7dc] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#bfa15f]" />
                      {combo.totalDurationMinutes} Mins
                    </span>
                    <div className="text-right">
                      <span className="line-through text-neutral-400 text-[11px] mr-1.5">
                        ₹{combo.originalPrice.toLocaleString()}
                      </span>
                      <span className="font-serif font-bold text-base text-[#8e6c15]">
                        ₹{combo.offerPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookCombo(combo)}
                    className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xs hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve Combo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

