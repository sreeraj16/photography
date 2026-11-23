import { useEffect, useState } from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';

export function CustomCursor() {
  const {
    cursorPos,
    ringPos,
    cursorVariant,
    isMouseDown,
    speed,
    angle,
    ripples,
    shouldRenderCustomCursor,
  } = useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !shouldRenderCustomCursor) return null;

  const isTextLabel = ['view', 'drag', 'play', 'zoom', 'explore'].includes(cursorVariant);
  const isHover = cursorVariant === 'hover';

  // Dynamic stretch when cursor moves swiftly
  const stretchX = 1 + Math.min(speed / 45, 0.35);
  const stretchY = 1 - Math.min(speed / 90, 0.18);
  const dynamicAngle = isHover ? 45 : isMouseDown ? 90 : speed > 2 ? angle : 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Camera Shutter Release Dual Expanding Ripple Rings on Click */}
      {ripples.map((ripple) => (
        <div key={ripple.id} className="pointer-events-none">
          {/* Inner Fast Snapping Shutter Ring */}
          <div
            className="fixed top-0 left-0 rounded-full border-2 border-teal-300 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{
              transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
              width: '42px',
              height: '42px',
              animationDuration: '0.45s',
              animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
              boxShadow: '0 0 20px rgba(45, 212, 191, 0.9)',
            }}
          />
          {/* Outer Ambient Light Bloom */}
          <div
            className="fixed top-0 left-0 rounded-full border border-teal-500/40 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{
              transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
              width: '72px',
              height: '72px',
              animationDuration: '0.7s',
              animationTimingFunction: 'cubic-bezier(0, 0, 0.1, 1)',
              boxShadow: '0 0 35px rgba(20, 184, 166, 0.5)',
            }}
          />
        </div>
      ))}

      {/* 2. Precision Center Shutter Dot with Optical Glow */}
      <div
        className="fixed top-0 left-0 rounded-full will-change-transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${
            isMouseDown ? 1.8 : isHover ? 0.6 : 1
          })`,
          width: '6px',
          height: '6px',
          backgroundColor: isMouseDown ? '#5EEAD4' : '#0D9488',
          opacity: isTextLabel ? 0 : 1,
          boxShadow: isMouseDown
            ? '0 0 16px rgba(94, 234, 212, 1), 0 0 6px rgba(13, 148, 136, 1)'
            : '0 0 8px rgba(13, 148, 136, 0.85)',
        }}
      />

      {/* 3. Camera Lens Viewfinder Reticle with Dynamic Inertia Stretch */}
      <div
        className="fixed top-0 left-0 will-change-transform flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,border-radius] duration-200 ease-out"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) rotate(${dynamicAngle}deg) scale(${
            isMouseDown ? 0.8 : isHover ? 1.25 : 1
          }) scaleX(${stretchX}) scaleY(${stretchY})`,
          width: isTextLabel ? '80px' : isHover ? '52px' : '36px',
          height: isTextLabel ? '80px' : isHover ? '52px' : '36px',
          borderRadius: isHover ? '14px' : '9999px',
          backgroundColor: isTextLabel
            ? 'rgba(13, 148, 136, 0.94)'
            : isMouseDown
            ? 'rgba(20, 184, 166, 0.28)'
            : isHover
            ? 'rgba(20, 184, 166, 0.12)'
            : 'rgba(20, 184, 166, 0.04)',
          border: isTextLabel
            ? '1.5px solid rgba(255, 255, 255, 0.85)'
            : isMouseDown
            ? '2px solid rgba(45, 212, 191, 1)'
            : isHover
            ? '1.5px solid rgba(20, 184, 166, 0.9)'
            : '1px solid rgba(20, 184, 166, 0.55)',
          backdropFilter: isTextLabel ? 'blur(12px)' : 'blur(2px)',
          boxShadow: isTextLabel
            ? '0 0 35px rgba(20, 184, 166, 0.65)'
            : isMouseDown
            ? '0 0 28px rgba(45, 212, 191, 0.75)'
            : isHover
            ? '0 0 22px rgba(20, 184, 166, 0.4)'
            : '0 0 10px rgba(20, 184, 166, 0.15)',
        }}
      >
        {/* Reticle Focus Tick Marks / Lens Corner Brackets */}
        {!isTextLabel && (
          <>
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-[5px] bg-teal-400 rounded-full opacity-90" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[2px] h-[5px] bg-teal-400 rounded-full opacity-90" />
            <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-[2px] w-[5px] bg-teal-400 rounded-full opacity-90" />
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-[2px] w-[5px] bg-teal-400 rounded-full opacity-90" />
          </>
        )}

        {/* Text Label for Interactive Media Actions */}
        {isTextLabel && (
          <span className="text-[10px] font-orbitron font-bold tracking-[0.2em] text-white uppercase select-none drop-shadow">
            {cursorVariant}
          </span>
        )}
      </div>
    </div>
  );
}
