import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, User, CheckCircle2, ShieldCheck, Download, 
  Sparkles, MapPin, CreditCard, ChevronRight, AlertTriangle, ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpaService, MasterStylist, Branch, Appointment } from '../../types';
import { salonStore } from '../../services/salonStore';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: SpaService | null;
  selectedStylist: MasterStylist | null;
  onConfirmBooking: (apt: Appointment) => void;
  isGoogleReserveFlow?: boolean;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedService: initialService,
  selectedStylist: initialStylist,
  onConfirmBooking,
  isGoogleReserveFlow = false
}) => {
  const branches = salonStore.getBranches();
  const services = salonStore.getServices();
  const stylists = salonStore.getStylists();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [selectedService, setSelectedService] = useState<SpaService>(initialService || services[0]);
  const [selectedStylist, setSelectedStylist] = useState<MasterStylist | null>(initialStylist || null);
  const [isAnyProfessional, setIsAnyProfessional] = useState(false);

  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().substring(0, 10);
  });

  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM');
  const [paymentOption, setPaymentOption] = useState<'Full Payment' | 'Booking Deposit'>('Booking Deposit');
  const [couponCode, setCouponCode] = useState('');
  const [memberCode, setMemberCode] = useState('');
  const [discountMsg, setDiscountMsg] = useState<string | null>(null);

  const [clientName, setClientName] = useState('Natasha Singhania');
  const [clientPhone, setClientPhone] = useState('+91 98200 12345');
  const [clientEmail, setClientEmail] = useState('natasha.s@luxury.com');
  const [notes, setNotes] = useState('');

  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean; conflictReason?: string }[]>([]);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);

  // Sync initial props when opened
  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialStylist) {
      setSelectedStylist(initialStylist);
      setIsAnyProfessional(false);
    } else {
      setSelectedStylist(stylists[0]);
    }
    setStep(1);
    setConfirmedApt(null);
    setBookingError(null);
  }, [isOpen, initialService, initialStylist]);

  // Recalculate dynamic slots whenever date, stylist, branch, or service changes
  useEffect(() => {
    const effectiveStylistId = isAnyProfessional ? stylists[0].id : (selectedStylist?.id || stylists[0].id);
    const slots = salonStore.getAvailableTimeSlots(
      date,
      effectiveStylistId,
      selectedService.durationMinutes,
      selectedBranch.id
    );
    setAvailableSlots(slots);

    // Pick first available slot if currently selected is unavailable
    const currentValid = slots.find((s) => s.time === timeSlot && s.available);
    if (!currentValid) {
      const firstOpen = slots.find((s) => s.available);
      if (firstOpen) setTimeSlot(firstOpen.time);
    }
  }, [date, selectedStylist, isAnyProfessional, selectedBranch, selectedService]);

  if (!isOpen) return null;

  // Pricing calculations
  const discountCalculation = salonStore.calculateDiscounts(
    selectedService.price,
    selectedService.id,
    couponCode,
    memberCode
  );

  const finalPrice = discountCalculation.finalPrice;
  const depositAmount = Math.round(finalPrice * 0.25); // 25% Configurable deposit
  const chargeAmount = paymentOption === 'Booking Deposit' ? depositAmount : finalPrice;

  const handleApplyCoupon = () => {
    if (discountCalculation.couponDiscount > 0) {
      setDiscountMsg(`Code applied: ₹${discountCalculation.couponDiscount} discount saved!`);
    } else {
      setDiscountMsg('Invalid or expired promotional code for this ritual.');
    }
  };

  const handleApplyMemberCode = () => {
    if (discountCalculation.membershipDiscount > 0) {
      setDiscountMsg(`Sanctuary Pass verified: ₹${discountCalculation.membershipDiscount} discount applied!`);
    } else {
      setDiscountMsg('Member code verified, but this ritual is not eligible for tier discount.');
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    const effectiveStylist = isAnyProfessional ? stylists[0] : (selectedStylist || stylists[0]);

    // Anti-double-booking strict revalidation
    const validation = salonStore.validateSlotAvailability(
      date,
      timeSlot,
      selectedService.durationMinutes,
      effectiveStylist.id
    );

    if (!validation.valid) {
      setBookingError(validation.error || 'Conflict detected. Please pick another slot.');
      return;
    }

    const apt: Appointment = {
      id: `APT-${Date.now()}`,
      confirmationCode: `AURA-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientPhone,
      clientEmail,
      service: selectedService,
      stylist: effectiveStylist,
      branch: selectedBranch,
      date,
      timeSlot,
      durationMinutes: selectedService.durationMinutes,
      totalPrice: finalPrice,
      depositAmount: chargeAmount,
      paymentOption,
      paymentStatus: paymentOption === 'Full Payment' ? 'Paid' : 'Deposit Paid',
      status: 'Confirmed',
      notes,
      bookingSource: isGoogleReserveFlow ? 'Reserve with Google' : 'Website Direct',
      createdAt: new Date().toLocaleString(),
      membershipDiscountApplied: discountCalculation.membershipDiscount,
      couponDiscountApplied: discountCalculation.couponDiscount
    };

    salonStore.addAppointment(apt);
    setConfirmedApt(apt);
    onConfirmBooking(apt);

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

  const handleDownloadICS = () => {
    if (!confirmedApt) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aura Sanctuary//EN
BEGIN:VEVENT
SUMMARY:${confirmedApt.service.name} with ${confirmedApt.stylist.name}
DESCRIPTION:Sanctuary Reservation at Aura. Code: ${confirmedApt.confirmationCode}. Branch: ${confirmedApt.branch.name}
LOCATION:${confirmedApt.branch.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aura_Reservation_${confirmedApt.confirmationCode}.ics`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-neutral-900 my-6 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ece7dc]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#bfa15f]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
                {confirmedApt ? 'Sanctuary Reservation Confirmed' : 'Reserve Elysian Sanctuary Ritual'}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {confirmedApt
                ? 'Your VIP Passcode has been generated and synchronized with our concierge desk.'
                : 'Orchestrate your wellness experience with real-time master curator availability.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed View */}
        {confirmedApt ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#fcfaf6] to-[#f7f2e7] border border-[#e8ddbe] rounded-2xl p-6 text-center space-y-3 shadow-inner">
              <span className="inline-block p-3 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </span>
              <h4 className="font-serif text-2xl font-bold text-neutral-950">
                Elysian Pass #{confirmedApt.confirmationCode}
              </h4>
              <p className="text-xs text-neutral-600 max-w-md mx-auto">
                Reserved for <strong className="text-neutral-900">{confirmedApt.clientName}</strong> at{' '}
                <strong className="text-neutral-900">{confirmedApt.branch?.name || 'Sanctuary'}</strong>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-4 border-t border-[#e8e0cc] text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Ritual</span>
                  <p className="font-semibold text-neutral-900 truncate">{confirmedApt.service?.name || 'Sanctuary Ritual'}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Curator</span>
                  <p className="font-semibold text-neutral-900">{confirmedApt.stylist?.name || 'Master Curator'}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Date & Time</span>
                  <p className="font-semibold text-[#8e6c15]">
                    {confirmedApt.date} • {confirmedApt.timeSlot}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Payment</span>
                  <p className="font-semibold text-emerald-800">
                    {confirmedApt.paymentOption === 'Booking Deposit'
                      ? `₹${confirmedApt.depositAmount} Deposit Paid`
                      : `₹${confirmedApt.totalPrice} Paid`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadICS}
                className="flex-1 py-3 px-4 rounded-full border border-[#d5ccbc] hover:border-[#bfa15f] bg-white text-neutral-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Download className="w-4 h-4 text-[#bfa15f]" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Booking Wizard */
          <div className="space-y-6">
            {/* Step indicator */}
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 border-b border-[#f0ebe0] pb-3">
              <span className={step >= 1 ? 'text-[#8e6c15] font-bold' : ''}>1. Service & Branch</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
              <span className={step >= 2 ? 'text-[#8e6c15] font-bold' : ''}>2. Curator & Schedule</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
              <span className={step >= 3 ? 'text-[#8e6c15] font-bold' : ''}>3. Guest Details</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
              <span className={step >= 4 ? 'text-[#8e6c15] font-bold' : ''}>4. Payment</span>
            </div>

            {bookingError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{bookingError}</span>
              </div>
            )}

            {/* STEP 1: Service & Branch Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Select Sanctuary Branch
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {branches.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBranch(b)}
                        className={`p-3 rounded-2xl text-left border transition ${
                          selectedBranch.id === b.id
                            ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                            : 'bg-white border-[#e8e2d4] hover:border-[#bfa15f]'
                        }`}
                      >
                        <span className="block font-serif font-bold text-xs text-neutral-950 truncate">
                          {b.name}
                        </span>
                        <span className="block text-[10px] text-neutral-500 mt-0.5">{b.city}</span>
                        <span className="block text-[9px] text-[#8e6c15] font-semibold mt-1">
                          Radius: {b.serviceRadiusKm} km
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Select Ritual or Treatment
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s)}
                        className={`p-3 rounded-2xl text-left border transition flex items-center justify-between ${
                          selectedService.id === s.id
                            ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                            : 'bg-white border-[#e8e2d4] hover:border-[#bfa15f]'
                        }`}
                      >
                        <div className="pr-2">
                          <span className="block font-bold text-xs text-neutral-950 truncate">{s.name}</span>
                          <span className="block text-[10px] text-neutral-500">{s.category} • {s.durationMinutes} mins</span>
                        </div>
                        <span className="font-serif font-bold text-xs text-[#8e6c15]">₹{s.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:brightness-105"
                  >
                    Continue to Schedule
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Professional & Dynamic Slot Picker */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Master Curator / Specialist
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAnyProfessional(true);
                        setSelectedStylist(null);
                      }}
                      className={`p-2.5 rounded-2xl text-center border text-xs transition ${
                        isAnyProfessional
                          ? 'bg-[#fbf8f0] border-[#d4af37] font-bold text-[#8e6c15]'
                          : 'bg-white border-[#e8e2d4]'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 mx-auto mb-1 text-[#bfa15f]" />
                      <span className="block text-[11px]">Any Available</span>
                    </button>

                    {stylists.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setIsAnyProfessional(false);
                          setSelectedStylist(st);
                        }}
                        className={`p-2 rounded-2xl text-center border transition ${
                          !isAnyProfessional && selectedStylist?.id === st.id
                            ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                            : 'bg-white border-[#e8e2d4]'
                        }`}
                      >
                        <img
                          src={st.avatarUrl}
                          alt={st.name}
                          className="w-8 h-8 rounded-full mx-auto object-cover mb-1 border border-[#e8ddbe]"
                        />
                        <span className="block font-bold text-[10px] text-neutral-900 truncate">{st.name}</span>
                        <span className="block text-[9px] text-[#8e6c15]">★ {st.rating}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().substring(0, 10)}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Duration & Price
                    </label>
                    <div className="p-2 bg-[#faf6ed] rounded-xl border border-[#e8ddbe] text-xs flex items-center justify-between">
                      <span className="text-neutral-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#bfa15f]" />
                        {selectedService.durationMinutes} Minutes
                      </span>
                      <span className="font-serif font-bold text-[#8e6c15]">
                        ₹{selectedService.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Available Time Slots (Real-Time Availability)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setTimeSlot(slot.time)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold border transition ${
                          slot.time === timeSlot && slot.available
                            ? 'bg-[#d4af37] text-slate-950 font-bold shadow-sm'
                            : slot.available
                            ? 'bg-white text-neutral-800 border-[#e8e2d4] hover:border-[#bfa15f]'
                            : 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-60'
                        }`}
                        title={slot.conflictReason || 'Available'}
                      >
                        {slot.time}
                        {!slot.available && (
                          <span className="block text-[8px] text-neutral-400 truncate">Booked</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2 px-4 rounded-full text-xs font-bold text-neutral-500 hover:text-black flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:brightness-105"
                  >
                    Continue to Guest Details
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Guest Details & Notes */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Full Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
                      placeholder="e.g. Natasha Singhania"
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
                      className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
                      placeholder="+91 98200 12345"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address (For Calendar Sync & Pass)
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
                    placeholder="natasha.s@luxury.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Special Requests & Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
                    placeholder="e.g. Prefer quiet suite, organic botanical tea, champagne lounge..."
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2 px-4 rounded-full text-xs font-bold text-neutral-500 hover:text-black flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:brightness-105"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Discounts, Deposit vs Full, and Final Confirmation */}
            {step === 4 && (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                {/* Coupon & Member code inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#faf7ef] rounded-2xl border border-[#e8deca]">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                      Promotional Coupon
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g. FIRSTGLOW"
                        className="flex-1 bg-white border border-[#ded5c2] rounded-lg px-2.5 py-1 text-xs uppercase outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3 py-1 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-[#8e6c15]"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                      Sanctuary Member ID
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={memberCode}
                        onChange={(e) => setMemberCode(e.target.value.toUpperCase())}
                        placeholder="e.g. AURA-GOLD-7842"
                        className="flex-1 bg-white border border-[#ded5c2] rounded-lg px-2.5 py-1 text-xs uppercase outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={handleApplyMemberCode}
                        className="px-3 py-1 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-[#8e6c15]"
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  {discountMsg && (
                    <div className="col-span-2 text-[11px] text-[#8e6c15] font-semibold">
                      {discountMsg}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Base Ritual Fee ({selectedService.name}):</span>
                    <span>₹{selectedService.price.toLocaleString()}</span>
                  </div>
                  {discountCalculation.membershipDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Sanctuary Member Benefit:</span>
                      <span>-₹{discountCalculation.membershipDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  {discountCalculation.couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Coupon Discount:</span>
                      <span>-₹{discountCalculation.couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-neutral-950 pt-2 border-t border-[#ece7dc]">
                    <span>Total Service Amount:</span>
                    <span className="font-serif text-[#8e6c15]">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Deposit Option */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentOption('Booking Deposit')}
                      className={`p-3 rounded-2xl border text-left transition ${
                        paymentOption === 'Booking Deposit'
                          ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                          : 'bg-white border-[#e8e2d4]'
                      }`}
                    >
                      <span className="block font-bold text-xs text-neutral-950">25% Booking Deposit</span>
                      <span className="block text-[11px] text-[#8e6c15] font-semibold mt-0.5">
                        ₹{depositAmount.toLocaleString()} Now
                      </span>
                      <span className="block text-[9px] text-neutral-400 mt-1">Balance payable at salon</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentOption('Full Payment')}
                      className={`p-3 rounded-2xl border text-left transition ${
                        paymentOption === 'Full Payment'
                          ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                          : 'bg-white border-[#e8e2d4]'
                      }`}
                    >
                      <span className="block font-bold text-xs text-neutral-950">Full Payment (100%)</span>
                      <span className="block text-[11px] text-[#8e6c15] font-semibold mt-0.5">
                        ₹{finalPrice.toLocaleString()} Total
                      </span>
                      <span className="block text-[9px] text-emerald-700 mt-1">Fast checkout at sanctuary</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-2 px-4 rounded-full text-xs font-bold text-neutral-500 hover:text-black flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <button
                    type="submit"
                    className="py-3 px-8 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-md hover:brightness-105 active:scale-95 transition"
                  >
                    Confirm & Reserve (Pay ₹{chargeAmount.toLocaleString()})
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
