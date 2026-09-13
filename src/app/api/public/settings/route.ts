import { NextResponse } from "next/server";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import { fallbackSettings } from "@/lib/data/fallback";
import type { Settings } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection<Settings>("settings");
    const doc = await col.findOne({});
    if (!doc) return NextResponse.json({ item: null });
    return NextResponse.json({ item: serializeDoc<Settings>(doc) });
  } catch {
    // Settings are optional; fall back to hardcoded defaults.
    return NextResponse.json({ item: fallbackSettings });
  }
}