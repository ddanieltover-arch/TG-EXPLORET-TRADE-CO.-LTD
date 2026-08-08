import {
  COMPANY_DISPLAY_NAME,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_TAGLINE,
  COMPANY_WEBSITE,
} from "@/lib/brand";
import { siteUrl } from "@/lib/seo";
import { escapeHtml } from "@/lib/email/escapeHtml";

const COLORS = {
  primary: "#0a2f5c",
  gold: "#c9a24a",
  bg: "#f4f6f9",
  surface: "#ffffff",
  text: "#0e1a2e",
  muted: "#5a6578",
  border: "#d4dae3",
} as const;

export type EmailCta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
};

export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || COMPANY_WEBSITE || siteUrl()).replace(
    /\/$/,
    "",
  );
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function logoUrl() {
  return absoluteUrl("/brand/logo-mark.png");
}

function ctaButton(cta: EmailCta) {
  const variant = cta.variant ?? "primary";
  const styles =
    variant === "primary"
      ? `background-color:${COLORS.primary};color:#ffffff;border:2px solid ${COLORS.primary};`
      : variant === "secondary"
        ? `background-color:${COLORS.gold};color:${COLORS.text};border:2px solid ${COLORS.gold};`
        : `background-color:transparent;color:${COLORS.primary};border:2px solid ${COLORS.primary};`;

  return `<a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;line-height:1.2;text-decoration:none;border-radius:6px;${styles}">${escapeHtml(cta.label)}</a>`;
}

export function renderEmailLayout(opts: {
  preheader?: string;
  eyebrow?: string;
  title: string;
  bodyHtml: string;
  ctas?: EmailCta[];
  detailRows?: Array<{ label: string; value: string }>;
  footerNote?: string;
}) {
  const preheader = opts.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(opts.preheader)}</div>`
    : "";

  const detailTable =
    opts.detailRows && opts.detailRows.length > 0
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;border-collapse:collapse;border:1px solid ${COLORS.border};">
          ${opts.detailRows
            .map(
              (row, index) => `<tr>
              <td style="width:34%;padding:12px 14px;border-top:${index === 0 ? "0" : `1px solid ${COLORS.border}`};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${COLORS.muted};background:${COLORS.bg};">${escapeHtml(row.label)}</td>
              <td style="padding:12px 14px;border-top:${index === 0 ? "0" : `1px solid ${COLORS.border}`};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.text};">${row.value}</td>
            </tr>`,
            )
            .join("")}
        </table>`
      : "";

  const ctaHtml =
    opts.ctas && opts.ctas.length > 0
      ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
          <tr>
            ${opts.ctas
              .map(
                (cta, index) =>
                  `<td style="padding:${index === 0 ? "0 10px 0 0" : "0 10px 0 0"};">${ctaButton(cta)}</td>`,
              )
              .join("")}
          </tr>
        </table>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};">
  ${preheader}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${COLORS.surface};border:1px solid ${COLORS.border};">
          <tr>
            <td style="background:${COLORS.surface};padding:20px 28px;border-bottom:3px solid ${COLORS.gold};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;width:64px;">
                    <a href="${escapeHtml(absoluteUrl("/"))}" style="text-decoration:none;">
                      <img src="${escapeHtml(logoUrl())}" width="56" height="41" alt="${escapeHtml(COMPANY_SHORT_NAME)}" style="display:block;border:0;outline:none;height:auto;" />
                    </a>
                  </td>
                  <td style="vertical-align:middle;padding-left:14px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:16px;font-weight:700;color:${COLORS.primary};letter-spacing:0.02em;">${escapeHtml(COMPANY_SHORT_NAME)}</div>
                    <div style="margin-top:4px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${COLORS.gold};">${escapeHtml(COMPANY_TAGLINE)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px 28px;">
              ${
                opts.eyebrow
                  ? `<p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.gold};">${escapeHtml(opts.eyebrow)}</p>`
                  : ""
              }
              <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;font-weight:700;color:${COLORS.primary};">${escapeHtml(opts.title)}</h1>
              <div style="width:48px;height:2px;background:${COLORS.gold};margin:0 0 22px;"></div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${COLORS.text};">
                ${opts.bodyHtml}
              </div>
              ${detailTable}
              ${ctaHtml}
              ${
                opts.footerNote
                  ? `<p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.55;color:${COLORS.muted};">${opts.footerNote}</p>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="background:${COLORS.primary};padding:22px 28px;border-top:1px solid ${COLORS.border};">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#ffffff;">${escapeHtml(COMPANY_DISPLAY_NAME)}</p>
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.75);">Edible cooking oils &amp; rice export from Thailand</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;">
                <a href="mailto:${escapeHtml(COMPANY_EMAIL)}" style="color:${COLORS.gold};text-decoration:none;">${escapeHtml(COMPANY_EMAIL)}</a>
                &nbsp;·&nbsp;
                <a href="${escapeHtml(absoluteUrl("/"))}" style="color:#ffffff;text-decoration:underline;">${escapeHtml(COMPANY_WEBSITE.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:${COLORS.muted};max-width:600px;">
          © ${new Date().getFullYear()} ${escapeHtml(COMPANY_LEGAL_NAME)}. This message relates to your enquiry with our sales team.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
