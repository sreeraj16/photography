import { useState, useEffect } from 'react';

export type CursorVariant = 'default' | 'hover' | 'view' | 'drag' | 'play' | 'hidden';

export function useCustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile touch
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    // Detect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      motionQuery.removeEventListener('change', motionHandler);
    };
  }, []);

  const shouldRenderCustomCursor = !isTouchDevice && !reducedMotion && cursorVariant !== 'hidden';

  return {
    cursorPos,
    cursorVariant,
    setCursorVariant,
    shouldRenderCustomCursor
  };
}
