"use server";

import { quoteRequestSchema } from "@/lib/validation/quote";
import { createQuoteRequest } from "@/services/quoteService";

export type CreateQuoteState = {
  ok: boolean;
  message?: string;
  referenceCode?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createQuoteAction(
  _prev: CreateQuoteState,
  formData: FormData,
): Promise<CreateQuoteState> {
  const raw = {
    companyName: String(formData.get("companyName") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    country: String(formData.get("country") ?? ""),
    productLabel: String(formData.get("productLabel") ?? ""),
    quantityText: String(formData.get("quantityText") ?? ""),
    destination: String(formData.get("destination") ?? ""),
    incoterm: String(formData.get("incoterm") ?? "") || undefined,
    targetDate: String(formData.get("targetDate") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = quoteRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const quote = await createQuoteRequest(parsed.data);
    return {
      ok: true,
      message: "Your quotation request has been received.",
      referenceCode: quote.referenceCode,
    };
  } catch {
    return {
      ok: false,
      message: "We could not save your request. Please try again or email sales@tgeptrade.com.",
    };
  }
}
