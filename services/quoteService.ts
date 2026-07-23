import { Incoterm, QuoteStatus } from "@prisma/client";
import { prisma } from "@/server/db";
import type { QuoteRequestInput } from "@/lib/validation/quote";
import { sendQuoteConfirmation } from "@/services/emailService";

function buildReferenceCode() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TGQ-${y}${m}${day}-${rand}`;
}

export async function createQuoteRequest(input: QuoteRequestInput) {
  if (input.website) {
    throw new Error("Rejected");
  }

  const referenceCode = buildReferenceCode();
  const incoterm = input.incoterm
    ? Incoterm[input.incoterm as keyof typeof Incoterm]
    : undefined;

  const quote = await prisma.quoteRequest.create({
    data: {
      referenceCode,
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone || null,
      country: input.country,
      productLabel: input.productLabel,
      quantityText: input.quantityText,
      destination: input.destination,
      incoterm: incoterm ?? null,
      targetDate: input.targetDate ? new Date(input.targetDate) : null,
      message: input.message || null,
      status: QuoteStatus.NEW,
    },
  });

  try {
    await sendQuoteConfirmation({
      to: quote.email,
      contactName: quote.contactName,
      referenceCode: quote.referenceCode,
    });
  } catch (error) {
    console.error("[email] quote confirmation failed after persist", error);
  }

  return quote;
}

export async function listQuoteRequests() {
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getQuoteRequestById(id: string) {
  return prisma.quoteRequest.findUnique({
    where: { id },
    include: { product: { include: { category: true } } },
  });
}

export async function countQuotesByStatuses(statuses: QuoteStatus[]) {
  return prisma.quoteRequest.count({
    where: { status: { in: statuses } },
  });
}
