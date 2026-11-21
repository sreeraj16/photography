import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { formatINR } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

export function PackagesPreview() {
  const packages = dataStore.getPackages().filter(p => p.is_enabled).slice(0, 3);

  return (
    <section className="py-24 bg-dotpic-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Numeral 11 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">11</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                INVESTMENT & EXPERIENCES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Transparent Packages
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-dotpic-muted max-w-md font-light leading-relaxed">
            All pricing in INR (₹). Clear deliverables, zero hidden fees, and customisable inclusions for multi-day weddings and festivals.
          </p>
        </div>

        {/* Packages Cards Grid (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-dotpic-charcoal border rounded-sm p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.is_popular
                  ? 'border-dotpic-gold shadow-[0_0_30px_rgba(201,169,110,0.15)] ring-1 ring-dotpic-gold'
                  : 'border-dotpic-border hover:border-dotpic-gold/40'
              }`}
            >
              {pkg.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-dotpic-gold via-dotpic-goldLight to-dotpic-gold text-dotpic-black text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>MOST POPULAR CHOICE</span>
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold block mb-2">
                  {pkg.duration}
                </span>
                <h3 className="text-2xl font-serif text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs text-dotpic-muted mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-dotpic-border">
                  <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-medium">
                    {formatINR(pkg.price_inr)}
                  </span>
                  <span className="text-xs text-dotpic-muted ml-2">/ session onwards</span>
                </div>

                {/* Inclusions List */}
                <ul className="space-y-3 mb-8 text-xs text-dotpic-muted">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-dotpic-gold flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  to={`/book?package=${encodeURIComponent(pkg.name)}&category=${encodeURIComponent(pkg.category_slug)}`}
                  className="w-full block"
                >
                  <Button
                    variant={pkg.is_popular ? 'gold' : 'outline'}
                    size="md"
                    className="w-full"
                    withShutterSound
                  >
                    Enquire Package
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View Detailed Comparison CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dotpic-gold hover:text-dotpic-goldLight font-semibold border-b border-dotpic-gold/40 pb-1"
          >
            <span>Compare Full Deliverables Matrix & Custom Add-ons</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
