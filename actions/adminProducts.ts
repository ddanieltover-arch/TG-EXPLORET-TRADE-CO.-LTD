"use server";

import { PublishStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCmsWrite } from "@/lib/adminAuth";
import { isSupabaseStorageConfigured, uploadProductImageBuffer } from "@/lib/media";
import {
  addPackaging,
  addProductImage,
  addSpecification,
  createProduct,
  deletePackaging,
  deleteProductImage,
  deleteSpecification,
  setPrimaryImage,
  updateProductCore,
} from "@/services/adminProductService";

const publishStatuses = Object.values(PublishStatus);

function revalidateProductPaths(productId: string) {
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/products");
  revalidatePath("/products/cooking-oil");
  revalidatePath("/products/rice");
}

export async function createProductAction(formData: FormData) {
  await requireCmsWrite();

  const status = String(formData.get("status") ?? "") as PublishStatus;
  if (!publishStatuses.includes(status)) throw new Error("Invalid status");

  const product = await createProduct({
    categoryId: String(formData.get("categoryId") ?? ""),
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "") || undefined,
    shortDescription: String(formData.get("shortDescription") ?? "") || undefined,
    description: String(formData.get("description") ?? "") || undefined,
    originCountry: String(formData.get("originCountry") ?? "") || undefined,
    status,
  });

  revalidateProductPaths(product.id);
  redirect(`/admin/products/${product.id}`);
}

export async function updateProductAction(formData: FormData) {
  await requireCmsWrite();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as PublishStatus;
  if (!id || !publishStatuses.includes(status)) throw new Error("Invalid input");

  await updateProductCore(id, {
    categoryId: String(formData.get("categoryId") ?? ""),
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "") || undefined,
    shortDescription: String(formData.get("shortDescription") ?? "") || undefined,
    description: String(formData.get("description") ?? "") || undefined,
    originCountry: String(formData.get("originCountry") ?? "") || undefined,
    status,
  });

  revalidateProductPaths(id);
}

export async function addSpecificationAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  await addSpecification({
    productId,
    label: String(formData.get("label") ?? ""),
    value: String(formData.get("value") ?? ""),
    unit: String(formData.get("unit") ?? "") || undefined,
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  });
  revalidateProductPaths(productId);
}

export async function deleteSpecificationAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const id = String(formData.get("id") ?? "");
  await deleteSpecification(id);
  revalidateProductPaths(productId);
}

export async function addPackagingAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  await addPackaging({
    productId,
    name: String(formData.get("name") ?? ""),
    sizeLabel: String(formData.get("sizeLabel") ?? "") || undefined,
    notes: String(formData.get("notes") ?? "") || undefined,
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  });
  revalidateProductPaths(productId);
}

export async function deletePackagingAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const id = String(formData.get("id") ?? "");
  await deletePackaging(id);
  revalidateProductPaths(productId);
}

export async function addProductImageUrlAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  await addProductImage({
    productId,
    url: String(formData.get("url") ?? ""),
    alt: String(formData.get("alt") ?? "Product image"),
    publicId: String(formData.get("publicId") ?? "") || undefined,
    isPrimary: formData.get("isPrimary") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  });
  revalidateProductPaths(productId);
}

export async function uploadProductImageAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const alt = String(formData.get("alt") ?? "Product image");
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Image file required");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be under 5MB");
  }

  if (!isSupabaseStorageConfigured()) {
    throw new Error("Supabase Storage is not configured — use URL attach instead");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadProductImageBuffer(buffer, {
    contentType: file.type || "image/jpeg",
    filename: file.name,
  });

  await addProductImage({
    productId,
    url: uploaded.url,
    alt,
    publicId: uploaded.publicId,
    isPrimary: formData.get("isPrimary") === "on",
  });

  revalidateProductPaths(productId);
}

export async function deleteProductImageAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const id = String(formData.get("id") ?? "");
  await deleteProductImage(id);
  revalidateProductPaths(productId);
}

export async function setPrimaryImageAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const imageId = String(formData.get("imageId") ?? "");
  await setPrimaryImage(productId, imageId);
  revalidateProductPaths(productId);
}
