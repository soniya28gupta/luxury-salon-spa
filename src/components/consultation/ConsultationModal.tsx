import React, { useState } from 'react';
import { 
  X, Video, UserCheck, Sparkles, Calendar, Clock, Upload, 
  CheckCircle2, AlertCircle, ShieldAlert, FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConsultationBooking, ConsultationType, ConsultationMode, MasterStylist, Branch } from '../../types';
import { salonStore } from '../../services/salonStore';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: ConsultationType;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'Hair & Scalp Consultation'
}) => {
  const stylists = salonStore.getStylists();
  const branches = salonStore.getBranches();

  const [type, setType] = useState<ConsultationType>(defaultType);
  const [mode, setMode] = useState<ConsultationMode>('Online Video Consultation');
  const [stylist, setStylist] = useState<MasterStylist>(stylists[0]);
  const [branch, setBranch] = useState<Branch>(branches[0]);
  const [date, setDate] = useState(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().substring(0, 10);
  });
  const [timeSlot, setTimeSlot] = useState('04:00 PM');
  const [clientName, setClientName] = useState('Priya Sharma');
  const [clientPhone, setClientPhone] = useState('+91 98111 22334');
  const [clientEmail, setClientEmail] = useState('priya.s@outlook.com');
  const [concerns, setConcerns] = useState('');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);

  if (!isOpen) return null;

  const consultationFee = type === 'Hair & Scalp Consultation' ? 1500 : 1800;
  const durationMinutes = 30;

  const timeSlots = ['10:30 AM', '11:45 AM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const booking: ConsultationBooking = {
      id: `CNS-${Date.now()}`,
      code: `CNS-${Math.floor(1000 + Math.random() * 9000)}`,
      type,
      mode,
      clientName,
      clientPhone,
      clientEmail,
      concerns,
      notes,
      photoUrl: photoPreview || undefined,
      stylist,
      branch,
      date,
      timeSlot,
      fee: consultationFee,
      status: 'Scheduled',
      treatmentCreditAdjusted: true, // 100% of consultation fee is redeemable against subsequent treatment!
      createdAt: new Date().toLocaleString()
    };

    salonStore.addConsultation(booking);
    setConfirmedBooking(booking);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
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
              <Sparkles className="w-4 h-4 text-[#bfa15f]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
                {confirmedBooking ? 'Consultation Confirmed' : 'Bespoke Dermal & Scalp Consultation'}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              One-on-one session with our senior biochemists & hair directors.
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Important Non-Medical Disclaimer */}
        <div className="p-3 bg-[#faf7ef] border border-[#e8deca] rounded-2xl flex items-start gap-2.5 text-[11px] text-[#7d6118]">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#bfa15f]" />
          <div>
            <strong>Editorial & Aesthetic Wellness Notice:</strong> All consultations and AI evaluations are cosmetic and holistic wellness recommendations, and do not constitute a medical diagnosis or pharmacological treatment.
          </div>
        </div>

        {confirmedBooking ? (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#fcfaf6] to-[#f7f2e7] border border-[#e8ddbe] rounded-2xl p-6 text-center space-y-3">
              <span className="inline-block p-3 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </span>
              <h4 className="font-serif text-2xl font-bold text-neutral-950">
                Pass #{confirmedBooking.code}
              </h4>
              <p className="text-xs text-neutral-600">
                {confirmedBooking.mode === 'Online Video Consultation'
                  ? 'A secure encrypted Google Meet link has been generated and dispatched to your email.'
                  : `Please arrive 10 minutes prior at ${confirmedBooking.branch.name}.`}
              </p>

              <div className="grid grid-cols-2 gap-3 text-left pt-4 border-t border-[#e8e0cc] text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Specialist</span>
                  <p className="font-semibold text-neutral-900">{confirmedBooking.stylist.name}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Date & Time</span>
                  <p className="font-semibold text-[#8e6c15]">
                    {confirmedBooking.date} • {confirmedBooking.timeSlot}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Fee Paid</span>
                  <p className="font-semibold text-emerald-800">₹{confirmedBooking.fee}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold">Treatment Credit</span>
                  <p className="font-semibold text-[#8e6c15]">100% Redeemable on Ritual</p>
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
            {/* Consultation Type Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Select Consultation Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setType('Hair & Scalp Consultation');
                    setStylist(stylists[0]); // Laurent Mercier
                  }}
                  className={`p-3 rounded-2xl border text-left transition ${
                    type === 'Hair & Scalp Consultation'
                      ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                      : 'bg-white border-[#e8e2d4]'
                  }`}
                >
                  <span className="block font-bold text-xs text-neutral-950">Hair & Scalp Health</span>
                  <span className="block text-[11px] text-[#8e6c15] font-semibold mt-0.5">₹1,500 (30 mins)</span>
                  <span className="block text-[9px] text-neutral-500 mt-1">Density, breakage & coloring</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setType('Skin & Facial Consultation');
                    setStylist(stylists[1]); // Dr. Elena Rostova
                  }}
                  className={`p-3 rounded-2xl border text-left transition ${
                    type === 'Skin & Facial Consultation'
                      ? 'bg-[#fbf8f0] border-[#d4af37] ring-1 ring-[#d4af37]'
                      : 'bg-white border-[#e8e2d4]'
                  }`}
                >
                  <span className="block font-bold text-xs text-neutral-950">Skin & Facial Dermal</span>
                  <span className="block text-[11px] text-[#8e6c15] font-semibold mt-0.5">₹1,800 (30 mins)</span>
                  <span className="block text-[9px] text-neutral-500 mt-1">Barrier repair, pigmentation & glow</span>
                </button>
              </div>
            </div>

            {/* Mode: Video vs In-Salon */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode('Online Video Consultation')}
                  className={`p-2.5 rounded-2xl border text-xs flex items-center gap-2 transition ${
                    mode === 'Online Video Consultation'
                      ? 'bg-[#fbf8f0] border-[#d4af37] font-bold text-[#8e6c15]'
                      : 'bg-white border-[#e8e2d4]'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#bfa15f]" />
                  <span>Online Video Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('In-Salon Consultation')}
                  className={`p-2.5 rounded-2xl border text-xs flex items-center gap-2 transition ${
                    mode === 'In-Salon Consultation'
                      ? 'bg-[#fbf8f0] border-[#d4af37] font-bold text-[#8e6c15]'
                      : 'bg-white border-[#e8e2d4]'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#bfa15f]" />
                  <span>In-Sanctuary Suite</span>
                </button>
              </div>
            </div>

            {/* Specialist & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Specialist Assigned
                </label>
                <select
                  value={stylist.id}
                  onChange={(e) => {
                    const st = stylists.find((s) => s.id === e.target.value);
                    if (st) setStylist(st);
                  }}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
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
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#d4af37] outline-hidden"
                />
              </div>
            </div>

            {/* Slots */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Available Slots
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
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

            {/* Client Info & Concerns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Your Name
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
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Your Primary Concerns & Goals
              </label>
              <textarea
                rows={2}
                required
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                placeholder="Describe current issues (e.g. hair breakage, sensitivity, dry patches, acne scars)..."
                className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Optional: Upload Scalp/Skin Photo (Confidential)
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer py-2 px-4 rounded-xl border border-dashed border-[#bfa15f] bg-[#faf8f4] hover:bg-white text-xs font-semibold text-[#8e6c15] flex items-center gap-1.5 transition">
                  <Upload className="w-4 h-4" />
                  <span>Choose Photo</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {photoPreview && (
                  <div className="flex items-center gap-2">
                    <img src={photoPreview} alt="Preview" className="w-9 h-9 rounded-lg object-cover border border-[#d4af37]" />
                    <span className="text-[10px] text-neutral-500">Image attached</span>
                  </div>
                )}
              </div>
            </div>

            {/* Fee & Credit Guarantee */}
            <div className="p-3 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-neutral-900 block">Consultation Fee: ₹{consultationFee}</span>
                <span className="text-[10px] text-[#8e6c15] font-semibold">
                  100% adjustable against your next in-salon ritual
                </span>
              </div>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95"
              >
                Pay & Reserve
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

