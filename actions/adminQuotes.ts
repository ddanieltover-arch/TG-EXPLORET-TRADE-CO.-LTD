"use server";

import { Incoterm, QuoteStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import { prisma } from "@/server/db";

const allowedStatuses: QuoteStatus[] = [
  QuoteStatus.NEW,
  QuoteStatus.IN_PROGRESS,
  QuoteStatus.AWAITING_INFO,
  QuoteStatus.QUOTED,
  QuoteStatus.CLOSED,
  QuoteStatus.SPAM,
  QuoteStatus.ARCHIVED,
];

const allowedIncoterms: Incoterm[] = [
  Incoterm.FOB,
  Incoterm.CIF,
  Incoterm.EXW,
  Incoterm.CNF,
  Incoterm.OTHER,
];

function revalidateQuotePaths(id: string) {
  revalidatePath("/admin/quotes");
  revalidatePath(`/admin/quotes/${id}`);
  revalidatePath("/admin");
}

export async function updateQuoteStatusAction(formData: FormData) {
  await requireSalesWrite();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as QuoteStatus;
  const version = Number(formData.get("version") ?? 0);

  if (!id || !allowedStatuses.includes(status) || !Number.isFinite(version)) {
    throw new Error("Invalid input");
  }

  const existing = await prisma.quoteRequest.findUnique({ where: { id } });
  if (!existing || existing.version !== version) {
    throw new Error("Conflict — refresh and try again");
  }

  await prisma.quoteRequest.update({
    where: { id },
    data: {
      status,
      version: { increment: 1 },
    },
  });

  revalidateQuotePaths(id);
}

export async function updateQuoteAction(formData: FormData) {
  await requireSalesWrite();

  const id = String(formData.get("id") ?? "");
  const version = Number(formData.get("version") ?? 0);
  const companyName = String(formData.get("companyName") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const productLabel = String(formData.get("productLabel") ?? "").trim();
  const quantityText = String(formData.get("quantityText") ?? "").trim();
  const destination = String(formData.get("destination") ?? "").trim();
  const incotermRaw = String(formData.get("incoterm") ?? "").trim();
  const targetDateRaw = String(formData.get("targetDate") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const status = String(formData.get("status") ?? "") as QuoteStatus;

  if (
    !id ||
    !Number.isFinite(version) ||
    companyName.length < 2 ||
    contactName.length < 2 ||
    !email.includes("@") ||
    country.length < 2 ||
    productLabel.length < 2 ||
    quantityText.length < 1 ||
    destination.length < 2 ||
    !allowedStatuses.includes(status)
  ) {
    throw new Error("Invalid input — check required fields");
  }

  const incoterm =
    incotermRaw && allowedIncoterms.includes(incotermRaw as Incoterm)
      ? (incotermRaw as Incoterm)
      : null;

  const existing = await prisma.quoteRequest.findUnique({ where: { id } });
  if (!existing || existing.version !== version) {
    throw new Error("Conflict — refresh and try again");
  }

  await prisma.quoteRequest.update({
    where: { id },
    data: {
      companyName,
      contactName,
      email,
      phone: phone || null,
      country,
      productLabel,
      quantityText,
      destination,
      incoterm,
      targetDate: targetDateRaw ? new Date(targetDateRaw) : null,
      message: message || null,
      status,
      version: { increment: 1 },
    },
  });

  revalidateQuotePaths(id);
}

export async function deleteQuoteAction(formData: FormData) {
  await requireSalesWrite();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid input");

  await prisma.quoteRequest.delete({ where: { id } });

  revalidatePath("/admin/quotes");
  revalidatePath("/admin");
}
