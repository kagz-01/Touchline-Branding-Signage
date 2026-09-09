export type BrandId = 'branding' | 'signage' | 'hub';

export const BRAND_HEADER = 'x-touchline-brand';

/**
 * Brand domain map — reads from environment variables so you can override
 * domains without changing code (useful for staging environments or if you
 * ever add a new TLD like .com alongside .co.ke).
 *
 * To add a new brand alias, add its prefix to the arrays below.
 * To add a brand entirely, add it to BrandId, BRAND_DOMAINS, and the
 * respective prefix array.
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

/**
 * Brand domains — read from env vars if set, fall back to the canonical
 * .co.ke domains. Override in .env.local for staging/custom deployments:
 *
 *   BRANDING_DOMAIN=branding.touchlineltd.co.ke
 *   SIGNAGE_DOMAIN=signage.touchlineltd.co.ke
 *   HUB_DOMAIN=touchlineltd.co.ke
 */
function getBrandDomains(): Record<BrandId, string> {
  return {
    hub:      process.env.HUB_DOMAIN      ?? 'touchlineltd.co.ke',
    branding: process.env.BRANDING_DOMAIN ?? 'branding.touchlineltd.co.ke',
    signage:  process.env.SIGNAGE_DOMAIN  ?? 'signage.touchlineltd.co.ke',
  };
}

/**
 * Returns the absolute base URL for a brand.
 * In development (localhost), returns a relative path with ?brand= query param
 * so you don't need real subdomains set up.
 * In production, returns the full subdomain URL.
 */
export function getBrandBaseUrl(targetBrand: BrandId, currentHost?: string): string {
  const isDev = !currentHost || currentHost.includes('localhost') || currentHost.includes('127.0.0.1');

  if (isDev) {
    return targetBrand === 'hub' ? '/' : `/?brand=${targetBrand}`;
  }

  const domain = getBrandDomains()[targetBrand];
  return `https://${domain}/`;
}

/**
 * Returns the cross-brand URL — navigating FROM the current brand TO another.
 * Usage: getCrossBrandUrl('signage', host) from within branding pages.
 */
export function getCrossBrandUrl(toBrand: BrandId, currentHost?: string): string {
  return getBrandBaseUrl(toBrand, currentHost);
}
