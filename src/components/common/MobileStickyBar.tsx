import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { BRAND } from '../../lib/constants';

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#080C0E]/95 backdrop-blur-xl border-t border-[#E2DCD0] dark:border-slate-800/80 px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-lg">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-orbitron text-center transition-colors shadow-sm"
          aria-label="Direct Phone Call"
        >
          <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Call</span>
        </a>

        <a
          href={BRAND.socials.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/40 text-teal-700 dark:text-teal-300 font-orbitron text-center transition-colors shadow-sm"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">WhatsApp</span>
        </a>

        <Link
          to="/book"
          className="relative flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white font-orbitron text-center transition-all shadow-[0_2px_15px_rgba(20,184,166,0.35)] font-bold"
          aria-label="Book Slot"
        >
          <Calendar className="w-3.5 h-3.5 text-white" />
          <span className="text-[10px] uppercase tracking-wider">Book</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-ping absolute top-1.5 right-1.5" />
        </Link>
      </div>
    </div>
  );
}
