import { NextRequest, NextResponse } from 'next/server';
import { BRAND_HEADER, resolveBrandFromHost } from '@/lib/brand';

const BRAND_COOKIE = 'tb-brand';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const devBrandParam = req.nextUrl.searchParams.get('brand');

  let brand = resolveBrandFromHost(host);

  if (brand === 'hub') {
    if (req.nextUrl.pathname.startsWith('/branding')) brand = 'branding';
    else if (req.nextUrl.pathname.startsWith('/signage')) brand = 'signage';
  }

  if (devBrandParam === 'branding' || devBrandParam === 'signage' || devBrandParam === 'hub') {
    brand = devBrandParam;
  } else if (
    (host.includes('localhost') || host.includes('127.0.0.1')) &&
    (process.env.NEXT_PUBLIC_DEV_BRAND === 'branding' || process.env.NEXT_PUBLIC_DEV_BRAND === 'signage')
  ) {
    brand = process.env.NEXT_PUBLIC_DEV_BRAND;
  }

  if (brand === 'hub') {
    const sharedRoutes = ['/services', '/portfolio', '/book'];
    if (sharedRoutes.includes(req.nextUrl.pathname)) {
      const brandCookie = req.cookies.get(BRAND_COOKIE)?.value;
      if (brandCookie === 'branding' || brandCookie === 'signage') {
        brand = brandCookie;
      }
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(BRAND_HEADER, brand);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (brand === 'branding' || brand === 'signage') {
    response.cookies.set(BRAND_COOKIE, brand, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
  }

  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons|manifest).*)'],
};
