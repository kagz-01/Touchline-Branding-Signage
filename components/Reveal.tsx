'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hiddenStyles: Record<RevealDirection, string> = {
    up: 'opacity-0 translate-y-10',
    left: 'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    scale: 'opacity-0 scale-95',
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out-expo ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : hiddenStyles[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}
