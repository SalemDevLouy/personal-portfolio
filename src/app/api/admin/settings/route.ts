import { NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-handlers";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import { validateSettings } from "@/lib/validate";
import { fallbackSettings } from "@/lib/data/fallback";
import type { Settings } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await guardAdmin();
  if (denied) return denied;
  const col = await getCollection<Settings>("settings");
  const doc = await col.findOne({});
  if (!doc) return NextResponse.json({ item: fallbackSettings });
  return NextResponse.json({ item: serializeDoc<Settings>(doc) });
}

export async function PUT(req: Request) {
  const denied = await guardAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const result = validateSettings(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
  }
  const col = await getCollection<Settings>("settings");
  const now = new Date();
  await col.updateOne(
    {},
    { $set: { ...(result.value as any), updatedAt: now.toISOString() } },
    { upsert: true }
  );
  const updated = await col.findOne({});
  return NextResponse.json({ item: updated ? serializeDoc<Settings>(updated) : result.value });
}