import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../lib/constants';

export function ServicesGrid() {
  return (
    <section className="py-24 bg-dotpic-charcoal relative border-t border-b border-dotpic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Large Editorial Numeral 02 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">02</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                CURATED EXPERTISE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Featured Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-dotpic-muted max-w-md font-light leading-relaxed">
            Every genre demands distinct creative direction, lighting ratios, and narrative pacing. Explore our dedicated disciplines.
          </p>
        </div>

        {/* Services Grid (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICE_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className="group relative bg-dotpic-black border border-dotpic-border rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-dotpic-gold/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {/* Image Container with 4:3 Aspect Ratio and Zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-dotpic-surface">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-dotpic-black/30 to-transparent opacity-80" />
                <span className="absolute top-4 right-4 text-[10px] uppercase font-mono tracking-widest text-dotpic-gold/80 px-2 py-1 rounded bg-black/60 border border-white/10">
                  0{idx + 1}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-dotpic-gold font-mono block mb-1">
                    {cat.tagline}
                  </span>
                  <h3 className="text-xl font-serif text-dotpic-white group-hover:text-dotpic-gold transition-colors duration-300 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-dotpic-muted line-clamp-2 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

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
                    className="text-[11px] text-dotpic-gold hover:underline"
                  >
                    Book This →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Footer Link */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dotpic-gold hover:text-dotpic-goldLight font-semibold border-b border-dotpic-gold/40 pb-1"
          >
            <span>View All Specialized Packages & Services</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
