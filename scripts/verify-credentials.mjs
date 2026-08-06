import fs from "node:fs";
import path from "node:path";

function loadEnv(filePath) {
  const map = {};
  if (!fs.existsSync(filePath)) return map;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    map[k] = v;
  }
  return map;
}

function writeEnv(filePath, map, headerLines) {
  const order = [
    "DATABASE_URL",
    "DIRECT_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_STORAGE_BUCKET",
    "AUTH_SECRET",
    "AUTH_URL",
    "NEXT_PUBLIC_SITE_URL",
    "SEED_ADMIN_EMAIL",
    "SEED_ADMIN_PASSWORD",
    "RESEND_FROM_EMAIL",
    "SALES_INBOX_EMAIL",
    "RESEND_API_KEY",
  ];
  const lines = [...headerLines, ""];
  for (const k of order) {
    if (!(k in map) || map[k] === undefined || map[k] === "") continue;
    lines.push(`${k}="${map[k]}"`);
  }
  fs.writeFileSync(filePath, lines.join("\n") + "\n", "utf8");
}

const root = process.cwd();
const local = loadEnv(path.join(root, ".env"));
const stg = loadEnv(path.join(root, ".env.staging"));

for (const k of [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_STORAGE_BUCKET",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "SALES_INBOX_EMAIL",
  "SEED_ADMIN_EMAIL",
  "SEED_ADMIN_PASSWORD",
]) {
  if (local[k]) stg[k] = local[k];
}

writeEnv(path.join(root, ".env.staging"), stg, [
  "# Staging / Supabase — DO NOT COMMIT",
  "# Synced Supabase API + Resend from .env (2026-08-05)",
  "# DATABASE_URL / DIRECT_URL must match the NEW Supabase project",
]);

console.log("Synced API/Resend keys into .env.staging");

const apiRef = (local.NEXT_PUBLIC_SUPABASE_URL || "").match(
  /https:\/\/([^.]+)/,
)?.[1];
const dbRef = (stg.DATABASE_URL || "").match(/postgres\.([a-z0-9]+)/)?.[1];
console.log(`API project: ${apiRef || "?"}`);
console.log(`Staging DATABASE_URL project: ${dbRef || "?"}`);
if (apiRef && dbRef && apiRef !== dbRef) {
  console.log(
    "MISMATCH: staging DATABASE_URL still targets the old project. Paste new pooler + direct URIs.",
  );
}

async function main() {
  // Resend domains
  try {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${local.RESEND_API_KEY}` },
    });
    const json = await res.json();
    if (!res.ok) {
      console.log("RESEND probe FAILED:", res.status, JSON.stringify(json));
    } else {
      console.log("RESEND domains:");
      for (const d of json.data || []) {
        console.log(`  - ${d.name} status=${d.status}`);
      }
      if (!(json.data || []).length) console.log("  (none)");
    }
  } catch (e) {
    console.log("RESEND probe FAILED:", e.message);
  }

  // Supabase storage buckets
  try {
    const base = (local.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
    const res = await fetch(`${base}/storage/v1/bucket`, {
      headers: {
        apikey: local.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${local.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      console.log("SUPABASE storage probe FAILED:", res.status, JSON.stringify(json));
    } else {
      const wanted = local.SUPABASE_STORAGE_BUCKET || "product-images";
      console.log("SUPABASE buckets:");
      for (const b of json) {
        console.log(`  - ${b.name} public=${b.public}`);
      }
      const names = (json || []).map((b) => b.name);
      console.log(
        names.includes(wanted)
          ? `  bucket '${wanted}' FOUND`
          : `  bucket '${wanted}' MISSING — create as public`,
      );
    }
  } catch (e) {
    console.log("SUPABASE storage probe FAILED:", e.message);
  }
}

main();
