import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Storage client not configured" }, { status: 500 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const division = (formData.get("division") as string) || "branding";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const storagePath = `${division}/catalog/${cleanFileName}`;

    let mimeType = file.type || "image/webp";
    if (ext === "webp") mimeType = "image/webp";
    if (ext === "png") mimeType = "image/png";
    if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";

    const { error: uploadError } = await supabase.storage
      .from("catalog")
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("catalog").getPublicUrl(storagePath);

    return NextResponse.json({
      publicUrl: publicUrlData.publicUrl,
      storagePath,
      fileName: file.name,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 });
  }
}
