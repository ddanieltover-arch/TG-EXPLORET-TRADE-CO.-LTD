/**
 * PERF-002 — Lighthouse baseline (tolerates Windows chrome-launcher EPERM on cleanup).
 * Usage: npx tsx scripts/lighthouse-baseline.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
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

type Scores = { performance: number; accessibility: number; bestPractices: number; seo: number };

async function audit(url: string): Promise<Scores> {
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
      // Windows often throws EPERM during temp cleanup; scores already captured.
    }
  }
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const rows: { id: string; url: string; scores: Scores }[] = [];

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

  writeFileSync(join(outDir, "summary.json"), JSON.stringify({ base, rows, at: new Date().toISOString() }, null, 2));
  console.log(JSON.stringify({ base, rows }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
