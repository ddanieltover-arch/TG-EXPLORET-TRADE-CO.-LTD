import fs from "node:fs";

function loadEnv(filePath) {
  const map = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    map[t.slice(0, i).trim()] = v;
  }
  return map;
}

const env = loadEnv(".env");

async function main() {
  const base = env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "");
  const headers = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };

  let res = await fetch(`${base}/storage/v1/bucket`, { headers });
  let json = await res.json();
  console.log(
    "list buckets:",
    res.status,
    Array.isArray(json) ? `count=${json.length}` : JSON.stringify(json).slice(0, 200),
  );

  const names = Array.isArray(json) ? json.map((b) => b.name) : [];
  if (!names.includes("product-images")) {
    res = await fetch(`${base}/storage/v1/bucket`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: "product-images",
        name: "product-images",
        public: true,
        fileSizeLimit: 10485760,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
      }),
    });
    json = await res.json();
    console.log("create product-images:", res.status, JSON.stringify(json).slice(0, 300));
  } else {
    console.log("bucket product-images already exists");
  }

  res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [env.SALES_INBOX_EMAIL],
      subject: "TG Export Trade — Resend credential test",
      html: "<p>Credential smoke test. If you received this, Resend send works for sales@tgeptrade.com.</p>",
    }),
  });
  json = await res.json();
  console.log("resend send:", res.status, JSON.stringify(json).slice(0, 400));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
