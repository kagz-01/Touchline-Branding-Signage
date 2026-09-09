import type { MetadataRoute } from 'next';
import { getBrandFromHeaders } from '@/lib/get-brand-server';

const now = new Date().toISOString();

// Served at /sitemap.xml on whichever subdomain the request comes in on.
// Each brand only advertises its own pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const brandId = getBrandFromHeaders();

  if (brandId === 'hub') {
    return [
      {
        url: 'https://touchline.co.ke/',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 1,
      },
    ];
  }

  const base = `https://${brandId}.touchline.co.ke`;
  return [
    { url: `${base}/`,           lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/portfolio`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/book`,       lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
  ];
}
