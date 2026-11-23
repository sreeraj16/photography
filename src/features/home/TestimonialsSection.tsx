import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, Quote, CheckCircle2 } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { useI18n } from '../../lib/i18n';
import { ReviewModal } from '../../components/common/ReviewModal';
import { Button } from '../../components/ui/Button';

export function TestimonialsSection() {
  const { t } = useI18n();
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
    <section className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#080C0E] relative border-t border-b border-[#E4DCD0] dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">09</span>
            <div className="h-[2px] w-12 bg-teal-500/50" />
            <span className="text-xs uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold">
              {t('reviewsTag')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-slate-100 font-light">
            {t('reviewsHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-3 leading-relaxed">
            {t('reviewsDesc')}
          </p>
        </div>

        {/* Carousel Showcase Card */}
        {current && (
          <div className="relative bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 rounded-3xl p-8 sm:p-14 shadow-lg dark:shadow-2xl">
            {/* Background Quote Watermark */}
            <Quote className="absolute top-6 right-8 w-20 h-20 text-slate-900/[0.04] dark:text-white/[0.04] pointer-events-none rotate-12" />

            <div className="relative z-10">
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-[10px] font-orbitron font-semibold uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Client Shoot</span>
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-2xl font-serif text-slate-900 dark:text-slate-100 font-light italic leading-relaxed mb-10">
                "{current.quote}"
              </blockquote>

              {/* Author Info & Nav Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-[#E8E2D6] dark:border-slate-800">
                <div className="flex items-center gap-4">
                  {current.avatar_url && (
                    <img
                      src={current.avatar_url}
                      alt={current.client_name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-500/50 shadow-md"
                    />
                  )}
                  <div>
                    <h3 className="text-base sm:text-lg font-serif text-slate-900 dark:text-slate-100 font-medium">
                      {current.client_name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      {current.role_or_event} • <span className="text-teal-600 dark:text-teal-400 font-orbitron">{current.college_or_location}</span>
                    </p>
                  </div>
                </div>

                {/* Next/Prev Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 transition-all shadow-sm"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-orbitron px-2 font-bold">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 transition-all shadow-sm"
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
        <div className="mt-14 text-center">
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowReviewModal(true)}
            icon={<MessageSquarePlus className="w-4 h-4" />}
          >
            {t('leaveReview')}
          </Button>
        </div>
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
    </section>
  );
}
