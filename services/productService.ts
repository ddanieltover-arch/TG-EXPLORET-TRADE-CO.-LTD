import { PublishStatus } from "@prisma/client";
import { prisma } from "@/server/db";

export async function getPublishedProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    where: {
      status: PublishStatus.PUBLISHED,
      category: { slug: categorySlug },
    },
    orderBy: { name: "asc" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getPublishedProduct(categorySlug: string, productSlug: string) {
  return prisma.product.findFirst({
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
  });
}
