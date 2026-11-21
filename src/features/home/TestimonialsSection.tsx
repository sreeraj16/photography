import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, Quote } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { ReviewModal } from '../../components/common/ReviewModal';

export function TestimonialsSection() {
  const testimonials = dataStore.getTestimonials(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="py-24 bg-dotpic-charcoal relative border-t border-b border-dotpic-border overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Numeral 10 */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">10</span>
            <div className="h-[1px] w-12 bg-dotpic-gold/50" />
            <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
              KUDOS & VOICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
            Words of Love
          </h2>
          <p className="text-xs sm:text-sm text-dotpic-muted font-light mt-3 leading-relaxed">
            Stories shared by our wedding couples, university conveners, and commercial collaborators.
          </p>
        </div>

        {/* Carousel Showcase Card */}
        {current && (
          <div className="relative bg-dotpic-black border border-dotpic-border/80 rounded-sm p-8 sm:p-14 shadow-2xl">
            {/* Background Quote Watermark */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-dotpic-surface/60 pointer-events-none rotate-12" />

            <div className="relative z-10">
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-2xl font-serif text-dotpic-white font-light italic leading-relaxed mb-8">
                "{current.quote}"
              </blockquote>

              {/* Author Info & Nav Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-dotpic-border/60">
                <div className="flex items-center gap-4">
                  {current.avatar_url && (
                    <img
                      src={current.avatar_url}
                      alt={current.client_name}
                      className="w-12 h-12 rounded-full object-cover border border-dotpic-gold/40"
                    />
                  )}
                  <div>
                    <h3 className="text-sm sm:text-base font-serif text-white font-medium">
                      {current.client_name}
                    </h3>
                    <p className="text-xs text-dotpic-muted">
                      {current.role_or_event} • {current.college_or_location}
                    </p>
                  </div>
                </div>

                {/* Next/Prev Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-dotpic-gold font-mono px-2">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Review CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-dotpic-gold hover:text-dotpic-goldLight font-semibold border border-dotpic-gold/30 hover:border-dotpic-gold px-5 py-2.5 rounded-sm transition-all duration-300 hover:bg-dotpic-gold/5"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Have You Worked With DOTPIC? Leave a Review</span>
          </button>
        </div>
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
    </section>
  );
}
