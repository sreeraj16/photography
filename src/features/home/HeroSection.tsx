import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, ArrowDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { YouTubeModal } from '../../components/common/YouTubeModal';
import { useI18n } from '../../lib/i18n';

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  mediaUrl?: string;
  showreelUrl?: string;
}

export function HeroSection({
  headline = "CAPTURING MOMENTS. CREATING MEMORIES.",
  subheadline = "Every Frame Tells a Story. Every Moment Becomes Timeless.",
  mediaUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
  showreelUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}: HeroSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image / Cinema Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={mediaUrl}
          alt="DOTPIC Cinematic Background"
          className="w-full h-full object-cover scale-105 animate-pulse-subtle filter brightness-50 contrast-105"
        />
        {/* Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-dotpic-black/40 to-dotpic-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-dotpic-gold/40 bg-black/60 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-dotpic-gold animate-ping" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-dotpic-white font-medium">
            DOTPIC PHOTOGRAPHY • EST. 2020
          </span>
        </div>

        {/* Animated Masked Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-dotpic-white tracking-tight leading-[1.1] mb-6 uppercase">
          {headline.split('.').map((part, idx) => (
            <span key={idx} className="block">
              {idx === 1 ? (
                <span className="italic font-normal text-dotpic-gold">{part.trim()}</span>
              ) : (
                part.trim() + (part.trim() ? '.' : '')
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-dotpic-muted font-sans font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('tagline') || subheadline}
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link to="/portfolio" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              withShutterSound
            >
              {t('explorePortfolio')}
            </Button>
          </Link>

          <Link to="/book" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="gold"
              className="w-full sm:w-auto"
              withShutterSound
              icon={<Calendar className="w-4 h-4 text-dotpic-black" />}
            >
              {t('bookShoot')}
            </Button>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-dotpic-white/90 hover:text-dotpic-gold px-4 py-3 transition-colors duration-200"
            aria-label="Watch DOTPIC 2026 Showreel Film"
          >
            <span className="w-8 h-8 rounded-full border border-dotpic-gold/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-dotpic-gold/20 transition-all">
              <Play className="w-3 h-3 text-dotpic-gold fill-dotpic-gold ml-0.5" />
            </span>
            <span>{t('watchShowreel')}</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-dotpic-muted/60 hover:text-dotpic-gold transition-colors">
        <span className="text-[10px] uppercase tracking-[0.3em]">SCROLL</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>

      {/* Cinematic YouTube Showreel Modal */}
      <YouTubeModal
        videoId={showreelUrl}
        title="DOTPIC PHOTOGRAPHY • 2026 Official Cinematic Showreel"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </section>
  );
}
