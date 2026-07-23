"use server";

import { InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import { updateInquiryStatus } from "@/services/inquiryService";

const allowed = Object.values(InquiryStatus);

export async function updateInquiryStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as InquiryStatus;
  if (!id || !allowed.includes(status)) throw new Error("Invalid input");
  await updateInquiryStatus(id, status);
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
