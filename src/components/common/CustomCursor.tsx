import { useEffect, useState } from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';

export function CustomCursor() {
  const { cursorPos, cursorVariant, shouldRenderCustomCursor } = useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !shouldRenderCustomCursor) return null;

  const isTextLabel = ['view', 'drag', 'play'].includes(cursorVariant);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 ${
          isTextLabel
            ? 'w-16 h-16 bg-dotpic-gold/90 text-dotpic-black text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(201,169,110,0.5)] backdrop-blur-sm'
            : cursorVariant === 'hover'
            ? 'w-10 h-10 border border-dotpic-gold bg-dotpic-gold/10 backdrop-blur-[2px]'
            : 'w-4 h-4 border border-dotpic-gold/70 bg-dotpic-gold/20'
        }`}
      >
        {isTextLabel ? (
          <span>{cursorVariant}</span>
        ) : (
          <div className="w-1 h-1 rounded-full bg-dotpic-gold" />
        )}
      </div>
    </div>
  );
}
