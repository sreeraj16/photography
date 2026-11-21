import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { formatINR } from '../lib/utils';
import { EstimateCalculator } from '../features/booking/EstimateCalculator';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';

export function PackagesPage() {
  const packages = dataStore.getPackages().filter(p => p.is_enabled);
  const [showCalculator, setShowCalculator] = useState(false);

  // Comparison matrix features
  const matrixFeatures = [
    { name: "Senior Candid Photographers", classic: "1", grandeur: "2", royal: "3", campus: "2" },
    { name: "Cinematic 4K Filmmakers", classic: "1", grandeur: "2", royal: "3", campus: "1 (Reels)" },
    { name: "4K Aerial Cinema Drone", classic: "Optional Add-on", grandeur: "Included (1 Pilot)", royal: "Included (Dual Drones)", campus: "Included" },
    { name: "Handcrafted Luxury Photobook", classic: "Optional", grandeur: "1 Deluxe Leather (40 pgs)", royal: "2 Velvet Coffee Tables", campus: "College Year Book Drop" },
    { name: "Sneak Peek Delivery Speed", classic: "72 Hours", grandeur: "48 Hours", royal: "24-48 Hours VIP", campus: "Instant 24 Hours" },
    { name: "Private Client Cloud Gallery", classic: "1 Year Access", grandeur: "Lifetime Vault", royal: "Lifetime VIP Vault", campus: "Public QR Portal" },
    { name: "Same-Day Instagram Reel Edit", classic: "—", grandeur: "Included", royal: "Included", campus: "Included" },
  ];

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          TRANSPARENT VALUE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Investment & Photography Packages
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-xl mx-auto leading-relaxed">
          Transparent rates in Indian Rupees (₹). Every package includes high-resolution raw master files, hand-color-graded albums, and cloud delivery.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant={showCalculator ? 'gold' : 'outline'}
            size="sm"
            onClick={() => setShowCalculator(!showCalculator)}
          >
            {showCalculator ? 'Hide Estimate Calculator' : 'Open Instant Estimate Calculator'}
          </Button>
        </div>
      </div>

      {/* Optional Interactive Estimator Drawer */}
      {showCalculator && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-in fade-in duration-300">
          <EstimateCalculator />
        </div>
      )}

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <TiltCard
              key={pkg.id}
              maxTilt={5}
              scale={1.02}
              className={`relative rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl transition-all duration-300 ${
                pkg.is_popular
                  ? 'bg-gradient-to-b from-dotpic-charcoal via-black to-dotpic-charcoal border-2 border-dotpic-gold shadow-[0_0_40px_rgba(201,169,110,0.25)]'
                  : 'bg-dotpic-charcoal border border-dotpic-border/80 hover:border-dotpic-gold/50'
              }`}
            >
              {pkg.is_popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-dotpic-gold via-[#E8D1A7] to-dotpic-gold text-dotpic-black text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SIGNATURE MOST POPULAR</span>
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold block mb-2 font-bold">
                  {pkg.duration}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">{pkg.name}</h3>
                <p className="text-xs text-dotpic-muted leading-relaxed mb-6 font-light">{pkg.description}</p>

                <div className="mb-6 pb-6 border-b border-dotpic-border/80">
                  <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-medium">
                    {formatINR(pkg.price_inr)}
                  </span>
                  <span className="text-xs text-dotpic-muted ml-2 font-mono">/ complete assignment</span>
                </div>

                <ul className="space-y-3.5 mb-8 text-xs text-dotpic-muted">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-dotpic-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-dotpic-gold" />
                      </div>
                      <span className="font-light">{inc}</span>
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
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block mb-1">
            DETAILED SPECIFICATIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
            Feature Comparison Matrix
          </h3>
          <p className="text-[11px] text-dotpic-muted font-mono block sm:hidden">
            ← Swipe horizontally to compare all packages →
          </p>
        </div>

        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm overflow-hidden shadow-2xl">
          <div className="overflow-x-auto touch-scroll">
            <table className="w-full text-left text-xs min-w-[620px]">
              <thead className="bg-dotpic-surface text-dotpic-gold font-mono uppercase tracking-wider border-b border-dotpic-border">
                <tr>
                  <th className="py-4 px-6 text-white font-serif sticky left-0 bg-dotpic-surface z-10 shadow-[2px_0_8px_rgba(0,0,0,0.5)]">
                    Feature / Deliverable
                  </th>
                  <th className="py-4 px-4 text-center">Classic Storyteller</th>
                  <th className="py-4 px-4 text-center text-dotpic-gold">Cinematic Grandeur</th>
                  <th className="py-4 px-4 text-center">Heritage Royal</th>
                  <th className="py-4 px-4 text-center">Campus Anthem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dotpic-border text-dotpic-muted">
                {matrixFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-dotpic-surface/50 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-white sticky left-0 bg-dotpic-charcoal z-10 shadow-[2px_0_8px_rgba(0,0,0,0.5)]">
                      {row.name}
                    </td>
                    <td className="py-3.5 px-4 text-center">{row.classic}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-dotpic-gold bg-dotpic-gold/5">
                      {row.grandeur}
                    </td>
                    <td className="py-3.5 px-4 text-center">{row.royal}</td>
                    <td className="py-3.5 px-4 text-center">{row.campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
