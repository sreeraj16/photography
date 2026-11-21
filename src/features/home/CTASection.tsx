import { Link } from 'react-router-dom';
import { Calendar, Phone, Sparkles } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { Button } from '../../components/ui/Button';

export function CTASection() {
  return (
    <section className="py-32 bg-dotpic-black relative overflow-hidden border-t border-dotpic-border">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-dotpic-gold/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dotpic-gold/10 border border-dotpic-gold/30 text-dotpic-gold text-[10px] font-mono tracking-widest uppercase mb-6 shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>YOUR STORY DESERVES TIMELESS CRAFTSMANSHIP</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-dotpic-white font-light tracking-tight leading-[1.08] mb-6 uppercase">
          LET'S CREATE SOMETHING{' '}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-dotpic-gold via-[#F0DEC0] to-dotpic-gold font-normal drop-shadow-[0_2px_25px_rgba(201,169,110,0.5)]">
            TIMELESS.
          </span>
        </h2>

        <p className="text-sm sm:text-lg text-dotpic-muted max-w-xl mx-auto font-light leading-relaxed mb-12">
          Whether you are planning a grand royal wedding, an unforgettable college fest, or an editorial fashion collection—our calendar fills up months in advance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link to="/book" className="w-full sm:w-auto">
            <Button
              size="xl"
              variant="gold"
              className="w-full sm:w-auto shadow-[0_4px_30px_rgba(201,169,110,0.4)]"
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
              className="w-full sm:w-auto border-emerald-500/50 text-emerald-300 hover:border-emerald-400 hover:text-emerald-200 hover:bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              icon={<Phone className="w-4 h-4 text-emerald-400" />}
            >
              DIRECT WHATSAPP CHAT
            </Button>
          </a>
        </div>

        <p className="text-xs text-dotpic-muted/70 mt-8 font-mono tracking-wider">
          Fast response within 2 hours • WhatsApp Business: <a href={BRAND.socials.whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-dotpic-gold hover:underline">+91 6281392682</a>
        </p>
      </div>
    </section>
  );
}
