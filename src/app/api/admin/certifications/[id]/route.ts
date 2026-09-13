import { deleteItem, updateItem } from "@/lib/admin-handlers";
import { validateCertification } from "@/lib/validate";
import type { Certification } from "@/types";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateItem<Certification>("certifications", validateCertification, req, params.id);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  return deleteItem<Certification>("certifications", params.id);
}