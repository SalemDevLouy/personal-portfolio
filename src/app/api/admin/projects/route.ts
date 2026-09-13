import { createItem, listItems } from "@/lib/admin-handlers";
import { validateProject } from "@/lib/validate";
import type { Project } from "@/types";

export async function GET() {
  return listItems<Project>("projects");
}

export async function POST(req: Request) {
  return createItem<Project>("projects", validateProject, req);
}