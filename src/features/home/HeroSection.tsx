import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Calendar, Sparkles, Award, Camera, Users, ArrowRight } from 'lucide-react';
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

  const statsRibbon = [
    { label: t('statWeddings'), val: "150+", icon: <Sparkles className="w-4 h-4 text-teal-400" /> },
    { label: t('statFestivals'), val: "45+", icon: <Users className="w-4 h-4 text-teal-300" /> },
    { label: t('statFrames'), val: "500K+", icon: <Camera className="w-4 h-4 text-teal-400" /> },
    { label: t('statSatisfaction'), val: "5.0 ★", icon: <Award className="w-4 h-4 text-teal-300" /> },
  ];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src={mediaUrl}
          alt="DOTPIC Cinematic Visual"
          className="w-full h-full object-cover filter brightness-[0.38] contrast-105"
        />

        {/* Cinematic Vignette & Ambient Teal Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.12)_0%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 pb-12 my-auto w-full">
        {/* Brand Category Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/40 bg-black/60 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-orbitron uppercase tracking-[0.25em] text-teal-300 font-semibold">
            {t('heroEyebrow')}
          </span>
        </motion.div>

        {/* Animated Editorial Headline in Orbitron + Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase"
        >
          {t('heroHeadline1')}{' '}
          <span className="block mt-2 font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-teal-400 drop-shadow-[0_2px_25px_rgba(20,184,166,0.5)]">
            {t('heroHeadline2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 font-sans font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('heroTagline') || subheadline}
        </motion.p>

        {/* Clean, High-impact Teal Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
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
              variant="primary"
              className="w-full sm:w-auto px-8"
              withShutterSound
              icon={<Calendar className="w-4 h-4 text-white" />}
            >
              {t('bookShoot')}
            </Button>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            data-cursor="play"
            className="group inline-flex items-center justify-center gap-3 font-orbitron text-xs uppercase tracking-widest text-slate-200 hover:text-teal-400 px-4 py-3 transition-colors duration-200"
            aria-label="Watch DOTPIC Cinematic Showreel Film"
          >
            <span className="w-10 h-10 rounded-full border border-teal-500/50 bg-teal-950/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500/20 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              <Play className="w-4 h-4 text-teal-400 fill-teal-400 ml-0.5" />
            </span>
            <span className="font-semibold">{t('watchShowreel')}</span>
          </button>
        </motion.div>
      </div>

      {/* Symmetrical Credibility Anchors Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 pt-2"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          {statsRibbon.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/5">
              <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <span className="text-base sm:text-lg font-orbitron font-bold text-white block leading-tight">
                  {stat.val}
                </span>
                <span className="text-[10px] uppercase font-sans tracking-wider text-slate-300 block">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* YouTube Showreel Modal */}
      <YouTubeModal
        videoId={showreelUrl}
        title="DOTPIC PHOTOGRAPHY • 2026 Official Cinematic Showreel"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </section>
  );
}
