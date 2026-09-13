import { NextResponse } from "next/server";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import { fallbackSkills } from "@/lib/data/fallback";
import type { Skill } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection<Skill>("skills");
    const docs = await col.find().sort({ order: 1 }).toArray();
    return NextResponse.json({ items: docs.map((d) => serializeDoc<Skill>(d)) });
  } catch {
    return NextResponse.json({ items: fallbackSkills });
  }
}