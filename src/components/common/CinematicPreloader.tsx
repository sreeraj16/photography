import { useState, useEffect } from 'react';

interface CinematicPreloaderProps {
  onComplete?: () => void;
}

export function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check session storage
    if (sessionStorage.getItem('dotpic_preloader_seen')) {
      setShouldRender(false);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem('dotpic_preloader_seen', 'true');
            setTimeout(() => {
              setShouldRender(false);
              if (onComplete) onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        const increment = Math.random() * 25 + 15;
        return Math.min(100, Math.floor(prev + increment));
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-dotpic-black flex flex-col items-center justify-center transition-all duration-700 select-none ${
        isFinished ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Animated Aperture / Logo Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border border-dotpic-gold/40 flex items-center justify-center animate-spin [animation-duration:8s]">
            <div className="w-10 h-10 rounded-full border border-dashed border-dotpic-white/60 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-dotpic-gold animate-ping [animation-duration:2s]" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-dotpic-white font-light uppercase mb-2">
          DOT<span className="text-dotpic-gold font-normal">PIC</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.35em] text-dotpic-muted font-sans mb-8">
          PHOTOGRAPHY
        </p>

        {/* Cinematic Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-dotpic-surface overflow-hidden rounded-full mb-3">
          <div
            className="h-full bg-gradient-to-r from-dotpic-gold/50 via-dotpic-gold to-dotpic-goldLight transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-48 sm:w-64 text-[10px] text-dotpic-muted font-mono tracking-widest">
          <span>LOADING STORY</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
