/**
 * Regenerates every derived brand asset (logo, favicon, OG/Twitter image)
 * from the single source lockup in assets/logo-source.jpeg.
 *
 * Run: node scripts/generate-brand-assets.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "assets", "logo-source.jpeg");
const brandDir = path.join(root, "public", "brand");
const appDir = path.join(root, "app");

const WHITE_THRESHOLD = 240;
const BACKGROUND_THRESHOLD = 246;
const NAVY = { r: 10, g: 47, b: 92 };

/** The artwork is flat navy/gold, so a quantised palette stays lossless-looking. */
const PNG_OPTIONS = { compressionLevel: 9, palette: true, quality: 92 };

/** Per-row and per-column counts of non-white pixels. */
async function inkProfile(buffer) {
  const { data, info } = await sharp(buffer)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const rowInk = new Array(height).fill(0);
  const colInk = new Array(width).fill(0);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[y * width + x] < WHITE_THRESHOLD) {
        rowInk[y] += 1;
        colInk[x] += 1;
      }
    }
  }

  return { width, height, rowInk, colInk };
}

function firstInk(values) {
  return Math.max(0, values.findIndex((v) => v > 0));
}

function lastInk(values) {
  for (let i = values.length - 1; i >= 0; i -= 1) {
    if (values[i] > 0) return i;
  }
  return values.length - 1;
}

/** Crops away the flat white margin surrounding the artwork. */
async function trim(buffer) {
  const { rowInk, colInk } = await inkProfile(buffer);
  const top = firstInk(rowInk);
  const left = firstInk(colInk);

  return sharp(buffer)
    .extract({
      left,
      top,
      width: lastInk(colInk) - left + 1,
      height: lastInk(rowInk) - top + 1,
    })
    .png()
    .toBuffer();
}

/**
 * The emblem is the block above the first tall blank gutter, which is the
 * whitespace separating the TG monogram from the wordmark below it.
 */
async function extractMark(lockup) {
  const { width, height, rowInk } = await inkProfile(lockup);
  const minGap = Math.round(height * 0.02);

  let markBottom = height - 1;
  let run = 0;
  for (let y = 0; y < height; y += 1) {
    if (rowInk[y] === 0) {
      run += 1;
      continue;
    }
    if (run >= minGap && y - run > height * 0.3) {
      markBottom = y - run - 1;
      break;
    }
    run = 0;
  }

  const cropped = await sharp(lockup)
    .extract({ left: 0, top: 0, width, height: markBottom + 1 })
    .png()
    .toBuffer();

  return trim(cropped);
}

/**
 * Makes the surrounding white transparent via a flood fill seeded from the
 * edges, so the highlights inside the globe stay opaque.
 */
async function removeBackground(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const isLight = (index) => {
    const p = index * channels;
    return (
      data[p] >= BACKGROUND_THRESHOLD &&
      data[p + 1] >= BACKGROUND_THRESHOLD &&
      data[p + 2] >= BACKGROUND_THRESHOLD
    );
  };

  const queue = [];
  const seen = new Uint8Array(width * height);
  const seed = (index) => {
    if (seen[index] || !isLight(index)) return;
    seen[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    seed(y * width);
    seed(y * width + width - 1);
  }

  while (queue.length > 0) {
    const index = queue.pop();
    data[index * channels + 3] = 0;

    const x = index % width;
    const y = (index - x) / width;
    if (x > 0) seed(index - 1);
    if (x < width - 1) seed(index + 1);
    if (y > 0) seed(index - width);
    if (y < height - 1) seed(index + width);
  }

  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

/** Pads artwork onto a square white canvas so icons keep breathing room. */
async function squareIcon(mark, size, padding = 0.08) {
  const inner = Math.round(size * (1 - padding * 2));
  const art = await sharp(mark)
    .resize(inner, inner, { fit: "contain", background: "#ffffff" })
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 3, background: "#ffffff" },
  })
    .composite([{ input: art, gravity: "center" }])
    .png(PNG_OPTIONS)
    .toBuffer();
}

/** Wraps PNG frames in an ICO container for the legacy /favicon.ico request. */
function packIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  const directory = Buffer.alloc(frames.length * 16);
  let offset = header.length + directory.length;

  frames.forEach(({ size, data }, index) => {
    const entry = index * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, entry);
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    directory.writeUInt8(0, entry + 2);
    directory.writeUInt8(0, entry + 3);
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(data.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...frames.map((f) => f.data)]);
}

async function favicon(mark) {
  const sizes = [16, 32, 48];
  const frames = await Promise.all(
    sizes.map(async (size) => {
      const inner = Math.round(size * 0.92);
      const art = await sharp(mark)
        .resize(inner, inner, { fit: "contain", background: "#ffffff" })
        .toBuffer();

      return {
        size,
        // Next.js only decodes PNG-in-ICO frames stored as RGBA, so no palette here.
        data: await sharp({
          create: {
            width: size,
            height: size,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
          },
        })
          .composite([{ input: art, gravity: "center" }])
          .png({ compressionLevel: 9, palette: false })
          .toBuffer(),
      };
    }),
  );

  return packIco(frames);
}

async function socialCard(lockup) {
  const width = 1200;
  const height = 630;
  const barHeight = 12;

  const art = await sharp(lockup)
    .resize({ width: 820, height: 430, fit: "inside" })
    .toBuffer();

  const bar = await sharp({
    create: { width, height: barHeight, channels: 3, background: NAVY },
  })
    .png(PNG_OPTIONS)
    .toBuffer();

  return sharp({
    create: { width, height, channels: 3, background: "#ffffff" },
  })
    .composite([
      { input: art, gravity: "center" },
      { input: bar, top: height - barHeight, left: 0 },
    ])
    .png(PNG_OPTIONS)
    .toBuffer();
}

async function main() {
  await mkdir(brandDir, { recursive: true });

  const lockup = await trim(await sharp(source).png().toBuffer());
  const mark = await extractMark(lockup);
  const card = await socialCard(lockup);

  const outputs = [
    [
      path.join(brandDir, "logo.png"),
      await sharp(await removeBackground(lockup))
        .resize({ width: 960, withoutEnlargement: true })
        .png(PNG_OPTIONS)
        .toBuffer(),
    ],
    [
      path.join(brandDir, "logo-mark.png"),
      await sharp(await removeBackground(mark))
        .resize({ width: 512, withoutEnlargement: true })
        .png(PNG_OPTIONS)
        .toBuffer(),
    ],
    [path.join(appDir, "favicon.ico"), await favicon(mark)],
    [path.join(appDir, "icon.png"), await squareIcon(mark, 512)],
    [path.join(appDir, "apple-icon.png"), await squareIcon(mark, 180, 0.1)],
    [path.join(appDir, "opengraph-image.png"), card],
    [path.join(appDir, "twitter-image.png"), card],
  ];

  for (const [target, buffer] of outputs) {
    await writeFile(target, buffer);
    const dimensions = target.endsWith(".ico")
      ? "16/32/48"
      : await sharp(buffer)
          .metadata()
          .then(({ width, height }) => `${width}x${height}`);
    console.log(
      `${path.relative(root, target)} — ${dimensions} (${Math.round(buffer.length / 1024)} KB)`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
