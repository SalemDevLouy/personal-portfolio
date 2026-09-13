import { NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-handlers";
import { uploadToCloudinary } from "@/lib/cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  const denied = await guardAdmin();
  if (denied) return denied;

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Image too large (max 5 MB)" }, { status: 400 });
  }

  const folder = typeof form.get("folder") === "string" && form.get("folder")
    ? (form.get("folder") as string)
    : "portfolio";

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToCloudinary(buffer, folder);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Upload failed" }, { status: 500 });
  }
}