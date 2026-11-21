import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';

export function HorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const photos = dataStore.getPhotos();

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-dotpic-charcoal relative overflow-hidden border-t border-b border-dotpic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">06</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                CURATED STRIP
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-dotpic-white font-light">
              Signature Panoramic Stream
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold hover:bg-dotpic-surface transition-colors"
              aria-label="Scroll stream left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold hover:bg-dotpic-surface transition-colors"
              aria-label="Scroll stream right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Flex Track */}
      <div
        ref={scrollRef}
        data-cursor="drag"
        className="flex gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 pb-4 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing touch-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.map((p, idx) => (
          <div
            key={p.id || idx}
            className="flex-shrink-0 w-80 sm:w-96 aspect-[3/4] snap-center relative rounded-sm overflow-hidden border border-dotpic-border group"
          >
            <img
              src={p.url}
              alt={p.title || `Stream Photo ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-mono uppercase text-dotpic-gold tracking-widest block mb-1">
                {p.exif_camera || "SONY G MASTER"}
              </span>
              <h4 className="text-base font-serif text-white font-medium">
                {p.title || `Frame 00${idx + 1}`}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
