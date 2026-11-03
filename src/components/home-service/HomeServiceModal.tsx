import React, { useState, useEffect } from 'react';
import { 
  X, Home, MapPin, Sparkles, Calendar, Clock, CheckCircle2, 
  AlertTriangle, Navigation, ShieldCheck, ArrowRight, User 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpaService, MasterStylist, Branch, HomeServiceBooking } from '../../types';
import { salonStore } from '../../services/salonStore';

interface HomeServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeServiceModal: React.FC<HomeServiceModalProps> = ({ isOpen, onClose }) => {
  const branches = salonStore.getBranches();
  const stylists = salonStore.getStylists();
  // Filter only services marked eligible for home service!
  const homeEligibleServices = salonStore.getServices().filter((s) => s.homeServiceEligible);

  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [selectedService, setSelectedService] = useState<SpaService>(homeEligibleServices[0] || salonStore.getServices()[0]);
  const [selectedStylist, setSelectedStylist] = useState<MasterStylist>(stylists[0]);

  const [address, setAddress] = useState('Villa 12, Palm Beach Enclave, Worli Sea Face');
  const [pinCode, setPinCode] = useState('400018');
  const [clientName, setClientName] = useState('Kavita Chawla');
  const [clientPhone, setClientPhone] = useState('+91 98201 98765');
  const [clientEmail, setClientEmail] = useState('kavita.c@corp.com');

  const [date, setDate] = useState(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().substring(0, 10);
  });
  const [timeSlot, setTimeSlot] = useState('02:30 PM');
  const [paymentOption, setPaymentOption] = useState<'Paid Online' | 'Pay on Completion'>('Paid Online');

  const [radiusCheck, setRadiusCheck] = useState<{
    eligible: boolean;
    distanceKm: number;
    allowedRadiusKm: number;
    branchName: string;
  } | null>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<HomeServiceBooking | null>(null);

  useEffect(() => {
    if (pinCode.length >= 6) {
      const check = salonStore.validateHomeServiceRadius(pinCode, selectedBranch.id);
      setRadiusCheck(check);
    } else {
      setRadiusCheck(null);
    }
  }, [pinCode, selectedBranch]);

  if (!isOpen) return null;

  const timeSlots = ['10:00 AM', '12:00 PM', '02:30 PM', '04:30 PM', '06:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const check = salonStore.validateHomeServiceRadius(pinCode, selectedBranch.id);
    if (!check.eligible) {
      alert(`Location outside serviceable radius. Max radius for ${check.branchName} is ${check.allowedRadiusKm} km (estimated: ${check.distanceKm} km).`);
      return;
    }

    const booking: HomeServiceBooking = {
      id: `HMS-${Date.now()}`,
      code: `AURA-HOME-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientPhone,
      clientEmail,
      address,
      pinCode,
      calculatedDistanceKm: check.distanceKm,
      branch: selectedBranch,
      service: selectedService,
      stylist: selectedStylist,
      date,
      timeSlot,
      paymentStatus: paymentOption,
      dispatchStatus: 'Assigned',
      travelNotes: `Service kit assigned to ${selectedStylist.name}. Customer address verified within ${check.distanceKm} km.`,
      totalPrice: selectedService.price,
      createdAt: new Date().toLocaleString()
    };

    salonStore.addHomeService(booking);
    setConfirmedBooking(booking);

    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-neutral-900 my-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ece7dc]">
          <div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-[#bfa15f]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
                {confirmedBooking ? 'Home Sanctuary Dispatched' : 'Aura Sanctuary At Home'}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Haute coiffure and spa rituals brought directly to your residence.
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#fcfaf6] to-[#f7f2e7] border border-[#e8ddbe] rounded-2xl p-6 text-center space-y-3">
              <span className="inline-block p-3 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </span>
              <h4 className="font-serif text-2xl font-bold text-neutral-950">
                Dispatch Order #{confirmedBooking.code}
              </h4>
              <p className="text-xs text-neutral-600">
                Specialist <strong className="text-neutral-900">{confirmedBooking.stylist.name}</strong> has been assigned to your residence.
              </p>

              {/* Status progression bar */}
              <div className="pt-4 border-t border-[#e8e0cc]">
                <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 mb-2">
                  <span className="text-[#8e6c15]">Assigned</span>
                  <span>On the Way</span>
                  <span>Arrived</span>
                  <span>Service Started</span>
                  <span>Completed</span>
                </div>
                <div className="w-full bg-[#e8e2d4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#d4af37] h-full w-1/5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left pt-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Address</span>
                  <p className="font-semibold text-neutral-900 truncate">{confirmedBooking.address}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Distance</span>
                  <p className="font-semibold text-[#8e6c15]">{confirmedBooking.calculatedDistanceKm} km from {confirmedBooking.branch.name}</p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Branch and Location Validator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Dispatched From Branch
                </label>
                <select
                  value={selectedBranch.id}
                  onChange={(e) => {
                    const b = branches.find((br) => br.id === e.target.value);
                    if (b) setSelectedBranch(b);
                  }}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (Radius: {b.serviceRadiusKm} km)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Destination PIN Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="e.g. 400018"
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>
            </div>

            {/* Radius Validation Result */}
            {radiusCheck && (
              <div
                className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                  radiusCheck.eligible
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 shrink-0" />
                  <span>
                    Est. Distance: <strong>{radiusCheck.distanceKm} km</strong> (Branch Limit: {radiusCheck.allowedRadiusKm} km)
                  </span>
                </div>
                <span className="font-bold uppercase text-[10px]">
                  {radiusCheck.eligible ? 'Within Radius' : 'Outside 15 km'}
                </span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Full Residential Address
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Building name, apartment/villa number, street and landmark..."
                className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
              />
            </div>

            {/* Home Eligible Services */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Eligible Home Services ({homeEligibleServices.length} Rituals Available)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                {homeEligibleServices.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv)}
                    className={`p-2.5 rounded-2xl border text-left transition flex items-center justify-between ${
                      selectedService.id === srv.id
                        ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                        : 'bg-white border-[#e8e2d4]'
                    }`}
                  >
                    <div className="pr-2">
                      <span className="block font-bold text-xs text-neutral-950 truncate">{srv.name}</span>
                      <span className="block text-[10px] text-neutral-500">{srv.durationMinutes} mins</span>
                    </div>
                    <span className="font-serif font-bold text-xs text-[#8e6c15]">₹{srv.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stylist & Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Assigned Specialist
                </label>
                <select
                  value={selectedStylist.id}
                  onChange={(e) => {
                    const st = stylists.find((s) => s.id === e.target.value);
                    if (st) setSelectedStylist(st);
                  }}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                >
                  {stylists.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Service Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Arrival Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map((ts) => (
                  <button
                    key={ts}
                    type="button"
                    onClick={() => setTimeSlot(ts)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition ${
                      timeSlot === ts
                        ? 'bg-[#d4af37] text-slate-950 font-bold'
                        : 'bg-white border-[#e8e2d4] hover:border-[#bfa15f]'
                    }`}
                  >
                    {ts}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Recipient Name
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
                  Contact Mobile
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>
            </div>

            {/* Payment & Submit */}
            <div className="p-3 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-neutral-900 block">Total: ₹{selectedService.price.toLocaleString()}</span>
                <span className="text-[10px] text-neutral-500">Includes sanitized kit & travel concierge</span>
              </div>
              <button
                type="submit"
                disabled={radiusCheck ? !radiusCheck.eligible : false}
                className={`py-2.5 px-6 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-md transition ${
                  radiusCheck && !radiusCheck.eligible
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 hover:brightness-105 active:scale-95'
                }`}
              >
                Confirm Dispatch
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

