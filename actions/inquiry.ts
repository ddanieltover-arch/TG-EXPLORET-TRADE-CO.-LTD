"use server";

import { InquirySource } from "@prisma/client";
import { inquirySchema } from "@/lib/validation/inquiry";
import { createInquiry } from "@/services/inquiryService";

export type CreateInquiryState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createInquiryAction(
  _prev: CreateInquiryState,
  formData: FormData,
): Promise<CreateInquiryState> {
  const raw = {
    companyName: String(formData.get("companyName") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    country: String(formData.get("country") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await createInquiry(parsed.data, InquirySource.CONTACT, "/contact");
    return {
      ok: true,
      message: "Thank you. Our team will respond using the email you provided.",
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[createInquiryAction]", detail.split("\n")[0]);
    return {
      ok: false,
      message: "We could not send your message. Please email sales@tgeptrade.com.",
    };
  }
}
