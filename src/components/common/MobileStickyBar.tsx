import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { BRAND } from '../../lib/constants';

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dotpic-black/95 backdrop-blur-xl border-t border-dotpic-border/80 px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-sm bg-dotpic-surface border border-dotpic-border text-dotpic-white active:bg-dotpic-surfaceHover text-center transition-colors shadow-sm"
          aria-label="Direct Phone Call"
        >
          <Phone className="w-3.5 h-3.5 text-dotpic-gold" />
          <span className="text-[11px] uppercase tracking-wider font-semibold">Call</span>
        </a>

        <a
          href={BRAND.socials.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-sm bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 active:bg-emerald-900/60 text-center transition-colors shadow-sm"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] uppercase tracking-wider font-semibold">WhatsApp</span>
        </a>

        <Link
          to="/book"
          className="relative flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-sm bg-gradient-to-r from-dotpic-gold via-dotpic-goldLight to-dotpic-gold text-dotpic-black active:brightness-95 text-center transition-all shadow-[0_0_15px_rgba(201,169,110,0.3)] font-bold"
          aria-label="Book Slot"
        >
          <Calendar className="w-3.5 h-3.5 text-dotpic-black" />
          <span className="text-[11px] uppercase tracking-wider">Book</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black/60 animate-ping absolute top-1.5 right-1.5" />
        </Link>
      </div>
    </div>
  );
}
