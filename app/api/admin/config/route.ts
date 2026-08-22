import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Small helper the admin UI reads to build a "View task →" link. Not
// sensitive — just a public base URL — but still gated behind a session
// since it lives under /api/admin.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    inventoryPlatformPublicUrl: process.env.INVENTORY_PLATFORM_PUBLIC_URL || process.env.INVENTORY_PLATFORM_URL || null,
  });
}
