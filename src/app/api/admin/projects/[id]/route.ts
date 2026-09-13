import { deleteItem, updateItem } from "@/lib/admin-handlers";
import { validateProject } from "@/lib/validate";
import type { Project } from "@/types";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateItem<Project>("projects", validateProject, req, params.id);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  return deleteItem<Project>("projects", params.id);
}