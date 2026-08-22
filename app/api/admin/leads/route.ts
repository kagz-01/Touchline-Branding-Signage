import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

// Middleware already blocks unauthenticated requests to /api/admin/*, but we
// re-check the session here too — defense in depth, and it's how we get the
// caller's identity for anything we log.
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet — set env vars first." }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand");
  const status = searchParams.get("status");

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (brand === "branding" || brand === "signage") query = query.eq("brand", brand);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
