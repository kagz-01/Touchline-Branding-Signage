import { getSupabaseAdmin, type CatalogItemDB, type CatalogCategoryDB } from '@/lib/supabase';
import { BRANDING_CATALOG_ITEMS, BRANDING_CATALOG_CATEGORIES } from '@/config/branding-catalog';
import { SIGNAGE_CATALOG_ITEMS, SIGNAGE_CATALOG_CATEGORIES } from '@/config/signage-catalog';
import { AWARDS_CATALOG_ITEMS, AWARDS_CATALOG_CATEGORIES } from '@/config/awards-catalog';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes in-memory cache

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const itemsCache = new Map<string, CacheEntry<CatalogItemDB[]>>();
const categoriesCache = new Map<string, CacheEntry<CatalogCategoryDB[]>>();

/**
 * Invalidate in-memory cache when catalog items are created, modified, or deleted.
 */
export function invalidateCatalogCache(division?: 'branding' | 'signage' | 'awards') {
  if (division) {
    itemsCache.delete(division);
    categoriesCache.delete(division);
  } else {
    itemsCache.clear();
    categoriesCache.clear();
  }
}

/**
 * Timeout wrapper around asynchronous operations to prevent hanging on network stalls / ETIMEDOUT.
 */
async function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 3000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Database query timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }),
    timeoutPromise,
  ]);
}

/**
 * Fetch catalog items for a given division from Supabase DB with in-memory caching and fast fallback.
 */
export async function getCatalogItemsByDivision(division: 'branding' | 'signage' | 'awards'): Promise<CatalogItemDB[]> {
  const now = Date.now();
  const cached = itemsCache.get(division);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const query = supabase
        .from('catalog_items')
        .select('*')
        .eq('division', division)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      const { data, error } = await withTimeout(query, 3000);

      if (!error && data && data.length > 0) {
        const result = data as CatalogItemDB[];
        itemsCache.set(division, { data: result, expiresAt: now + CACHE_TTL_MS });
        return result;
      }
      if (error) {
        console.warn(`[db-catalog] Query warning for ${division}:`, error.message);
      }
    } catch (err: any) {
      console.warn(`[db-catalog] Fast fallback to static catalog for ${division} (${err.message})`);
    }
  }

  // Fallback to static bundled configuration & cache briefly (30s) to prevent spamming failed connections
  const fallback = getStaticCatalogItems(division);
  itemsCache.set(division, { data: fallback, expiresAt: now + 30000 });
  return fallback;
}

/**
 * Fetch categories for a given division from Supabase DB with in-memory caching and fast fallback.
 */
export async function getCatalogCategoriesByDivision(division: 'branding' | 'signage' | 'awards'): Promise<CatalogCategoryDB[]> {
  const now = Date.now();
  const cached = categoriesCache.get(division);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const query = supabase
        .from('catalog_categories')
        .select('*')
        .eq('division', division)
        .order('sort_order', { ascending: true });

      const { data, error } = await withTimeout(query, 3000);

      if (!error && data && data.length > 0) {
        const result = data as CatalogCategoryDB[];
        categoriesCache.set(division, { data: result, expiresAt: now + CACHE_TTL_MS });
        return result;
      }
    } catch (err: any) {
      console.warn(`[db-catalog] Category fallback for ${division} (${err.message})`);
    }
  }

  // Fallback categories
  const fallback = getStaticCatalogCategories(division);
  categoriesCache.set(division, { data: fallback, expiresAt: now + 30000 });
  return fallback;
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
