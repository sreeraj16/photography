import { useRef } from 'react';
import { Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section className="py-24 bg-dotpic-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">09</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                <span>BEHIND THE SCENES</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-dotpic-white font-light">
              Reels & Moments Unfiltered
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors"
              aria-label="Previous reels"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full border border-dotpic-border text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors"
              aria-label="Next reels"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Vertical 9:16 Reel Cards Strip */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 pb-4 pt-2 cursor-grab active:cursor-grabbing"
      >
        {reels.map((reel) => (
          <a
            key={reel.id}
            href={reel.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-64 sm:w-72 aspect-reel rounded-sm overflow-hidden border border-dotpic-border bg-dotpic-surface relative transition-all duration-300 hover:border-pink-500/50 hover:shadow-2xl"
          >
            <img
              src={reel.cover}
              alt={reel.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

            {/* Play Button & Duration */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-[10px] bg-black/70 border border-white/20 text-white font-mono px-2 py-0.5 rounded">
                {reel.duration}
              </span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500 transition-all duration-300">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>

            {/* Reel Caption */}
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-mono uppercase text-pink-400 tracking-wider block mb-1">
                @_dotpic_ REELS
              </span>
              <h4 className="text-sm font-serif text-white font-medium mb-1">
                {reel.title}
              </h4>
              <p className="text-[11px] text-dotpic-muted line-clamp-2">
                {reel.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
