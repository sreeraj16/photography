import { useState } from 'react';
import { Instagram, Youtube, ArrowUpRight, Play } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { dataStore } from '../../lib/dataStore';
import { YouTubeModal } from '../../components/common/YouTubeModal';

export function SocialShowcase() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);
  const socialPosts = dataStore.getSocialPosts().slice(0, 6);
  const videos = dataStore.getVideos().slice(0, 3);

  return (
    <section className="py-24 bg-dotpic-charcoal relative border-t border-b border-dotpic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. INSTAGRAM FEED SECTION */}
        {/* ========================================================= */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">12</span>
                <div className="h-[1px] w-12 bg-dotpic-gold/50" />
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-pink-400 font-semibold">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>OFFICIAL INSTAGRAM</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-dotpic-white font-light">
                Curated Frames:{' '}
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-orange-900/30 border border-pink-500/40 text-white text-xs uppercase tracking-widest font-semibold hover:border-pink-500 hover:shadow-lg transition-all duration-300"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Curated Instagram Grid (6 tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {socialPosts.map((post) => (
              <a
                key={post.id}
                href={post.url || BRAND.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-sm overflow-hidden border border-dotpic-border bg-dotpic-surface block"
              >
                <img
                  src={post.thumbnail_url}
                  alt={post.caption || "Instagram post preview"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-center">
                  <div className="flex justify-end">
                    <Instagram className="w-4 h-4 text-pink-400" />
                  </div>
                  <p className="text-[10px] text-white line-clamp-3 font-sans">
                    {post.caption}
                  </p>
                  <span className="text-[9px] uppercase tracking-wider text-dotpic-gold font-mono">
                    View Post →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. YOUTUBE FILMS STRIP */}
        {/* ========================================================= */}
        <div className="pt-12 border-t border-dotpic-border/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">13</span>
                <div className="h-[1px] w-12 bg-dotpic-gold/50" />
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-red-400 font-semibold">
                  <Youtube className="w-3.5 h-3.5" />
                  <span>OFFICIAL YOUTUBE CHANNEL</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-dotpic-white font-light">
                Cinema in Motion:{' '}
                <a
                  href={BRAND.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-dotpic-gold hover:underline font-normal"
                >
                  {BRAND.socials.youtube.handle}
                </a>
              </h2>
            </div>

            <a
              href={BRAND.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-red-950/40 border border-red-500/40 text-white text-xs uppercase tracking-widest font-semibold hover:border-red-500 hover:shadow-lg transition-all duration-300"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Subscribe on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo({ id: vid.youtube_id, title: vid.title })}
                className="group relative bg-dotpic-black border border-dotpic-border rounded-sm overflow-hidden cursor-pointer hover:border-red-500/50 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={vid.thumbnail_url}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Red Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center group-hover:scale-110 shadow-lg transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>

                  <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider bg-black/70 px-2 py-0.5 rounded text-white border border-white/10">
                    {vid.category}
                  </span>
                </div>

                <div className="p-4">
                  <h4 className="text-sm font-serif text-white group-hover:text-dotpic-gold transition-colors font-medium truncate mb-1">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-dotpic-muted line-clamp-1">
                    {vid.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Modal Player */}
      {activeVideo && (
        <YouTubeModal
          videoId={activeVideo.id}
          title={activeVideo.title}
          isOpen={true}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
