import { createItem, listItems } from "@/lib/admin-handlers";
import { validateService } from "@/lib/validate";
import type { Service } from "@/types";

export async function GET() {
  return listItems<Service>("services");
}

export async function POST(req: Request) {
  return createItem<Service>("services", validateService, req);
}