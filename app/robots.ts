import type { MetadataRoute } from 'next';
import { getBrandFromHeaders } from '@/lib/get-brand-server';

// Served at /robots.txt on whichever subdomain the request came in on.
// Admin routes are kept out of the index on every brand.
export default function robots(): MetadataRoute.Robots {
  const brandId = getBrandFromHeaders();
  const host = brandId === 'hub' ? 'touchline.ac.ke' : `${brandId}.touchline.ac.ke`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'],
    },
    sitemap: `https://${host}/sitemap.xml`,
  };
}
