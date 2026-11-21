import React from 'react';
import { cn } from '../../lib/utils';
import { useAudio } from '../../hooks/useAudio';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
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

    const baseStyles = "relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-dotpic-gold disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden select-none";

    const variants = {
      primary: "bg-dotpic-gold text-dotpic-black hover:bg-dotpic-goldLight font-semibold shadow-lg shadow-dotpic-gold/10",
      secondary: "bg-dotpic-surface text-dotpic-white hover:bg-dotpic-surfaceHover border border-dotpic-border hover:border-dotpic-gold/40",
      outline: "bg-transparent text-dotpic-white border border-dotpic-gold/40 hover:border-dotpic-gold hover:text-dotpic-gold hover:bg-dotpic-gold/5",
      gold: "bg-gradient-to-r from-[#C9A96E] via-[#DFBF85] to-[#C9A96E] text-dotpic-black font-semibold hover:shadow-[0_0_20px_rgba(201,169,110,0.4)]",
      ghost: "bg-transparent text-dotpic-muted hover:text-dotpic-white hover:bg-white/5",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 rounded-sm gap-1.5",
      md: "text-xs px-5 py-2.5 rounded-sm gap-2",
      lg: "text-sm px-7 py-3.5 rounded-sm gap-2.5 tracking-widest",
      xl: "text-base px-9 py-4 rounded-sm gap-3 tracking-widest font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={handleClick}
        disabled={isLoading || props.disabled}
        {...props}
      >
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
            {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
            <span>{children}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
