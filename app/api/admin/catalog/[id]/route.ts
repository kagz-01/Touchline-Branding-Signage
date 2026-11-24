import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { invalidateCatalogCache } from "@/lib/db-catalog";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database client not configured" }, { status: 500 });

  try {
    const body = await req.json();
    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (typeof body.title === "string") updateData.title = body.title.trim();
    if (typeof body.category === "string") updateData.category = body.category.trim();
    if (typeof body.categorySlug === "string") updateData.category_slug = body.categorySlug.trim();
    if (typeof body.badge === "string") updateData.badge = body.badge.trim();
    if (typeof body.turnaround === "string") updateData.turnaround = body.turnaround.trim();
    if (typeof body.description === "string") updateData.description = body.description.trim();
    if (body.priceKes !== undefined) updateData.price_kes = body.priceKes ? Number(body.priceKes) : null;
    if (Array.isArray(body.specs)) updateData.specs = body.specs;
    if (typeof body.image === "string") updateData.image = body.image;
    if (typeof body.isActive === "boolean") updateData.is_active = body.isActive;

    const { data, error } = await supabase
      .from("catalog_items")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    invalidateCatalogCache();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database client not configured" }, { status: 500 });

  const { error } = await supabase.from("catalog_items").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  invalidateCatalogCache();
  return NextResponse.json({ success: true, deletedId: params.id });
}
