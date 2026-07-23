"use server";

import { QuoteStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import { prisma } from "@/server/db";

const allowed: QuoteStatus[] = [
  QuoteStatus.NEW,
  QuoteStatus.IN_PROGRESS,
  QuoteStatus.AWAITING_INFO,
  QuoteStatus.QUOTED,
  QuoteStatus.CLOSED,
  QuoteStatus.SPAM,
  QuoteStatus.ARCHIVED,
];

export async function updateQuoteStatusAction(formData: FormData) {
  await requireSalesWrite();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as QuoteStatus;
  const version = Number(formData.get("version") ?? 0);

  if (!id || !allowed.includes(status) || !Number.isFinite(version)) {
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

  revalidatePath("/admin/quotes");
  revalidatePath(`/admin/quotes/${id}`);
  revalidatePath("/admin");
}
