import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { invalidateCatalogCache } from "@/lib/db-catalog";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database client not configured" }, { status: 500 });

  const { searchParams } = new URL(req.url);
  const division = searchParams.get("division");
  const search = searchParams.get("search");

  let query = supabase.from("catalog_items").select("*").order("created_at", { ascending: false });

  if (division && ["branding", "signage", "awards"].includes(division)) {
    query = query.eq("division", division);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,sku.ilike.%${search}%,category.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database client not configured" }, { status: 500 });

  try {
    const body = await req.json();
    const { title, division, category, categorySlug, priceKes, turnaround, specs, image, sku, badge, description, applications } = body;

    if (!title || !division || !category || !image) {
      return NextResponse.json({ error: "Title, division, category, and image are required" }, { status: 400 });
    }

    const id = sku || `${division.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;

    const newItem = {
      id,
      sku: sku || id,
      division,
      title: title.trim(),
      category: category.trim(),
      category_slug: categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: description || null,
      badge: badge || category.trim(),
      price_kes: priceKes ? Number(priceKes) : null,
      image,
      specs: Array.isArray(specs) ? specs : specs ? [specs] : [],
      applications: applications || null,
      turnaround: turnaround || "3 - 5 Days",
      is_active: true,
      sort_order: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("catalog_items").upsert(newItem, { onConflict: "id" }).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    invalidateCatalogCache(division);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save item" }, { status: 500 });
  }
}
