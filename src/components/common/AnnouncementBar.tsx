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
    <div className="bg-[#FAF7F2] dark:bg-[#0C1318] border-b border-[#E2DCD0] dark:border-teal-500/30 py-2 px-4 text-xs text-slate-800 dark:text-slate-200 relative z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center text-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          <span className="font-orbitron text-[11px] font-medium tracking-wide text-slate-700 dark:text-slate-300">
            {text}
          </span>
          <a
            href={BRAND.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:underline font-orbitron font-semibold ml-1"
          >
            Follow @_dotpic_ <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
          aria-label="Dismiss Announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
