import { PublishStatus } from "@prisma/client";
import {
  getFallbackProduct,
  getFallbackProductsByCategory,
  getFallbackProductsForCarousel,
} from "@/lib/catalogueFallback";
import { safePublicQuery } from "@/lib/safePublicQuery";
import { prisma } from "@/server/db";

export async function getPublishedProductsByCategory(categorySlug: string) {
  const products = await safePublicQuery(
    `products:${categorySlug}`,
    () =>
      prisma.product.findMany({
        where: {
          status: PublishStatus.PUBLISHED,
          category: { slug: categorySlug },
        },
        orderBy: { name: "asc" },
        include: {
          category: true,
          images: { orderBy: { sortOrder: "asc" } },
        },
      }),
    [],
  );

  if (products.length > 0) return products;

  const fallback = getFallbackProductsByCategory(categorySlug);
  if (fallback.length > 0) {
    console.warn(
      `[productService] using catalogue fallback for category "${categorySlug}" (${fallback.length} SKUs)`,
    );
  }
  return fallback;
}

export async function getPublishedProduct(categorySlug: string, productSlug: string) {
  const product = await safePublicQuery(
    `product:${categorySlug}/${productSlug}`,
    () =>
      prisma.product.findFirst({
        where: {
          slug: productSlug,
          status: PublishStatus.PUBLISHED,
          category: { slug: categorySlug },
        },
        include: {
          category: true,
          specifications: { orderBy: { sortOrder: "asc" } },
          packaging: { orderBy: { sortOrder: "asc" } },
          images: { orderBy: { sortOrder: "asc" } },
        },
      }),
    null,
  );

  if (product) return product;

  const fallback = getFallbackProduct(categorySlug, productSlug);
  if (fallback) {
    console.warn(
      `[productService] using catalogue fallback for product "${categorySlug}/${productSlug}"`,
    );
  }
  return fallback;
}

/** Published products across categories for homepage carousel. */
export async function getPublishedProductsForCarousel(limit = 12) {
  const products = await safePublicQuery(
    `products:carousel:${limit}`,
    () =>
      prisma.product.findMany({
        where: { status: PublishStatus.PUBLISHED },
        orderBy: [{ updatedAt: "desc" }, { name: "asc" }],
        take: limit,
        include: {
          category: { select: { slug: true, name: true } },
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
        },
      }),
    [],
  );

  if (products.length > 0) return products;

  const fallback = getFallbackProductsForCarousel(limit);
  if (fallback.length > 0) {
    console.warn(
      `[productService] using catalogue fallback for carousel (${fallback.length} SKUs)`,
    );
  }
  return fallback;
}

/** Lightweight list for sitemap generation. */
export async function listPublishedProductsForSitemap() {
  const products = await safePublicQuery(
    "products:sitemap",
    () =>
      prisma.product.findMany({
        where: { status: PublishStatus.PUBLISHED },
        select: {
          slug: true,
          updatedAt: true,
          category: { select: { slug: true } },
        },
        orderBy: { updatedAt: "desc" },
      }),
    [],
  );

  if (products.length > 0) return products;

  return getFallbackProductsForCarousel(100).map((product) => ({
    slug: product.slug,
    updatedAt: new Date(0),
    category: { slug: product.category.slug },
  }));
}
