import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, QrCode, Calendar, Users, Sparkles } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { useI18n } from '../../lib/i18n';
import { formatDate } from '../../lib/utils';
import { TiltCard } from '../../components/ui/TiltCard';
import { QRCodeModal } from '../campus/QRCodeModal';
import { CampusEvent } from '../../types/database.types';

export function CampusStoriesPreview() {
  const { t } = useI18n();
  const events = dataStore.getCampusEvents().slice(0, 3);
  const [activeQrEvent, setActiveQrEvent] = useState<CampusEvent | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-[#F5F1E8] dark:bg-[#0B1014] relative border-t border-b border-[#E4DCD0] dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">04</span>
              <div className="h-[2px] w-12 bg-teal-500/50" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-[10px] font-orbitron tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('campusTag')}</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-slate-100 font-light">
              {t('campusHeading')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md font-sans leading-relaxed">
            {t('campusDesc')}
          </p>
        </div>

        {/* Featured Campus Event Cards (Grid of 3) with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <TiltCard
              key={event.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.05)] dark:shadow-2xl transition-all duration-300 hover:border-teal-500/60 flex flex-col justify-between group"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={event.cover_image_url}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* College Badge */}
                <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-teal-500/40 text-teal-300 px-3 py-1 text-[10px] uppercase font-orbitron tracking-wider rounded-full shadow-lg">
                  {event.college_name}
                </span>

                {/* QR Code Indicator */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveQrEvent(event);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:text-teal-400 hover:border-teal-400 transition-colors"
                  title="View Event QR Banner"
                >
                  <QrCode className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-orbitron">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Calendar className="w-3 h-3 text-teal-400" />
                    {formatDate(event.event_date)}
                  </span>
                  <span className="flex items-center gap-1.5 text-teal-300 font-bold">
                    <Users className="w-3 h-3 text-teal-400" />
                    {event.photo_count}+ Photos
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-400 font-orbitron block mb-1">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-serif text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-6 font-sans">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D6] dark:border-slate-800 flex items-center justify-between">
                  <Link
                    to={`/campus-stories/${event.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase font-orbitron tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 font-semibold transition-colors"
                  >
                    <span>View Event Gallery</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    to={`/book?category=Campus+Stories&college=${encodeURIComponent(event.college_name)}`}
                    className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-orbitron uppercase tracking-wider font-semibold"
                  >
                    Book Fest →
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* View All Campus Stories CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/campus-stories"
            className="inline-flex items-center gap-2 text-xs uppercase font-orbitron tracking-[0.2em] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold border-b-2 border-teal-500/50 pb-1.5 transition-colors"
          >
            <span>{t('exploreAllCampuses')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* QR Banner Modal */}
      {activeQrEvent && (
        <QRCodeModal
          eventTitle={activeQrEvent.title}
          collegeName={activeQrEvent.college_name}
          eventUrl={`${window.location.origin}/campus-stories/${activeQrEvent.slug}`}
          isOpen={true}
          onClose={() => setActiveQrEvent(null)}
        />
      )}
    </section>
  );
}
