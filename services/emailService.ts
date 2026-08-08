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

const salesInbox = process.env.SALES_INBOX_EMAIL ?? COMPANY_EMAIL;
const fromAddress =
  process.env.RESEND_FROM_EMAIL ?? `${COMPANY_SHORT_NAME} <onboarding@resend.dev>`;

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
}) {
  const client = getClient();
  if (!client) {
    console.error(
      "[email] skipped (missing RESEND_API_KEY on this environment)",
      opts.subject,
      opts.to,
    );
    return { skipped: true as const };
  }

  const result = await client.emails.send({
    from: fromAddress,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo ?? salesInbox,
  });

  if (result.error) {
    console.error("[email] send failed", {
      from: fromAddress,
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
    to: opts.to,
    subject: opts.subject,
  });

  return { skipped: false as const, id: result.data?.id };
}

export async function sendQuoteConfirmation(input: {
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
}) {
  const buyer = buyerQuoteReceivedEmail(input);
  await sendEmail({
    to: input.to,
    subject: buyer.subject,
    html: buyer.html,
    text: buyer.text,
    replyTo: salesInbox,
  });

  const sales = salesQuoteAlertEmail({
    ...input,
    email: input.to,
  });
  await sendEmail({
    to: salesInbox,
    subject: sales.subject,
    html: sales.html,
    text: sales.text,
    replyTo: input.to,
  });
}

export async function sendInquiryConfirmation(input: {
  to: string;
  contactName: string;
  companyName?: string | null;
  phone?: string | null;
  country?: string | null;
  message: string;
}) {
  const buyer = buyerInquiryReceivedEmail(input);
  await sendEmail({
    to: input.to,
    subject: buyer.subject,
    html: buyer.html,
    text: buyer.text,
    replyTo: salesInbox,
  });

  const sales = salesInquiryAlertEmail({
    ...input,
    email: input.to,
  });
  await sendEmail({
    to: salesInbox,
    subject: sales.subject,
    html: sales.html,
    text: sales.text,
    replyTo: input.to,
  });
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
    replyTo: salesInbox,
  });

  const sales = salesPartnerAlertEmail(input);
  await sendEmail({
    to: salesInbox,
    subject: sales.subject,
    html: sales.html,
    text: sales.text,
    replyTo: input.email,
  });
}
