import { NextResponse } from "next/server";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import { fallbackEducation } from "@/lib/data/fallback";
import type { Education } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection<Education>("education");
    const docs = await col.find().sort({ order: 1 }).toArray();
    return NextResponse.json({ items: docs.map((d) => serializeDoc<Education>(d)) });
  } catch {
    // DB unreachable/unseeded → serve the built-in content so the site stays up.
    return NextResponse.json({ items: fallbackEducation });
  }
}