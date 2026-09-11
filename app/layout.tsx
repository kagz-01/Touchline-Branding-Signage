import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import localFont from 'next/font/local';
import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { BrandProvider } from '@/components/BrandProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CommandPalette } from '@/components/CommandPalette';
import { ClientBrandUpdater } from '@/components/ClientBrandUpdater';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// Self-hosted fonts — no Google Fonts dependency, works offline
const anton = localFont({
  src: '../public/fonts/Anton-Regular.ttf',
  variable: '--font-anton',
  display: 'swap',
  fallback: ['Impact', 'Arial Black', 'sans-serif'],
});
const grotesk = localFont({
  src: [
    { path: '../public/fonts/SpaceGrotesk-Medium.ttf', weight: '500' },
    { path: '../public/fonts/SpaceGrotesk-Bold.ttf', weight: '700' },
  ],
  variable: '--font-grotesk',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});
const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-Regular.ttf', weight: '400' },
    { path: '../public/fonts/Inter-Medium.ttf', weight: '500' },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});
const jetbrains = localFont({
  src: '../public/fonts/JetBrainsMono-Regular.ttf',
  variable: '--font-jetbrains',
  display: 'swap',
  fallback: ['ui-monospace', 'Consolas', 'monospace'],
});
const playfair = localFont({
  src: [
    { path: '../public/fonts/PlayfairDisplay-Regular.ttf', weight: '400' },
    { path: '../public/fonts/PlayfairDisplay-SemiBold.ttf', weight: '600' },
    { path: '../public/fonts/PlayfairDisplay-Bold.ttf', weight: '700' },
  ],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const viewport: Viewport = {
  themeColor: '#17141f'
};

export async function generateMetadata({ searchParams }: { searchParams?: { brand?: string } }): Promise<Metadata> {
  let brandId = getBrandFromHeaders();

  if (brandId === 'hub' && searchParams?.brand) {
    const param = searchParams.brand;
    if (param === 'branding' || param === 'signage') brandId = param;
  }

  if (brandId === 'hub') {
    const description =
      'Touchline makes your brand physical — branded merchandise and signage fabrication, delivered across Kenya. One company, two specialisms.';
    return {
      metadataBase: new URL('https://touchlineltd.co.ke'),
      title: 'Touchline — Branding & Signage | One Company, Two Specialisms',
      description,
      manifest: '/manifest.webmanifest',
      icons: {
        icon: [
          { url: '/icons/favicon.ico', sizes: 'any' },
          { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
          { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        ],
        apple: '/icons/apple-touch-icon.png'
      },
      openGraph: {
        title: 'Touchline — Branding & Signage | One Company, Two Specialisms',
        description,
        url: 'https://touchlineltd.co.ke',
        siteName: 'Touchline',
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Touchline — Branding & Signage | One Company, Two Specialisms',
        description
      },
      keywords: ['branded merchandise Kenya', 'signage Kenya', 'promotional products Nairobi', 'signboards Nairobi', 'vehicle branding Kenya', 'corporate gifts Kenya'],
      robots: { index: true, follow: true }
    };
  }

  const brand = getBrand(brandId);
  const title = `${brand.name} — ${brand.tagline}`;

  return {
    metadataBase: new URL(`https://${brand.domain}`),
    title,
    description: brand.heroSub,
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: `/icons/${brand.id}-favicon.ico`, sizes: 'any' },
        { url: `/icons/${brand.id}-favicon-32.png`, sizes: '32x32', type: 'image/png' },
        { url: `/icons/${brand.id}-192.png`, sizes: '192x192', type: 'image/png' },
      ],
      apple: `/icons/${brand.id}-apple-touch.png`
    },
    openGraph: {
      title,
      description: brand.heroSub,
      url: `https://${brand.domain}`,
      siteName: brand.name,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: brand.heroSub
    },
    robots: { index: true, follow: true },
    keywords:
      brand.id === 'branding'
        ? ['branded merchandise Kenya', 'promotional products Nairobi', 'branded corporate gifts', 'tender sourcing Kenya']
        : ['signage Kenya', 'signboards Nairobi', 'LED signage fabrication', 'vehicle branding Kenya']
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let brandId = getBrandFromHeaders();
  const brand = brandId === 'hub' ? null : getBrand(brandId);
  const pathname = headers().get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin');

  // JSON-LD LocalBusiness structured data for Google local search
  const jsonLd = brand
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: brand.name,
        description: brand.tagline,
        url: `https://${brand.domain}`,
        telephone: brand.contactPhone,
        email: brand.contactEmail,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nairobi',
          addressCountry: 'KE',
        },
        areaServed: 'Kenya',
        priceRange: '$$',
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Touchline',
        url: 'https://touchlineltd.co.ke',
        description: 'Touchline sources branded merchandise and fabricates signage — two specialisms, one company.',
        sameAs: [
          'https://instagram.com/touchlinekenya',
          'https://linkedin.com/company/touchlinekenya',
        ],
      };

  const body = (
    <body
      className={`${anton.variable} ${grotesk.variable} ${inter.variable} ${jetbrains.variable} ${playfair.variable} font-body bg-[var(--bg)] text-[var(--text)] antialiased ${isAdmin ? '' : 'pb-16 md:pb-0'}`}
    >
      {!isAdmin && (
        <>
          <div className="gradient-bg" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />
        </>
      )}
      {isAdmin ? (
        children
      ) : (
        <>
          <Header brand={brand} />
          <main>{children}</main>
          <Footer brand={brand} />
          <BottomNav brand={brand} />
          <WhatsAppButton brand={brand} />
          <CommandPalette />
        </>
      )}
      <Analytics />
      <SpeedInsights />
    </body>
  );

  return (
    <html lang="en" data-brand={isAdmin ? 'hub' : brandId} suppressHydrationWarning>
      <head>
        {/* Preconnect to speed up Google Fonts loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Anti-FOUC theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('touchline-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <ThemeProvider>
        <ClientBrandUpdater />
        {brand ? <BrandProvider brand={brand}>{body}</BrandProvider> : body}
      </ThemeProvider>
    </html>
  );
}
