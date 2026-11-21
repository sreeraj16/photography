import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'outline' | 'dark' | 'success';
}

export function Badge({ className, variant = 'gold', children, ...props }: BadgeProps) {
  const variants = {
    gold: "bg-dotpic-gold/10 text-dotpic-gold border border-dotpic-gold/30",
    outline: "bg-transparent text-dotpic-muted border border-dotpic-border",
    dark: "bg-dotpic-surface text-dotpic-white border border-white/10",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-medium tracking-wider uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
