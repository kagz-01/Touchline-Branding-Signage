import { NextRequest, NextResponse } from 'next/server';
import { getCatalogItemsByDivision, getCatalogCategoriesByDivision } from '@/lib/db-catalog';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const division = searchParams.get('division') as 'branding' | 'signage' | 'awards' | null;

  if (!division || !['branding', 'signage', 'awards'].includes(division)) {
    return NextResponse.json(
      { error: 'Invalid or missing division parameter. Allowed: branding, signage, awards' },
      { status: 400 }
    );
  }

  const [items, categories] = await Promise.all([
    getCatalogItemsByDivision(division),
    getCatalogCategoriesByDivision(division),
  ]);

  return NextResponse.json({
    division,
    count: items.length,
    categories,
    items,
  });
}
