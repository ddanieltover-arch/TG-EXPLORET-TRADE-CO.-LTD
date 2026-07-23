import { PublishStatus } from "@prisma/client";
import { prisma } from "@/server/db";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function listAllProductsAdmin() {
  return prisma.product.findMany({
    orderBy: [{ category: { sortOrder: "asc" } }, { name: "asc" }],
    include: {
      category: true,
      _count: { select: { images: true, specifications: true, packaging: true } },
    },
  });
}

export async function listCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getProductAdmin(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      specifications: { orderBy: { sortOrder: "asc" } },
      packaging: { orderBy: { sortOrder: "asc" } },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export type ProductCoreInput = {
  categoryId: string;
  name: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  originCountry?: string;
  status: PublishStatus;
};

export async function createProduct(input: ProductCoreInput) {
  const slug = input.slug?.trim() || slugify(input.name);
  const publishedAt = input.status === PublishStatus.PUBLISHED ? new Date() : null;

  return prisma.product.create({
    data: {
      categoryId: input.categoryId,
      name: input.name.trim(),
      slug,
      shortDescription: input.shortDescription?.trim() || null,
      description: input.description?.trim() || null,
      originCountry: input.originCountry?.trim() || "Thailand",
      status: input.status,
      publishedAt,
    },
  });
}

export async function updateProductCore(id: string, input: ProductCoreInput) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new Error("Product not found");

  const slug = input.slug?.trim() || existing.slug;
  const becomingPublished =
    input.status === PublishStatus.PUBLISHED && existing.status !== PublishStatus.PUBLISHED;

  return prisma.product.update({
    where: { id },
    data: {
      categoryId: input.categoryId,
      name: input.name.trim(),
      slug,
      shortDescription: input.shortDescription?.trim() || null,
      description: input.description?.trim() || null,
      originCountry: input.originCountry?.trim() || "Thailand",
      status: input.status,
      publishedAt: becomingPublished
        ? new Date()
        : input.status === PublishStatus.PUBLISHED
          ? existing.publishedAt ?? new Date()
          : null,
    },
  });
}

export async function addSpecification(input: {
  productId: string;
  label: string;
  value: string;
  unit?: string;
  sortOrder?: number;
}) {
  return prisma.productSpecification.create({
    data: {
      productId: input.productId,
      label: input.label.trim(),
      value: input.value.trim(),
      unit: input.unit?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
    },
  });
}

export async function deleteSpecification(id: string) {
  return prisma.productSpecification.delete({ where: { id } });
}

export async function addPackaging(input: {
  productId: string;
  name: string;
  sizeLabel?: string;
  notes?: string;
  sortOrder?: number;
}) {
  return prisma.productPackaging.create({
    data: {
      productId: input.productId,
      name: input.name.trim(),
      sizeLabel: input.sizeLabel?.trim() || null,
      notes: input.notes?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
    },
  });
}

export async function deletePackaging(id: string) {
  return prisma.productPackaging.delete({ where: { id } });
}

export async function addProductImage(input: {
  productId: string;
  url: string;
  alt: string;
  publicId?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}) {
  if (input.isPrimary) {
    await prisma.productImage.updateMany({
      where: { productId: input.productId },
      data: { isPrimary: false },
    });
  }

  return prisma.productImage.create({
    data: {
      productId: input.productId,
      url: input.url.trim(),
      alt: input.alt.trim(),
      publicId: input.publicId?.trim() || null,
      isPrimary: input.isPrimary ?? false,
      sortOrder: input.sortOrder ?? 0,
    },
  });
}

export async function deleteProductImage(id: string) {
  return prisma.productImage.delete({ where: { id } });
}

export async function setPrimaryImage(productId: string, imageId: string) {
  await prisma.$transaction([
    prisma.productImage.updateMany({
      where: { productId },
      data: { isPrimary: false },
    }),
    prisma.productImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    }),
  ]);
}
