import { useState, useEffect, useRef } from 'react';

export type CursorVariant = 'default' | 'hover' | 'view' | 'drag' | 'play' | 'zoom' | 'explore' | 'hidden';

export interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export function useCustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(0);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const prevTargetPos = useRef({ x: -100, y: -100 });
  const currentRingPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

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

    // Smooth RAF animation loop for ring lerp with velocity and direction
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      currentRingPos.current.x = lerp(currentRingPos.current.x, targetPos.current.x, 0.22);
      currentRingPos.current.y = lerp(currentRingPos.current.y, targetPos.current.y, 0.22);
      setRingPos({ x: currentRingPos.current.x, y: currentRingPos.current.y });

      // Calculate instantaneous velocity for dynamic stretch
      const vx = targetPos.current.x - prevTargetPos.current.x;
      const vy = targetPos.current.y - prevTargetPos.current.y;
      const currentSpeed = Math.min(Math.sqrt(vx * vx + vy * vy), 40);
      setSpeed((prev) => lerp(prev, currentSpeed, 0.2));

      if (currentSpeed > 1) {
        const rad = Math.atan2(vy, vx) * (180 / Math.PI);
        setAngle(rad);
      }

      prevTargetPos.current = { ...targetPos.current };
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor') as CursorVariant;
        setCursorVariant(val || 'hover');
      } else if (target.closest('button, a, input, textarea, select, [role="button"], label, .cursor-pointer')) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setCursorVariant('default');
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      motionQuery.removeEventListener('change', motionHandler);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const shouldRenderCustomCursor = !isTouchDevice && !reducedMotion && isVisible && cursorVariant !== 'hidden';

  return {
    cursorPos,
    ringPos,
    cursorVariant,
    isMouseDown,
    speed,
    angle,
    ripples,
    shouldRenderCustomCursor,
  };
}
