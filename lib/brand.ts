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
