'use client';
import { useRef, useEffect, useState } from 'react';
import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

export function ProcessScroll({ brand }: { brand: BrandConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the component
      // 0 = top of component at bottom of viewport
      // 1 = bottom of component at top of viewport
      let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calc
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Storytelling content based on brand
  const isSignage = brand.id === 'signage';
  
  const tensionHeadline = isSignage 
    ? "Most signs look great on day one. Ours look great in year five."
    : "Sourcing 4,000 items on a tender deadline shouldn't be your headache. It's ours.";
    
  const tensionBody = isSignage
    ? "We don't just cut corners to win a quote. We engineer signage using weather-resistant acrylics, UV-stabilized vinyl, and commercial-grade LEDs so your brand doesn't fade into the background."
    : "The promo industry is full of middlemen. We own the supply chain. From digitizing the logo to the final embroidery stitch, we control the outcome so you can control your deadlines.";

  const step1 = isSignage ? "01 // STRUCTURAL FRAME" : "01 // RAW MATERIALS";
  const step2 = isSignage ? "02 // ILLUMINATION MODULES" : "02 // DIGITIZATION & SETUP";
  const step3 = isSignage ? "03 // ACRYLIC FACIA" : "03 // EMBROIDERY & PRINT";
  const step4 = isSignage ? "04 // INSTALLATION & DEPLOYMENT" : "04 // PACKAGING & DEPLOYMENT";

  // Calculate opacity/transform for steps based on scroll progress
  const getStepStyle = (threshold: number, start: number) => {
    const isActive = scrollProgress > threshold;
    const progress = Math.max(0, Math.min(1, (scrollProgress - start) * 10));
    
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 20}px)`,
      color: isActive ? 'var(--accent)' : 'var(--text-muted)'
    };
  };

  return (
    <section ref={containerRef} className="relative w-full border-t border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      {/* Tension Section */}
      <div className="max-w-content mx-auto px-6 py-32 border-b border-[var(--border)]">
        <Reveal>
          <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-6 block">
            // THE PROBLEM
          </span>
          <h2 className="font-display text-4xl md:text-6xl max-w-4xl mb-8 leading-none uppercase">
            {tensionHeadline}
          </h2>
          <p className="text-xl text-theme-body max-w-2xl font-light">
            {tensionBody}
          </p>
        </Reveal>
      </div>

      {/* Interactive Process Scroll */}
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 relative">
        {/* Sticky Visual Side */}
        <div className="hidden md:block border-r border-[var(--border)] h-[150vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center p-12 overflow-hidden">
            <div className="relative w-full aspect-square border border-[var(--border)] bg-[var(--bg)] p-8 flex items-center justify-center">
              
              {/* Abstract 3D/Process Visualization */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Layer 1 */}
                <div 
                  className="absolute inset-4 border-2 border-[var(--border)] opacity-30 transition-all duration-300"
                  style={{
                    transform: `translateZ(-50px) scale(${1 + scrollProgress * 0.2}) rotate(${scrollProgress * 45}deg)`,
                    borderColor: scrollProgress > 0.2 ? 'var(--accent)' : 'var(--border)',
                  }}
                ></div>
                
                {/* Layer 2 */}
                <div 
                  className="absolute inset-12 border-2 border-[var(--border)] opacity-50 transition-all duration-300"
                  style={{
                    transform: `translateZ(0px) scale(${1 + scrollProgress * 0.1}) rotate(${scrollProgress * -30}deg)`,
                    borderColor: scrollProgress > 0.4 ? 'var(--accent)' : 'var(--border)',
                    backgroundColor: scrollProgress > 0.4 ? 'rgba(var(--accent-rgb), 0.05)' : 'transparent'
                  }}
                ></div>
                
                {/* Layer 3 */}
                <div 
                  className="absolute inset-20 border-2 border-[var(--border)] opacity-80 flex items-center justify-center bg-[var(--bg)] transition-all duration-300"
                  style={{
                    transform: `translateZ(50px) scale(${1 + scrollProgress * 0.05})`,
                    borderColor: scrollProgress > 0.6 ? 'var(--accent)' : 'var(--border)',
                    boxShadow: scrollProgress > 0.8 ? '0 0 40px rgba(var(--accent-rgb), 0.3)' : 'none'
                  }}
                >
                  <span className="font-display text-4xl text-[var(--accent)]">
                    {scrollProgress > 0.8 ? 'DEPLOYED' : 'PROCESSING'}
                  </span>
                </div>
                
              </div>
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[url('/scanline.png')] opacity-10"></div>
            </div>
          </div>
        </div>
        
        {/* Scrolling Content Side */}
        <div className="py-32 px-6 md:px-12 flex flex-col justify-center">
          <Reveal>
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-12 block">
              // STANDARD OPERATING PROCEDURE
            </span>
          </Reveal>
          
          <div className="space-y-32">
            <div style={getStepStyle(0.2, 0.1)} className="transition-all duration-300">
              <h3 className="font-display text-3xl md:text-5xl mb-4">{step1}</h3>
              <p className="text-theme-body">We start with commercial-grade raw materials. No substitutions. No compromises. Everything is measured and staged for the production run.</p>
            </div>
            
            <div style={getStepStyle(0.4, 0.3)} className="transition-all duration-300">
              <h3 className="font-display text-3xl md:text-5xl mb-4">{step2}</h3>
              <p className="text-theme-body">Precision engineering takes over. Whether it's calibrating embroidery machines or wiring LED modules, accuracy at this stage prevents failure in the field.</p>
            </div>
            
            <div style={getStepStyle(0.6, 0.5)} className="transition-all duration-300">
              <h3 className="font-display text-3xl md:text-5xl mb-4">{step3}</h3>
              <p className="text-theme-body">The brand becomes visible. The outer shell is applied, turning raw components into a cohesive, high-impact asset ready for the world.</p>
            </div>
            
            <div style={getStepStyle(0.8, 0.7)} className="transition-all duration-300">
              <h3 className="font-display text-3xl md:text-5xl mb-4">{step4}</h3>
              <p className="text-theme-body">We don't just hand it over. We manage the final mile, ensuring the product reaches your staff or your physical sites exactly as specified.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
