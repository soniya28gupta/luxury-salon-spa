import React, { useState, useEffect } from 'react';
import { 
  X, User, Calendar, RotateCcw, Crown, Video, Home, 
  GraduationCap, Tag, Bookmark, ShieldCheck, QrCode, 
  CheckCircle2, Clock, Trash2, ArrowRight, Heart 
} from 'lucide-react';
import { 
  Appointment, 
  ClientMembership, 
  ConsultationBooking, 
  HomeServiceBooking, 
  AcademyApplication,
  SpaService,
  MasterStylist 
} from '../../types';
import { salonStore } from '../../services/salonStore';

interface CustomerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRebook: (service: SpaService, stylist: MasterStylist) => void;
}

export const CustomerDashboardModal: React.FC<CustomerDashboardModalProps> = ({
  isOpen,
  onClose,
  onRebook
}) => {
  const [activeTab, setActiveTab] = useState<
    'appointments' | 'membership' | 'consultations' | 'homeService' | 'academy' | 'offers'
  >('appointments');

  const [appointments, setAppointments] = useState<Appointment[]>(salonStore.getAppointments());
  const [memberships, setMemberships] = useState<ClientMembership[]>(salonStore.getMemberships());
  const [consultations, setConsultations] = useState<ConsultationBooking[]>(salonStore.getConsultations());
  const [homeServices, setHomeServices] = useState<HomeServiceBooking[]>(salonStore.getHomeServices());
  const [academyApps, setAcademyApps] = useState<AcademyApplication[]>(salonStore.getAcademyApplications());
  const [offers, setOffers] = useState(salonStore.getOffers());

  useEffect(() => {
    const sync = () => {
      setAppointments(salonStore.getAppointments());
      setMemberships(salonStore.getMemberships());
      setConsultations(salonStore.getConsultations());
      setHomeServices(salonStore.getHomeServices());
      setAcademyApps(salonStore.getAcademyApplications());
      setOffers(salonStore.getOffers());
    };
    return salonStore.subscribe(sync);
  }, []);

  if (!isOpen) return null;

  const handleCancelAppointment = (id: string) => {
    if (confirm('Cancel this sanctuary reservation?')) {
      salonStore.updateAppointmentStatus(id, 'Cancelled');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-neutral-900 my-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ece7dc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fbf8f0] border border-[#e8ddbe] flex items-center justify-center text-slate-900 font-bold">
              <User className="w-5 h-5 text-[#8e6c15]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950">
                Natasha Singhania — Sanctuary Portal
              </h3>
              <p className="text-xs text-neutral-500">
                Verified Client • Gold Royale Member • +91 98200 12345
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#f0ebe0] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                : 'bg-[#faf8f4] text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>My Reservations ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('membership')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'membership'
                ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                : 'bg-[#faf8f4] text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Membership Card</span>
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'consultations'
                ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                : 'bg-[#faf8f4] text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Consultations ({consultations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('homeService')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'homeService'
                ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                : 'bg-[#faf8f4] text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home Services ({homeServices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('academy')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'academy'
                ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                : 'bg-[#faf8f4] text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academy Applications ({academyApps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'offers'
                ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                : 'bg-[#faf8f4] text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Active Perks</span>
          </button>
        </div>

        {/* Tab 1: Reservations with Rebook */}
        {activeTab === 'appointments' && (
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {appointments.length === 0 ? (
              <p className="text-center text-neutral-400 py-10 text-xs">No reservations scheduled.</p>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-[#fcfaf6] border border-[#e8e2d4] hover:border-[#d4af37] rounded-2xl p-4 space-y-2.5 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-neutral-950">
                          {apt.service?.name || 'Signature Sanctuary Ritual'}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#8e6c15] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#e8ddbe]">
                          {apt.confirmationCode}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Master Curator: <strong className="text-neutral-800">{apt.stylist?.name || 'Master Curator'}</strong> • Branch: {apt.branch?.name || 'The Penthouse Sanctuary'}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                        apt.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : apt.status === 'Completed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      {apt.status || 'Confirmed'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-neutral-600 pt-2 border-t border-[#ece7dc]">
                    <div>
                      <span className="block text-[9px] uppercase text-neutral-400 font-semibold">Date & Slot</span>
                      <span className="text-neutral-900 font-medium">{apt.date} • {apt.timeSlot}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-neutral-400 font-semibold">Duration</span>
                      <span className="text-neutral-900 font-medium">{apt.durationMinutes || apt.service?.durationMinutes || 60} mins</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-neutral-400 font-semibold">Amount Paid</span>
                      <span className="text-emerald-700 font-semibold">
                        ₹{(apt.depositAmount || apt.totalPrice || apt.service?.price || 0).toLocaleString()} ({apt.paymentOption || 'Full Payment'})
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-neutral-400 font-semibold">Channel</span>
                      <span className="text-[#8e6c15] font-medium">{apt.bookingSource || 'Website Direct'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#ece7dc]">
                    <button
                      onClick={() => {
                        onClose();
                        if (apt.service) {
                          onRebook(apt.service, apt.stylist || salonStore.getStylists()[0]);
                        }
                      }}
                      className="px-3 py-1 rounded-full bg-[#fbf8f0] border border-[#e8ddbe] text-[#8e6c15] text-[11px] font-bold hover:bg-[#f6eed6] flex items-center gap-1 transition"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Rebook Ritual</span>
                    </button>

                    {apt.status === 'Confirmed' && (
                      <button
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="text-red-600 hover:text-red-700 text-[11px] font-semibold flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Reservation</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Digital Membership Card */}
        {activeTab === 'membership' && (
          <div className="space-y-4">
            {memberships.length > 0 ? (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa820a] text-slate-950 shadow-xl space-y-4 border border-[#e8ddbe] relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-800">
                      Aura Sanctuary • Digital E-Membership
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-slate-950 mt-1">
                      {memberships[0].tierName}
                    </h4>
                  </div>
                  <Crown className="w-7 h-7 text-slate-900" />
                </div>

                <div className="py-3 flex items-center justify-between border-y border-slate-900/15">
                  <div>
                    <span className="text-[9px] uppercase text-slate-700 font-bold block">Cardholder</span>
                    <p className="font-bold text-sm text-slate-950">{memberships[0].clientName}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-700 font-bold block">Sanctuary Passcode</span>
                    <p className="font-mono font-bold text-sm text-slate-950">{memberships[0].memberCode}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-700 font-bold block">Validity</span>
                    <p className="font-semibold text-xs text-slate-950">{memberships[0].expiryDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-xl border border-white/40">
                    <QrCode className="w-5 h-5 text-slate-950" />
                    <span className="text-[10px] font-mono font-bold">{memberships[0].qrCodeValue}</span>
                  </div>
                  <span className="text-slate-900 text-xs font-bold">
                    Cumulative Savings: ₹{memberships[0].totalSavings.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-center text-neutral-400 py-6 text-xs">No active membership found.</p>
            )}

            <div className="p-4 bg-[#fcfaf6] rounded-2xl border border-[#e8e2d4] text-xs space-y-1">
              <span className="font-bold text-neutral-900 block">Active Member Privileges:</span>
              <p className="text-neutral-600 text-[11px]">
                • 50% discount on selected body waxing, hammam steam, and precision haircut rituals.
              </p>
              <p className="text-neutral-600 text-[11px]">
                • Complimentary home-service concierge dispatch within 15 km radius.
              </p>
              <p className="text-neutral-600 text-[11px]">
                • Complimentary Dom Pérignon champagne lounge access with valet service.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Consultations */}
        {activeTab === 'consultations' && (
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {consultations.map((cns) => (
              <div key={cns.id} className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-neutral-950">{cns.type}</span>
                    <span className="ml-2 text-[10px] font-mono text-[#8e6c15] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#e8ddbe]">
                      {cns.code}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {cns.status}
                  </span>
                </div>
                <div className="text-xs text-neutral-600 space-y-1">
                  <p>Mode: <strong>{cns.mode}</strong> with <strong>{cns.stylist?.name || 'Assigned Specialist'}</strong> on {cns.date} at {cns.timeSlot}</p>
                  <p className="italic text-neutral-500">Concern: "{cns.concerns}"</p>
                  {cns.recommendations && (
                    <div className="p-2 bg-white rounded-xl border border-[#e8e2d4] text-[11px] text-[#8e6c15]">
                      <strong>Specialist Guidance:</strong> {cns.recommendations}
                      {cns.followUpDate && <span className="block text-neutral-500">Follow-up: {cns.followUpDate}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Home Services Tracker */}
        {activeTab === 'homeService' && (
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {homeServices.map((hm) => (
              <div key={hm.id} className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-neutral-950">{hm.service?.name || 'Sanctuary Ritual'}</span>
                    <span className="ml-2 text-[10px] font-mono text-[#8e6c15] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#e8ddbe]">
                      {hm.code}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-[#8e6c15] bg-[#faf6ed] px-2.5 py-0.5 rounded-full border border-[#e8ddbe]">
                    {hm.dispatchStatus}
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  Address: {hm.address} ({hm.calculatedDistanceKm || 5} km from {hm.branch?.name || 'The Penthouse Sanctuary'})
                </p>
                <div className="p-2 bg-white rounded-xl border border-[#ece7dc] text-[11px] text-neutral-700 flex items-center justify-between">
                  <span>Specialist: <strong>{hm.stylist?.name || 'Assigned Specialist'}</strong></span>
                  <span>Arrival: {hm.date} • {hm.timeSlot}</span>
                  <span className="text-emerald-700 font-semibold">{hm.paymentStatus}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Academy Applications */}
        {activeTab === 'academy' && (
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {academyApps.map((app) => (
              <div key={app.id} className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-neutral-950">{app.courseTitle || 'Academy Diploma'}</span>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {app.status}
                  </span>
                </div>
                <p className="text-neutral-600">Cohort: <strong>{app.selectedBatch}</strong> • Applied: {app.appliedAt}</p>
                <p className="text-neutral-500 text-[11px]">Background: {app.backgroundExperience}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Offers */}
        {activeTab === 'offers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
            {offers.filter((o) => o.active).map((offer) => (
              <div key={offer.id} className="p-4 bg-[#faf8f4] border border-[#e8e2d4] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs bg-[#faf6ed] text-[#8e6c15] px-2 py-0.5 rounded border border-[#e8ddbe]">
                    {offer.code}
                  </span>
                  <span className="text-[10px] text-neutral-400">Valid until {offer.validTo}</span>
                </div>
                <h5 className="font-serif font-bold text-sm text-neutral-900">{offer.title}</h5>
                <p className="text-xs text-neutral-600">{offer.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

