import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'outline' | 'dark' | 'success' | 'teal';
}

export function Badge({ className, variant = 'teal', children, ...props }: BadgeProps) {
  const variants = {
    teal: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30",
    gold: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30",
    outline: "bg-transparent text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-800",
    dark: "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-800",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-orbitron font-semibold tracking-wider uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
