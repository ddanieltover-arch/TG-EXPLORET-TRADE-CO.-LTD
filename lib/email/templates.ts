import {
  COMPANY_ADDRESS_SINGLE_LINE,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_SHORT_NAME,
} from "@/lib/brand";
import { escapeHtml, nl2br } from "@/lib/email/escapeHtml";
import { absoluteUrl, renderEmailLayout } from "@/lib/email/layout";

export function buyerQuoteReceivedEmail(input: {
  contactName: string;
  referenceCode: string;
  productLabel?: string | null;
  quantityText?: string | null;
  destination?: string | null;
}) {
  const detailRows = [
    { label: "Reference", value: `<strong>${escapeHtml(input.referenceCode)}</strong>` },
  ];
  if (input.productLabel) {
    detailRows.push({ label: "Product", value: escapeHtml(input.productLabel) });
  }
  if (input.quantityText) {
    detailRows.push({ label: "Quantity", value: escapeHtml(input.quantityText) });
  }
  if (input.destination) {
    detailRows.push({ label: "Destination", value: escapeHtml(input.destination) });
  }

  return {
    subject: `Quotation request received — ${input.referenceCode}`,
    html: renderEmailLayout({
      preheader: `We received your quotation request ${input.referenceCode}.`,
      eyebrow: "Quotation",
      title: "We received your request",
      bodyHtml: `<p style="margin:0 0 14px;">Dear ${escapeHtml(input.contactName)},</p>
<p style="margin:0 0 14px;">Thank you for contacting ${escapeHtml(COMPANY_LEGAL_NAME)}. Your quotation request has been logged and our sales team will follow up using this email address.</p>
<p style="margin:0;">Spot prices are not published online — commercial terms are confirmed against volume, destination, and packing.</p>`,
      detailRows,
      ctas: [
        {
          label: "Browse catalogue",
          href: absoluteUrl("/products"),
          variant: "primary",
        },
        {
          label: "Email sales",
          href: `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(`Re: ${input.referenceCode}`)}`,
          variant: "outline",
        },
      ],
      footerNote: `For urgent matters, contact <a href="mailto:${COMPANY_EMAIL}" style="color:#0a2f5c;">${COMPANY_EMAIL}</a>.`,
    }),
    text: `Dear ${input.contactName},\n\nWe received your quotation request ${input.referenceCode}. Our sales team will follow up shortly.\n\nBrowse catalogue: ${absoluteUrl("/products")}\nEmail sales: ${COMPANY_EMAIL}\nOffice: ${COMPANY_ADDRESS_SINGLE_LINE}`,
  };
}

export function salesQuoteAlertEmail(input: {
  referenceCode: string;
  contactName: string;
  email: string;
  companyName?: string | null;
  phone?: string | null;
  country?: string | null;
  productLabel?: string | null;
  quantityText?: string | null;
  destination?: string | null;
  incoterm?: string | null;
  message?: string | null;
}) {
  const detailRows = [
    { label: "Reference", value: `<strong>${escapeHtml(input.referenceCode)}</strong>` },
    { label: "Contact", value: `${escapeHtml(input.contactName)} &lt;${escapeHtml(input.email)}&gt;` },
  ];
  if (input.companyName) detailRows.push({ label: "Company", value: escapeHtml(input.companyName) });
  if (input.phone) detailRows.push({ label: "Phone", value: escapeHtml(input.phone) });
  if (input.country) detailRows.push({ label: "Country", value: escapeHtml(input.country) });
  if (input.productLabel) detailRows.push({ label: "Product", value: escapeHtml(input.productLabel) });
  if (input.quantityText) detailRows.push({ label: "Quantity", value: escapeHtml(input.quantityText) });
  if (input.destination) detailRows.push({ label: "Destination", value: escapeHtml(input.destination) });
  if (input.incoterm) detailRows.push({ label: "Incoterm", value: escapeHtml(input.incoterm) });
  if (input.message) detailRows.push({ label: "Message", value: nl2br(input.message) });

  return {
    subject: `New RFQ ${input.referenceCode}`,
    html: renderEmailLayout({
      preheader: `New quotation request ${input.referenceCode} from ${input.contactName}.`,
      eyebrow: "Sales alert",
      title: "New quotation request",
      bodyHtml: `<p style="margin:0;">A new RFQ was submitted on the website. Review details below and follow up from admin.</p>`,
      detailRows,
      ctas: [
        {
          label: "Open in admin",
          href: absoluteUrl("/admin/quotes"),
          variant: "primary",
        },
        {
          label: "Reply to buyer",
          href: `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: ${input.referenceCode}`)}`,
          variant: "secondary",
        },
      ],
    }),
    text: `New RFQ ${input.referenceCode} from ${input.contactName} (${input.email}).\nAdmin: ${absoluteUrl("/admin/quotes")}`,
  };
}

export function buyerInquiryReceivedEmail(input: { contactName: string }) {
  return {
    subject: `We received your message — ${COMPANY_SHORT_NAME}`,
    html: renderEmailLayout({
      preheader: "Thank you for contacting TG Export Trade. Our team will respond shortly.",
      eyebrow: "Contact",
      title: "Message received",
      bodyHtml: `<p style="margin:0 0 14px;">Dear ${escapeHtml(input.contactName)},</p>
<p style="margin:0 0 14px;">Thank you for contacting ${escapeHtml(COMPANY_LEGAL_NAME)}. Our team will respond using this email address.</p>
<p style="margin:0;">In the meantime, you can review product grades and packing options in our catalogue, or submit a structured quotation request.</p>`,
      ctas: [
        {
          label: "View products",
          href: absoluteUrl("/products"),
          variant: "primary",
        },
        {
          label: "Request a quote",
          href: absoluteUrl("/request-quote"),
          variant: "secondary",
        },
      ],
      footerNote: `Need a faster reply? Email <a href="mailto:${COMPANY_EMAIL}" style="color:#0a2f5c;">${COMPANY_EMAIL}</a>.`,
    }),
    text: `Dear ${input.contactName},\n\nThank you for contacting ${COMPANY_LEGAL_NAME}. Our team will respond using this email address.\n\nProducts: ${absoluteUrl("/products")}\nRequest quote: ${absoluteUrl("/request-quote")}\nOffice: ${COMPANY_ADDRESS_SINGLE_LINE}`,
  };
}

export function salesInquiryAlertEmail(input: {
  contactName: string;
  email: string;
  companyName?: string | null;
  phone?: string | null;
  country?: string | null;
  message: string;
}) {
  const detailRows = [
    {
      label: "Contact",
      value: `${escapeHtml(input.contactName)} &lt;${escapeHtml(input.email)}&gt;`,
    },
  ];
  if (input.companyName) detailRows.push({ label: "Company", value: escapeHtml(input.companyName) });
  if (input.phone) detailRows.push({ label: "Phone", value: escapeHtml(input.phone) });
  if (input.country) detailRows.push({ label: "Country", value: escapeHtml(input.country) });
  detailRows.push({ label: "Message", value: nl2br(input.message) });

  return {
    subject: `New inquiry from ${input.contactName}`,
    html: renderEmailLayout({
      preheader: `New website inquiry from ${input.contactName}.`,
      eyebrow: "Sales alert",
      title: "New contact inquiry",
      bodyHtml: `<p style="margin:0;">A visitor submitted the contact form. Details are below.</p>`,
      detailRows,
      ctas: [
        {
          label: "Open in admin",
          href: absoluteUrl("/admin/inquiries"),
          variant: "primary",
        },
        {
          label: "Reply to sender",
          href: `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: your enquiry to ${COMPANY_SHORT_NAME}`)}`,
          variant: "secondary",
        },
      ],
    }),
    text: `New inquiry from ${input.contactName} (${input.email}).\n\n${input.message}\n\nAdmin: ${absoluteUrl("/admin/inquiries")}`,
  };
}

export function buyerPartnerReceivedEmail(input: {
  type: "dealer" | "distributor";
  companyName: string;
  contactName?: string | null;
}) {
  const label = input.type === "dealer" ? "Dealer" : "Distributor";
  const greeting = input.contactName ? `Dear ${escapeHtml(input.contactName)},` : "Hello,";

  return {
    subject: `${label} application received`,
    html: renderEmailLayout({
      preheader: `We received your ${label.toLowerCase()} application for ${input.companyName}.`,
      eyebrow: `${label} programme`,
      title: "Application received",
      bodyHtml: `<p style="margin:0 0 14px;">${greeting}</p>
<p style="margin:0 0 14px;">Thank you. We received your ${label.toLowerCase()} application for <strong>${escapeHtml(input.companyName)}</strong>.</p>
<p style="margin:0;">Our team will review your submission and follow up with next steps. For product scope while you wait, browse our edible oil and rice catalogues.</p>`,
      detailRows: [
        { label: "Application", value: escapeHtml(label) },
        { label: "Company", value: escapeHtml(input.companyName) },
      ],
      ctas: [
        {
          label: "View catalogue",
          href: absoluteUrl("/products"),
          variant: "primary",
        },
        {
          label: "Contact sales",
          href: `mailto:${COMPANY_EMAIL}`,
          variant: "outline",
        },
      ],
    }),
    text: `We received your ${label.toLowerCase()} application for ${input.companyName}. Our team will review it shortly.\n\nCatalogue: ${absoluteUrl("/products")}\nOffice: ${COMPANY_ADDRESS_SINGLE_LINE}`,
  };
}

export function salesPartnerAlertEmail(input: {
  type: "dealer" | "distributor";
  companyName: string;
  email: string;
  contactName?: string | null;
  phone?: string | null;
  country?: string | null;
  marketsServed?: string | null;
  message?: string | null;
}) {
  const label = input.type === "dealer" ? "Dealer" : "Distributor";
  const adminPath =
    input.type === "dealer" ? "/admin/dealers" : "/admin/distributors";

  const detailRows = [
    { label: "Type", value: escapeHtml(label) },
    { label: "Company", value: escapeHtml(input.companyName) },
    {
      label: "Contact",
      value: `${escapeHtml(input.contactName || "—")} &lt;${escapeHtml(input.email)}&gt;`,
    },
  ];
  if (input.phone) detailRows.push({ label: "Phone", value: escapeHtml(input.phone) });
  if (input.country) detailRows.push({ label: "Country", value: escapeHtml(input.country) });
  if (input.marketsServed) {
    detailRows.push({ label: "Markets", value: escapeHtml(input.marketsServed) });
  }
  if (input.message) detailRows.push({ label: "Message", value: nl2br(input.message) });

  return {
    subject: `New ${input.type} application — ${input.companyName}`,
    html: renderEmailLayout({
      preheader: `New ${label.toLowerCase()} application from ${input.companyName}.`,
      eyebrow: "Sales alert",
      title: `New ${label.toLowerCase()} application`,
      bodyHtml: `<p style="margin:0;">A partner application was submitted on the website.</p>`,
      detailRows,
      ctas: [
        {
          label: "Open in admin",
          href: absoluteUrl(adminPath),
          variant: "primary",
        },
        {
          label: "Reply to applicant",
          href: `mailto:${encodeURIComponent(input.email)}`,
          variant: "secondary",
        },
      ],
    }),
    text: `New ${input.type} application from ${input.companyName} (${input.email}).\nAdmin: ${absoluteUrl(adminPath)}`,
  };
}
