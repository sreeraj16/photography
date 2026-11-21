import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Camera } from 'lucide-react';
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
    <section className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#080C0E] relative overflow-hidden border-t border-b border-[#E4DCD0] dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">05</span>
              <div className="h-[2px] w-12 bg-teal-500/50" />
              <span className="text-xs uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold">
                CURATED STREAM
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-slate-100 font-light">
              Signature Panoramic Stream
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 transition-all shadow-sm"
              aria-label="Scroll stream left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 transition-all shadow-sm"
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
        className="flex gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 py-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing touch-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.map((p, idx) => (
          <TiltCard
            key={p.id || idx}
            onClick={() => handleOpenPhoto(idx)}
            data-cursor="view"
            maxTilt={6}
            scale={1.02}
            className="flex-shrink-0 w-80 sm:w-96 aspect-[3/4] snap-center rounded-2xl overflow-hidden border border-[#E2DCD0] dark:border-slate-800 group shadow-md dark:shadow-2xl transition-all duration-300 hover:border-teal-500/70 cursor-pointer bg-slate-950"
          >
            <img
              src={p.url}
              alt={p.title || `Stream Photo ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Gradient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

            {/* Hover Camera Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-orbitron text-teal-300 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-3 h-3 text-teal-400" />
              <span>{p.exif_camera || "SONY G MASTER"}</span>
            </div>

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-teal-500/40 text-teal-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <Eye className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-orbitron uppercase text-teal-300 tracking-widest block mb-1">
                FRAME 00{idx + 1} • {p.exif_aperture || "f/1.4"}
              </span>
              <h4 className="text-lg font-serif text-white font-medium drop-shadow-md">
                {p.title || `Moment 00${idx + 1}`}
              </h4>
            </div>
          </TiltCard>
        ))}
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
