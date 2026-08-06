import { Resend } from "resend";
import { COMPANY_DISPLAY_NAME, COMPANY_EMAIL, COMPANY_LEGAL_NAME, COMPANY_SHORT_NAME } from "@/lib/brand";

const salesInbox = process.env.SALES_INBOX_EMAIL ?? COMPANY_EMAIL;
const fromAddress =
  process.env.RESEND_FROM_EMAIL ?? `${COMPANY_SHORT_NAME} <onboarding@resend.dev>`;

function getClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  const client = getClient();
  if (!client) {
    console.info("[email] skipped (no RESEND_API_KEY)", opts.subject, opts.to);
    return { skipped: true as const };
  }

  const result = await client.emails.send({
    from: fromAddress,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });

  if (result.error) {
    console.error("[email] send failed", result.error);
    return { skipped: false as const, error: result.error };
  }

  return { skipped: false as const, id: result.data?.id };
}

export async function sendQuoteConfirmation(input: {
  to: string;
  contactName: string;
  referenceCode: string;
}) {
  await sendEmail({
    to: input.to,
    subject: `Quotation request received — ${input.referenceCode}`,
    html: `<p>Dear ${input.contactName},</p>
<p>We received your quotation request <strong>${input.referenceCode}</strong>.</p>
<p>Our sales team will follow up shortly. For urgent matters, email ${salesInbox}.</p>
<p>${COMPANY_DISPLAY_NAME}</p>`,
    text: `Dear ${input.contactName}, we received quotation request ${input.referenceCode}.`,
  });

  await sendEmail({
    to: salesInbox,
    subject: `New RFQ ${input.referenceCode}`,
    html: `<p>New quotation request <strong>${input.referenceCode}</strong> from ${input.contactName} (${input.to}).</p>
<p>Review in admin: /admin/quotes</p>`,
  });
}

export async function sendInquiryConfirmation(input: {
  to: string;
  contactName: string;
}) {
  await sendEmail({
    to: input.to,
    subject: `We received your message — ${COMPANY_SHORT_NAME}`,
    html: `<p>Dear ${input.contactName},</p>
<p>Thank you for contacting ${COMPANY_LEGAL_NAME}. Our team will respond using this email address.</p>
<p>${COMPANY_DISPLAY_NAME}</p>`,
  });

  await sendEmail({
    to: salesInbox,
    subject: `New inquiry from ${input.contactName}`,
    html: `<p>New contact/inquiry from ${input.contactName} (${input.to}).</p>
<p>Review in admin: /admin/inquiries</p>`,
  });
}

export async function sendPartnerApplicationAlert(input: {
  type: "dealer" | "distributor";
  companyName: string;
  email: string;
}) {
  await sendEmail({
    to: input.email,
    subject: `${input.type === "dealer" ? "Dealer" : "Distributor"} application received`,
    html: `<p>Thank you. We received your ${input.type} application for <strong>${input.companyName}</strong>. Our team will review it shortly.</p>`,
  });

  await sendEmail({
    to: salesInbox,
    subject: `New ${input.type} application — ${input.companyName}`,
    html: `<p>New ${input.type} application from ${input.companyName} (${input.email}).</p>
<p>Review in admin: /admin/${input.type === "dealer" ? "dealers" : "distributors"}</p>`,
  });
}
