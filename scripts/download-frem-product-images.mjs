import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DOWNLOADS = {
  "high-oleic-sunflower-oil": "images/products/high-oleic-sunflower-oil.png",
  "long-life-frying-oil": "images/products/long-life-frying-oil.png",
  "rbd-corn-oil": "images/products/rbd-corn-oil.png",
  "rbd-groundnut-peanut-oil": "images/products/rbd-groundnut-peanut-oil.png",
  "rbd-palm-oil-36-39": "images/products/rbd-palm-oil-36-39.png",
  "rbd-palm-olein": "images/products/rbd-palm-olein.png",
  "rbd-rapeseed-canola-oil": "images/products/rbd-rapeseed-canola-oil.png",
  "rbd-soybean-oil": "images/products/rbd-soybean-oil.png",
  "rbdw-sunflower-oil": "images/products/rbdw-sunflower-oil.png",
  "1121-sella-basmati-rice": "images/products/1121-sella-basmati-rice.webp",
  "arborio-rice": "images/products/arborio-rice.webp",
  "irri-6-long-grain-rice": "images/products/irri-6-long-grain-riceirri-6-long-grain-rice.jpg",
  "japonica-rice": "images/products/japonica-rice.png",
  "jasmine-rice-thai-hom-mali": "images/products/jasmine-rice-thai-hom-mali.jpg",
  "parboiled-rice-5-broken": "images/products/parboiled-rice-5-broken.jpg",
  "quality-brown-rice": "images/products/quality-brown-rice.jpg",
  "irri-9-long-grain-rice": "images/products/rri-9-long-grain-ricerri-9-long-grain-rice.png",
  "thai-brown-jasmine-rice": "images/products/thai-brown-jasmine-rice.webp",
  "thai-glutinous-rice": "images/products/thai-glutinous-rice.webp",
  "thai-glutinous-rice-25-broken": "images/products/thai-glutinous-rice-25-broken.png",
  "thai-hom-patum-rice": "images/products/thai-hom-patum-rice.png",
  "thai-jasmine-black-cargo-rice": "images/products/thai-jasmine-black-cargo-rice.webp",
  "thai-jasmine-red-cargo-rice": "images/products/thai-jasmine-red-cargo-rice.png",
  "thai-long-grain-rice": "images/products/thai-long-grain-rice.webp",
  "thai-parboiled-rice": "images/products/thai-parboiled-rice.webp",
  "thai-riceberry-rice": "images/products/thai-riceberry-rice.webp",
  "thai-white-rice-10-broken": "images/products/thai-white-rice-10-broken.png",
  "thai-white-rice-100-broken": "images/products/thai-white-rice-100-broken.png",
  "thai-white-rice-100-sortexed": "images/products/thai-white-rice-100-sortexed.webp",
  "thai-white-rice-25-broken": "images/products/thai-white-rice-25-broken.png",
  "white-rice-5-broken": "images/products/white-rice-5-broken.webp",
};

const baseUrl = "https://www.fremcoltd.com";
const outDir = path.join(process.cwd(), "public", "media", "products", "frem");

await mkdir(outDir, { recursive: true });

for (const [slug, filename] of Object.entries(DOWNLOADS)) {
  const url = `${baseUrl}/${filename}`;
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0 Safari/537.36",
    },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${url}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const outPath = path.join(outDir, `${slug}.webp`);

  await sharp(buffer)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath);

  console.log(`${slug} -> ${outPath}`);
}
