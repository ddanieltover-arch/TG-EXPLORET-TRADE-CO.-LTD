"use server";

import { PublishStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCmsWrite } from "@/lib/adminAuth";
import {
  createCertification,
  deleteCertification,
  updateCertification,
} from "@/services/certificationService";

const statuses = Object.values(PublishStatus);

function revalidateCertPaths() {
  revalidatePath("/admin/certifications");
}

export async function createCertificationAction(formData: FormData) {
  await requireCmsWrite();
  const status = String(formData.get("status") ?? "") as PublishStatus;
  if (!statuses.includes(status)) throw new Error("Invalid status");

  const cert = await createCertification({
    name: String(formData.get("name") ?? ""),
    issuer: String(formData.get("issuer") ?? "") || undefined,
    summary: String(formData.get("summary") ?? "") || undefined,
    documentUrl: String(formData.get("documentUrl") ?? "") || undefined,
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    status,
  });

  revalidateCertPaths();
  redirect(`/admin/certifications/${cert.id}`);
}

export async function updateCertificationAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as PublishStatus;
  if (!id || !statuses.includes(status)) throw new Error("Invalid input");

  await updateCertification(id, {
    name: String(formData.get("name") ?? ""),
    issuer: String(formData.get("issuer") ?? "") || undefined,
    summary: String(formData.get("summary") ?? "") || undefined,
    documentUrl: String(formData.get("documentUrl") ?? "") || undefined,
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    status,
  });

  revalidateCertPaths();
  revalidatePath(`/admin/certifications/${id}`);
}

export async function deleteCertificationAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  await deleteCertification(id);
  revalidateCertPaths();
  redirect("/admin/certifications");
}
