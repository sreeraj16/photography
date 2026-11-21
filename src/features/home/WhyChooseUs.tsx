import { useState, useEffect } from 'react';
import { Camera, Film, Award, Clock, HeartHandshake, ShieldCheck } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';

export function WhyChooseUs() {
  const content = dataStore.getHomepageContent();
  const [counts, setCounts] = useState({
    events: 0,
    photos: 0,
    colleges: 0,
    years: 0
  });

  useEffect(() => {
    // Smooth counter animation
    const duration = 1800;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      setCounts({
        events: Math.floor(progress * content.stats_events_shot),
        photos: Math.floor(progress * (content.stats_photos_delivered / 1000)),
        colleges: Math.floor(progress * content.stats_colleges_covered),
        years: Math.floor(progress * content.stats_years_experience),
      });

      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [content]);

  const pillars = [
    {
      icon: <Camera className="w-5 h-5 text-dotpic-gold" />,
      title: "Cinematic Narrative",
      desc: "We look beyond standard posed snapshots to capture authentic human chemistry, tears of joy, and atmospheric lighting."
    },
    {
      icon: <Film className="w-5 h-5 text-dotpic-gold" />,
      title: "Master Color Science",
      desc: "Every delivered frame is hand-retouched in our studio using custom film emulation profiles tailored to Indian celebrations."
    },
    {
      icon: <Clock className="w-5 h-5 text-dotpic-gold" />,
      title: "Rapid Highlights Drop",
      desc: "48-72 hour sneak peeks for wedding Instagram reels and instant same-night drops for college festivals and PR handles."
    },
    {
      icon: <Award className="w-5 h-5 text-dotpic-gold" />,
      title: "State-of-the-Art Gear",
      desc: "Dual-card redundancy on Sony Cinema and Canon R systems, G Master f/1.2 primes, and licensed 4K aerial drones."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-dotpic-gold" />,
      title: "Effortless Experience",
      desc: "Seamless WhatsApp booking coordination, transparent pricing in INR (₹), and no unexpected hidden fees."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-dotpic-gold" />,
      title: "Private Cloud Vault",
      desc: "Private PIN-protected client galleries with one-click full-resolution zip downloads and lifetime cloud safety."
    }
  ];

  return (
    <section className="py-24 bg-dotpic-charcoal relative border-t border-b border-dotpic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Numeral 08 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">08</span>
            <div className="h-[1px] w-12 bg-dotpic-gold/50" />
            <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
              THE BENCHMARK
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
            Why Choose DOTPIC
          </h2>
          <p className="text-xs sm:text-sm text-dotpic-muted font-light mt-3 leading-relaxed">
            Our numbers reflect trust earned across five years of documenting memorable weddings, international summits, and electric youth fests.
          </p>
        </div>

        {/* 4 Animated KPI Stats Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-sm bg-dotpic-black border border-dotpic-border text-center">
            <span className="text-4xl sm:text-5xl font-serif text-dotpic-gold font-light block mb-1">
              {counts.events}+
            </span>
            <span className="text-xs uppercase tracking-widest text-dotpic-white font-medium block">
              Events Shot
            </span>
            <span className="text-[11px] text-dotpic-muted/70 block mt-1">Weddings & Major Summits</span>
          </div>

          <div className="p-6 rounded-sm bg-dotpic-black border border-dotpic-border text-center">
            <span className="text-4xl sm:text-5xl font-serif text-dotpic-gold font-light block mb-1">
              {counts.photos}K+
            </span>
            <span className="text-xs uppercase tracking-widest text-dotpic-white font-medium block">
              Frames Delivered
            </span>
            <span className="text-[11px] text-dotpic-muted/70 block mt-1">Hand-Retouched Art Pieces</span>
          </div>

          <div className="p-6 rounded-sm bg-dotpic-black border border-dotpic-border text-center">
            <span className="text-4xl sm:text-5xl font-serif text-dotpic-gold font-light block mb-1">
              {counts.colleges}+
            </span>
            <span className="text-xs uppercase tracking-widest text-dotpic-white font-medium block">
              Colleges Covered
            </span>
            <span className="text-[11px] text-dotpic-muted/70 block mt-1">IITs, BITS & Premier Institutes</span>
          </div>

          <div className="p-6 rounded-sm bg-dotpic-black border border-dotpic-border text-center">
            <span className="text-4xl sm:text-5xl font-serif text-dotpic-gold font-light block mb-1">
              {counts.years}+
            </span>
            <span className="text-xs uppercase tracking-widest text-dotpic-white font-medium block">
              Years Experience
            </span>
            <span className="text-[11px] text-dotpic-muted/70 block mt-1">Artisan Mastery Since 2020</span>
          </div>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-dotpic-black/70 border border-dotpic-border hover:border-dotpic-gold/40 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-sm bg-dotpic-surface border border-dotpic-gold/20 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-serif text-white mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-dotpic-muted leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
