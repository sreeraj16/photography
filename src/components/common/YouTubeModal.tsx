import { useEffect } from 'react';
import { X } from 'lucide-react';

interface YouTubeModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function YouTubeModal({ videoId, isOpen, onClose, title = "DOTPIC Showreel" }: YouTubeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Clean video ID if URL was passed
  let cleanId = videoId;
  if (videoId.includes('v=')) {
    cleanId = videoId.split('v=')[1].split('&')[0];
  } else if (videoId.includes('youtu.be/')) {
    cleanId = videoId.split('youtu.be/')[1].split('?')[0];
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-5xl bg-dotpic-charcoal border border-dotpic-gold/40 rounded-sm overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dotpic-border bg-dotpic-black/80">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-sm font-serif tracking-wider text-dotpic-white font-medium uppercase truncate">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-white/10 text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors"
            aria-label="Close video modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 or Cinema Letterbox Video Player Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Cinematic Subtitle Bar */}
        <div className="px-6 py-3 bg-dotpic-black/90 border-t border-dotpic-border flex items-center justify-between text-xs text-dotpic-muted">
          <span>DOTPIC FILMS • Directed by DOTPIC Creative Studio</span>
          <a
            href="https://www.youtube.com/@dotpicphotography"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dotpic-gold hover:underline font-medium"
          >
            Subscribe on YouTube @dotpicphotography →
          </a>
        </div>
      </div>
    </div>
  );
}
