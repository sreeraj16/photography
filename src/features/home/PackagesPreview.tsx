import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { formatINR } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { TiltCard } from '../../components/ui/TiltCard';

export function PackagesPreview() {
  const packages = dataStore.getPackages().filter(p => p.is_enabled).slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#F5F1E8] dark:bg-[#0B1014] relative border-t border-b border-[#E4DCD0] dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">10</span>
              <div className="h-[2px] w-12 bg-teal-500/50" />
              <span className="text-xs uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold">
                INVESTMENT & TIERS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-slate-100 font-light">
              Transparent Packages
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md font-sans leading-relaxed">
            All pricing in INR (₹). Clear deliverables, zero hidden fees, and customisable inclusions for multi-day weddings and festivals.
          </p>
        </div>

        {/* Packages Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <TiltCard
              key={pkg.id}
              maxTilt={5}
              scale={1.02}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative shadow-md dark:shadow-2xl ${
                pkg.is_popular
                  ? 'bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-[0_10px_35px_rgba(20,184,166,0.2)]'
                  : 'bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 hover:border-teal-500/50'
              }`}
            >
              {pkg.is_popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-orbitron font-bold tracking-[0.15em] uppercase px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>SIGNATURE POPULAR CHOICE</span>
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-orbitron tracking-widest text-teal-600 dark:text-teal-400 block mb-2 font-bold">
                  {pkg.duration}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-slate-100 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-sans">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-[#E8E2D6] dark:border-slate-800">
                  <span className="text-3xl sm:text-4xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">
                    {formatINR(pkg.price_inr)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-sans">/ assignment</span>
                </div>

                {/* Inclusions List */}
                <ul className="space-y-3.5 mb-8 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                      </div>
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
                    variant={pkg.is_popular ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                    withShutterSound
                  >
                    Select {pkg.name}
                  </Button>
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* View Detailed Comparison CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-xs uppercase font-orbitron tracking-[0.2em] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold border-b-2 border-teal-500/50 pb-1.5 transition-colors"
          >
            <span>Compare Full Specification Matrix & Equipment</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
