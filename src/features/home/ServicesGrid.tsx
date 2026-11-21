import { Link } from 'react-router-dom';
import { ArrowUpRight, Disc } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../lib/constants';
import { TiltCard } from '../../components/ui/TiltCard';

export function ServicesGrid() {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F1E8] dark:bg-[#0B1014] relative border-t border-b border-[#E4DCD0] dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">02</span>
              <div className="h-[2px] w-12 bg-teal-500/50" />
              <span className="text-xs uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold">
                CURATED DISCIPLINES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-slate-100 font-light">
              Signature Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md font-sans leading-relaxed">
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
              className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.05)] dark:shadow-2xl transition-all duration-300 hover:border-teal-500/60 flex flex-col justify-between group"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                
                {/* Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Rotating Lens Aperture Iris Ring on Hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-teal-500/40 bg-black/60 backdrop-blur-md flex items-center justify-center text-teal-400 group-hover:rotate-180 transition-transform duration-700">
                  <Disc className="w-4 h-4 opacity-80" />
                </div>

                {/* Index Numeral Pill */}
                <span className="absolute top-4 left-4 text-[10px] uppercase font-orbitron tracking-widest text-teal-300 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-teal-500/30 shadow-md">
                  0{idx + 1}
                </span>

                <div className="absolute bottom-3.5 left-5 right-5">
                  <span className="text-[10px] uppercase tracking-wider text-teal-300 font-orbitron block mb-0.5">
                    {cat.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-teal-300 transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-6 font-sans">
                  {cat.description}
                </p>

                <div className="pt-4 border-t border-[#E8E2D6] dark:border-slate-800 flex items-center justify-between">
                  <Link
                    to={`/services/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase font-orbitron tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 font-semibold transition-colors"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    to={`/book?category=${encodeURIComponent(cat.name)}`}
                    className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-orbitron uppercase tracking-wider font-semibold"
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
            className="inline-flex items-center gap-2 text-xs uppercase font-orbitron tracking-[0.2em] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold border-b-2 border-teal-500/50 pb-1.5 transition-colors"
          >
            <span>View All Specialized Packages & Disciplines</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
