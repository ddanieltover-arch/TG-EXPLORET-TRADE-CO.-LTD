import { Incoterm, QuoteStatus } from "@prisma/client";
import { withDbRetry } from "@/lib/dbRetry";
import type { QuoteRequestInput } from "@/lib/validation/quote";
import { prisma } from "@/server/db";
import {
  sendQuoteConfirmation,
  sendQuoteSalesAlert,
} from "@/services/emailService";

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

  const incoterm = input.incoterm
    ? Incoterm[input.incoterm as keyof typeof Incoterm]
    : undefined;

  // Retry on pooler blips; regenerate reference if a rare unique collision occurs.
  const quote = await withDbRetry("quote:create", async () => {
    try {
      return await prisma.quoteRequest.create({
        data: {
          referenceCode: buildReferenceCode(),
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
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (/Unique constraint|P2002/i.test(message)) {
        return prisma.quoteRequest.create({
          data: {
            referenceCode: buildReferenceCode(),
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
      }
      throw error;
    }
  });

  const emailPayload = {
    to: quote.email,
    contactName: quote.contactName,
    referenceCode: quote.referenceCode,
    companyName: quote.companyName,
    phone: quote.phone,
    country: quote.country,
    productLabel: quote.productLabel,
    quantityText: quote.quantityText,
    destination: quote.destination,
    incoterm: quote.incoterm,
    message: quote.message,
  };

  try {
    await sendQuoteConfirmation(emailPayload);
  } catch (error) {
    console.error("[email] quote confirmation failed after persist", {
      referenceCode: quote.referenceCode,
      to: quote.email,
      error: error instanceof Error ? error.message : error,
    });
    // Prefer getting the lead to sales even if the buyer copy fails.
    try {
      await sendQuoteSalesAlert(emailPayload, { requireDelivery: true });
    } catch (salesError) {
      console.error("[email] quote sales alert also failed", {
        referenceCode: quote.referenceCode,
        error: salesError instanceof Error ? salesError.message : salesError,
      });
    }
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
