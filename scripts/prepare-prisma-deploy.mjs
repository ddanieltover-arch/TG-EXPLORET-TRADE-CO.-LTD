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

/** Prefer project .env over inherited shell env for local CLI accuracy. */
function loadDotEnv({ override = true } = {}) {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (override || process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv({ override: true });

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
