import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, X, Calendar, Clock, CheckCircle2, 
  Volume2, VolumeX, ShieldCheck, User, Star, ArrowRight, ShieldAlert, Home, Tag 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpaService, MasterStylist, Appointment } from '../../types';
import { salonStore } from '../../services/salonStore';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedService?: SpaService;
  recommendedStylist?: MasterStylist;
  suggestedSlots?: string[];
  isBookingStep?: boolean;
}

interface AIBookingConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (apt: Appointment) => void;
  initialServiceContext?: SpaService | null;
}

export const AIBookingConcierge: React.FC<AIBookingConciergeProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed,
  initialServiceContext
}) => {
  const allServices = salonStore.getServices();
  const allStylists = salonStore.getStylists();
  const branches = salonStore.getBranches();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Bonjour! I am your Aura AI Salon & Aesthetic Concierge. How may I orchestrate your wellness journey today? Ask me about treatments for oily skin or damaged hair, compare Keratin vs. Smoothening, query services under ₹1,500, or explore Salon-at-Home rituals."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedService, setSelectedService] = useState<SpaService | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<MasterStylist | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 11:30 AM');
  const [clientName, setClientName] = useState('Natasha Singhania');
  const [clientPhone, setClientPhone] = useState('+91 98200 12345');
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialServiceContext) {
      handleUserQuery(`Tell me about ${initialServiceContext.name}`);
    }
  }, [initialServiceContext]);

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.substring(0, 180));
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  const handleUserQuery = (query: string) => {
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let replyText = '';
      let recService: SpaService = allServices[0];
      let recStylist: MasterStylist = allStylists[1];
      let showBookingCard = true;

      // 1. Treatment Comparison: Keratin vs. Smoothening
      if (q.includes('keratin') && (q.includes('smoothen') || q.includes('difference') || q.includes('vs'))) {
        recService = allServices.find((s) => s.id === 'SRV-007') || allServices[1];
        recStylist = allStylists[0]; // Laurent Mercier
        replyText = "Keratin reconstruction infuses hydrolyzed amino acids and silk proteins into the cortex to rebuild damaged cuticle bonds, eliminating frizz while preserving your natural hair volume and bounce. In contrast, traditional chemical smoothening breaks disulfide bonds permanently to flatten the hair pin-straight. We strongly recommend our Keratin Protein Reconstruction (₹6,800) for silky restorative movement without harsh chemical thinning.";
      }
      // 2. Budget Queries: "under ₹1500" or "under 2000"
      else if (q.includes('under') || q.includes('budget') || q.includes('1500') || q.includes('cheap') || q.includes('affordable')) {
        const affordable = allServices.find((s) => s.price <= 2000) || allServices[5];
        recService = affordable;
        recStylist = allStylists[0];
        replyText = `For accessible luxury, I recommend our ${affordable.name} priced at ₹${affordable.price.toLocaleString()} (${affordable.durationMinutes} mins). It includes custom scalp analysis, clarifying scrub wash, artisanal scissor sculpting, and a French finishing blowout.`;
      }
      // 3. Home Service Queries: "available at home", "home service"
      else if (q.includes('home') || q.includes('at home') || q.includes('doorstep') || q.includes('travel')) {
        const homeSrv = allServices.find((s) => s.homeServiceEligible && s.price < 5000) || allServices[0];
        recService = homeSrv;
        recStylist = allStylists[1];
        replyText = `Our Salon-at-Home concierge delivers sterilized private rituals directly to your residence within a 15 km branch radius. Popular home rituals include the ${homeSrv.name} (₹${homeSrv.price.toLocaleString()}), Hydra-Infusion Facials, and Swedish Aromatherapy.`;
      }
      // 4. Skin concerns: "oily skin", "facial", "acne", "pores"
      else if (q.includes('oily') || q.includes('acne') || q.includes('skin') || q.includes('pores') || q.includes('facial')) {
        const skinSrv = allServices.find((s) => s.id === 'SRV-009') || allServices[0];
        recService = skinSrv;
        recStylist = allStylists[1]; // Dr. Elena
        replyText = `For oily, congested, or combination skin, our Hydra-Infusion Botanical Oxygen Facial (₹${skinSrv.price.toLocaleString()}) with Dr. Elena Rostova is ideal. It employs spiral vacuum dermal extraction to clear sebum from pores followed by oxygenated peptide infusion for radiant, shine-free hydration.`;
      }
      // 5. Damaged Hair / Breakage
      else if (q.includes('damaged') || q.includes('breakage') || q.includes('frizz') || q.includes('hair')) {
        const hairSrv = allServices.find((s) => s.id === 'SRV-002') || allServices[1];
        recService = hairSrv;
        recStylist = allStylists[0];
        replyText = `For damaged or heat-compromised hair, Creative Director Laurent Mercier recommends the ${hairSrv.name} (₹${hairSrv.price.toLocaleString()}) featuring Kérastase Chronologiste caviar beads that reconstruct hair lipid barriers from root to tip.`;
      }
      // 6. Stress / Massage / Spa
      else if (q.includes('stress') || q.includes('massage') || q.includes('spa') || q.includes('fatigue') || q.includes('stone')) {
        const spaSrv = allServices.find((s) => s.id === 'SRV-004') || allServices[3];
        recService = spaSrv;
        recStylist = allStylists[2]; // Somsri
        replyText = `To dissolve deep somatic stress, our ${spaSrv.name} (₹${spaSrv.price.toLocaleString()}) with Grand Master Somsri Phan places heated basalt volcanic stones along energy meridians to melt chronic muscle tension.`;
      }
      // Default recommendation: 24K Gold Facial
      else {
        recService = allServices[0];
        recStylist = allStylists[1];
        replyText = `Our flagship ${allServices[0].name} (₹${allServices[0].price.toLocaleString()}, 90 mins) with Lead Dermal Biochemist Dr. Elena Rostova uses pure 24-karat gold leaf and bio-placenta peptides to stimulate collagen and deliver an unmistakable red-carpet glow.`;
      }

      setSelectedService(recService);
      setSelectedStylist(recStylist);

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        recommendedService: recService,
        recommendedStylist: recStylist,
        suggestedSlots: ['Tomorrow, 11:30 AM', 'Tomorrow, 03:00 PM', 'Saturday, 05:00 PM'],
        isBookingStep: showBookingCard
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
      speakText(replyText);
    }, 800);
  };

  const handleConfirmBookingFromAI = () => {
    if (!selectedService || !selectedStylist) return;

    const newApt: Appointment = {
      id: `APT-${Date.now()}`,
      confirmationCode: `AURA-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientPhone,
      clientEmail: `${clientName.toLowerCase().replace(/\s+/g, '.')}@luxury.com`,
      service: selectedService,
      stylist: selectedStylist,
      branch: branches[0],
      date: selectedSlot.includes('Saturday') ? '2026-11-07' : '2026-11-05',
      timeSlot: selectedSlot.split(',')[1]?.trim() || '11:30 AM',
      durationMinutes: selectedService.durationMinutes,
      totalPrice: selectedService.price,
      depositAmount: selectedService.price,
      paymentOption: 'Full Payment',
      paymentStatus: 'Paid',
      status: 'Confirmed',
      notes: 'Consulted and reserved via Autonomous Aura AI Concierge.',
      bookingSource: 'AI Concierge',
      createdAt: new Date().toLocaleString()
    };

    salonStore.addAppointment(newApt);
    setBookingSuccess(newApt);
    onBookingConfirmed(newApt);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-2xl w-full h-[650px] flex flex-col shadow-2xl text-neutral-900 my-6 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ece7dc] flex items-center justify-between bg-[#faf8f4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#aa820a] flex items-center justify-center shadow-md text-slate-950 font-bold">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-950">
                  Aura AI Concierge & Stylist Advisor
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-neutral-500">
                Connected to live treatment catalogue, master curator rosters & 15 km home dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-full border text-xs transition ${
                voiceEnabled
                  ? 'bg-[#d4af37] text-slate-950 border-[#d4af37]'
                  : 'bg-white text-neutral-400 border-[#e8e2d4] hover:text-black'
              }`}
              title="Toggle Spoken Voice Synthesis"
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-black rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Non-Medical Disclaimer Banner */}
        <div className="px-4 py-2 bg-[#fcf9f2] border-b border-[#ece7dc] text-[10px] text-[#8e6c15] flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[#bfa15f]" />
          <span>
            <strong>Beauty Disclaimer:</strong> AI recommendations are cosmetic wellness guidance and do not substitute medical diagnostics.
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-neutral-950 text-white rounded-br-xs shadow-xs'
                    : 'bg-[#faf8f4] text-neutral-800 border border-[#e8e2d4] rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>

              {/* Service Recommendation Card with Real Price and Duration */}
              {msg.recommendedService && msg.recommendedStylist && msg.isBookingStep && !bookingSuccess && (
                <div className="w-full max-w-[92%] sm:max-w-[85%] bg-gradient-to-br from-[#fcfaf6] to-[#f7f2e7] border border-[#e8ddbe] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e6c15]">
                        Recommended Ritual • {msg.recommendedService.category}
                      </span>
                      <h4 className="font-serif font-bold text-base text-neutral-950 mt-0.5">
                        {msg.recommendedService.name}
                      </h4>
                      <p className="text-xs text-neutral-500 flex items-center gap-2 mt-1">
                        <span>★ 5.0 (Curated by {msg.recommendedStylist.name})</span>
                        <span>•</span>
                        <span>{msg.recommendedService.durationMinutes} Mins</span>
                      </p>
                    </div>
                    <span className="font-serif font-bold text-lg text-[#8e6c15]">
                      ₹{msg.recommendedService.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Slot selector */}
                  {msg.suggestedSlots && (
                    <div className="space-y-1.5 pt-2 border-t border-[#e8e0cc]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                        Available Curator Time Slots:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {msg.suggestedSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition text-center truncate ${
                              selectedSlot === slot
                                ? 'bg-[#d4af37] text-slate-950 font-bold border-[#d4af37]'
                                : 'bg-white border-[#e8e2d4] text-neutral-700 hover:border-[#bfa15f]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleConfirmBookingFromAI}
                    className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Reserve (₹{msg.recommendedService.price.toLocaleString()})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-neutral-400 italic py-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#d4af37]" />
              <span>Aura Concierge analyzing skin/hair diagnostics and master curator rosters...</span>
            </div>
          )}

          {bookingSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 text-center text-emerald-900 animate-fadeIn">
              <CheckCircle2 className="w-7 h-7 mx-auto text-emerald-600" />
              <h5 className="font-serif font-bold text-base">
                Pass #{bookingSuccess.confirmationCode} Confirmed
              </h5>
              <p>
                Reserved <strong>{bookingSuccess.service.name}</strong> with <strong>{bookingSuccess.stylist.name}</strong> on {bookingSuccess.date} at {bookingSuccess.timeSlot}. Synced with Reception desk.
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions Strip */}
        <div className="px-4 py-2 bg-[#faf8f4] border-t border-[#ece7dc] flex items-center gap-2 overflow-x-auto text-[11px]">
          <button
            onClick={() => handleUserQuery('Which facial is suitable for oily skin?')}
            className="px-2.5 py-1 rounded-full bg-white border border-[#ded5c2] hover:border-[#bfa15f] text-neutral-700 whitespace-nowrap transition"
          >
            Oily skin facial?
          </button>
          <button
            onClick={() => handleUserQuery('What is the difference between keratin and smoothening?')}
            className="px-2.5 py-1 rounded-full bg-white border border-[#ded5c2] hover:border-[#bfa15f] text-neutral-700 whitespace-nowrap transition"
          >
            Keratin vs Smoothening?
          </button>
          <button
            onClick={() => handleUserQuery('What can I book under ₹1500?')}
            className="px-2.5 py-1 rounded-full bg-white border border-[#ded5c2] hover:border-[#bfa15f] text-neutral-700 whitespace-nowrap transition"
          >
            Services under ₹1500?
          </button>
          <button
            onClick={() => handleUserQuery('Which services are available at home?')}
            className="px-2.5 py-1 rounded-full bg-white border border-[#ded5c2] hover:border-[#bfa15f] text-neutral-700 whitespace-nowrap transition"
          >
            Salon at Home rituals?
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#ece7dc] bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUserQuery(inputText)}
            placeholder="Ask about treatments, pricing, hair damage, or home service..."
            className="flex-1 bg-[#faf8f4] border border-[#e2d8c3] rounded-full px-4 py-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-[#d4af37] outline-hidden"
          />
          <button
            onClick={() => handleUserQuery(inputText)}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-bold disabled:opacity-40 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
