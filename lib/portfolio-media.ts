import { createClient } from '@supabase/supabase-js';
import type { BrandId } from '@/lib/brand';

export type PortfolioMediaItem = {
  title: string;
  category: string;
  blurb: string;
  image_url?: string | null;
  image_webp_url?: string | null;
  image_webm_url?: string | null;
  alt?: string | null;
};

export async function getPortfolioMediaForBrand(brand: BrandId): Promise<PortfolioMediaItem[]> {
  if (brand === 'hub') return [];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from('portfolio_media')
    .select('*')
    .eq('brand', brand)
    .order('sort_order', { ascending: true })
    .limit(12);

  if (error || !data) {
    console.warn('[portfolio-media] Unable to load media:', error?.message || 'Unknown error');
    return [];
  }

  return data.map((item) => ({
    title: item.title,
    category: item.category || 'Project work',
    blurb: item.blurb || '',
    image_url: item.image_url,
    image_webp_url: item.image_webp_url,
    image_webm_url: item.image_webm_url,
    alt: item.alt || item.title,
  }));
}
