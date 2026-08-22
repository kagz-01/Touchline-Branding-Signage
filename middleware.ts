import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { BRAND_HEADER, resolveBrandFromHost } from '@/lib/brand';

/**
 * Runs on every request. Reads the hostname, decides which brand the
 * visitor is on (branding / signage / hub), and passes that downstream
 * as a request header so server components can read it with next/headers.
 *
 * Also gates /admin/* (the internal leads dashboard): anything under /admin
 * other than /admin/login requires a valid signed-in session. The allowlist
 * check itself happens once, at sign-in time, in lib/auth.ts \u2014 by the time
 * a JWT exists here, that account already passed it.
 *
 * Local dev shortcut: since you won't have real subdomains on localhost,
 * set NEXT_PUBLIC_DEV_BRAND=branding (or signage) in .env.local to force
 * a brand while you're developing, or visit with ?brand=signage.
 */
export async function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  const devBrandParam = req.nextUrl.searchParams.get('brand');

  let brand = resolveBrandFromHost(host);

  if (devBrandParam === 'branding' || devBrandParam === 'signage' || devBrandParam === 'hub') {
    brand = devBrandParam;
  } else if (
    (host?.includes('localhost') || host?.includes('127.0.0.1')) &&
    (process.env.NEXT_PUBLIC_DEV_BRAND === 'branding' || process.env.NEXT_PUBLIC_DEV_BRAND === 'signage')
  ) {
    brand = process.env.NEXT_PUBLIC_DEV_BRAND;
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin');
  const isLoginRoute = req.nextUrl.pathname.startsWith('/admin/login');

  if (isAdminRoute && !isLoginRoute) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      if (req.nextUrl.pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(BRAND_HEADER, brand);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons|manifest).*)']
};
