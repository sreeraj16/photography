import { useState } from 'react';
import { Star, MessageSquarePlus, Quote, CheckCircle2 } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { ReviewModal } from '../components/common/ReviewModal';
import { Button } from '../components/ui/Button';

export function TestimonialsPage() {
  const testimonials = dataStore.getTestimonials(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          CLIENT EXPERIENCES
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Words of Love & Trust
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-xl mx-auto leading-relaxed">
          Unfiltered feedback from couples, college fest conveners, and commercial brand partners across India.
        </p>

        <div className="mt-8">
          <Button
            variant="gold"
            size="md"
            onClick={() => setShowReviewModal(true)}
            icon={<MessageSquarePlus className="w-4 h-4 text-dotpic-black" />}
          >
            Leave Your Testimonial
          </Button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-8 flex flex-col justify-between shadow-xl hover:border-dotpic-gold/50 transition-colors relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-dotpic-surface/60 pointer-events-none" />

              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-sm font-serif text-white italic leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-dotpic-border/60">
                {t.avatar_url && (
                  <img
                    src={t.avatar_url}
                    alt={t.client_name}
                    className="w-10 h-10 rounded-full object-cover border border-dotpic-gold/30"
                  />
                )}
                <div>
                  <h4 className="text-sm font-serif text-white font-medium flex items-center gap-1.5">
                    <span>{t.client_name}</span>
                    <span title="Verified Client">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  </h4>
                  <p className="text-[11px] text-dotpic-muted">
                    {t.role_or_event} • {t.college_or_location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
    </div>
  );
}
