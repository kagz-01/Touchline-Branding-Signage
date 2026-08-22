import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

// Deliberately a manual, admin-triggered action rather than firing automatically
// on every form submission — that keeps spam/junk enquiries from ever reaching
// the sourcing board as real tasks. The admin reviews a lead here first, then
// converts the ones worth acting on.
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 503 });
  }

  const inventoryUrl = process.env.INVENTORY_PLATFORM_URL;
  const apiKey = process.env.INTEGRATION_API_KEY;
  if (!inventoryUrl || !apiKey) {
    return NextResponse.json(
      { error: "INVENTORY_PLATFORM_URL / INTEGRATION_API_KEY aren't configured on this deployment." },
      { status: 503 }
    );
  }

  const { data: lead, error: fetchError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();
  if (fetchError || !lead) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }
  if (lead.converted_task_id) {
    return NextResponse.json({ error: "This lead has already been converted." }, { status: 409 });
  }

  let taskId: string;
  try {
    const res = await fetch(`${inventoryUrl.replace(/\/$/, "")}/api/integrations/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        brand: lead.brand,
        fullName: lead.full_name,
        phone: lead.phone,
        email: lead.email,
        service: lead.service,
        preferredDate: lead.preferred_date,
        location: lead.location,
        message: lead.message,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: body.error || "Inventory platform rejected the request." },
        { status: 502 }
      );
    }
    const data = await res.json();
    taskId = data.taskId;
  } catch (err) {
    console.error("[leads/convert] failed to reach inventory platform:", err);
    return NextResponse.json({ error: "Could not reach the sourcing platform." }, { status: 502 });
  }

  const { data: updated, error: updateError } = await supabase
    .from("leads")
    .update({ status: "converted", converted_task_id: taskId, converted_at: new Date().toISOString() })
    .eq("id", params.id)
    .select()
    .single();

  if (updateError) {
    // The task WAS created successfully on the sourcing platform — don't lose
    // that id even if this last write fails, so surface it in the response.
    return NextResponse.json(
      { warning: "Task created, but failed to update the lead record.", taskId },
      { status: 207 }
    );
  }

  return NextResponse.json({ taskId, lead: updated });
}
