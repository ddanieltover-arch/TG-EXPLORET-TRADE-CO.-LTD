"use server";

import { InquirySource, InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import { prisma } from "@/server/db";
import { updateInquiryStatus } from "@/services/inquiryService";

const allowedStatuses = Object.values(InquiryStatus);
const allowedSources = Object.values(InquirySource);

function revalidateInquiryPaths(id?: string) {
  revalidatePath("/admin/inquiries");
  if (id) revalidatePath(`/admin/inquiries/${id}`);
  revalidatePath("/admin");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as InquiryStatus;
  if (!id || !allowedStatuses.includes(status)) throw new Error("Invalid input");
  await updateInquiryStatus(id, status);
  revalidateInquiryPaths(id);
}

export async function updateInquiryAction(formData: FormData) {
  await requireSalesWrite();

  const id = String(formData.get("id") ?? "");
  const contactName = String(formData.get("contactName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const source = String(formData.get("source") ?? "") as InquirySource;
  const sourcePath = String(formData.get("sourcePath") ?? "").trim();
  const status = String(formData.get("status") ?? "") as InquiryStatus;

  if (
    !id ||
    contactName.length < 2 ||
    !email.includes("@") ||
    message.length < 2 ||
    !allowedStatuses.includes(status) ||
    !allowedSources.includes(source)
  ) {
    throw new Error("Invalid input — check required fields");
  }

  await prisma.inquiry.update({
    where: { id },
    data: {
      contactName,
      email,
      companyName: companyName || null,
      phone: phone || null,
      country: country || null,
      message,
      source,
      sourcePath: sourcePath || null,
      status,
    },
  });

  revalidateInquiryPaths(id);
}

export async function deleteInquiryAction(formData: FormData) {
  await requireSalesWrite();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid input");

  await prisma.inquiry.delete({ where: { id } });
  revalidateInquiryPaths();
}
