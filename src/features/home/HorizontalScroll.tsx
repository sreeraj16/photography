import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Camera, Aperture } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { TiltCard } from '../../components/ui/TiltCard';
import { Lightbox } from '../../components/common/Lightbox';

export function HorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const photos = dataStore.getPhotos();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleOpenPhoto = (idx: number) => {
    setPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section className="py-28 bg-dotpic-charcoal relative overflow-hidden border-t border-b border-dotpic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">06</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                CURATED STRIP
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Signature 35mm Panoramic Stream
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-3.5 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold hover:bg-dotpic-surface transition-all shadow-md"
              aria-label="Scroll stream left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3.5 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold hover:bg-dotpic-surface transition-all shadow-md"
              aria-label="Scroll stream right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 35mm Sprocket Perforations Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-2">
        <div className="h-3 bg-black/60 rounded-t-sm border-t border-l border-r border-white/10 flex items-center justify-between px-3 overflow-hidden select-none">
          <div className="flex gap-4">
            {[...Array(24)].map((_, i) => (
              <span key={i} className="w-2.5 h-1.5 rounded-[1px] bg-dotpic-surface border border-white/15 inline-block" />
            ))}
          </div>
          <span className="text-[8px] font-mono text-dotpic-gold tracking-widest uppercase hidden sm:inline">
            35MM FILM REEL 2026 • 24 FPS
          </span>
        </div>
      </div>

      {/* Horizontal Scrolling Flex Track with 3D Tilt Cards */}
      <div
        ref={scrollRef}
        data-cursor="drag"
        className="flex gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 py-3 snap-x snap-mandatory cursor-grab active:cursor-grabbing touch-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.map((p, idx) => (
          <TiltCard
            key={p.id || idx}
            onClick={() => handleOpenPhoto(idx)}
            data-cursor="view"
            maxTilt={7}
            scale={1.03}
            className="flex-shrink-0 w-80 sm:w-96 aspect-[3/4] snap-center rounded-xl overflow-hidden border border-dotpic-border/80 group shadow-2xl transition-colors duration-300 hover:border-dotpic-gold/60 cursor-pointer"
          >
            <img
              src={p.url}
              alt={p.title || `Stream Photo ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Film Gradient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Hover Camera Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-dotpic-gold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-3 h-3 text-dotpic-gold" />
              <span>{p.exif_camera || "SONY G MASTER"}</span>
            </div>

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-dotpic-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-mono uppercase text-dotpic-gold tracking-widest block mb-1">
                FRAME 00{idx + 1} • {p.exif_aperture || "f/1.4"}
              </span>
              <h4 className="text-lg font-serif text-white font-medium drop-shadow-md">
                {p.title || `Moment 00${idx + 1}`}
              </h4>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* 35mm Sprocket Perforations Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-2">
        <div className="h-3 bg-black/60 rounded-b-sm border-b border-l border-r border-white/10 flex items-center justify-between px-3 overflow-hidden select-none">
          <div className="flex gap-4">
            {[...Array(24)].map((_, i) => (
              <span key={i} className="w-2.5 h-1.5 rounded-[1px] bg-dotpic-surface border border-white/15 inline-block" />
            ))}
          </div>
          <span className="text-[8px] font-mono text-dotpic-muted tracking-widest uppercase hidden sm:inline">
            MASTER STILL RETOUCH • HYDERABAD
          </span>
        </div>
      </div>

      {/* Lightbox for Stream Photos */}
      <Lightbox
        photos={photos}
        initialIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
