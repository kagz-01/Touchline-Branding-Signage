import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { BRAND_HEADER, resolveBrandFromHost } from '@/lib/brand';

const BRAND_COOKIE = 'tb-brand';

/**
 * Runs on every request. Reads the hostname, decides which brand the
 * visitor is on (branding / signage / hub), and passes that downstream
 * as a request header so server components can read it with next/headers.
 *
 * Also gates /admin/* (the internal leads dashboard): anything under /admin
 * other than /admin/login requires a valid signed-in session.
 *
 * Local dev shortcut: since you won't have real subdomains on localhost,
 * set NEXT_PUBLIC_DEV_BRAND=branding (or signage) in .env.local to force
 * a brand while you're developing, or visit with ?brand=signage.
 */
export async function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const devBrandParam = req.nextUrl.searchParams.get('brand');

  let brand = resolveBrandFromHost(host);

  // If we're on the hub domain (which includes localhost), allow the URL path
  // to dictate the brand. This makes local development seamless without subdomains.
  if (brand === 'hub') {
    if (req.nextUrl.pathname.startsWith('/branding')) brand = 'branding';
    else if (req.nextUrl.pathname.startsWith('/signage')) brand = 'signage';
  }

  // Dev override via query param or env var
  if (devBrandParam === 'branding' || devBrandParam === 'signage' || devBrandParam === 'hub') {
    brand = devBrandParam;
  } else if (
    (host?.includes('localhost') || host?.includes('127.0.0.1')) &&
    (process.env.NEXT_PUBLIC_DEV_BRAND === 'branding' || process.env.NEXT_PUBLIC_DEV_BRAND === 'signage')
  ) {
    brand = process.env.NEXT_PUBLIC_DEV_BRAND;
  }

  // For shared routes (/services, /portfolio, /book) on hub domain,
  // check the cookie for brand context
  if (brand === 'hub') {
    const sharedRoutes = ['/services', '/portfolio', '/book'];
    if (sharedRoutes.includes(req.nextUrl.pathname)) {
      const brandCookie = req.cookies.get(BRAND_COOKIE)?.value;
      if (brandCookie === 'branding' || brandCookie === 'signage') {
        brand = brandCookie;
      }
    }
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin');
  const isLoginRoute = req.nextUrl.pathname.startsWith('/admin/login');

  if (isAdminRoute && !isLoginRoute) {
    try {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        if (req.nextUrl.pathname.startsWith('/api/admin')) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const loginUrl = new URL('/admin/login', req.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // NEXTAUTH_SECRET not configured — redirect to login
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

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Set brand cookie for shared routes (persists brand context)
  if (brand === 'branding' || brand === 'signage') {
    response.cookies.set(BRAND_COOKIE, brand, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    });
  }

  // ── Security Headers ────────────────────────────────────────────────────────
  // Prevents clickjacking attacks
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  // Stops browsers from sniffing a different MIME type than what was declared
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Controls referrer info sent when navigating away
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Enforces HTTPS for 1 year once deployed on a real domain
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Limits which browser features can be used
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons|manifest).*)'],
};
