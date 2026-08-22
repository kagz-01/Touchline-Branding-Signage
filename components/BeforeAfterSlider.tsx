'use client';
import { useState, useRef } from 'react';

export function BeforeAfterSlider({ 
  afterImage, 
  beforeImage, 
  alt 
}: { 
  afterImage: string; 
  beforeImage?: string; 
  alt: string 
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    
    setSliderPosition(percent);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-ew-resize select-none group"
      onMouseMove={(e) => {
        if (e.buttons === 1) handleMove(e);
      }}
      onTouchMove={handleMove}
      onClick={handleMove}
    >
      <div className="absolute inset-0 w-full h-full">
        {beforeImage ? (
          <img src={beforeImage} alt={`Before ${alt}`} className="w-full h-full object-cover" draggable={false} />
        ) : (
          <img src={afterImage} alt={`Before ${alt}`} className="w-full h-full object-cover grayscale brightness-50" draggable={false} />
        )}
      </div>

      <div 
        className="absolute inset-0 w-full h-full border-r border-[var(--accent)] shadow-[2px_0_15px_rgba(0,0,0,0.8)]"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img src={afterImage} alt={`After ${alt}`} className="w-full h-full object-cover" draggable={false} />
      </div>

      <div 
        className="absolute top-0 bottom-0 w-px bg-[var(--accent)] flex items-center justify-center transform -translate-x-1/2 pointer-events-none z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 bg-[var(--bg)] border border-[var(--accent)] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <div className="flex gap-1">
            <span className="w-px h-3 bg-[var(--accent)]"></span>
            <span className="w-px h-3 bg-[var(--accent)]"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
