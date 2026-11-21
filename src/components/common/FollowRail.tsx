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
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-500 hover:border-pink-500 hover:scale-110 transition-all duration-300 shadow-sm backdrop-blur-sm"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-orbitron uppercase tracking-wider text-slate-800 dark:text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
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
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300 shadow-sm backdrop-blur-sm"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-orbitron uppercase tracking-wider text-slate-800 dark:text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
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
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 hover:scale-110 transition-all duration-300 shadow-sm backdrop-blur-sm"
          >
            <Phone className="w-4 h-4" />
          </a>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-orbitron uppercase tracking-wider text-slate-800 dark:text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            WhatsApp +91 6281392682
          </span>
        </div>
      </div>

      {/* Thin Hairline & Vertical Label */}
      <div className="flex flex-col items-center gap-3">
        <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-orbitron tracking-[0.25em] uppercase text-teal-600 dark:text-teal-400 font-semibold">
          FOLLOW
        </span>
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-teal-500/50 to-transparent" />
      </div>
    </aside>
  );
}
