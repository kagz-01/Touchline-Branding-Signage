import type { MetadataRoute } from 'next';
import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';

// Dynamic per-brand manifest: served at /manifest.webmanifest on whichever
// subdomain the visitor is on, so "Add to Home Screen" picks up the right
// name, colors and icon set automatically \u2014 same PWA pattern as your
// other Touchline apps.
export default function manifest(): MetadataRoute.Manifest {
  const brandId = getBrandFromHeaders();

  if (brandId === 'hub') {
    return {
      name: 'Touchline',
      short_name: 'Touchline',
      description: 'Sourcing, branding and signage \u2014 one company, two doors.',
      start_url: '/',
      display: 'standalone',
      background_color: '#121014',
      theme_color: '#121014',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    };
  }

  const brand = getBrand(brandId);

  return {
    name: brand.name,
    short_name: brand.name.replace('Touchline ', ''),
    description: brand.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: brand.id === 'branding' ? '#17141f' : '#0e1417',
    theme_color: brand.id === 'branding' ? '#17141f' : '#0e1417',
    icons: [
      { src: `/icons/${brand.id}-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `/icons/${brand.id}-512.png`, sizes: '512x512', type: 'image/png' },
      { src: `/icons/${brand.id}-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
}
