import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, QrCode, Calendar, Users, Sparkles } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { formatDate } from '../../lib/utils';
import { TiltCard } from '../../components/ui/TiltCard';
import { QRCodeModal } from '../campus/QRCodeModal';
import { CampusEvent } from '../../types/database.types';

export function CampusStoriesPreview() {
  const events = dataStore.getCampusEvents().slice(0, 3);
  const [activeQrEvent, setActiveQrEvent] = useState<CampusEvent | null>(null);

  return (
    <section className="py-28 bg-gradient-to-b from-dotpic-charcoal via-dotpic-black to-dotpic-charcoal relative border-t border-b border-dotpic-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Numeral 04 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">04</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MAJOR BRAND PILLAR</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Campus Stories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-dotpic-muted max-w-md font-light leading-relaxed">
            South India's most trusted college fest photography team. Covering collegiate concerts, technical symposiums, and cultural milestones with instant QR access for students.
          </p>
        </div>

        {/* Featured Campus Event Cards (Grid of 3) with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <TiltCard
              key={event.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-xl overflow-hidden bg-dotpic-black border border-dotpic-border/80 shadow-2xl transition-colors duration-500 hover:border-dotpic-gold/60 flex flex-col justify-between group"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-dotpic-surface">
                <img
                  src={event.cover_image_url}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-black/25 to-transparent opacity-85" />
                
                {/* College Badge */}
                <span className="absolute top-4 left-4 bg-dotpic-black/80 backdrop-blur-md border border-dotpic-gold/40 text-dotpic-gold px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded-full shadow-lg">
                  {event.college_name}
                </span>

                {/* QR Code Indicator */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveQrEvent(event);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:text-dotpic-gold hover:border-dotpic-gold transition-colors"
                  title="View Event QR Banner"
                >
                  <QrCode className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-dotpic-muted font-mono">
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Calendar className="w-3 h-3 text-dotpic-gold" />
                    {formatDate(event.event_date)}
                  </span>
                  <span className="flex items-center gap-1.5 text-dotpic-gold font-bold">
                    <Users className="w-3 h-3 text-dotpic-gold" />
                    {event.photo_count}+ Photos
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-dotpic-gold font-mono block mb-1">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-serif text-dotpic-white group-hover:text-dotpic-gold transition-colors duration-300 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-dotpic-muted line-clamp-2 leading-relaxed mb-6 font-light">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-dotpic-border/60 flex items-center justify-between">
                  <Link
                    to={`/campus-stories/${event.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-dotpic-white group-hover:text-dotpic-gold font-medium transition-colors"
                  >
                    <span>View Event Gallery</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    to={`/book?category=Campus+Stories&college=${encodeURIComponent(event.college_name)}`}
                    className="text-xs text-dotpic-gold hover:text-white font-mono uppercase tracking-wider font-semibold"
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
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-dotpic-gold hover:text-white font-semibold border-b border-dotpic-gold/40 pb-1.5 transition-colors"
          >
            <span>Explore All 45+ College Festival Archives</span>
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
