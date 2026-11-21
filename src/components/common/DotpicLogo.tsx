import React from 'react';

interface DotpicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
}

export function DotpicLogo({ className = '', size = 'md', iconOnly = false }: DotpicLogoProps) {
  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-11 w-11",
    lg: "h-14 w-14",
    xl: "h-20 w-20",
  };

  const fullSizes = {
    sm: "h-9 sm:h-10",
    md: "h-11 sm:h-12",
    lg: "h-16 sm:h-20",
    xl: "h-24 sm:h-28",
  };

  if (iconOnly) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-[#060A0E] p-1 border border-teal-500/30 shadow-md ${iconSizes[size]} ${className}`}>
        <img
          src="/dotpic-official-logo.jpg"
          alt="DOTPIC"
          className="w-full h-full object-cover scale-[1.3] -translate-y-0.5 mix-blend-screen filter contrast-125 brightness-105 pointer-events-none select-none"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center group relative select-none rounded-xl bg-[#060A0E] px-2.5 py-1 sm:px-3 sm:py-1.5 border border-teal-500/30 hover:border-teal-400/60 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] ${className}`}>
      <img
        src="/dotpic-official-logo.jpg"
        alt="DOTPIC PHOTOGRAPHY"
        className={`${fullSizes[size]} w-auto object-contain mix-blend-screen filter contrast-125 brightness-110 transition-transform duration-300 group-hover:scale-105 pointer-events-none`}
      />
    </div>
  );
}
