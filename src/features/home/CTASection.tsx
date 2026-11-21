import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { Button } from '../../components/ui/Button';

export function CTASection() {
  return (
    <section className="py-28 bg-dotpic-black relative overflow-hidden border-t border-dotpic-border">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dotpic-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.35em] text-dotpic-gold font-semibold block mb-4">
          YOUR STORY DESERVES PERFECTION
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-dotpic-white font-light tracking-tight leading-[1.15] mb-6 uppercase">
          LET'S CREATE SOMETHING{' '}
          <span className="italic text-dotpic-gold font-normal">TIMELESS.</span>
        </h2>

        <p className="text-sm sm:text-base text-dotpic-muted max-w-xl mx-auto font-light leading-relaxed mb-10">
          Whether you are planning a grand royal wedding, an unforgettable campus fest, or an editorial fashion collection—our calendar fills up months in advance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/book" className="w-full sm:w-auto">
            <Button
              size="xl"
              variant="gold"
              className="w-full sm:w-auto"
              withShutterSound
              icon={<Calendar className="w-4 h-4 text-dotpic-black" />}
            >
              BOOK YOUR SHOOT NOW
            </Button>
          </Link>

          <a
            href={BRAND.socials.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="xl"
              variant="outline"
              className="w-full sm:w-auto border-emerald-500/40 text-emerald-300 hover:border-emerald-500 hover:text-emerald-200 hover:bg-emerald-950/20"
              icon={<Phone className="w-4 h-4 text-emerald-400" />}
            >
              DIRECT WHATSAPP CHAT
            </Button>
          </a>
        </div>

        <p className="text-[11px] text-dotpic-muted/70 mt-6 font-mono">
          Fast response within 2 hours • WhatsApp Business: +91 6281392682
        </p>
      </div>
    </section>
  );
}
