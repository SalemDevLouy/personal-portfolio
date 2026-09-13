import { createItem, listItems } from "@/lib/admin-handlers";
import { validateCertification } from "@/lib/validate";
import type { Certification } from "@/types";

export async function GET() {
  return listItems<Certification>("certifications");
}

export async function POST(req: Request) {
  return createItem<Certification>("certifications", validateCertification, req);
}