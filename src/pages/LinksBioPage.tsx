import { Link } from 'react-router-dom';
import {
  Calendar,
  MessageCircle,
  Instagram,
  Youtube,
  GraduationCap,
  Camera,
  Sparkles,
  Globe,
  ArrowUpRight,
  Share2
} from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { BRAND } from '../lib/constants';

export function LinksBioPage() {
  const items = dataStore.getLinksItems().filter(i => i.is_active);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-4 h-4 text-dotpic-gold" />;
      case 'MessageCircle': return <MessageCircle className="w-4 h-4 text-emerald-400" />;
      case 'Instagram': return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'Youtube': return <Youtube className="w-4 h-4 text-red-500" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4 text-amber-300" />;
      case 'Camera': return <Camera className="w-4 h-4 text-dotpic-gold" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-yellow-300" />;
      default: return <Globe className="w-4 h-4 text-dotpic-gold" />;
    }
  };

  return (
    <div className="min-h-screen bg-dotpic-black text-dotpic-white flex flex-col items-center justify-between p-4 sm:p-6 pt-12 pb-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-dotpic-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Brand Logo & Avatar */}
        <Link to="/" className="mb-4 inline-block group">
          <img src="/logo.svg" alt="DOTPIC" className="h-12 w-auto mx-auto group-hover:scale-105 transition-transform" />
        </Link>

        {/* Tagline */}
        <p className="text-xs text-dotpic-muted max-w-xs mx-auto mb-6 leading-relaxed">
          {BRAND.tagline}
        </p>

        {/* Social Row Icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href={BRAND.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dotpic-charcoal border border-dotpic-border flex items-center justify-center text-pink-400 hover:border-pink-500 hover:scale-110 transition-all"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={BRAND.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dotpic-charcoal border border-dotpic-border flex items-center justify-center text-red-500 hover:border-red-500 hover:scale-110 transition-all"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href={BRAND.socials.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dotpic-charcoal border border-dotpic-border flex items-center justify-center text-emerald-400 hover:border-emerald-500 hover:scale-110 transition-all"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Links Buttons List */}
        <div className="w-full space-y-3.5">
          {items.map((item) => {
            const isExternal = item.url.startsWith('http');
            const targetUrl = isExternal ? item.url : `${item.url}?utm_source=instagram_bio&utm_medium=linktree`;

            return isExternal ? (
              <a
                key={item.id}
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 rounded-sm bg-dotpic-charcoal border border-dotpic-border hover:border-dotpic-gold flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-dotpic-white hover:text-dotpic-gold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] group"
              >
                <div className="flex items-center gap-3">
                  <span className="group-hover:scale-110 transition-transform">{getIcon(item.icon_name)}</span>
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge_text && (
                    <span className="text-[9px] bg-dotpic-gold/20 text-dotpic-gold px-2 py-0.5 rounded font-mono font-bold">
                      {item.badge_text}
                    </span>
                  )}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
              </a>
            ) : (
              <Link
                key={item.id}
                to={targetUrl}
                className="w-full p-4 rounded-sm bg-dotpic-charcoal border border-dotpic-border hover:border-dotpic-gold flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-dotpic-white hover:text-dotpic-gold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] group"
              >
                <div className="flex items-center gap-3">
                  <span className="group-hover:scale-110 transition-transform">{getIcon(item.icon_name)}</span>
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge_text && (
                    <span className="text-[9px] bg-dotpic-gold/20 text-dotpic-gold px-2 py-0.5 rounded font-mono font-bold">
                      {item.badge_text}
                    </span>
                  )}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center pt-8 text-[11px] text-dotpic-muted font-mono relative z-10">
        <Link to="/" className="text-dotpic-gold hover:underline">
          Visit Full DOTPIC Photography Website →
        </Link>
      </footer>
    </div>
  );
}
