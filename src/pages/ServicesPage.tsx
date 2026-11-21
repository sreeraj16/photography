import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../lib/constants';
import { Button } from '../components/ui/Button';

export function ServicesPage() {
  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          SPECIALISED DISCIPLINES
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Photography As Modern Art
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-xl mx-auto leading-relaxed">
          From royal heritage weddings and electric campus festivals to personal branding and fashion lookbooks.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mb-24">
        {SERVICE_CATEGORIES.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image (6 cols) */}
              <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-2'}`}>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-dotpic-border group shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-mono text-dotpic-gold uppercase tracking-widest">
                    DISCIPLINE 0{idx + 1} • {service.name.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Text & Features (6 cols) */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-serif text-dotpic-gold">0{idx + 1}</span>
                  <div className="h-[1px] w-8 bg-dotpic-gold/50" />
                  <span className="text-xs uppercase font-mono tracking-widest text-dotpic-gold font-semibold">
                    {service.tagline}
                  </span>
                </div>

                <h2 className="text-3xl font-serif text-white font-light">
                  {service.name} Photography
                </h2>

                <p className="text-xs sm:text-sm text-dotpic-muted leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Features checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-dotpic-white">
                      <Check className="w-3.5 h-3.5 text-dotpic-gold flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <Link to={`/services/${service.slug}`}>
                    <Button variant="outline" size="sm">
                      Read In-Depth
                    </Button>
                  </Link>

                  <Link to={`/book?category=${encodeURIComponent(service.name)}`}>
                    <Button variant="gold" size="sm" withShutterSound>
                      Book This Shoot →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
