import { useEffect, useState } from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';

export function CustomCursor() {
  const { cursorPos, ringPos, cursorVariant, shouldRenderCustomCursor } = useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !shouldRenderCustomCursor) return null;

  const isTextLabel = ['view', 'drag', 'play', 'zoom', 'explore'].includes(cursorVariant);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Precision Center Dot (Instant mouse tracking) */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-dotpic-gold -translate-x-1/2 -translate-y-1/2 will-change-transform shadow-[0_0_8px_rgba(201,169,110,0.8)]"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          opacity: isTextLabel ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* 2. Fluid Physics Trailing Ring */}
      <div
        className="fixed top-0 left-0 will-change-transform flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,border-radius] duration-300 ease-out"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`,
          width: isTextLabel ? '74px' : cursorVariant === 'hover' ? '46px' : '32px',
          height: isTextLabel ? '74px' : cursorVariant === 'hover' ? '46px' : '32px',
          borderRadius: '9999px',
          backgroundColor: isTextLabel
            ? 'rgba(201, 169, 110, 0.95)'
            : cursorVariant === 'hover'
            ? 'rgba(201, 169, 110, 0.12)'
            : 'rgba(201, 169, 110, 0.05)',
          border: isTextLabel
            ? '1.5px solid rgba(255, 255, 255, 0.4)'
            : cursorVariant === 'hover'
            ? '1.5px solid rgba(201, 169, 110, 0.8)'
            : '1px solid rgba(201, 169, 110, 0.4)',
          backdropFilter: isTextLabel ? 'blur(8px)' : 'blur(2px)',
          boxShadow: isTextLabel
            ? '0 0 25px rgba(201, 169, 110, 0.5)'
            : cursorVariant === 'hover'
            ? '0 0 15px rgba(201, 169, 110, 0.2)'
            : 'none',
        }}
      >
        {isTextLabel && (
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-dotpic-black uppercase select-none">
            {cursorVariant}
          </span>
        )}
      </div>
    </div>
  );
}
