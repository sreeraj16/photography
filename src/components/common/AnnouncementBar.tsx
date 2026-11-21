import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { BRAND } from '../../lib/constants';

interface AnnouncementBarProps {
  text?: string;
  enabled?: boolean;
}

export function AnnouncementBar({
  text = "Now booking 2026 wedding & campus fest season • Contact +91 6281392682",
  enabled = true
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem('dotpic_announcement_dismissed') === 'true';
  });

  if (!enabled || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('dotpic_announcement_dismissed', 'true');
  };

  return (
    <div className="bg-gradient-to-r from-dotpic-charcoal via-amber-950/40 to-dotpic-charcoal border-b border-dotpic-gold/30 py-2 px-4 text-xs text-dotpic-white relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center text-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-dotpic-gold animate-ping" />
          <span className="font-light tracking-wide text-dotpic-muted">
            {text}
          </span>
          <a
            href={BRAND.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-dotpic-gold hover:underline font-medium ml-1"
          >
            Follow @_dotpic_ <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 text-dotpic-muted hover:text-dotpic-white transition-colors"
          aria-label="Dismiss Announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
