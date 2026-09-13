import { deleteItem, updateItem } from "@/lib/admin-handlers";
import { validateService } from "@/lib/validate";
import type { Service } from "@/types";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateItem<Service>("services", validateService, req, params.id);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  return deleteItem<Service>("services", params.id);
}