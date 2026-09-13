import { MongoClient, type Collection, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "portfolio";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

/**
 * Serverless-safe MongoDB connection. A single client is cached on the Node
 * runtime globally so every route handler reuses the same connection pool.
 */
export async function connectToDatabase(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    });
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

/** Typed collection accessor for a named collection in the portfolio db. */
export async function getCollection<T extends Document = Document>(
  name: string
): Promise<Collection<T>> {
  const client = await connectToDatabase();
  return client.db(dbName).collection(name) as unknown as Collection<T>;
}

/** Serialize a MongoDB document for JSON responses (_id + Dates → strings). */
export function serializeDoc<T>(doc: Document): T {
  const out: Record<string, unknown> = { ...doc, _id: String(doc._id) };
  for (const key of Object.keys(out)) {
    if (out[key] instanceof Date) {
      out[key] = (out[key] as Date).toISOString();
    }
  }
  return out as T;
}