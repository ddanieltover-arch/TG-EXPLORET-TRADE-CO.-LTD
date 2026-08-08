import { Resend } from "resend";
import { COMPANY_EMAIL, COMPANY_SHORT_NAME } from "@/lib/brand";
import {
  buyerInquiryReceivedEmail,
  buyerPartnerReceivedEmail,
  buyerQuoteReceivedEmail,
  salesInquiryAlertEmail,
  salesPartnerAlertEmail,
  salesQuoteAlertEmail,
} from "@/lib/email/templates";

function isProductionRuntime() {
  return process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
}

function getSalesInbox() {
  return (process.env.SALES_INBOX_EMAIL || COMPANY_EMAIL).trim();
}

function getFromAddress() {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (from) return from;

  // onboarding@resend.dev can only message the Resend account owner — never use it in prod.
  if (isProductionRuntime()) {
    throw new Error(
      "RESEND_FROM_EMAIL is required in production (use a verified domain address, e.g. sales@tgeptrade.com)",
    );
  }

  return `${COMPANY_SHORT_NAME} <onboarding@resend.dev>`;
}

function getClient() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string | string[];
  /** When true, missing API key or Resend rejection fails hard. */
  requireDelivery?: boolean;
}) {
  const requireDelivery = opts.requireDelivery === true || isProductionRuntime();
  const client = getClient();
  if (!client) {
    console.error(
      "[email] skipped (missing RESEND_API_KEY on this environment)",
      opts.subject,
      opts.to,
    );
    if (requireDelivery) {
      throw new Error("RESEND_API_KEY missing — cannot deliver email");
    }
    return { skipped: true as const };
  }

  const from = getFromAddress();
  const result = await client.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo ?? getSalesInbox(),
  });

  if (result.error) {
    console.error("[email] send failed", {
      from,
      to: opts.to,
      subject: opts.subject,
      error: result.error,
    });
    throw new Error(
      typeof result.error === "object" && result.error && "message" in result.error
        ? String((result.error as { message?: string }).message)
        : "Resend rejected the email",
    );
  }

  console.info("[email] sent", {
    id: result.data?.id,
    from,
    to: opts.to,
    subject: opts.subject,
  });

  return { skipped: false as const, id: result.data?.id };
}

export async function sendQuoteSalesAlert(
  input: {
    to: string;
    contactName: string;
    referenceCode: string;
    companyName?: string | null;
    phone?: string | null;
    country?: string | null;
    productLabel?: string | null;
    quantityText?: string | null;
    destination?: string | null;
    incoterm?: string | null;
    message?: string | null;
  },
  options?: { requireDelivery?: boolean },
) {
  const sales = salesQuoteAlertEmail({
    ...input,
    email: input.to,
  });
  await sendEmail({
    to: getSalesInbox(),
    subject: sales.subject,
    html: sales.html,
    text: sales.text,
    replyTo: input.to,
    requireDelivery: options?.requireDelivery,
  });
}

export async function sendQuoteConfirmation(
  input: {
    to: string;
    contactName: string;
    referenceCode: string;
    companyName?: string | null;
    phone?: string | null;
    country?: string | null;
    productLabel?: string | null;
    quantityText?: string | null;
    destination?: string | null;
    incoterm?: string | null;
    message?: string | null;
  },
  options?: { requireDelivery?: boolean },
) {
  const requireDelivery = options?.requireDelivery === true;
  const buyer = buyerQuoteReceivedEmail(input);
  await sendEmail({
    to: input.to,
    subject: buyer.subject,
    html: buyer.html,
    text: buyer.text,
    replyTo: getSalesInbox(),
    requireDelivery,
  });

  await sendQuoteSalesAlert(input, { requireDelivery });
}

export async function sendInquirySalesAlert(
  input: {
    to: string;
    contactName: string;
    companyName?: string | null;
    phone?: string | null;
    country?: string | null;
    message: string;
  },
  options?: { requireDelivery?: boolean },
) {
  const sales = salesInquiryAlertEmail({
    ...input,
    email: input.to,
  });
  await sendEmail({
    to: getSalesInbox(),
    subject: sales.subject,
    html: sales.html,
    text: sales.text,
    replyTo: input.to,
    requireDelivery: options?.requireDelivery,
  });
}

export async function sendInquiryConfirmation(
  input: {
    to: string;
    contactName: string;
    companyName?: string | null;
    phone?: string | null;
    country?: string | null;
    message: string;
  },
  options?: { requireDelivery?: boolean },
) {
  const requireDelivery = options?.requireDelivery === true;
  const buyer = buyerInquiryReceivedEmail(input);
  await sendEmail({
    to: input.to,
    subject: buyer.subject,
    html: buyer.html,
    text: buyer.text,
    replyTo: getSalesInbox(),
    requireDelivery,
  });

  await sendInquirySalesAlert(input, { requireDelivery });
}

export async function sendPartnerApplicationAlert(input: {
  type: "dealer" | "distributor";
  companyName: string;
  email: string;
  contactName?: string | null;
  phone?: string | null;
  country?: string | null;
  marketsServed?: string | null;
  message?: string | null;
}) {
  const buyer = buyerPartnerReceivedEmail(input);
  await sendEmail({
    to: input.email,
    subject: buyer.subject,
    html: buyer.html,
    text: buyer.text,
    replyTo: getSalesInbox(),
  });

  const sales = salesPartnerAlertEmail(input);
  await sendEmail({
    to: getSalesInbox(),
    subject: sales.subject,
    html: sales.html,
    text: sales.text,
    replyTo: input.email,
  });
}
