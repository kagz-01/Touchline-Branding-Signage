import { ImageResponse } from 'next/og';
import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const THEME = {
  branding: {
    bg: '#14100e',
    surface: '#1c1614',
    accent: '#e07850',
    accent2: '#f0a868',
    text: '#f2ebe5',
    muted: '#b09484',
    label: 'BRANDED MERCHANDISE · NAIROBI, KENYA',
  },
  signage: {
    bg: '#0c1115',
    surface: '#141e24',
    accent: '#2cc0d0',
    accent2: '#d08840',
    text: '#e6ecf0',
    muted: '#7a98a8',
    label: 'SIGNAGE & FABRICATION · NAIROBI, KENYA',
  },
  hub: {
    bg: '#0d0c0a',
    surface: '#161412',
    accent: '#c7983a',
    accent2: '#2cc0d0',
    text: '#f0ece5',
    muted: '#9a9080',
    label: 'BRANDING · SIGNAGE · GIFTING',
  },
} as const;

export default function OGImage() {
  const brandId = getBrandFromHeaders();
  const theme = THEME[brandId];

  if (brandId === 'hub') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: theme.bg,
            color: theme.text,
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`, display: 'flex' }} />

          {/* Grid pattern overlay */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, padding: '0 80px' }}>
            <div style={{ display: 'flex', fontSize: 14, letterSpacing: 8, color: theme.muted, marginBottom: 32, textTransform: 'uppercase' }}>
              {theme.label}
            </div>
            <div style={{
              display: 'flex',
              fontSize: 108,
              fontWeight: 900,
              letterSpacing: -3,
              backgroundImage: `linear-gradient(135deg, ${theme.text}, ${theme.accent})`,
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 0.9,
            }}>
              TOUCHLINE
            </div>
            <div style={{ display: 'flex', marginTop: 40, fontSize: 22, color: theme.muted, textAlign: 'center', maxWidth: 700 }}>
              The physical layer of your brand. Merchandise. Signage. Gifting.
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ position: 'absolute', bottom: 40, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 14, color: theme.muted }}>touchlineltd.co.ke</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: theme.accent, display: 'flex' }} />
              <div style={{ width: 8, height: 8, borderRadius: 4, background: theme.accent2, display: 'flex' }} />
            </div>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const brand = getBrand(brandId);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: theme.bg,
          color: theme.text,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`, display: 'flex' }} />

        {/* Right side accent block */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 320, display: 'flex',
          background: theme.surface,
          borderLeft: `1px solid rgba(255,255,255,0.05)`,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
        }}>
          {/* Big accent letter */}
          <div style={{
            fontSize: 200,
            fontWeight: 900,
            color: theme.accent,
            opacity: 0.08,
            lineHeight: 1,
            display: 'flex',
            position: 'absolute',
          }}>
            {brandId === 'branding' ? 'B' : 'S'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 1 }}>
            {['Design', 'Source', 'Deliver'].map((word) => (
              <div key={word} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: theme.accent, display: 'flex' }} />
                <span style={{ fontSize: 16, color: theme.muted, letterSpacing: 2, textTransform: 'uppercase' }}>{word}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 80px',
          maxWidth: 860,
        }}>
          <div style={{ display: 'flex', fontSize: 12, letterSpacing: 6, color: theme.accent, marginBottom: 24, textTransform: 'uppercase' }}>
            {theme.label}
          </div>
          <div style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 32,
            color: theme.text,
          }}>
            {brand.heroHeadline}
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: theme.muted, lineHeight: 1.5, maxWidth: 620 }}>
            {brand.tagline}
          </div>
          <div style={{ display: 'flex', marginTop: 48, alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 2, background: theme.accent, display: 'flex' }} />
            <span style={{ fontSize: 15, color: theme.accent, letterSpacing: 2, textTransform: 'uppercase' }}>{brand.name}</span>
          </div>
        </div>

        {/* Bottom domain */}
        <div style={{ position: 'absolute', bottom: 32, left: 80, fontSize: 13, color: theme.muted, display: 'flex' }}>
          {brand.domain}
        </div>
      </div>
    ),
    { ...size }
  );
}
