import React from 'react';
import { Star, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { MasterStylist } from '../../types';

interface StylistGalleryProps {
  stylists: MasterStylist[];
  onSelectStylist: (stylist: MasterStylist) => void;
}

export const StylistGallery: React.FC<StylistGalleryProps> = ({ stylists, onSelectStylist }) => {
  return (
    <section id="stylists" className="py-20 px-4 bg-[#faf8f4] border-y border-[#e8e4dc]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#9e7d23]">
            Artisans of Beauty & Healing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950">
            Meet Our Master Curators
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 font-light">
            Internationally celebrated directors, biochemists, and holistic bodywork masters dedicated exclusively to your transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="group bg-white border border-[#e8e4dc] hover:border-[#d4af37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl shadow-xs"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                  <img
                    src={stylist.avatarUrl}
                    alt={stylist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-neutral-900 border border-neutral-200 shadow-sm">
                      <Star className="w-3 h-3 fill-[#c59b27] text-[#c59b27]" /> {stylist.rating} ({stylist.reviewsCount})
                    </span>
                    <span className="text-[10px] text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full font-medium">
                      {stylist.experienceYears} Yrs Exp
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-serif text-base font-bold text-neutral-900 group-hover:text-[#9e7d23] transition">
                    {stylist.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#9e7d23]">
                    {stylist.role}
                  </p>
                  <p className="text-[11px] text-neutral-600 font-light leading-relaxed line-clamp-3">
                    {stylist.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {stylist.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-[#f6f2e9] text-neutral-700 border border-[#e8e0d0]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book with Stylist */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectStylist(stylist)}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#d4af37]/60 hover:border-[#d4af37] bg-[#fdfaf2] hover:bg-[#d4af37] text-[#8e6c15] hover:text-slate-950 font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Stylist</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
