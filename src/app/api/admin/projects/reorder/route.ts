import { reorderItems } from "@/lib/admin-handlers";

export async function POST(req: Request) {
  return reorderItems("projects", req);
}