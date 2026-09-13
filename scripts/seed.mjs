#!/usr/bin/env node
// Idempotent seed script:
//   npm run seed
// Requires MONGODB_URI (and ADMIN_EMAIL/ADMIN_PASSWORD to create the login).
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import {
  certifications,
  education,
  projects,
  services,
  settings,
  skills,
} from "../src/lib/data/fallback-data.mjs";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("✗ MONGODB_URI is not set. Configure it in .env.local first.");
  process.exit(1);
}

const dbName = process.env.MONGODB_DB || "portfolio";
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

try {
  await client.connect();
} catch (err) {
  console.error("✗ Could not connect to MongoDB Atlas:", err.message);
  process.exit(1);
}

const db = client.db(dbName);
const now = new Date();

// 1) Admin user
const adminEmail = (process.env.ADMIN_EMAIL || "admin@salem.dev")
  .trim()
  .toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD;

if (adminPassword) {
  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  await db.collection("admins").updateOne(
    { email: adminEmail },
    {
      $set: {
        email: adminEmail,
        passwordHash,
        name: process.env.ADMIN_NAME || "Salem",
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
  console.log(`✓ Admin user ensured: ${adminEmail}`);
} else {
  console.warn("⚠ ADMIN_PASSWORD not set — skipped admin user creation.");
}

// 2) Content collections (only seeded when empty)
const collections = {
  education,
  certifications,
  projects,
  skills,
  services,
};

for (const [name, items] of Object.entries(collections)) {
  const count = await db.collection(name).countDocuments();
  if (count > 0) {
    console.log(`· Skipped ${name} (already has ${count} docs)`);
    continue;
  }
  if (!Array.isArray(items) || items.length === 0) {
    console.log(`· Skipped ${name} (no seed data)`);
    continue;
  }
  await db.collection(name).insertMany(
    items.map((item, i) => ({
      ...item,
      order: typeof item.order === "number" ? item.order : i,
      createdAt: now,
      updatedAt: now,
    }))
  );
  console.log(`✓ Seeded ${name}: ${items.length} docs`);
}

// 3) Settings singleton
const existingSettings = await db.collection("settings").findOne({});
if (!existingSettings) {
  await db.collection("settings").insertOne({ ...settings, updatedAt: now });
  console.log("✓ Seeded settings");
} else {
  console.log("· Skipped settings (already present)");
}

await client.close();
console.log("Done.");