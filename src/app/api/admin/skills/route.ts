import { createItem, listItems } from "@/lib/admin-handlers";
import { validateSkill } from "@/lib/validate";
import type { Skill } from "@/types";

export async function GET() {
  return listItems<Skill>("skills");
}

export async function POST(req: Request) {
  return createItem<Skill>("skills", validateSkill, req);
}