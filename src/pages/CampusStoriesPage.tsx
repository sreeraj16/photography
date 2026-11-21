import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Calendar, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { formatDate } from '../lib/utils';
import { QRCodeModal } from '../features/campus/QRCodeModal';
import { CampusEvent } from '../types/database.types';
import { TiltCard } from '../components/ui/TiltCard';

export function CampusStoriesPage() {
  const events = dataStore.getCampusEvents();
  const [selectedCollege, setSelectedCollege] = useState<string>('all');
  const [activeQrEvent, setActiveQrEvent] = useState<CampusEvent | null>(null);

  const colleges = Array.from(new Set(events.map(e => e.college_name)));

  const filtered = selectedCollege === 'all'
    ? events
    : events.filter(e => e.college_name === selectedCollege);

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-[10px] font-orbitron tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAMPUS FESTIVALS ARCHIVE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Campus Stories & Festivals
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          High-energy coverage of South India's premier technical fests, concerts, hackathons, and collegiate milestones. Scan instant QR banners to find your memories.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/campus-stories/colleges"
            className="px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-orbitron uppercase tracking-wider font-semibold shadow-md transition-all"
          >
            Partner Colleges Roster →
          </Link>

          <Link
            to="/find-my-photos"
            className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 text-xs font-orbitron uppercase tracking-wider font-medium transition-colors shadow-sm"
          >
            Find My Photos (Selfie Match)
          </Link>
        </div>
      </div>

      {/* College Filter Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 pb-6 border-b border-dotpic-border">
          <button
            onClick={() => setSelectedCollege('all')}
            className={`px-4 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
              selectedCollege === 'all'
                ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
            }`}
          >
            All Campus Fests
          </button>
          {colleges.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCollege(c)}
              className={`px-4 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
                selectedCollege === c
                  ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                  : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((event) => (
            <TiltCard
              key={event.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-2xl overflow-hidden bg-dotpic-charcoal border border-dotpic-border/80 flex flex-col justify-between hover:border-dotpic-gold/60 transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={event.cover_image_url}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 text-dotpic-gold border border-dotpic-gold/40 px-3 py-1 rounded-full text-[10px] font-mono uppercase backdrop-blur-md">
                    {event.college_name}
                  </span>

                  <button
                    onClick={() => setActiveQrEvent(event)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/80 text-white hover:text-dotpic-gold border border-white/20 transition-colors"
                    title="View & Download Event QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] text-dotpic-gold font-mono mb-2">
                    <span>{formatDate(event.event_date)}</span>
                    <span className="font-bold">{event.photo_count}+ Photos</span>
                  </div>

                  <h3 className="text-xl font-serif text-white group-hover:text-dotpic-gold transition-colors mb-2">
                    {event.title}
                  </h3>

                  <p className="text-xs text-dotpic-muted line-clamp-2 leading-relaxed mb-6 font-light">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-dotpic-surface/60 border-t border-dotpic-border flex items-center justify-between">
                <Link
                  to={`/campus-stories/${event.slug}`}
                  className="text-xs uppercase tracking-wider text-dotpic-white group-hover:text-dotpic-gold font-semibold flex items-center gap-1"
                >
                  <span>Open Event Photos</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => setActiveQrEvent(event)}
                  className="text-xs text-dotpic-gold hover:underline flex items-center gap-1 font-mono font-bold"
                >
                  <QrCode className="w-3.5 h-3.5" /> Get QR
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {activeQrEvent && (
        <QRCodeModal
          eventTitle={activeQrEvent.title}
          collegeName={activeQrEvent.college_name}
          eventUrl={`${window.location.origin}/campus-stories/${activeQrEvent.slug}`}
          isOpen={true}
          onClose={() => setActiveQrEvent(null)}
        />
      )}
    </div>
  );
}
