import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, QrCode, Download, Instagram, Youtube, Calendar, MapPin, Eye, Share2 } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { formatDate } from '../lib/utils';
import { BRAND } from '../lib/constants';
import { QRCodeModal } from '../features/campus/QRCodeModal';
import { Lightbox } from '../components/common/Lightbox';
import { ShareModal } from '../components/common/ShareModal';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';

export function CampusEventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = dataStore.getCampusEventBySlug(slug || '') || dataStore.getCampusEvents()[0];
  const photos = dataStore.getPhotos(); // Representative student pictures

  const [qrOpen, setQrOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleOpenPhoto = (idx: number) => {
    setPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link
          to="/campus-stories"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-dotpic-muted hover:text-dotpic-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campus Stories</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQrOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-dotpic-surface border border-dotpic-gold/40 text-dotpic-gold hover:bg-dotpic-gold hover:text-dotpic-black text-xs font-semibold transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Event QR Banner</span>
          </button>

          <button
            onClick={() => setShareOpen(true)}
            className="p-2 rounded bg-dotpic-surface border border-dotpic-border text-dotpic-muted hover:text-white"
            title="Share Event"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/9] sm:aspect-cinema rounded-sm overflow-hidden border border-dotpic-border shadow-2xl">
          <img
            src={event.cover_image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 max-w-2xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-2">
              {event.college_name} • {event.category.toUpperCase()}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-light mb-3">
              {event.title}
            </h1>
            <p className="text-xs sm:text-sm text-dotpic-muted leading-relaxed font-light mb-4">
              {event.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-dotpic-gold">
              <span>{formatDate(event.event_date)}</span>
              <span>•</span>
              <span>{event.photo_count} Student Portraits & Stage Frames</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Tag Callouts (Section 12.1 Requirement) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-6 rounded-sm bg-dotpic-charcoal border border-dotpic-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-serif text-white">Share Your Campus Story</h4>
            <p className="text-xs text-dotpic-muted">Tag @_dotpic_ in your reels & photos to be featured on our official Instagram wall.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BRAND.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-pink-950/30 border border-pink-500/40 text-pink-300 text-xs hover:border-pink-500 font-semibold transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Tag @_dotpic_</span>
            </a>

            <a
              href={BRAND.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-red-950/30 border border-red-500/40 text-red-300 text-xs hover:border-red-500 font-semibold transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>Watch Fest Highlights</span>
            </a>
          </div>
        </div>
      </div>

      {/* Student Portraits Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-serif text-white">Event Photographs</h3>
            <p className="text-xs text-dotpic-muted">Download policy: <strong className="text-dotpic-gold uppercase">{event.download_policy}</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((p, idx) => (
            <TiltCard
              key={p.id || idx}
              onClick={() => handleOpenPhoto(idx)}
              data-cursor="view"
              maxTilt={7}
              scale={1.03}
              className="group relative aspect-square rounded-xl overflow-hidden border border-dotpic-border/80 bg-dotpic-surface cursor-pointer hover:border-dotpic-gold/60 transition-all shadow-md"
            >
              <img
                src={p.url}
                alt={p.title || "Student Portrait"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-black/80 text-dotpic-gold border border-white/20">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
                <span className="text-xs text-white truncate font-medium">
                  {p.title || `Moment 00${idx + 1}`}
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Modals */}
      {qrOpen && (
        <QRCodeModal
          eventTitle={event.title}
          collegeName={event.college_name}
          eventUrl={window.location.href}
          isOpen={true}
          onClose={() => setQrOpen(false)}
        />
      )}

      <ShareModal
        title={event.title}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      <Lightbox
        photos={photos}
        initialIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
