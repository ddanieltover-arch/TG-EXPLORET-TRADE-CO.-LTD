/**
 * Converts raw product photography in public/media/products to web-ready WebP.
 * Source PNGs are removed once converted so only shipping assets stay in the repo.
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "media", "products");
const MAX_WIDTH = 1400;
const QUALITY = 78;

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith(".png"));

let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(DIR, file);
  const out = src.replace(/\.png$/i, ".webp");

  before += (await stat(src)).size;

  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  after += (await stat(out)).size;
  await unlink(src);
  console.log(`${file} -> ${path.basename(out)}`);
}

const kb = (bytes) => Math.round(bytes / 1024);
console.log(`\n${files.length} files: ${kb(before)} KB -> ${kb(after)} KB`);
