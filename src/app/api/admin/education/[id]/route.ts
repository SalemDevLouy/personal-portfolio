import { deleteItem, updateItem } from "@/lib/admin-handlers";
import { validateEducation } from "@/lib/validate";
import type { Education } from "@/types";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateItem<Education>("education", validateEducation, req, params.id);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  return deleteItem<Education>("education", params.id);
}