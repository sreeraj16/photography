import { useEffect, useState } from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';

export function CustomCursor() {
  const {
    cursorPos,
    ringPos,
    cursorVariant,
    isMouseDown,
    shouldRenderCustomCursor,
  } = useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !shouldRenderCustomCursor) return null;

  const isHover = cursorVariant === 'hover';
  const isAction = ['view', 'drag', 'play', 'zoom', 'explore'].includes(cursorVariant);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Precision Center Dot (Small 4px, shrinks on click) */}
      <div
        className="fixed top-0 left-0 rounded-full will-change-transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${
            isMouseDown ? 0.75 : 1
          })`,
          width: '4px',
          height: '4px',
          backgroundColor: '#0D9488',
          boxShadow: '0 0 6px rgba(13, 148, 136, 0.9)',
        }}
      />

      {/* 2. Sleek Minimal Outer Ring (18px, contracts on click, never grows big) */}
      <div
        className="fixed top-0 left-0 will-change-transform flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-[width,height,transform,border-color,background-color] duration-150 ease-out"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${
            isMouseDown ? 0.75 : isHover ? 1.25 : 1
          })`,
          width: isAction ? '46px' : isHover ? '22px' : '18px',
          height: isAction ? '46px' : isHover ? '22px' : '18px',
          borderRadius: '9999px',
          backgroundColor: isAction
            ? 'rgba(13, 148, 136, 0.88)'
            : isHover
            ? 'rgba(20, 184, 166, 0.12)'
            : 'rgba(20, 184, 166, 0.04)',
          border: isAction
            ? '1.5px solid rgba(255, 255, 255, 0.9)'
            : isMouseDown
            ? '1.5px solid rgba(13, 148, 136, 1)'
            : isHover
            ? '1.5px solid rgba(20, 184, 166, 0.85)'
            : '1px solid rgba(20, 184, 166, 0.55)',
          backdropFilter: isAction ? 'blur(8px)' : 'none',
          boxShadow: isAction
            ? '0 0 20px rgba(20, 184, 166, 0.5)'
            : isHover
            ? '0 0 10px rgba(20, 184, 166, 0.25)'
            : 'none',
        }}
      >
        {isAction && (
          <span className="text-[8px] font-orbitron font-bold tracking-widest text-white uppercase select-none">
            {cursorVariant}
          </span>
        )}
      </div>
    </div>
  );
}
