import { headers } from 'next/headers';
import { BRAND_HEADER, type BrandId } from '@/lib/brand';

/** Server-side helper: read the brand middleware resolved for this request. */
export function getBrandFromHeaders(): BrandId {
  const h = headers();
  const value = h.get(BRAND_HEADER);
  if (value === 'branding' || value === 'signage' || value === 'hub') return value;
  return 'hub';
}
