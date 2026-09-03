import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Anton, Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { BrandProvider } from '@/components/BrandProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { CommandPalette } from '@/components/CommandPalette';
import './globals.css';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' });
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-grotesk' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['400', '600', '700'], variable: '--font-playfair' });

export const viewport: Viewport = {
  themeColor: '#17141f'
};

export async function generateMetadata(): Promise<Metadata> {
  const brandId = getBrandFromHeaders();

  if (brandId === 'hub') {
    const description =
      'Touchline sources branded merchandise and fabricates signage — two specialisms, one company.';
    return {
      metadataBase: new URL('https://touchline.co.ke'),
      title: 'Touchline — Branding & Signage',
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
        title: 'Touchline — Branding & Signage',
        description,
        url: 'https://touchline.co.ke',
        siteName: 'Touchline',
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Touchline — Branding & Signage',
        description
      },
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
  const brandId = getBrandFromHeaders();
  const brand = brandId === 'hub' ? null : getBrand(brandId);
  const pathname = headers().get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin');

  const body = (
    <body
      className={`${anton.variable} ${grotesk.variable} ${inter.variable} ${jetbrains.variable} ${playfair.variable} font-body bg-[var(--bg)] text-[var(--text)] antialiased ${isAdmin ? '' : 'pb-16 md:pb-0'}`}
    >
      {isAdmin ? (
        children
      ) : (
        <>
          <Header brand={brand} />
          <main>{children}</main>
          <Footer brand={brand} />
          <BottomNav brand={brand} />
          <CommandPalette />
        </>
      )}
    </body>
  );

  return (
    <html lang="en" data-brand={isAdmin ? 'hub' : brandId} suppressHydrationWarning>
      <ThemeProvider>
        {brand ? <BrandProvider brand={brand}>{body}</BrandProvider> : body}
      </ThemeProvider>
    </html>
  );
}
