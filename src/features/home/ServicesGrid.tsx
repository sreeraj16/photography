import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Disc } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../lib/constants';
import { TiltCard } from '../../components/ui/TiltCard';

export function ServicesGrid() {
  return (
    <section className="py-28 bg-dotpic-charcoal relative border-t border-b border-dotpic-border overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-dotpic-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Large Editorial Numeral 02 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">02</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                CURATED DISCIPLINES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Signature Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-dotpic-muted max-w-md font-light leading-relaxed">
            Every genre demands distinct creative direction, lighting ratios, and narrative pacing. Explore our dedicated disciplines.
          </p>
        </div>

        {/* Services Grid with 3D Interactive Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICE_CATEGORIES.map((cat, idx) => (
            <TiltCard
              key={cat.id}
              maxTilt={6}
              scale={1.02}
              data-cursor="explore"
              className="rounded-xl overflow-hidden bg-dotpic-black border border-dotpic-border/80 shadow-2xl transition-colors duration-500 hover:border-dotpic-gold/60 flex flex-col justify-between group"
            >
              {/* Image Container with 4:3 Aspect Ratio, Zoom & Iris Rings */}
              <div className="relative aspect-[4/3] overflow-hidden bg-dotpic-surface">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-105"
                  loading="lazy"
                />
                
                {/* Gradient Cinema Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-dotpic-black/30 to-transparent opacity-85" />

                {/* Rotating Lens Aperture Iris Ring on Hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-dotpic-gold group-hover:rotate-180 transition-transform duration-700">
                  <Disc className="w-4 h-4 opacity-75" />
                </div>

                {/* Index Numeral Pill */}
                <span className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest text-dotpic-gold/90 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-md">
                  0{idx + 1}
                </span>

                <div className="absolute bottom-3 left-5 right-5">
                  <span className="text-[10px] uppercase tracking-widest text-dotpic-gold font-mono block mb-0.5">
                    {cat.tagline}
                  </span>
                  <h3 className="text-2xl font-serif text-white group-hover:text-dotpic-gold transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-dotpic-muted line-clamp-2 leading-relaxed mb-6">
                  {cat.description}
                </p>

                <div className="pt-4 border-t border-dotpic-border/60 flex items-center justify-between">
                  <Link
                    to={`/services/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-dotpic-white group-hover:text-dotpic-gold font-medium transition-colors"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    to={`/book?category=${encodeURIComponent(cat.name)}`}
                    className="text-xs text-dotpic-gold hover:text-white font-mono uppercase tracking-wider font-semibold"
                  >
                    Book Shoot →
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* View All Services Footer Link */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-dotpic-gold hover:text-white font-semibold border-b border-dotpic-gold/40 pb-1.5 transition-colors"
          >
            <span>View All Specialized Packages & Disciplines</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
