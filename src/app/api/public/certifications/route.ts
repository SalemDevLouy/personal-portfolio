import { NextResponse } from "next/server";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import { fallbackCertifications } from "@/lib/data/fallback";
import type { Certification } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection<Certification>("certifications");
    const docs = await col.find().sort({ order: 1 }).toArray();
    return NextResponse.json({
      items: docs.map((d) => serializeDoc<Certification>(d)),
    });
  } catch {
    return NextResponse.json({ items: fallbackCertifications });
  }
}