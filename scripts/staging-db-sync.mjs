/**
 * Apply schema + seed to Supabase using .env.staging (gitignored).
 * First cutover uses `db push` (SQLite migrate history is not Postgres-compatible).
 *
 * Usage: node scripts/staging-db-sync.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env.staging");

if (!fs.existsSync(envPath)) {
  console.error("Missing .env.staging — abort.");
  process.exit(1);
}

for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq < 1) continue;
  const key = trimmed.slice(0, eq).trim();
  let val = trimmed.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  process.env[key] = val;
}

if (!/^postgres(ql)?:\/\//i.test(process.env.DATABASE_URL ?? "")) {
  console.error("DATABASE_URL in .env.staging must be Postgres.");
  process.exit(1);
}

function run(cmd, args) {
  console.log(`\n> ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, {
    cwd: root,
    env: process.env,
    stdio: "inherit",
    shell: true,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("node", ["scripts/prepare-prisma-deploy.mjs"]);
run("npx", ["prisma", "generate", "--schema=prisma/schema.deploy.prisma"]);
run("npx", [
  "prisma",
  "db",
  "push",
  "--schema=prisma/schema.deploy.prisma",
  "--accept-data-loss",
]);
run("npx", ["tsx", "prisma/seed.ts"]);
console.log("\nStaging DB sync complete. Rotate admin password after first login.");
