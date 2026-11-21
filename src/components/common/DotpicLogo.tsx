import React from 'react';

interface DotpicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
}

export function DotpicLogo({ className = '', size = 'md', iconOnly = false }: DotpicLogoProps) {
  const sizeStyles = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  if (iconOnly) {
    return (
      <div className={`relative overflow-hidden rounded-md ${sizeStyles[size]} ${className}`}>
        <img
          src="/dotpic-official-logo.jpg"
          alt="DOTPIC"
          className="w-full h-full object-cover scale-[1.3] -translate-y-1 mix-blend-screen filter contrast-125 brightness-105 pointer-events-none select-none"
        />
      </div>
    );
  }

  // Full lockup (Camera mark + DotPic + PHOTOGRAPHY)
  const fullSizeStyles = {
    sm: "h-10",
    md: "h-12 sm:h-14",
    lg: "h-20",
    xl: "h-28",
  };

  return (
    <div className={`inline-flex items-center group relative select-none ${className}`}>
      <img
        src="/dotpic-official-logo.jpg"
        alt="DOTPIC PHOTOGRAPHY"
        className={`${fullSizeStyles[size]} w-auto object-contain mix-blend-screen filter contrast-125 brightness-110 transition-transform duration-300 group-hover:scale-105 pointer-events-none`}
      />
    </div>
  );
}
