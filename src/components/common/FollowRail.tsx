import { Instagram, Youtube, Phone } from 'lucide-react';
import { BRAND } from '../../lib/constants';

interface FollowRailProps {
  hidden?: boolean;
}

export function FollowRail({ hidden = false }: FollowRailProps) {
  if (hidden) return null;

  return (
    <aside
      aria-label="Social follow rail"
      className="hidden xl:flex fixed left-5 bottom-12 z-30 flex-col items-center gap-5 transition-opacity duration-300"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Instagram */}
        <div className="relative group">
          <a
            href={BRAND.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={BRAND.socials.instagram.label}
            className="w-10 h-10 rounded-full bg-dotpic-surface/80 border border-dotpic-border/80 flex items-center justify-center text-dotpic-muted hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-950/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-dotpic-charcoal border border-dotpic-border text-[10px] uppercase tracking-wider text-dotpic-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
            Instagram @_dotpic_
          </span>
        </div>

        {/* YouTube */}
        <div className="relative group">
          <a
            href={BRAND.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={BRAND.socials.youtube.label}
            className="w-10 h-10 rounded-full bg-dotpic-surface/80 border border-dotpic-border/80 flex items-center justify-center text-dotpic-muted hover:text-red-400 hover:border-red-500/50 hover:bg-red-950/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-dotpic-charcoal border border-dotpic-border text-[10px] uppercase tracking-wider text-dotpic-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
            YouTube @dotpicphotography
          </span>
        </div>

        {/* WhatsApp */}
        <div className="relative group">
          <a
            href={BRAND.socials.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={BRAND.socials.whatsapp.label}
            className="w-10 h-10 rounded-full bg-dotpic-surface/80 border border-dotpic-border/80 flex items-center justify-center text-dotpic-muted hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-950/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <Phone className="w-4 h-4" />
          </a>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-dotpic-charcoal border border-dotpic-border text-[10px] uppercase tracking-wider text-dotpic-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp +91 6281392682
          </span>
        </div>
      </div>

      {/* Thin Gold Hairline & Vertical Label */}
      <div className="flex flex-col items-center gap-3">
        <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.25em] uppercase text-dotpic-gold font-medium">
          FOLLOW
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-dotpic-gold/50 to-transparent" />
      </div>
    </aside>
  );
}
