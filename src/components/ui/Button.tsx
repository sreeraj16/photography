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

    const baseStyles = "relative inline-flex items-center justify-center font-orbitron uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden select-none active:scale-[0.97]";

    const variants = {
      primary: "bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 hover:from-teal-500 hover:via-teal-400 hover:to-teal-600 text-white font-semibold shadow-[0_4px_20px_rgba(13,148,136,0.35)] hover:shadow-[0_8px_30px_rgba(20,184,166,0.55)] border border-teal-300/30 hover:-translate-y-0.5",
      gold: "bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600 hover:from-teal-400 hover:via-teal-300 hover:to-teal-500 text-white font-semibold shadow-[0_4px_25px_rgba(20,184,166,0.45)] hover:shadow-[0_8px_35px_rgba(20,184,166,0.65)] border border-white/40 hover:-translate-y-0.5",
      secondary: "bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-800 hover:border-teal-500/60 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-slate-800/90 backdrop-blur-md shadow-sm font-medium",
      outline: "bg-transparent text-teal-700 dark:text-teal-300 border-2 border-teal-600/70 dark:border-teal-400/70 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 dark:hover:text-slate-950 font-semibold shadow-[0_2px_15px_rgba(13,148,136,0.15)]",
      cinema: "bg-slate-950/80 text-teal-300 border border-teal-500/40 hover:border-teal-400 hover:bg-slate-900 text-xs shadow-[0_0_20px_rgba(20,184,166,0.25)]",
      ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/10 font-medium",
    };

    const sizes = {
      sm: "text-[10px] px-4 py-2 rounded-full gap-1.5",
      md: "text-xs px-5 py-2.5 rounded-full gap-2",
      lg: "text-xs sm:text-sm px-7 py-3 rounded-full gap-2.5 font-semibold",
      xl: "text-sm sm:text-base px-8 sm:px-10 py-3.5 rounded-full gap-3 font-bold",
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
        <span className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
          <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[200%] transition-transform duration-700 ease-out group-hover:translate-x-[350%]" />
        </span>

        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">{icon}</span>
        )}

        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
