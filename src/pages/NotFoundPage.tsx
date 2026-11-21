import { Link } from 'react-router-dom';
import { Camera, ArrowLeft, Instagram, Youtube } from 'lucide-react';
import { BRAND } from '../lib/constants';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 shadow-sm">
        <Camera className="w-8 h-8" />
      </div>

      <span className="text-xs font-orbitron uppercase tracking-[0.25em] text-teal-600 dark:text-teal-400 block mb-2 font-semibold">
        ERROR 404 • FRAME OUT OF FOCUS
      </span>

      <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white mb-4">
        Moment Not Found
      </h1>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
        The photograph or page you are searching for may have been archived or moved to a different gallery.
      </p>

      <div className="flex gap-4">
        <Link to="/">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4 text-white" />}>
            Return to Homepage
          </Button>
        </Link>
      </div>

      {/* Quiet Social Links (Section 12.1 Requirement) */}
      <div className="mt-12 pt-8 border-t border-dotpic-border/60 flex items-center gap-6 text-xs text-dotpic-muted">
        <span>Follow our daily work:</span>
        <a href={BRAND.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-1">
          <Instagram className="w-3.5 h-3.5" /> @_dotpic_
        </a>
        <a href={BRAND.socials.youtube.url} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 flex items-center gap-1">
          <Youtube className="w-3.5 h-3.5" /> @dotpicphotography
        </a>
      </div>
    </div>
  );
}
