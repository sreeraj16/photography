import React, { useState, useRef, useCallback } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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
      onMouseDown={() => { isDragging.current = true; }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative overflow-hidden select-none cursor-ew-resize rounded-sm border border-dotpic-border group ${className}`}
    >
      {/* After (Graded) Image (Full Width background) */}
      <img
        src={afterImage}
        alt="DOTPIC Color Retouch"
        className="w-full h-full object-cover block"
        loading="lazy"
      />

      {/* Before (Raw) Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt="Raw Camera File"
          className="absolute inset-0 w-full h-full object-cover max-w-none grayscale brightness-90 contrast-90"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          loading="lazy"
        />
        {/* Label Before */}
        <span className="absolute top-4 left-4 bg-black/80 border border-white/20 text-dotpic-muted px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono rounded">
          {beforeLabel}
        </span>
      </div>

      {/* Label After */}
      <span className="absolute top-4 right-4 bg-black/80 border border-dotpic-gold/40 text-dotpic-gold px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono rounded">
        {afterLabel}
      </span>

      {/* Gold Divider Line & Drag Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-dotpic-gold"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dotpic-black border-2 border-dotpic-gold flex items-center justify-center shadow-[0_0_15px_rgba(201,169,110,0.6)]">
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 border-l border-r border-dotpic-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
