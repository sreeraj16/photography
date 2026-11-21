import { useState } from 'react';
import { Instagram, Youtube, ArrowUpRight, Play, Film, Volume2 } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { dataStore } from '../../lib/dataStore';
import { YouTubeModal } from '../../components/common/YouTubeModal';
import { TiltCard } from '../../components/ui/TiltCard';
import { Button } from '../../components/ui/Button';

export function SocialShowcase() {
  const [activeModalVideo, setActiveModalVideo] = useState<{ id: string; title: string } | null>(null);
  const socialPosts = dataStore.getSocialPosts().slice(0, 6);
  const videos = dataStore.getVideos();
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const featuredVideo = videos[selectedVideoIndex] || videos[0];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#080C0E] relative border-t border-b border-[#E4DCD0] dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* 1. YOUTUBE CINEMA THEATER */}
        {/* ========================================================= */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">09</span>
                <div className="h-[2px] w-12 bg-teal-500/50" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-[10px] font-orbitron tracking-wider uppercase">
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                  <span>YOUTUBE • @dotpicphotography</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-slate-100 font-light">
                Cinema in Motion
              </h2>
            </div>

            <a
              href={BRAND.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="md" icon={<Youtube className="w-4 h-4 text-white" />}>
                Subscribe on YouTube
              </Button>
            </a>
          </div>

          {/* Featured Cinema Theater Deck */}
          {featuredVideo && (
            <div className="relative rounded-3xl overflow-hidden border border-[#E2DCD0] dark:border-slate-800 bg-slate-950 shadow-xl dark:shadow-2xl mb-8 group">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/35" />

                {/* Pulsing play button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-teal-500/20 animate-ping [animation-duration:2.5s]" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-teal-700 to-teal-500 text-white flex items-center justify-center shadow-[0_0_35px_rgba(20,184,166,0.6)] group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                  </div>
                </div>

                {/* Theater Overlay Badges */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-teal-500/30 text-[10px] font-orbitron text-teal-300 uppercase tracking-wider mb-2">
                      <Film className="w-3 h-3 text-teal-400" />
                      <span>{featuredVideo.category} • 4K ULTRA HD</span>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-serif text-white font-light drop-shadow-lg">
                      {featuredVideo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 line-clamp-1">
                      {featuredVideo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-teal-500/30">
                    <Volume2 className="w-4 h-4 text-teal-400" />
                    <span className="text-[11px] font-orbitron text-slate-200">Click to Play in Full Cinema</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filmstrip Carousel Thumbnail Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {videos.slice(0, 3).map((vid, i) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideoIndex(i)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-3.5 ${
                  selectedVideoIndex === i
                    ? 'bg-white dark:bg-slate-900 border-teal-500 shadow-md'
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-teal-400'
                }`}
              >
                <div className="relative aspect-video w-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={vid.thumbnail_url} alt={vid.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                </div>

                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-orbitron text-teal-600 dark:text-teal-400 block font-semibold">
                    0{i + 1} • {vid.category}
                  </span>
                  <h4 className="text-xs font-serif text-slate-900 dark:text-slate-100 truncate font-medium">
                    {vid.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Watch Now →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. INSTAGRAM CURATED FEED */}
        {/* ========================================================= */}
        <div className="pt-12 border-t border-[#E8E2D6] dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">10</span>
                <div className="h-[2px] w-12 bg-teal-500/50" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-400 text-[10px] font-orbitron tracking-wider uppercase">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>INSTAGRAM • @_dotpic_</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-slate-100 font-light">
                Follow The Frames:{' '}
                <a
                  href={BRAND.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-teal-600 dark:text-teal-400 hover:underline font-normal"
                >
                  {BRAND.socials.instagram.handle}
                </a>
              </h2>
            </div>

            <a
              href={BRAND.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md" icon={<Instagram className="w-4 h-4 text-pink-500" />}>
                Follow on Instagram
              </Button>
            </a>
          </div>

          {/* Curated Instagram Grid (6 3D tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {socialPosts.map((post) => (
              <TiltCard
                key={post.id}
                maxTilt={6}
                scale={1.03}
                className="rounded-2xl overflow-hidden border border-[#E2DCD0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-xl group block"
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-center">
                    <div className="flex justify-end">
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    <p className="text-[10px] text-white line-clamp-3 font-sans">
                      {post.caption}
                    </p>
                    <span className="text-[9px] uppercase tracking-wider text-teal-300 font-orbitron font-bold">
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
