import { NextResponse } from "next/server";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import { fallbackProjects } from "@/lib/data/fallback";
import type { Project } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection<Project>("projects");
    const docs = await col.find().sort({ order: 1 }).toArray();
    return NextResponse.json({ items: docs.map((d) => serializeDoc<Project>(d)) });
  } catch {
    return NextResponse.json({ items: fallbackProjects });
  }
}