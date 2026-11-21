import { useRef } from 'react';
import { Play, Sparkles, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { TiltCard } from '../../components/ui/TiltCard';

export function BTSReels() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const reels = [
    {
      id: "reel-1",
      title: "Lighting Setup: Taj Falaknuma",
      desc: "Balancing 100-year-old chandeliers with delicate off-camera bounce.",
      duration: "0:45",
      cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
      instagramUrl: "https://www.instagram.com/_dotpic_"
    },
    {
      id: "reel-2",
      title: "Stage Crawl at IIT Hyderabad",
      desc: "Running with 70-200mm f/2.8 through 15,000 screaming concert fans.",
      duration: "0:58",
      cover: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
      instagramUrl: "https://www.instagram.com/_dotpic_"
    },
    {
      id: "reel-3",
      title: "Araku Sunrise Drone Catch",
      desc: "Navigating morning valley thermals for that golden anamorphic sweep.",
      duration: "0:32",
      cover: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
      instagramUrl: "https://www.instagram.com/_dotpic_"
    },
    {
      id: "reel-4",
      title: "Color Grading in DaVinci",
      desc: "Custom film curve calibration for South Indian bridal silks.",
      duration: "1:15",
      cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      instagramUrl: "https://www.instagram.com/_dotpic_"
    }
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-28 bg-dotpic-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">09</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BEHIND THE SCENES</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Reels & Unfiltered Moments
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-3.5 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors shadow-md"
              aria-label="Previous reels"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3.5 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors shadow-md"
              aria-label="Next reels"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Vertical 9:16 Reel Cards Strip with 3D Tilt */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 py-4 cursor-grab active:cursor-grabbing touch-scroll"
      >
        {reels.map((reel) => (
          <TiltCard
            key={reel.id}
            maxTilt={7}
            scale={1.03}
            data-cursor="play"
            className="flex-shrink-0 w-64 sm:w-72 aspect-reel rounded-2xl overflow-hidden border border-dotpic-border/80 bg-dotpic-surface shadow-2xl relative transition-all duration-300 hover:border-pink-500/60"
          >
            <a
              href={reel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full relative"
            >
              <img
                src={reel.cover}
                alt={reel.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Instagram & Duration Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-pink-400">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Icon with pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>

              {/* Title & Description */}
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-lg font-serif text-white font-medium mb-1 drop-shadow-md">
                  {reel.title}
                </h4>
                <p className="text-xs text-dotpic-muted font-light line-clamp-2 leading-relaxed">
                  {reel.desc}
                </p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400 block mt-2 font-bold">
                  Watch on Instagram →
                </span>
              </div>
            </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
