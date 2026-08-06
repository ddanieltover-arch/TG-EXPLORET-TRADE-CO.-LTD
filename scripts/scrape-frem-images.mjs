import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const pages = [
  {
    url: "https://www.fremcoltd.com/product-category/edible-cooking-oil",
    file: "tmp-edible-cooking-oil.html",
  },
  {
    url: "https://www.fremcoltd.com/product-category/rice",
    file: "tmp-rice-category.html",
  },
];

function clean(text) {
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function absolutize(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://www.fremcoltd.com${url}`;
  return url;
}

const rows = [];

for (const page of pages) {
  const html = await readFile(path.join(process.cwd(), page.file), "utf8");
  const productBlocks = [...html.matchAll(/<a class="card-shine[\s\S]*?<\/article><\/a>/gi)];

  for (const match of productBlocks) {
    const block = match[0];
    const href =
      absolutize(
        block.match(/<a[^>]+href="([^"]+)"/i)?.[1] ?? "",
      ) || "";
    const image =
      absolutize(
        (
          block.match(/srcSet="[^"]*?url=%2F(images%2Fproducts%2F[^"&]+?\.(?:png|jpg|jpeg|webp))/i)?.[1] ??
          block.match(/src="\/_next\/image\?url=%2F(images%2Fproducts%2F[^"&]+?\.(?:png|jpg|jpeg|webp))/i)?.[1] ??
          ""
        )?.replaceAll("%2F", "/") ?? "",
      ) || "";
    const title = clean(block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1] ?? "");

    if (href || image || title) {
      rows.push({ categoryPage: page.url, title, href, image });
    }
  }
}

const outPath = path.join(process.cwd(), "tmp-frem-images.json");
await writeFile(outPath, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
console.log(outPath);
console.log(`rows=${rows.length}`);
