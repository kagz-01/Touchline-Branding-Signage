import { headers, cookies } from 'next/headers';
import { BRAND_HEADER, type BrandId } from '@/lib/brand';

function resolveBrandFromHost(host: string): BrandId {
  if (!host) return 'hub';
  const h = host.toLowerCase();
  if (h.startsWith('branding.')) return 'branding';
  if (h.startsWith('signage.')) return 'signage';
  return 'hub';
}

/** Server-side brand resolution: host → cookie → default hub */
export function getBrandFromHeaders(): BrandId {
  const h = headers();

  // 1. Try brand header (set by middleware if present)
  const headerBrand = h.get(BRAND_HEADER);
  if (headerBrand === 'branding' || headerBrand === 'signage' || headerBrand === 'hub') {
    return headerBrand;
  }

  // 2. Resolve from hostname (check both host and x-forwarded-host for Vercel)
  const host = h.get('x-forwarded-host') || h.get('host') || '';
  let brand = resolveBrandFromHost(host);

  // 3. Cookie fallback for shared routes on hub
  if (brand === 'hub') {
    const cookieStore = cookies();
    const brandCookie = cookieStore.get('tb-brand')?.value;
    if (brandCookie === 'branding' || brandCookie === 'signage') {
      brand = brandCookie;
    }
  }

  return brand;
}
