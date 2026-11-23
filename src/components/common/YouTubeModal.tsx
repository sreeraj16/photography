import { useEffect } from 'react';
import { X, Film } from 'lucide-react';

interface YouTubeModalProps {
  videoId?: string;
  directVideoUrl?: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function YouTubeModal({ videoId = "", directVideoUrl = "", isOpen, onClose, title = "DOTPIC Cinema Showreel" }: YouTubeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine if this is a direct uploaded/file video
  const isDirectVideo = Boolean(
    directVideoUrl ||
    videoId.startsWith('data:video') ||
    videoId.startsWith('blob:') ||
    videoId.includes('.mp4') ||
    videoId.includes('.webm') ||
    videoId.includes('.mov')
  );

  const directSource = directVideoUrl || videoId;

  // Clean video ID if URL was passed
  let cleanId = videoId;
  if (!isDirectVideo) {
    if (videoId.includes('v=')) {
      cleanId = videoId.split('v=')[1].split('&')[0];
    } else if (videoId.includes('youtu.be/')) {
      cleanId = videoId.split('youtu.be/')[1].split('?')[0];
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-5xl bg-slate-950 border border-teal-500/40 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-black/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-orbitron tracking-wider text-white font-medium uppercase truncate">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-teal-400 transition-colors"
            aria-label="Close video modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Cinema Player Frame (Direct Video or YouTube) */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {isDirectVideo ? (
            <video
              src={directSource}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>

        {/* Cinematic Subtitle Bar */}
        <div className="px-6 py-3 bg-black/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-orbitron">
          <span>DOTPIC CINEMA // HYDERABAD ARCHIVES</span>
          <a
            href="https://www.youtube.com/@dotpicphotography"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 hover:underline font-semibold"
          >
            Official Channel: @dotpicphotography →
          </a>
        </div>
      </div>
    </div>
  );
}
