import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { BRAND } from '../../lib/constants';

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dotpic-black/95 backdrop-blur-lg border-t border-dotpic-border py-2 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-sm bg-dotpic-surface border border-dotpic-border text-dotpic-white active:bg-dotpic-surfaceHover text-center transition-colors"
          aria-label="Direct Phone Call"
        >
          <Phone className="w-4 h-4 text-dotpic-gold mb-1" />
          <span className="text-[10px] uppercase tracking-wider font-medium">Call</span>
        </a>

        <a
          href={BRAND.socials.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-sm bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 active:bg-emerald-900/50 text-center transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">WhatsApp</span>
        </a>

        <Link
          to="/book"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-sm bg-dotpic-gold text-dotpic-black active:bg-dotpic-goldLight text-center transition-colors shadow-lg shadow-dotpic-gold/20"
          aria-label="Book Slot"
        >
          <Calendar className="w-4 h-4 text-dotpic-black mb-1" />
          <span className="text-[10px] uppercase tracking-wider font-bold">Book</span>
        </Link>
      </div>
    </div>
  );
}
