import React from 'react';
import { cn } from '../../lib/utils';
import { useAudio } from '../../hooks/useAudio';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'cinema';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  withShutterSound?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    withShutterSound = false,
    icon,
    children, 
    onClick,
    ...props 
  }, ref) => {
    const { playShutterSound } = useAudio();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (withShutterSound) {
        playShutterSound();
      }
      if (onClick) onClick(e);
    };

    const baseStyles = "relative inline-flex items-center justify-center font-sans uppercase transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-dotpic-gold disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden select-none active:scale-[0.98]";

    const variants = {
      primary: "bg-gradient-to-r from-[#C9A96E] via-[#DFBF85] to-[#B89255] text-dotpic-black font-bold tracking-[0.18em] shadow-[0_4px_20px_rgba(201,169,110,0.3)] hover:shadow-[0_6px_30px_rgba(201,169,110,0.5)] hover:-translate-y-0.5",
      gold: "bg-gradient-to-r from-[#C9A96E] via-[#E8D1A7] to-[#C9A96E] text-dotpic-black font-bold tracking-[0.2em] shadow-[0_4px_25px_rgba(201,169,110,0.35)] hover:shadow-[0_8px_35px_rgba(201,169,110,0.6)] hover:-translate-y-0.5 border border-white/30",
      secondary: "bg-dotpic-surface/90 text-dotpic-white hover:text-dotpic-gold hover:bg-dotpic-surface border border-dotpic-border hover:border-dotpic-gold/50 backdrop-blur-md tracking-[0.15em] font-medium shadow-md",
      outline: "bg-black/40 text-dotpic-white border border-dotpic-gold/50 hover:border-dotpic-gold hover:text-dotpic-gold hover:bg-dotpic-gold/10 backdrop-blur-md tracking-[0.18em] font-medium shadow-[0_2px_15px_rgba(0,0,0,0.6)]",
      cinema: "bg-black/70 text-dotpic-gold border border-dotpic-gold/40 hover:border-dotpic-gold hover:bg-dotpic-black text-white hover:shadow-[0_0_25px_rgba(201,169,110,0.3)] tracking-[0.2em] font-mono text-xs",
      ghost: "bg-transparent text-dotpic-muted hover:text-dotpic-white hover:bg-white/5 tracking-[0.15em] font-medium",
    };

    const sizes = {
      sm: "text-[11px] px-3.5 py-2 rounded-full gap-1.5",
      md: "text-xs px-5 py-2.5 rounded-full gap-2",
      lg: "text-xs sm:text-sm px-7 py-3.5 rounded-full gap-2.5 font-semibold",
      xl: "text-sm sm:text-base px-8 sm:px-10 py-4 rounded-full gap-3 font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={handleClick}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Animated Light Sweep Sheen */}
        <span 
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out pointer-events-none"
        />

        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            {icon && <span className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0">{icon}</span>}
            <span className="relative z-10">{children}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
