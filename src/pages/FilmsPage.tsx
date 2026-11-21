import { useState } from 'react';
import { Youtube, Play, ArrowUpRight } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { BRAND } from '../lib/constants';
import { YouTubeModal } from '../components/common/YouTubeModal';
import { TiltCard } from '../components/ui/TiltCard';

export function FilmsPage() {
  const videos = dataStore.getVideos();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  const categories = ['Showreel', 'Weddings', 'Campus', 'Behind the Scenes'];

  const filtered = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-[10px] font-orbitron tracking-widest uppercase mb-4">
          <Youtube className="w-3.5 h-3.5 text-red-500" />
          <span>OFFICIAL 4K CINEMA HUB</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          DOTPIC Films & Showreels
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Crafted with anamorphic glass, custom sound design, and emotive documentary pacing.
        </p>

        <div className="mt-6">
          <a
            href={BRAND.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-400 hover:text-red-300 font-semibold"
          >
            <span>Subscribe on YouTube @dotpicphotography</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Category Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 pb-6 border-b border-dotpic-border">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
              activeCategory === 'all'
                ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
            }`}
          >
            All Films
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
                activeCategory === c
                  ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                  : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((vid) => (
            <TiltCard
              key={vid.id}
              maxTilt={6}
              scale={1.03}
              data-cursor="play"
              onClick={() => setActiveVideo({ id: vid.youtube_id, title: vid.title })}
              className="rounded-2xl overflow-hidden bg-dotpic-charcoal border border-dotpic-border/80 cursor-pointer hover:border-red-500/60 transition-all duration-300 shadow-2xl group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={vid.thumbnail_url}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center group-hover:scale-110 shadow-2xl transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>

                <span className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded-full text-[10px] font-mono border border-white/20 uppercase backdrop-blur-md">
                  {vid.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif text-white group-hover:text-dotpic-gold transition-colors mb-2">
                  {vid.title}
                </h3>
                <p className="text-xs text-dotpic-muted line-clamp-2 leading-relaxed font-light">
                  {vid.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {activeVideo && (
        <YouTubeModal
          videoId={activeVideo.id}
          title={activeVideo.title}
          isOpen={true}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
