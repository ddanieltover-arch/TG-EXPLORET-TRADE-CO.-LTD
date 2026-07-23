/**
 * PERF-002 — Lighthouse baseline (ESM, no tsx transform).
 * Usage: node scripts/lighthouse-baseline.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const base = process.env.LH_BASE_URL ?? "http://127.0.0.1:3017";
const outDir = join(process.cwd(), "lighthouse-reports");

const pages = [
  { id: "home", path: "/" },
  { id: "products", path: "/products" },
  { id: "pdp", path: "/products/sugar/icumsa-45-white-refined" },
  { id: "rfq", path: "/request-quote" },
];

async function audit(url) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      formFactor: "desktop",
      screenEmulation: { disabled: true },
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    if (!result?.lhr) throw new Error("No Lighthouse result");
    const c = result.lhr.categories;
    return {
      performance: Math.round(100 * (c.performance?.score ?? 0)),
      accessibility: Math.round(100 * (c.accessibility?.score ?? 0)),
      bestPractices: Math.round(100 * (c["best-practices"]?.score ?? 0)),
      seo: Math.round(100 * (c.seo?.score ?? 0)),
    };
  } finally {
    try {
      await chrome.kill();
    } catch {
      // ignore Windows EPERM on temp cleanup
    }
  }
}

const rows = [];
mkdirSync(outDir, { recursive: true });

for (const page of pages) {
  const url = `${base}${page.path}`;
  process.stderr.write(`Auditing ${page.id}…\n`);
  const scores = await audit(url);
  rows.push({ id: page.id, url, scores });
  writeFileSync(join(outDir, `${page.id}-scores.json`), JSON.stringify({ url, scores }, null, 2));
  process.stderr.write(
    `  ${page.id}: P=${scores.performance} A=${scores.accessibility} BP=${scores.bestPractices} SEO=${scores.seo}\n`,
  );
}

writeFileSync(
  join(outDir, "summary.json"),
  JSON.stringify({ base, rows, at: new Date().toISOString() }, null, 2),
);
console.log(JSON.stringify({ base, rows }, null, 2));
