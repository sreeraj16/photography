import { Link } from 'react-router-dom';
import { Calendar, Phone, Sparkles } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { useI18n } from '../../lib/i18n';
import { Button } from '../../components/ui/Button';

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#080C0E] relative overflow-hidden border-t border-[#E4DCD0] dark:border-slate-800 transition-colors duration-300">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-[10px] font-orbitron tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('ctaTag')}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-orbitron font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 uppercase">
          {t('ctaHeading1')}{' '}
          <span className="block mt-2 font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600 dark:from-teal-400 dark:via-teal-200 dark:to-teal-400 drop-shadow-[0_2px_25px_rgba(20,184,166,0.3)]">
            {t('ctaHeading2')}
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-sans leading-relaxed mb-10">
          {t('ctaDesc')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <Link to="/book" className="w-full sm:w-auto">
            <Button
              size="xl"
              variant="primary"
              className="w-full sm:w-auto px-8"
              withShutterSound
              icon={<Calendar className="w-4 h-4 text-white" />}
            >
              {t('bookShootNow')}
            </Button>
          </Link>

          <a
            href={BRAND.socials.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto px-8"
              icon={<Phone className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
            >
              {t('whatsappChat')}
            </Button>
          </a>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-8 font-orbitron tracking-wider">
          Fast response within 2 hours • WhatsApp Business: <a href={BRAND.socials.whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline">+91 6281392682</a>
        </p>
      </div>
    </section>
  );
}
