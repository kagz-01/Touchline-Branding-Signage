export type BrandId = 'branding' | 'signage' | 'hub';

export const BRAND_HEADER = 'x-touchline-brand';

/**
 * Works out which brand a request belongs to, purely from the hostname.
 * Root domain (touchline.co.ke, and localhost with no dev override) => hub.
 * Anything starting with "branding." => branding.
 * Anything starting with "signage."  => signage.
 *
 * Extend the two arrays below if you ever add extra aliases
 * (e.g. www.touchlinebranding.co.ke) without touching the rest of the app.
 */
const BRANDING_HOSTS_PREFIXES = ['branding.'];
const SIGNAGE_HOSTS_PREFIXES = ['signage.'];

export function resolveBrandFromHost(host: string | null | undefined): BrandId {
  if (!host) return 'hub';
  const h = host.toLowerCase();

  if (BRANDING_HOSTS_PREFIXES.some((p) => h.startsWith(p))) return 'branding';
  if (SIGNAGE_HOSTS_PREFIXES.some((p) => h.startsWith(p))) return 'signage';

  return 'hub';
}

const BRAND_DOMAINS: Record<BrandId, string> = {
  hub: 'touchline.co.ke',
  branding: 'branding.touchline.co.ke',
  signage: 'signage.touchline.co.ke',
};

/**
 * Returns the absolute base URL for a brand.
 * In development (localhost), returns a relative path with ?brand= query param.
 * In production, returns the full subdomain URL.
 */
export function getBrandBaseUrl(targetBrand: BrandId, currentHost?: string): string {
  const isDev = !currentHost || currentHost.includes('localhost');

  if (isDev) {
    return targetBrand === 'hub' ? '/' : `/?brand=${targetBrand}`;
  }

  const domain = BRAND_DOMAINS[targetBrand];
  return `https://${domain}/`;
}

/**
 * Returns the cross-brand URL — navigating FROM the current brand TO another.
 * Usage: getCrossBrandUrl('signage') from within branding pages.
 */
export function getCrossBrandUrl(toBrand: BrandId, currentHost?: string): string {
  return getBrandBaseUrl(toBrand, currentHost);
}
