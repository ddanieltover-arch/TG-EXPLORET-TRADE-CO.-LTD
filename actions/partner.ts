"use server";

import { partnerApplicationSchema } from "@/lib/validation/partner";
import {
  createDealerApplication,
  createDistributorApplication,
} from "@/services/partnerService";

export type PartnerFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

async function handlePartner(
  formData: FormData,
  kind: "dealer" | "distributor",
): Promise<PartnerFormState> {
  const raw = {
    companyName: String(formData.get("companyName") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    country: String(formData.get("country") ?? ""),
    marketsServed: String(formData.get("marketsServed") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = partnerApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    if (kind === "dealer") await createDealerApplication(parsed.data);
    else await createDistributorApplication(parsed.data);
    return {
      ok: true,
      message: `Your ${kind} application has been received. We will review and follow up by email.`,
    };
  } catch {
    return {
      ok: false,
      message: "We could not submit your application. Please email sales@tgetradecoltd.com.",
    };
  }
}

export async function createDealerAction(
  _prev: PartnerFormState,
  formData: FormData,
): Promise<PartnerFormState> {
  return handlePartner(formData, "dealer");
}

export async function createDistributorAction(
  _prev: PartnerFormState,
  formData: FormData,
): Promise<PartnerFormState> {
  return handlePartner(formData, "distributor");
}
