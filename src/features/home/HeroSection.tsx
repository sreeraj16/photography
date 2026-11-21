import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Calendar, ArrowDown, Film, Grid3X3, Sparkles, Award, Camera, Users } from 'lucide-react';
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
  const [showGrid, setShowGrid] = useState(false);
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

  const statsRibbon = [
    { label: "Royal Weddings", val: "150+", icon: <Sparkles className="w-3.5 h-3.5 text-dotpic-gold" /> },
    { label: "Campus Festivals", val: "45+", icon: <Users className="w-3.5 h-3.5 text-amber-300" /> },
    { label: "Frames Delivered", val: "500K+", icon: <Camera className="w-3.5 h-3.5 text-dotpic-gold" /> },
    { label: "Client Satisfaction", val: "5.0 ★", icon: <Award className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <section className={`relative min-h-[100svh] flex flex-col justify-between overflow-hidden transition-all duration-700 ${
      isLetterbox ? 'py-12 sm:py-16' : ''
    }`}>
      {/* Cinematic Letterbox Top & Bottom Black Bars */}
      <div
        className={`fixed top-0 left-0 right-0 bg-black z-30 transition-all duration-700 pointer-events-none ${
          isLetterbox ? 'h-12 sm:h-20 border-b border-white/10' : 'h-0'
        }`}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black z-30 transition-all duration-700 pointer-events-none ${
          isLetterbox ? 'h-12 sm:h-20 border-t border-white/10' : 'h-0'
        }`}
      />

      {/* Background Image / Cinema Layer */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          src={mediaUrl}
          alt="DOTPIC Cinematic Background"
          className="w-full h-full object-cover filter brightness-[0.4] contrast-105"
        />

        {/* Ambient Film Light Leak & Vignette Overlays */}
        <div className="absolute inset-0 light-leak-effect opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-dotpic-black/45 to-dotpic-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.9)_100%)]" />
      </div>

      {/* Optional Rule-of-Thirds Grid Overlay */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-15 pointer-events-none grid grid-cols-3 grid-rows-3 select-none"
          >
            <div className="border-r border-b border-dotpic-gold/20" />
            <div className="border-r border-b border-dotpic-gold/20" />
            <div className="border-b border-dotpic-gold/20" />
            <div className="border-r border-b border-dotpic-gold/20" />
            <div className="border-r border-b border-dotpic-gold/20" />
            <div className="border-b border-dotpic-gold/20" />
            <div className="border-r border-dotpic-gold/20" />
            <div className="border-r border-dotpic-gold/20" />
            <div />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Viewfinder HUD Elements */}
      <div className="absolute inset-4 sm:inset-8 z-20 pointer-events-none flex flex-col justify-between select-none">
        {/* Top Viewfinder Bar */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-dotpic-gold/80">
          <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-white font-bold">REC</span>
            <span className="text-white/60">4K HDR • 24 FPS</span>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            <span>ISO 800</span>
            <span className="text-white/30">•</span>
            <span>1/250s</span>
            <span className="text-white/30">•</span>
            <span>f/1.4 GM</span>
            <span className="text-emerald-400 font-bold">RAW 16-BIT</span>
          </div>
        </div>

        {/* Framing Corner Brackets */}
        <div className="w-full h-full relative pointer-events-none">
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-dotpic-gold/50" />
          <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-dotpic-gold/50" />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-dotpic-gold/50" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-dotpic-gold/50" />
        </div>

        {/* Bottom Viewfinder Controls */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-dotpic-gold/80">
          <div className="bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            <span className="text-white/70">TC </span>
            <span className="text-dotpic-gold font-bold">{timecode}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Rule of Thirds Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded-full border transition-all ${
                showGrid
                  ? 'bg-dotpic-gold text-black border-dotpic-gold font-bold shadow-[0_0_15px_rgba(201,169,110,0.5)]'
                  : 'bg-black/60 border-white/15 text-dotpic-muted hover:text-white'
              }`}
              title="Toggle Rule-of-Thirds Grid Overlay"
              aria-label="Toggle camera grid"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>

            {/* 2.39:1 Cinema Toggle */}
            <button
              onClick={() => setIsLetterbox(!isLetterbox)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 text-[10px] text-dotpic-muted hover:text-dotpic-gold hover:border-dotpic-gold transition-colors backdrop-blur-md"
              title="Toggle 2.39:1 Cinema Letterbox Mode"
              data-cursor="hover"
            >
              <Film className="w-3 h-3 text-dotpic-gold" />
              <span className="hidden sm:inline font-sans uppercase tracking-widest">{isLetterbox ? 'Exit 2.39:1' : 'Cinema 2.39:1'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-16 my-auto">
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dotpic-gold/40 bg-black/70 backdrop-blur-xl mb-6 shadow-[0_0_25px_rgba(201,169,110,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-dotpic-gold animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-dotpic-white font-medium">
            DOTPIC PHOTOGRAPHY • CINEMATIC STORYTELLERS
          </span>
        </motion.div>

        {/* Animated Editorial Headline with High Contrast Styling */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-dotpic-white tracking-tight leading-[1.08] mb-6 uppercase break-words"
        >
          CAPTURING MOMENTS.{' '}
          <span className="block mt-1 sm:mt-2 italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-dotpic-gold via-[#F0DEC0] to-dotpic-gold drop-shadow-[0_2px_20px_rgba(201,169,110,0.4)]">
            CREATING MEMORIES.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-xs sm:text-base md:text-lg text-dotpic-muted font-sans font-light tracking-wider max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('tagline') || subheadline}
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link to="/portfolio" className="w-full sm:w-auto" data-cursor="explore">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8"
              withShutterSound
            >
              {t('explorePortfolio')}
            </Button>
          </Link>

          <Link to="/book" className="w-full sm:w-auto" data-cursor="hover">
            <Button
              size="lg"
              variant="gold"
              className="w-full sm:w-auto px-8"
              withShutterSound
              icon={<Calendar className="w-4 h-4 text-dotpic-black" />}
            >
              {t('bookShoot')}
            </Button>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            data-cursor="play"
            className="group inline-flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-dotpic-white/90 hover:text-dotpic-gold px-4 py-3 transition-colors duration-200"
            aria-label="Watch DOTPIC 2026 Showreel Film"
          >
            <span className="w-10 h-10 rounded-full border border-dotpic-gold/60 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-dotpic-gold/20 transition-all shadow-[0_0_20px_rgba(201,169,110,0.3)]">
              <Play className="w-4 h-4 text-dotpic-gold fill-dotpic-gold ml-0.5" />
            </span>
            <span className="font-semibold">{t('watchShowreel')}</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Prestigious Credibility Anchors Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 pt-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          {statsRibbon.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-8 h-8 rounded-full bg-dotpic-gold/10 flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <span className="text-base sm:text-lg font-serif font-bold text-white block leading-tight">
                  {stat.val}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-dotpic-muted block">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

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
