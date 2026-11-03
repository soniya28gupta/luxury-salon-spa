import React, { useState } from 'react';
import { 
  Star, MapPin, Clock, Phone, Globe, ShieldCheck, 
  Share2, Navigation, CheckCircle2, MessageSquare, ExternalLink, CalendarCheck 
} from 'lucide-react';
import { GOOGLE_REVIEWS } from '../../data/salonData';
import { GoogleReview } from '../../types';

interface GoogleBusinessWidgetProps {
  onDirectGoogleBook: () => void;
}

export const GoogleBusinessWidget: React.FC<GoogleBusinessWidgetProps> = ({ onDirectGoogleBook }) => {
  const [reviews, setReviews] = useState<GoogleReview[]>(GOOGLE_REVIEWS);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;
    const rev: GoogleReview = {
      id: `REV-${Date.now()}`,
      author: newAuthor,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating: newRating,
      timeAgo: 'Just now',
      content: newContent,
      verifiedBooking: true,
      serviceReviewed: '24K Gold Cellular Renewal Facial'
    };
    setReviews([rev, ...reviews]);
    setShowAddReviewModal(false);
    setNewAuthor('');
    setNewContent('');
  };

  return (
    <section id="google-profile" className="py-20 px-4 max-w-7xl mx-auto bg-white">
      <div className="space-y-3 text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#9e7d23]">
          Reserve with Google Integration
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950">
          Google Business Profile & Live Reviews
        </h2>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 font-light">
          Connected seamlessly with Google Maps, Google Assistant, and Google Calendar for frictionless instant appointment reservations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Official Google Business Listing Card (Left 1 Col) */}
        <div className="bg-[#fdfcf9] border border-[#e8e4dc] rounded-3xl p-6 shadow-lg space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Google Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ece7dc]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center font-bold text-xs">
                  <span className="text-[#4285F4]">G</span>
                </div>
                <span className="text-xs font-bold text-neutral-800">Google Business Profile</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Listing
              </span>
            </div>

            {/* Business Info */}
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950">
                Aura Sanctuary — Luxury Spa & Haute Coiffure
              </h3>
              <p className="text-xs text-[#9e7d23] font-semibold mt-0.5">
                Luxury Day Spa & Hair Salon • ₹₹₹₹
              </p>
            </div>

            {/* Star Rating Block */}
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#ece7dc] shadow-xs">
              <span className="font-serif font-black text-3xl text-[#9e7d23]">4.98</span>
              <div className="space-y-0.5">
                <div className="flex text-[#c59b27]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c59b27]" />
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500">Based on 842 verified Google reviews</p>
              </div>
            </div>

            {/* Quick Details */}
            <div className="space-y-2.5 text-xs text-neutral-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#bfa15f] shrink-0 mt-0.5" />
                <span>The Penthouse Sanctuary, 28 Crescent Road, High Street District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#bfa15f] shrink-0" />
                <span>Open Daily: 9:00 AM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#bfa15f] shrink-0" />
                <span>+91 11 4982 7700 (Direct VIP Line)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-semibold">Reserve with Google Enabled</span>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="space-y-2 pt-4 border-t border-[#ece7dc]">
            <button
              onClick={onDirectGoogleBook}
              className="w-full py-3 bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs tracking-wider uppercase rounded-2xl shadow-md flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              <span>Book Online via Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-center text-neutral-500">
              Instant Google Calendar confirmation with zero booking fees
            </p>
          </div>
        </div>

        {/* Live Customer Reviews Carousel / Stream (Right 2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-lg text-neutral-950">
              Recent Verified Client Experiences
            </h4>
            <button
              onClick={() => setShowAddReviewModal(true)}
              className="px-3.5 py-1.5 rounded-xl border border-[#dcd6c8] hover:border-[#bfa15f] text-neutral-700 hover:text-black bg-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#bfa15f]" />
              <span>Review on Google</span>
            </button>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#e8e4dc] rounded-2xl p-4.5 space-y-2.5 hover:border-[#d4af37] transition shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-9 h-9 rounded-full object-cover border border-[#e8e4dc]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 text-xs">{rev.author}</span>
                        {rev.verifiedBooking && (
                          <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            <ShieldCheck className="w-2.5 h-2.5" /> Verified Client
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400">{rev.timeAgo}</span>
                    </div>
                  </div>

                  <div className="flex text-[#c59b27]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c59b27]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-neutral-700 font-light leading-relaxed">
                  "{rev.content}"
                </p>

                <div className="text-[10px] text-[#8e6c15] bg-[#fbf9f4] px-2.5 py-1 rounded-lg border border-[#ece5d5] inline-block font-semibold">
                  Ritual Experience: {rev.serviceReviewed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-neutral-900">
            <h3 className="font-serif text-lg font-bold text-neutral-950">Write a Google Review</h3>
            <p className="text-xs text-neutral-500">Share your impressions of Aura Sanctuary.</p>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Priya Nair"
                  className="w-full bg-[#fcfaf6] border border-neutral-300 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 text-[#c59b27]"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-[#c59b27]' : 'text-neutral-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Review Details</label>
                <textarea
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your treatment experience, ambiance, and therapist..."
                  className="w-full bg-[#fcfaf6] border border-neutral-300 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ece7dc]">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-black font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-slate-950 font-bold rounded-xl shadow-sm"
                >
                  Post Review to Google
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
