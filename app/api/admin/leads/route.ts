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

  let query = supabase.from("requests").select("*").order("created_at", { ascending: false });
  if (brand === "branding" || brand === "signage") query = query.eq("division", brand);
  if (status) query = query.eq("status", status === "converted" ? "quoted" : status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const mapped = (data || []).map((r: any) => ({
    id: r.id,
    created_at: r.created_at,
    brand: r.division || "branding",
    full_name: r.contact_name || r.company_name || "Enquiry",
    company_name: r.company_name || null,
    phone: r.phone || "",
    email: r.email || null,
    service: r.product || null,
    preferred_date: r.deadline || null,
    location: null,
    message: r.message || null,
    status: r.status === "quoted" ? "converted" : r.status,
    converted_task_id: r.quote_id || null,
  }));

  return NextResponse.json(mapped);
}
