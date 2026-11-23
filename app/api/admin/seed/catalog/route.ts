import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getStaticCatalogItems, getStaticCatalogCategories } from '@/lib/db-catalog';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Protect seed endpoint
  if (authHeader !== `Bearer ${secretKey}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized seed invocation' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Database client not configured' }, { status: 500 });
  }

  const divisions: ('branding' | 'signage' | 'awards')[] = ['branding', 'signage', 'awards'];
  const summary: Record<string, { categories: number; items: number }> = {};

  for (const div of divisions) {
    const cats = getStaticCatalogCategories(div);
    const items = getStaticCatalogItems(div);

    // Upsert categories
    if (cats.length > 0) {
      const { error: catErr } = await supabase
        .from('catalog_categories')
        .upsert(cats, { onConflict: 'slug,division' });

      if (catErr) {
        console.error(`Error seeding categories for ${div}:`, catErr);
      }
    }

    // Upsert items in chunks of 50
    if (items.length > 0) {
      for (let i = 0; i < items.length; i += 50) {
        const chunk = items.slice(i, i + 50);
        const { error: itemErr } = await supabase
          .from('catalog_items')
          .upsert(chunk, { onConflict: 'id' });

        if (itemErr) {
          console.error(`Error seeding items chunk for ${div}:`, itemErr);
        }
      }
    }

    summary[div] = {
      categories: cats.length,
      items: items.length,
    };
  }

  return NextResponse.json({
    message: 'Catalog database seed completed successfully',
    summary,
  });
}
