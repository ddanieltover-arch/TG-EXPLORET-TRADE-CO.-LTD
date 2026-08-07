import type { MetadataRoute } from "next";
import { listPublishedProductsForSitemap } from "@/services/productService";
import { siteUrl } from "@/lib/seo";

const STATIC_PATHS = [
  "/",
  "/about",
  "/products",
  "/products/cooking-oil",
  "/products/rice",
  "/sustainability",
  "/quality-control",
  "/ordering-procedure",
  "/manufacturing-process",
  "/export-markets",
  "/contact",
  "/request-quote",
  "/dealer-registration",
  "/distributor-registration",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" || path.startsWith("/products") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products") ? 0.9 : 0.6,
  }));

  const products = await listPublishedProductsForSitemap();
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/products/${product.category.slug}/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
