import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ObjectId, type Document } from "mongodb";
import { authOptions } from "@/lib/auth";
import { getCollection, serializeDoc } from "@/lib/mongodb";
import type { ValidateResult } from "@/lib/validate";

type Validator = (body: Record<string, any>) => ValidateResult;

/** Returns a 401 response when the request is not an authenticated admin. */
export async function guardAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function listItems<T>(collection: string): Promise<NextResponse> {
  const denied = await guardAdmin();
  if (denied) return denied;
  const col = await getCollection<Document>(collection);
  const docs = await col.find().sort({ order: 1 }).toArray();
  return NextResponse.json({ items: docs.map((d) => serializeDoc<T>(d)) });
}

export async function createItem<T>(
  collection: string,
  validator: Validator,
  req: Request
): Promise<NextResponse> {
  const denied = await guardAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const result = validator(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
  }
  const col = await getCollection<Document>(collection);
  const count = await col.countDocuments();
  const now = new Date();
  const insert: Document = {
    ...result.value,
    order: Number.isFinite(result.value.order) ? result.value.order : count,
    createdAt: now,
    updatedAt: now,
  };
  const { insertedId } = await col.insertOne(insert);
  const created = await col.findOne({ _id: insertedId });
  return NextResponse.json(
    { item: created ? serializeDoc<T>(created) : insert },
    { status: 201 }
  );
}

export async function updateItem<T>(
  collection: string,
  validator: Validator,
  req: Request,
  id: string
): Promise<NextResponse> {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const body = await req.json().catch(() => ({}));
  const result = validator(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
  }
  const col = await getCollection<Document>(collection);
  const updated = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...result.value, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: serializeDoc<T>(updated) });
}

export async function deleteItem<T>(
  collection: string,
  id: string
): Promise<NextResponse> {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const col = await getCollection<Document>(collection);
  const { deletedCount } = await col.deleteOne({ _id: new ObjectId(id) });
  if (!deletedCount) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function reorderItems(
  collection: string,
  req: Request
): Promise<NextResponse> {
  const denied = await guardAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  if (!Array.isArray(body?.orderedIds)) {
    return NextResponse.json(
      { error: "orderedIds must be an array" },
      { status: 400 }
    );
  }
  const col = await getCollection<Document>(collection);
  await Promise.all(
    body.orderedIds.map((rawId: unknown, index: number) =>
      col.updateOne(
        { _id: new ObjectId(String(rawId)) },
        { $set: { order: index, updatedAt: new Date() } }
      )
    )
  );
  return NextResponse.json({ ok: true });
}