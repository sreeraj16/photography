import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Calendar, ArrowDown, Film, Disc } from 'lucide-react';
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
  const [isLetterbox, setIsLetterbox] = useState(false);
  const [timecode, setTimecode] = useState("00:24:16:08");
  const { t } = useI18n();

  // Simulated running camera timecode
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor(now.getMilliseconds() / 40)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative min-h-[100svh] flex items-center justify-center overflow-hidden transition-all duration-700 ${
      isLetterbox ? 'py-12 sm:py-16' : ''
    }`}>
      {/* Cinematic Letterbox Top & Bottom Black Bars */}
      <div
        className={`fixed top-0 left-0 right-0 bg-black z-30 transition-all duration-700 pointer-events-none ${
          isLetterbox ? 'h-10 sm:h-16 border-b border-white/10' : 'h-0'
        }`}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black z-30 transition-all duration-700 pointer-events-none ${
          isLetterbox ? 'h-10 sm:h-16 border-t border-white/10' : 'h-0'
        }`}
      />

      {/* Background Image / Cinema Layer */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src={mediaUrl}
          alt="DOTPIC Cinematic Background"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-105"
        />

        {/* Ambient Film Light Leak & Vignette Overlays */}
        <div className="absolute inset-0 light-leak-effect opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-dotpic-black/40 to-dotpic-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_100%)]" />
      </div>

      {/* Camera Viewfinder HUD Elements (Desktop & Tablet) */}
      <div className="absolute inset-4 sm:inset-8 z-20 pointer-events-none flex flex-col justify-between select-none">
        {/* Top Viewfinder Bar */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-dotpic-gold/80">
          <div className="flex items-center gap-2 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-white font-bold">REC</span>
            <span className="text-white/60">4K HDR • 24 FPS</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 bg-black/50 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
            <span>ISO 800</span>
            <span>•</span>
            <span>1/250s</span>
            <span>•</span>
            <span>f/1.4</span>
            <span className="text-emerald-400">RAW</span>
          </div>
        </div>

        {/* Framing Corner Brackets */}
        <div className="w-full h-full relative pointer-events-none">
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-dotpic-gold/40" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-dotpic-gold/40" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-dotpic-gold/40" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-dotpic-gold/40" />
        </div>

        {/* Bottom Viewfinder Bar */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-dotpic-gold/80">
          <div className="bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
            <span className="text-white/70">TC </span>
            <span className="text-dotpic-gold font-bold">{timecode}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* 2.39:1 Anamorphic Toggle Button */}
            <button
              onClick={() => setIsLetterbox(!isLetterbox)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-white/15 text-[10px] text-dotpic-muted hover:text-dotpic-gold transition-colors"
              title="Toggle 2.39:1 Cinema Letterbox Mode"
              data-cursor="hover"
            >
              <Film className="w-3 h-3 text-dotpic-gold" />
              <span className="hidden sm:inline">{isLetterbox ? 'Exit 2.39:1' : 'Cinema 2.39:1'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-dotpic-gold/50 bg-black/70 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(201,169,110,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-dotpic-gold animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-dotpic-white font-medium">
            DOTPIC PHOTOGRAPHY • HYDERABAD & WORLDWIDE
          </span>
        </motion.div>

        {/* Animated Masked Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-dotpic-white tracking-tight leading-[1.1] mb-6 uppercase break-words"
        >
          {headline.split('.').map((part, idx) => (
            <span key={idx} className="block">
              {idx === 1 ? (
                <span className="italic font-normal text-dotpic-gold drop-shadow-[0_0_25px_rgba(201,169,110,0.3)]">
                  {part.trim()}
                </span>
              ) : (
                part.trim() + (part.trim() ? '.' : '')
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs sm:text-base md:text-lg text-dotpic-muted font-sans font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('tagline') || subheadline}
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5"
        >
          <Link to="/portfolio" className="w-full sm:w-auto" data-cursor="explore">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-7"
              withShutterSound
            >
              {t('explorePortfolio')}
            </Button>
          </Link>

          <Link to="/book" className="w-full sm:w-auto" data-cursor="hover">
            <Button
              size="lg"
              variant="gold"
              className="w-full sm:w-auto px-7 shadow-[0_0_25px_rgba(201,169,110,0.35)]"
              withShutterSound
              icon={<Calendar className="w-4 h-4 text-dotpic-black" />}
            >
              {t('bookShoot')}
            </Button>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            data-cursor="play"
            className="group inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-dotpic-white/90 hover:text-dotpic-gold px-4 py-3 transition-colors duration-200"
            aria-label="Watch DOTPIC 2026 Showreel Film"
          >
            <span className="w-9 h-9 rounded-full border border-dotpic-gold/50 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-dotpic-gold/20 transition-all shadow-md">
              <Play className="w-3.5 h-3.5 text-dotpic-gold fill-dotpic-gold ml-0.5" />
            </span>
            <span className="font-semibold">{t('watchShowreel')}</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-dotpic-muted/60 hover:text-dotpic-gold transition-colors pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.35em] font-mono">SCROLL</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-dotpic-gold" />
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
