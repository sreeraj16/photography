import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function VisualStorytelling() {
  return (
    <section className="py-24 bg-dotpic-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Numeral 05 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">05</span>
            <div className="h-[1px] w-12 bg-dotpic-gold/50" />
            <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
              CINEMATIC VISUAL STORYTELLING
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
            Letterbox Master Frames
          </h2>
        </div>

        {/* 2.39:1 Anamorphic Cinema Crop Container */}
        <div className="relative aspect-cinema w-full rounded-sm overflow-hidden border border-dotpic-border group shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
            alt="Cinematic 2.39:1 Letterbox Frame"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            loading="lazy"
          />
          {/* Cinema Mask Borders (Black top and bottom letterbox bars) */}
          <div className="absolute top-0 left-0 right-0 h-4 sm:h-8 bg-black/90 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-8 bg-black/90 pointer-events-none" />

          {/* Overlay Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-end p-6 sm:p-12">
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.3em] text-dotpic-gold mb-2">
              ANAMORPHIC CROP • 2.39:1 RATIO • TAJ FALAKNUMA PALACE
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-serif text-white max-w-2xl font-light">
              "The golden light fell softly across the marble arches, suspended in timeless reverence."
            </h3>
            <div className="mt-4">
              <Link
                to="/portfolio/vikram-ananya-royal-wedding"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-dotpic-gold hover:text-white font-semibold transition-colors"
              >
                <span>Read The Story of This Frame</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
