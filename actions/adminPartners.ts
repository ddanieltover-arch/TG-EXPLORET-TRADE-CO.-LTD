"use server";

import { ApplicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import {
  updateDealerApplicationStatus,
  updateDistributorApplicationStatus,
} from "@/services/partnerService";

const allowed = Object.values(ApplicationStatus);

export async function updateDealerStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  if (!id || !allowed.includes(status)) throw new Error("Invalid input");
  await updateDealerApplicationStatus(id, status);
  revalidatePath("/admin/dealers");
  revalidatePath("/admin");
}

export async function updateDistributorStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  if (!id || !allowed.includes(status)) throw new Error("Invalid input");
  await updateDistributorApplicationStatus(id, status);
  revalidatePath("/admin/distributors");
  revalidatePath("/admin");
}
