import { useState, useEffect } from 'react';
import { DotpicLogo } from './DotpicLogo';

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
      className={`fixed inset-0 z-[100] bg-[#060A0E] flex flex-col items-center justify-center transition-all duration-700 select-none ${
        isFinished ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Official DOTPIC Logo Animation */}
        <div className="relative mb-6 drop-shadow-[0_0_35px_rgba(20,184,166,0.35)]">
          <DotpicLogo size="xl" />
        </div>

        {/* Cinematic Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-slate-800 overflow-hidden rounded-full mb-3">
          <div
            className="h-full bg-gradient-to-r from-teal-600 via-teal-400 to-teal-300 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-48 sm:w-64 text-[10px] text-teal-400/80 font-orbitron tracking-widest">
          <span>LOADING STUDIO</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
