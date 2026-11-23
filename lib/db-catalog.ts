import { getSupabaseAdmin, type CatalogItemDB, type CatalogCategoryDB } from '@/lib/supabase';
import { BRANDING_CATALOG_ITEMS, BRANDING_CATALOG_CATEGORIES, type BrandingCatalogItem } from '@/config/branding-catalog';
import { SIGNAGE_CATALOG_ITEMS, SIGNAGE_CATALOG_CATEGORIES, type SignageCatalogItem } from '@/config/signage-catalog';
import { AWARDS_CATALOG_ITEMS, AWARDS_CATALOG_CATEGORIES, type AwardsCatalogItem } from '@/config/awards-catalog';

/**
 * Fetch catalog items for a given division from Supabase DB.
 * Falls back gracefully to static bundled configuration if DB connection fails
 * or table is not yet populated.
 */
export async function getCatalogItemsByDivision(division: 'branding' | 'signage' | 'awards'): Promise<CatalogItemDB[]> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('catalog_items')
        .select('*')
        .eq('division', division)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as CatalogItemDB[];
      }
      if (error) {
        console.warn(`[db-catalog] Query warning for ${division}:`, error.message);
      }
    } catch (err: any) {
      console.warn(`[db-catalog] Falling back to static data for ${division}:`, err.message);
    }
  }

  // Fallback to static config
  return getStaticCatalogItems(division);
}

/**
 * Fetch categories for a given division from Supabase DB with static fallback.
 */
export async function getCatalogCategoriesByDivision(division: 'branding' | 'signage' | 'awards'): Promise<CatalogCategoryDB[]> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('catalog_categories')
        .select('*')
        .eq('division', division)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as CatalogCategoryDB[];
      }
    } catch (err: any) {
      console.warn(`[db-catalog] Category fallback for ${division}:`, err.message);
    }
  }

  // Fallback categories
  return getStaticCatalogCategories(division);
}

/**
 * Static fallback mappings
 */
export function getStaticCatalogItems(division: 'branding' | 'signage' | 'awards'): CatalogItemDB[] {
  if (division === 'branding') {
    return BRANDING_CATALOG_ITEMS.map((item, idx) => ({
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
  }

  if (division === 'signage') {
    return SIGNAGE_CATALOG_ITEMS.map((item, idx) => ({
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
  }

  return AWARDS_CATALOG_ITEMS.map((item, idx) => ({
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
}

export function getStaticCatalogCategories(division: 'branding' | 'signage' | 'awards'): CatalogCategoryDB[] {
  if (division === 'branding') {
    return BRANDING_CATALOG_CATEGORIES.map((c, i) => ({
      slug: c.slug,
      division: 'branding',
      label: c.label,
      sort_order: i,
    }));
  }

  if (division === 'signage') {
    return SIGNAGE_CATALOG_CATEGORIES.map((c, i) => ({
      slug: c.slug,
      division: 'signage',
      label: c.label,
      sort_order: i,
    }));
  }

  return AWARDS_CATALOG_CATEGORIES.map((c, i) => ({
    slug: c.slug,
    division: 'awards',
    label: c.label,
    sort_order: i,
  }));
}
