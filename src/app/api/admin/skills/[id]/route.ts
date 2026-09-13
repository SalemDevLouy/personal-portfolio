import { deleteItem, updateItem } from "@/lib/admin-handlers";
import { validateSkill } from "@/lib/validate";
import type { Skill } from "@/types";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateItem<Skill>("skills", validateSkill, req, params.id);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  return deleteItem<Skill>("skills", params.id);
}