'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectPhotoProps {
  src: string;
  alt: string;
  division: 'branding' | 'signage' | 'hub';
  badge?: string;
  aspect?: string;
  className?: string;
}

export function ProjectPhoto({
  src,
  alt,
  division,
  badge,
  aspect = 'aspect-[4/3]',
  className = '',
}: ProjectPhotoProps) {
  const [error, setError] = useState(false);

  const isBranding = division === 'branding';
  const accentColor = isBranding ? '#c8960c' : '#0070f3';
  const ambientBg = isBranding
    ? 'from-[#1c160c] via-[#120f09] to-[#0a0805]'
    : 'from-[#0e1824] via-[#091018] to-[#04080e]';
  const borderTone = isBranding ? 'border-amber-900/30' : 'border-blue-900/30';

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-md)] border ${borderTone} bg-gradient-to-br ${ambientBg} ${aspect} ${className} group`}
    >
      {/* If photo exists, render Image */}
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setError(true)}
        />
      ) : null}

      {/* Fallback Graphic (rendered if image file is missing or still being uploaded) */}
      {error && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 select-none">
          {/* Micro Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, ${accentColor} 0px, ${accentColor} 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, ${accentColor} 0px, ${accentColor} 1px, transparent 1px, transparent 32px)`,
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            {badge && (
              <span
                className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded"
                style={{
                  color: accentColor,
                  backgroundColor: `${accentColor}18`,
                  borderColor: `${accentColor}33`,
                  borderWidth: '1px',
                }}
              >
                {badge}
              </span>
            )}
            <span className="font-mono text-[9px] text-[var(--text-muted)] opacity-60">
              TOUCHLINE {division.toUpperCase()}
            </span>
          </div>

          <div className="relative z-10 my-auto text-center py-4">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 shadow-inner"
              style={{
                backgroundColor: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth={1.5}
              >
                {isBranding ? (
                  <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                ) : (
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                )}
              </svg>
            </div>
            <p className="text-sm font-semibold text-[var(--text)] tracking-wide mb-1">{alt}</p>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Ready for: {src.replace(/^\//, '')}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[var(--border)]/40 text-[10px] font-mono text-[var(--text-muted)]">
            <span>High-Spec Production</span>
            <span style={{ color: accentColor }}>Touchline Kenya</span>
          </div>
        </div>
      )}

      {/* Hover Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-6 flex items-end">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-1">
            {division === 'branding' ? 'Touchline Branding' : 'Touchline Signage'}
          </p>
          <p className="text-sm font-semibold text-white">{alt}</p>
        </div>
      </div>
    </div>
  );
}

