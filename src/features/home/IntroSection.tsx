import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { useI18n } from '../../lib/i18n';
import { TiltCard } from '../../components/ui/TiltCard';

export function IntroSection() {
  const { t } = useI18n();

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#080C0E] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Bokeh */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">01</span>
              <div className="h-[2px] w-12 bg-teal-500/50" />
              <span className="text-xs uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold">
                {t('philosophyTag')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-slate-100 leading-[1.15] font-light">
              {t('philosophyHeading1')}{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 dark:from-teal-400 dark:via-teal-200 dark:to-teal-400 font-normal">
                {t('philosophyHeading2')}
              </span>{' '}
              {t('philosophyHeading3')}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              {t('philosophyDesc1')}
            </p>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
              {t('philosophyDesc2')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase font-orbitron tracking-[0.2em] text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold group transition-colors"
              >
                <span>{t('readStory')}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href={BRAND.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase font-orbitron tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {t('instaFrames')}
              </a>
            </div>
          </div>

          {/* Right 3D Tilt Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <TiltCard
              maxTilt={7}
              scale={1.02}
              className="rounded-2xl overflow-hidden border border-[#E2DCD0] dark:border-slate-800 shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group bg-white dark:bg-slate-900"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop"
                  alt="DOTPIC Editorial Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                
                {/* Editorial Camera Lens Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-orbitron text-teal-400">
                  <Camera className="w-3 h-3 text-teal-400" />
                  <span>NATURAL LIGHT PORTRAITURE</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-serif text-lg block leading-snug">
                    Authentic Grace & Human Radiance
                  </span>
                  <span className="text-teal-300 font-orbitron text-[10px] uppercase tracking-wider block mt-0.5">
                    Hyderabad Studio Archives
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
