import type { MetadataRoute } from 'next';
import { getBrandFromHeaders } from '@/lib/get-brand-server';

// Served at /sitemap.xml on whichever subdomain the request came in on, so
// each brand only advertises its own pages (the hub only has one page).
export default function sitemap(): MetadataRoute.Sitemap {
  const brandId = getBrandFromHeaders();

  if (brandId === 'hub') {
    return [{ url: 'https://touchline.co.ke/', changeFrequency: 'monthly', priority: 1 }];
  }

  const base = `https://${brandId}.touchline.co.ke`;
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/book`, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
