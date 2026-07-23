/**
 * For Vercel/staging: if DATABASE_URL is Postgres, emit prisma/schema.deploy.prisma
 * with postgresql + directUrl. Local SQLite schema.prisma is left untouched.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "prisma", "schema.prisma");
const outPath = path.join(root, "prisma", "schema.deploy.prisma");

const databaseUrl = process.env.DATABASE_URL ?? "";
const isPostgres = /^postgres(ql)?:\/\//i.test(databaseUrl);

let schema = fs.readFileSync(sourcePath, "utf8");

if (isPostgres) {
  schema = schema.replace(
    /datasource db \{[\s\S]*?\n\}/,
    `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}`,
  );
  console.log("[prepare-prisma-deploy] provider=postgresql (DATABASE_URL is Postgres)");
} else {
  console.log("[prepare-prisma-deploy] provider=sqlite (local / non-Postgres DATABASE_URL)");
}

fs.writeFileSync(outPath, schema);
console.log(`[prepare-prisma-deploy] wrote ${path.relative(root, outPath)}`);
