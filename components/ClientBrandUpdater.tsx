'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * On production, navigating between brands means crossing subdomains
 * (hub.com -> branding.hub.com), which triggers a full page reload and
 * correctly resets the data-brand attribute from the server.
 * 
 * However, on localhost, we navigate client-side (localhost:3000/ -> localhost:3000/branding).
 * Next.js does not re-render the RootLayout on client navigation, meaning
 * the data-brand attribute gets "stuck" on whatever it was when the app first loaded.
 * 
 * This component listens for pathname changes and manually updates the data-brand
 * attribute to ensure the theme switches instantly during local development.
 */
export function ClientBrandUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      const params = new URLSearchParams(window.location.search);
      const brandParam = params.get('brand');
      if (brandParam === 'branding' || brandParam === 'signage' || brandParam === 'hub') {
        document.documentElement.setAttribute('data-brand', brandParam);
        return;
      }

      let brand = 'hub';
      if (pathname.startsWith('/branding')) brand = 'branding';
      else if (pathname.startsWith('/signage')) brand = 'signage';
      else if (pathname.startsWith('/admin')) brand = 'hub';

      document.documentElement.setAttribute('data-brand', brand);
    }
  }, [pathname]);

  return null;
}
