import { NextRequest, NextResponse } from 'next/server';
import { getCatalogItemsByDivision, getCatalogCategoriesByDivision } from '@/lib/db-catalog';

export const revalidate = 300; // Next.js ISR route revalidation (5 minutes)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const division = searchParams.get('division') as 'branding' | 'signage' | 'awards' | 'all' | null;

  if (!division || !['branding', 'signage', 'awards', 'all'].includes(division)) {
    return NextResponse.json(
      { error: 'Invalid or missing division parameter. Allowed: branding, signage, awards, all' },
      { status: 400 }
    );
  }

  // Batch query all divisions in one request to eliminate redundant roundtrips
  if (division === 'all') {
    const [brandingItems, signageItems, awardsItems] = await Promise.all([
      getCatalogItemsByDivision('branding'),
      getCatalogItemsByDivision('signage'),
      getCatalogItemsByDivision('awards'),
    ]);

    return NextResponse.json(
      {
        count: brandingItems.length + signageItems.length + awardsItems.length,
        branding: brandingItems,
        signage: signageItems,
        awards: awardsItems,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  }

  const [items, categories] = await Promise.all([
    getCatalogItemsByDivision(division),
    getCatalogCategoriesByDivision(division),
  ]);

  return NextResponse.json(
    {
      division,
      count: items.length,
      categories,
      items,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
