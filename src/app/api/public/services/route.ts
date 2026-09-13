import { NextResponse } from "next/server";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import { fallbackServices } from "@/lib/data/fallback";
import type { Service } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection<Service>("services");
    const docs = await col.find().sort({ order: 1 }).toArray();
    return NextResponse.json({ items: docs.map((d) => serializeDoc<Service>(d)) });
  } catch {
    return NextResponse.json({ items: fallbackServices });
  }
}