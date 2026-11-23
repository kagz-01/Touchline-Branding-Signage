import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { BRANDING_CATALOG_ITEMS, BRANDING_CATALOG_CATEGORIES } from '../config/branding-catalog';
import { SIGNAGE_CATALOG_ITEMS, SIGNAGE_CATALOG_CATEGORIES } from '../config/signage-catalog';
import { AWARDS_CATALOG_ITEMS, AWARDS_CATALOG_CATEGORIES } from '../config/awards-catalog';

async function seed() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  console.log('🌱 Starting Supabase catalog seed...');

  // 1. Seed Categories
  const categories = [
    ...BRANDING_CATALOG_CATEGORIES.map((c, i) => ({ slug: c.slug, division: 'branding', label: c.label, sort_order: i })),
    ...SIGNAGE_CATALOG_CATEGORIES.map((c, i) => ({ slug: c.slug, division: 'signage', label: c.label, sort_order: i })),
    ...AWARDS_CATALOG_CATEGORIES.map((c, i) => ({ slug: c.slug, division: 'awards', label: c.label, sort_order: i })),
  ];

  console.log(`📂 Seeding ${categories.length} categories...`);
  const { error: catErr } = await supabase.from('catalog_categories').upsert(categories, { onConflict: 'slug,division' });
  if (catErr) {
    console.error('❌ Categories error:', catErr.message);
  } else {
    console.log('✅ Categories seeded successfully.');
  }

  // 2. Format Items
  const brandingItems = BRANDING_CATALOG_ITEMS.map((item, idx) => ({
    id: item.id,
    sku: item.sku || null,
    division: 'branding',
    title: item.title,
    category: item.category,
    category_slug: item.categorySlug,
    description: item.description || null,
    badge: null,
    price_kes: item.priceKes || null,
    image: item.image,
    specs: item.specs || [],
    applications: null,
    turnaround: item.turnaround || null,
    sort_order: idx,
    is_active: true,
  }));

  const signageItems = SIGNAGE_CATALOG_ITEMS.map((item, idx) => ({
    id: item.id,
    sku: null,
    division: 'signage',
    title: item.title,
    category: item.category,
    category_slug: item.categorySlug,
    description: null,
    badge: item.badge || null,
    price_kes: null,
    image: item.image,
    specs: item.specs || [],
    applications: item.applications || null,
    turnaround: item.turnaround || null,
    sort_order: idx,
    is_active: true,
  }));

  const awardsItems = AWARDS_CATALOG_ITEMS.map((item, idx) => ({
    id: item.id,
    sku: item.sku || null,
    division: 'awards',
    title: item.title,
    category: item.category,
    category_slug: item.categorySlug,
    description: null,
    badge: item.badge || null,
    price_kes: item.priceKes || null,
    image: item.image,
    specs: item.specs || [],
    applications: null,
    turnaround: item.turnaround || null,
    sort_order: idx,
    is_active: true,
  }));

  const allItems = [...brandingItems, ...signageItems, ...awardsItems];
  console.log(`📦 Seeding ${allItems.length} total catalog items in chunks of 50...`);

  let successCount = 0;
  for (let i = 0; i < allItems.length; i += 50) {
    const chunk = allItems.slice(i, i + 50);
    const { error: itemErr } = await supabase.from('catalog_items').upsert(chunk, { onConflict: 'id' });
    if (itemErr) {
      console.error(`❌ Batch ${i} - ${i + chunk.length} failed:`, itemErr.message);
    } else {
      successCount += chunk.length;
      console.log(`  → Batch ${i + 1} - ${i + chunk.length} inserted/updated.`);
    }
  }

  console.log(`🎉 Seeding completed! Total items processed: ${successCount} / ${allItems.length}`);
}

seed().catch((err) => {
  console.error('Fatal error during seed:', err);
  process.exit(1);
});
