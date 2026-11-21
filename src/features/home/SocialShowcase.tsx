import { useState } from 'react';
import { Instagram, Youtube, ArrowUpRight, Play, Film, Sparkles, Volume2 } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { dataStore } from '../../lib/dataStore';
import { YouTubeModal } from '../../components/common/YouTubeModal';
import { TiltCard } from '../../components/ui/TiltCard';

export function SocialShowcase() {
  const [activeModalVideo, setActiveModalVideo] = useState<{ id: string; title: string } | null>(null);
  const socialPosts = dataStore.getSocialPosts().slice(0, 6);
  const videos = dataStore.getVideos();
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const featuredVideo = videos[selectedVideoIndex] || videos[0];

  return (
    <section className="py-28 bg-dotpic-charcoal relative border-t border-b border-dotpic-border overflow-hidden">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* 1. YOUTUBE CINEMA THEATER (Major Highlight) */}
        {/* ========================================================= */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">12</span>
                <div className="h-[1px] w-12 bg-dotpic-gold/50" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-red-300 text-[10px] font-mono tracking-widest uppercase">
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>OFFICIAL YOUTUBE CHANNEL • @dotpicphotography</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
                Cinema in Motion
              </h2>
            </div>

            <a
              href={BRAND.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-red-900/60 via-red-800/50 to-red-950/60 border border-red-500/50 text-white text-xs uppercase tracking-widest font-bold hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Subscribe on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Featured Cinema Theater Deck */}
          {featuredVideo && (
            <div className="relative rounded-2xl overflow-hidden border border-dotpic-border/80 bg-black/90 shadow-2xl mb-8 group">
              {/* 35mm Sprocket Holes Header */}
              <div className="h-5 bg-dotpic-surface border-b border-white/10 flex items-center justify-between px-4 overflow-hidden select-none">
                <div className="flex gap-4">
                  {[...Array(16)].map((_, i) => (
                    <span key={i} className="w-2.5 h-2 rounded-[2px] bg-black border border-white/15 inline-block" />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-dotpic-gold tracking-widest uppercase">
                  35MM ANAMORPHIC FILM GATE • SOUND TRACK 2.0
                </span>
              </div>

              {/* Main Featured Player Frame */}
              <div
                onClick={() => setActiveModalVideo({ id: featuredVideo.youtube_id, title: featuredVideo.title })}
                className="relative aspect-video w-full overflow-hidden cursor-pointer group"
                data-cursor="play"
              >
                <img
                  src={featuredVideo.thumbnail_url}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-85 group-hover:brightness-100"
                />
                
                {/* Cinema Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />

                {/* Pulsing Acoustic concentric play button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-red-600/20 animate-ping [animation-duration:2.5s]" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-red-700 to-red-500 text-white flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.7)] group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                  </div>
                </div>

                {/* Theater Overlay Badges */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-dotpic-gold uppercase tracking-wider mb-2">
                      <Film className="w-3 h-3 text-dotpic-gold" />
                      <span>{featuredVideo.category} • 4K ULTRA HD</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-serif text-white font-light drop-shadow-lg">
                      {featuredVideo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-dotpic-muted font-light mt-1 line-clamp-1">
                      {featuredVideo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-mono text-white/90">Click to Play in Full Cinema</span>
                  </div>
                </div>
              </div>

              {/* 35mm Sprocket Holes Footer */}
              <div className="h-5 bg-dotpic-surface border-t border-white/10 flex items-center justify-between px-4 overflow-hidden select-none">
                <div className="flex gap-4">
                  {[...Array(16)].map((_, i) => (
                    <span key={i} className="w-2.5 h-2 rounded-[2px] bg-black border border-white/15 inline-block" />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-dotpic-muted tracking-widest uppercase">
                  HYDERABAD CINEMATOGRAPHY UNIT
                </span>
              </div>
            </div>
          )}

          {/* Filmstrip Carousel Thumbnail Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {videos.slice(0, 3).map((vid, i) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideoIndex(i)}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-3.5 ${
                  selectedVideoIndex === i
                    ? 'bg-dotpic-surface border-dotpic-gold shadow-lg shadow-dotpic-gold/10'
                    : 'bg-dotpic-black/60 border-dotpic-border hover:border-white/30'
                }`}
              >
                <div className="relative aspect-video w-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={vid.thumbnail_url} alt={vid.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                </div>

                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-mono text-dotpic-gold block">
                    0{i + 1} • {vid.category}
                  </span>
                  <h4 className="text-xs font-serif text-white truncate font-medium">
                    {vid.title}
                  </h4>
                  <span className="text-[10px] text-dotpic-muted font-light">Watch Now →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. INSTAGRAM CURATED FEED */}
        {/* ========================================================= */}
        <div className="pt-12 border-t border-dotpic-border/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">13</span>
                <div className="h-[1px] w-12 bg-dotpic-gold/50" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/40 text-pink-300 text-[10px] font-mono tracking-widest uppercase">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>OFFICIAL INSTAGRAM • @_dotpic_</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-dotpic-white font-light">
                Follow The Frames:{' '}
                <a
                  href={BRAND.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-dotpic-gold hover:underline font-normal"
                >
                  {BRAND.socials.instagram.handle}
                </a>
              </h2>
            </div>

            <a
              href={BRAND.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-orange-900/30 border border-pink-500/40 text-white text-xs uppercase tracking-widest font-bold hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all duration-300"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Curated Instagram Grid (6 3D tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {socialPosts.map((post) => (
              <TiltCard
                key={post.id}
                maxTilt={8}
                scale={1.04}
                className="rounded-xl overflow-hidden border border-dotpic-border/80 bg-dotpic-surface shadow-xl group block"
              >
                <a
                  href={post.url || BRAND.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square block w-full h-full"
                >
                  <img
                    src={post.thumbnail_url}
                    alt={post.caption || "Instagram post preview"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-center">
                    <div className="flex justify-end">
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    <p className="text-[10px] text-white line-clamp-3 font-sans font-light">
                      {post.caption}
                    </p>
                    <span className="text-[9px] uppercase tracking-wider text-dotpic-gold font-mono font-bold">
                      View Post →
                    </span>
                  </div>
                </a>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Modal Player */}
      {activeModalVideo && (
        <YouTubeModal
          videoId={activeModalVideo.id}
          title={activeModalVideo.title}
          isOpen={true}
          onClose={() => setActiveModalVideo(null)}
        />
      )}
    </section>
  );
}
