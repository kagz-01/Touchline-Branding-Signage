'use client';

import { useEffect, useRef, ReactNode } from 'react';

type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
};

export function Parallax({ children, speed = 0.5, className = '', direction = 'up' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const scrolled = window.innerHeight - rect.top;
          const rate = scrolled * speed;

          let transform = '';
          switch (direction) {
            case 'up':
              transform = `translateY(${rate * -0.1}px)`;
              break;
            case 'down':
              transform = `translateY(${rate * 0.1}px)`;
              break;
            case 'left':
              transform = `translateX(${rate * -0.1}px)`;
              break;
            case 'right':
              transform = `translateX(${rate * 0.1}px)`;
              break;
          }

          el.style.transform = transform;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div ref={ref} className={`parallax-container ${className}`}>
      <div className="parallax-slow">{children}</div>
    </div>
  );
}
