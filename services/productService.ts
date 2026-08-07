import { PublishStatus } from "@prisma/client";
import { safePublicQuery } from "@/lib/safePublicQuery";
import { prisma } from "@/server/db";

export async function getPublishedProductsByCategory(categorySlug: string) {
  return safePublicQuery(
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
}

export async function getPublishedProduct(categorySlug: string, productSlug: string) {
  return safePublicQuery(
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
}

/** Published products across categories for homepage carousel. */
export async function getPublishedProductsForCarousel(limit = 12) {
  return safePublicQuery(
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
}

/** Lightweight list for sitemap generation. */
export async function listPublishedProductsForSitemap() {
  return safePublicQuery(
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
}
