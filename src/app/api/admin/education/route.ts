import { createItem, listItems } from "@/lib/admin-handlers";
import { validateEducation } from "@/lib/validate";
import type { Education } from "@/types";

export async function GET() {
  return listItems<Education>("education");
}

export async function POST(req: Request) {
  return createItem<Education>("education", validateEducation, req);
}