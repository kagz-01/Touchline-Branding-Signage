import { ImageResponse } from 'next/og';
import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const THEME = {
  branding: { bg: '#17141f', accent: '#d9e85c', accent2: '#ff6b4a', text: '#f3efe6' },
  signage: { bg: '#0e1417', accent: '#33e1ed', accent2: '#ffb020', text: '#edeae2' },
  hub: { bg: '#121014', accent: '#d9e85c', accent2: '#33e1ed', text: '#f3efe6' },
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
          }}
        >
          <div style={{ display: 'flex', gap: 8, fontSize: 30, letterSpacing: 6, opacity: 0.7, marginBottom: 20 }}>
            SOURCING &middot; BRANDING &middot; SIGNAGE &middot; GIFTING
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 120,
              fontWeight: 800,
              backgroundImage: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            TOUCHLINE
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
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: theme.bg,
          color: theme.text,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: theme.accent, marginBottom: 24 }}>
          {brand.heroKicker.toUpperCase()}
        </div>
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          {brand.heroHeadline}
        </div>
        <div style={{ display: 'flex', fontSize: 30, marginTop: 40, opacity: 0.85 }}>{brand.name}</div>
      </div>
    ),
    { ...size }
  );
}
