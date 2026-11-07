'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnimationEngine() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. SCROLL REVEAL OBSERVER (HCI: gentle reveals, stagger delays)
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optional: unobserve once revealed to keep DOM performant
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
    });

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale, .reveal-stagger');
    revealElements.forEach((el) => observer.observe(el));

    // 2. PARALLAX SCROLL LISTENER (GPU-accelerated, throttled with requestAnimationFrame)
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        // Parallax background orbs
        const orbs = document.querySelectorAll<HTMLElement>('.parallax-slow');
        orbs.forEach((orb) => {
          const speed = parseFloat(orb.dataset.speed || '0.15');
          orb.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. TILT & MOUSE GLARE FOR GLASSMORPHIC CARDS (Desktop only, touch-safe)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    let removeMouseListeners: (() => void)[] = [];

    if (!isTouch) {
      const cards = document.querySelectorAll<HTMLElement>('.tilt-card, .glass-interactive');
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6; // subtle tilt angle
          const rotateY = ((x - centerX) / centerX) * 6;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
        };

        const handleMouseLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        removeMouseListeners.push(() => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      removeMouseListeners.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}

