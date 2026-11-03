import React, { useState } from 'react';
import { 
  X, Crown, Sparkles, Check, QrCode, ShieldCheck, 
  Calendar, CreditCard, CheckCircle2, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MembershipTier, ClientMembership } from '../../types';
import { salonStore } from '../../services/salonStore';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const tiers = salonStore.getMembershipTiers();
  const allServices = salonStore.getServices();

  const [selectedTier, setSelectedTier] = useState<MembershipTier>(tiers[1]); // Gold Royale default
  const [clientName, setClientName] = useState('Natasha Singhania');
  const [clientPhone, setClientPhone] = useState('+91 98200 12345');
  const [clientEmail, setClientEmail] = useState('natasha.s@luxury.com');

  const [issuedMembership, setIssuedMembership] = useState<ClientMembership | null>(null);

  if (!isOpen) return null;

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();

    const startDate = new Date().toISOString().substring(0, 10);
    const exp = new Date();
    exp.setFullYear(exp.getFullYear() + 1);
    const expiryDate = exp.toISOString().substring(0, 10);
    const memberCode = `AURA-${selectedTier.id.replace('TIER-', '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const membership: ClientMembership = {
      id: `MEM-${Date.now()}`,
      memberCode,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      clientName,
      clientPhone,
      clientEmail,
      startDate,
      expiryDate,
      qrCodeValue: `AURA:MEM:${memberCode}:${clientName.toUpperCase().replace(/\s+/g, '-')}`,
      totalSavings: 0,
      active: true
    };

    salonStore.addMembership(membership);
    setIssuedMembership(membership);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-neutral-900 my-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ece7dc]">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#bfa15f]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
                {issuedMembership ? 'Digital Sanctuary VIP Pass' : 'Sanctuary E-Membership Tiers'}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Privileged access, priority salon suites, and up to 50% benefit on curated rituals.
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {issuedMembership ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Digital Membership Card */}
            <div className={`p-6 rounded-3xl bg-gradient-to-br ${selectedTier.cardColor} text-white shadow-xl relative overflow-hidden space-y-4 border border-white/20`}>
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/80 font-bold block">
                    Aura Sanctuary • Haute Membership
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#fbfbf8] mt-1">
                    {issuedMembership.tierName}
                  </h4>
                </div>
                <Crown className="w-6 h-6 text-[#d4af37]" />
              </div>

              <div className="py-2 flex items-center justify-between border-y border-white/15 relative z-10">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-white/70 block">Member Name</span>
                  <p className="font-bold text-sm tracking-wide text-white">{issuedMembership.clientName}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-white/70 block">Pass ID</span>
                  <p className="font-mono font-bold text-sm text-[#f3e5ab]">{issuedMembership.memberCode}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-white/70 block">Valid Until</span>
                  <p className="font-semibold text-xs text-white">{issuedMembership.expiryDate}</p>
                </div>
              </div>

              {/* Dynamic QR Code representation */}
              <div className="flex items-center justify-between pt-1 relative z-10 text-xs">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <QrCode className="w-5 h-5 text-white" />
                  <span className="text-[10px] font-mono tracking-wider">{issuedMembership.memberCode}</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active & Verified
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#faf7ef] rounded-2xl border border-[#e8deca] text-xs space-y-2 text-neutral-700">
              <span className="font-bold text-neutral-900 block">How to use your E-Membership:</span>
              <p className="text-[11px] leading-relaxed">
                Enter your Pass ID (<strong>{issuedMembership.memberCode}</strong>) during online booking or present your digital QR code at reception to instantly unlock tier privileges and 50% discount on designated rituals.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="space-y-4">
            {/* Tier Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tiers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTier(t)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    selectedTier.id === t.id
                      ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                      : 'bg-white border-[#e8e2d4]'
                  }`}
                >
                  <div>
                    <span className="block font-serif font-bold text-xs text-neutral-950 truncate">{t.name}</span>
                    <span className="block text-[10px] text-[#8e6c15] font-semibold mt-0.5">{t.tagline}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#f0ebe0]">
                    <span className="font-serif font-bold text-sm text-neutral-900">₹{t.annualFee.toLocaleString()}</span>
                    <span className="text-[9px] text-neutral-400"> / year</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Tier Perks & Eligible Services */}
            <div className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-3 text-xs">
              <span className="font-bold text-neutral-900 block">
                {selectedTier.name} Privileges:
              </span>
              <ul className="space-y-1.5">
                {selectedTier.perks.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-neutral-700 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-[#bfa15f] shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-[#f0ebe0]">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Eligible Discount Rituals ({selectedTier.discountPercentage}% OFF - Admin Configured):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {allServices
                    .filter((s) => selectedTier.eligibleServiceIds.includes(s.id))
                    .map((s) => (
                      <span
                        key={s.id}
                        className="text-[10px] bg-[#faf6ed] text-[#8e6c15] font-semibold px-2 py-0.5 rounded-md border border-[#e8ddbe]"
                      >
                        {s.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Client Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>
            </div>

            <div className="p-3 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-neutral-900 block">
                  Annual Pass: ₹{selectedTier.annualFee.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Valid for 12 months • Digital QR Pass
                </span>
              </div>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95"
              >
                Enroll & Issue Card
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

