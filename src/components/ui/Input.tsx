import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-dotpic-charcoal/80 border border-dotpic-border/80 backdrop-blur-sm rounded-sm transition-all duration-300 hover:border-dotpic-gold/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-dotpic-surface/90 border border-dotpic-border px-4 py-3 rounded-sm text-sm text-dotpic-white placeholder:text-dotpic-muted/50 focus:outline-none focus:border-dotpic-gold focus:ring-1 focus:ring-dotpic-gold transition-colors duration-200",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-dotpic-surface/90 border border-dotpic-border px-4 py-3 rounded-sm text-sm text-dotpic-white placeholder:text-dotpic-muted/50 focus:outline-none focus:border-dotpic-gold focus:ring-1 focus:ring-dotpic-gold transition-colors duration-200 resize-y",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full bg-dotpic-surface/90 border border-dotpic-border px-4 py-3 rounded-sm text-sm text-dotpic-white focus:outline-none focus:border-dotpic-gold focus:ring-1 focus:ring-dotpic-gold transition-colors duration-200 appearance-none cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";
