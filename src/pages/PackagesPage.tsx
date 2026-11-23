import { Link } from 'react-router-dom';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { formatINR } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';

export function PackagesPage() {
  const packages = dataStore.getPackages().filter(p => p.is_enabled);

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
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold block mb-2">
          TRANSPARENT VALUE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Investment & Photography Packages
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Bespoke photography and cinematography tailored to your wedding, campus festival, or commercial campaign. Contact us directly on WhatsApp or Instagram for availability and customized quotations.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/book">
            <Button
              variant="primary"
              size="md"
              withShutterSound
            >
              Enquire on WhatsApp / Instagram
            </Button>
          </Link>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <TiltCard
              key={pkg.id}
              maxTilt={5}
              scale={1.02}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-md dark:shadow-2xl transition-all duration-300 ${
                pkg.is_popular
                  ? 'bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-[0_10px_35px_rgba(20,184,166,0.2)]'
                  : 'bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 hover:border-teal-500/50'
              }`}
            >
              {pkg.is_popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-orbitron font-bold tracking-[0.15em] uppercase px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SIGNATURE MOST POPULAR</span>
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-orbitron tracking-widest text-teal-600 dark:text-teal-400 block mb-2 font-bold">
                  {pkg.duration}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mb-2">{pkg.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-sans">{pkg.description}</p>

                <div className="mb-6 pb-6 border-b border-[#E8E2D6] dark:border-slate-800">
                  <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">
                    {pkg.price_inr > 0 ? formatINR(pkg.price_inr) : "Custom Quote"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-sans">
                    {pkg.price_inr > 0 ? "/ assignment" : "/ tailored on request"}
                  </span>
                </div>

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
                    variant={pkg.is_popular ? 'primary' : 'outline'}
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
          <span className="text-[10px] font-orbitron uppercase tracking-widest text-teal-600 dark:text-teal-400 font-semibold block mb-1">
            DETAILED SPECIFICATIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mb-2">
            Feature Comparison Matrix
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-orbitron block sm:hidden">
            ← Swipe horizontally to compare all packages →
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 rounded-2xl overflow-hidden shadow-md dark:shadow-2xl">
          <div className="overflow-x-auto touch-scroll">
            <table className="w-full text-left text-xs min-w-[620px]">
              <thead className="bg-[#FAF7F2] dark:bg-slate-950 text-teal-600 dark:text-teal-400 font-orbitron uppercase tracking-wider border-b border-[#E2DCD0] dark:border-slate-800">
                <tr>
                  <th className="py-4 px-6 text-slate-900 dark:text-white font-serif sticky left-0 bg-[#FAF7F2] dark:bg-slate-950 z-10 shadow-sm">
                    Feature / Deliverable
                  </th>
                  <th className="py-4 px-4 text-center">Classic Storyteller</th>
                  <th className="py-4 px-4 text-center text-teal-600 dark:text-teal-400 font-bold">Cinematic Grandeur</th>
                  <th className="py-4 px-4 text-center">Heritage Royal</th>
                  <th className="py-4 px-4 text-center">Campus Anthem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D6] dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-sans">
                {matrixFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-teal-500/5 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 shadow-sm">
                      {row.name}
                    </td>
                    <td className="py-3.5 px-4 text-center">{row.classic}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/5">
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
