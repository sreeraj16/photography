import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { TiltCard } from '../../components/ui/TiltCard';

export function IntroSection() {
  return (
    <section className="py-28 sm:py-36 bg-dotpic-black relative overflow-hidden">
      {/* Ambient Bokeh */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-dotpic-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Editorial Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">01</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                PHILOSOPHY & ARTISTRY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white leading-[1.15] font-light">
              We do not just press the shutter; we capture the{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-dotpic-gold via-[#F0DEC0] to-dotpic-gold font-normal">
                unspoken poetry
              </span>{' '}
              of the moment.
            </h2>

            <p className="text-sm sm:text-base text-dotpic-muted font-sans leading-relaxed font-light">
              Founded on the belief that photography is modern visual cinema, DOTPIC blends documentary authenticity with high-fashion editorial polish. From royal Hyderabad palace weddings to high-voltage engineering campus festivals with 18,000 students, every frame is treated like a classic cinematic still.
            </p>

            <p className="text-xs sm:text-sm text-dotpic-muted/80 font-sans leading-relaxed font-light">
              We reject rigid, artificial poses. Our focus is natural light, human vulnerability, kinetic joy, and deep emotional resonance.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dotpic-gold hover:text-white font-semibold group transition-colors"
              >
                <span>Read The DOTPIC Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href={BRAND.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-dotpic-muted hover:text-white transition-colors"
              >
                Daily Frames on Instagram @_dotpic_ →
              </a>
            </div>
          </div>

          {/* Right 3D Tilt Layered Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <TiltCard
              maxTilt={7}
              scale={1.02}
              className="rounded-2xl overflow-hidden border border-dotpic-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                  alt="DOTPIC Editorial Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-transparent to-transparent opacity-85" />
                
                {/* Editorial Camera Lens Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-dotpic-gold">
                  <Camera className="w-3 h-3 text-dotpic-gold" />
                  <span>NATURAL LIGHT PORTRAITURE</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-base font-serif text-white italic">
                    "Light creates what the mind conceives."
                  </p>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold/80 block mt-1">
                    FRAME 042 • HYDERABAD
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Overlapping Floating Polaroid Accent */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-44 p-3 bg-dotpic-charcoal border border-dotpic-gold/40 shadow-2xl rounded-xl -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-square overflow-hidden rounded-lg mb-2">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
                  alt="Wedding Polaroid"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-dotpic-gold font-mono block text-center font-bold">
                MOMENT IN TIME
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
