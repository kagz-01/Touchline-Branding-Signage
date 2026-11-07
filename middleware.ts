import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set('x-pathname', pathname);

  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const isDev = host.includes('localhost') || host.includes('127.0.0.1');

  // Check URL query param (e.g. ?brand=branding or ?brand=signage)
  const brandParam = request.nextUrl.searchParams.get('brand');
  if (brandParam === 'branding' || brandParam === 'signage') {
    requestHeaders.set('x-touchline-brand', brandParam);
  } else if (pathname.startsWith('/branding')) {
    requestHeaders.set('x-touchline-brand', 'branding');
  } else if (pathname.startsWith('/signage')) {
    requestHeaders.set('x-touchline-brand', 'signage');
  } else if (host.toLowerCase().startsWith('branding.')) {
    requestHeaders.set('x-touchline-brand', 'branding');
  } else if (host.toLowerCase().startsWith('signage.')) {
    requestHeaders.set('x-touchline-brand', 'signage');
  } else {
    requestHeaders.set('x-touchline-brand', 'hub');
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|images|Logos).*)'],
};

