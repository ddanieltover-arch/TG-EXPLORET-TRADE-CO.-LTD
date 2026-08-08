"use server";

import { ApplicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import { prisma } from "@/server/db";
import {
  updateDealerApplicationStatus,
  updateDistributorApplicationStatus,
} from "@/services/partnerService";

const allowed = Object.values(ApplicationStatus);

function parsePartnerFields(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const companyName = String(formData.get("companyName") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const marketsServed = String(formData.get("marketsServed") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const status = String(formData.get("status") ?? "") as ApplicationStatus;

  if (
    !id ||
    companyName.length < 2 ||
    contactName.length < 2 ||
    !email.includes("@") ||
    country.length < 2 ||
    !allowed.includes(status)
  ) {
    throw new Error("Invalid input — check required fields");
  }

  return {
    id,
    data: {
      companyName,
      contactName,
      email,
      phone: phone || null,
      country,
      marketsServed: marketsServed || null,
      message: message || null,
      status,
    },
  };
}

export async function updateDealerStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  if (!id || !allowed.includes(status)) throw new Error("Invalid input");
  await updateDealerApplicationStatus(id, status);
  revalidatePath("/admin/dealers");
  revalidatePath(`/admin/dealers/${id}`);
  revalidatePath("/admin");
}

export async function updateDistributorStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  if (!id || !allowed.includes(status)) throw new Error("Invalid input");
  await updateDistributorApplicationStatus(id, status);
  revalidatePath("/admin/distributors");
  revalidatePath(`/admin/distributors/${id}`);
  revalidatePath("/admin");
}

export async function updateDealerAction(formData: FormData) {
  await requireSalesWrite();
  const { id, data } = parsePartnerFields(formData);
  await prisma.dealerApplication.update({ where: { id }, data });
  revalidatePath("/admin/dealers");
  revalidatePath(`/admin/dealers/${id}`);
  revalidatePath("/admin");
}

export async function updateDistributorAction(formData: FormData) {
  await requireSalesWrite();
  const { id, data } = parsePartnerFields(formData);
  await prisma.distributorApplication.update({ where: { id }, data });
  revalidatePath("/admin/distributors");
  revalidatePath(`/admin/distributors/${id}`);
  revalidatePath("/admin");
}

export async function deleteDealerAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid input");
  await prisma.dealerApplication.delete({ where: { id } });
  revalidatePath("/admin/dealers");
  revalidatePath("/admin");
}

export async function deleteDistributorAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid input");
  await prisma.distributorApplication.delete({ where: { id } });
  revalidatePath("/admin/distributors");
  revalidatePath("/admin");
}
