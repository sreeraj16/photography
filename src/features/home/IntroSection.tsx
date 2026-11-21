import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '../../lib/constants';

export function IntroSection() {
  return (
    <section className="py-24 sm:py-32 bg-dotpic-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">01</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                PHILOSOPHY & ARTISTRY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white leading-[1.2] font-light">
              We do not just press the shutter; we capture the{' '}
              <span className="italic text-dotpic-gold font-normal">unspoken poetry</span> of the moment.
            </h2>

            <p className="text-sm sm:text-base text-dotpic-muted font-sans leading-relaxed font-light">
              Founded on the belief that photography is modern visual cinema, DOTPIC blends documentary authenticity with high-fashion editorial polish. From royal Hyderabad palace weddings to high-voltage engineering campus festivals with 18,000 students, every frame is treated like a classic cinematic still.
            </p>

            <p className="text-xs sm:text-sm text-dotpic-muted/80 font-sans leading-relaxed">
              We reject rigid, artificial poses. Our focus is natural light, human vulnerability, kinetic joy, and deep emotional resonance.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dotpic-gold hover:text-dotpic-goldLight font-semibold group"
              >
                <span>Read The DOTPIC Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href={BRAND.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-dotpic-muted hover:text-dotpic-white transition-colors"
              >
                Daily Frames on Instagram →
              </a>
            </div>
          </div>

          {/* Right Dual Layered Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-dotpic-border group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                alt="DOTPIC Editorial Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-dotpic-gold font-mono block mb-1">
                  EDITORIAL LIGHTING
                </span>
                <p className="text-sm font-serif text-white italic">
                  "Light creates what the mind conceives."
                </p>
              </div>
            </div>

            {/* Overlapping Floating Polaroid Accent */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-44 p-2 bg-dotpic-charcoal border border-dotpic-gold/40 shadow-2xl rounded-sm -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-square overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
                  alt="Wedding Polaroid"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-dotpic-muted font-mono block text-center">
                FRAME 042 • 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
