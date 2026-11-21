import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Original Raw",
  afterLabel = "DOTPIC Color Grade",
  className = ""
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();

    const ro = new ResizeObserver(() => updateWidth());
    ro.observe(containerRef.current);
    window.addEventListener('resize', updateWidth);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percent = Math.min(100, Math.max(0, (x / width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        isDragging.current = true;
        handleMove(e.clientX);
      }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
      onMouseMove={handleMouseMove}
      onTouchStart={(e) => {
        if (e.touches[0]) handleMove(e.touches[0].clientX);
      }}
      onTouchMove={handleTouchMove}
      data-cursor="drag"
      className={`relative overflow-hidden select-none cursor-ew-resize rounded-3xl border border-[#E2DCD0] dark:border-slate-800 shadow-xl group ${className}`}
    >
      {/* After (Graded) Image */}
      <img
        src={afterImage}
        alt="DOTPIC Color Retouch Graded"
        className="w-full h-full object-cover block pointer-events-none"
        loading="lazy"
      />

      {/* Before (Raw) Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt="Raw Camera File Before"
          className="absolute inset-0 h-full object-cover max-w-none grayscale brightness-90 contrast-90"
          style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
          loading="lazy"
        />

        {/* Label Before */}
        <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 text-slate-300 px-3 py-1 text-[10px] uppercase tracking-widest font-orbitron rounded-full shadow-md">
          {beforeLabel}
        </span>
      </div>

      {/* Label After */}
      <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-teal-500/50 text-teal-300 px-3 py-1 text-[10px] uppercase tracking-widest font-orbitron rounded-full shadow-md">
        {afterLabel}
      </span>

      {/* Hint banner */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-teal-500/30 opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[10px] font-orbitron text-teal-200 tracking-wider">
        <ChevronsLeftRight className="w-3.5 h-3.5 text-teal-400" />
        <span>DRAG TO REVEAL RETOUCH</span>
      </div>

      {/* Teal Divider Line & Drag Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-gradient-to-b from-teal-500 via-white to-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-teal-400 flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.7)] group-hover:scale-110 transition-transform">
          <ChevronsLeftRight className="w-4 h-4 text-teal-400" />
        </div>
      </div>
    </div>
  );
}
