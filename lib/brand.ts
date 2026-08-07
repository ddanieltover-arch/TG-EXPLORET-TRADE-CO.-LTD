/** Canonical company identity — use these instead of hardcoding. */
export const COMPANY_LEGAL_NAME = "TG Export Trade Company Limited";
export const COMPANY_DISPLAY_NAME = "TG EXPORT TRADE COMPANY LIMITED";
export const COMPANY_SHORT_NAME = "TG Export Trade";
export const COMPANY_EMAIL = "sales@tgeptrade.com";
export const COMPANY_WEBSITE = "https://www.tgeptrade.com";
export const COMPANY_DOMAIN = "tgeptrade.com";
export const COMPANY_ORIGIN = "Thailand";
/** Logo tagline — use sparingly in hero/footer; do not invent alternatives. */
export const COMPANY_TAGLINE = "Connecting Global Markets";

/**
 * WhatsApp destination (digits only, country code included, no +).
 * Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (e.g. 66812345678) once FG-13 is confirmed.
 * Empty until then — the floating CTA falls back to /contact.
 */
export const COMPANY_WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
).replace(/\D/g, "");

const WHATSAPP_PREFILL =
  "Hello, I would like to enquire about edible cooking oils and rice from TG Export Trade.";

/** Opens WhatsApp chat when a number is configured; otherwise the contact page. */
export function getWhatsAppHref(message: string = WHATSAPP_PREFILL): string {
  if (!COMPANY_WHATSAPP_NUMBER) return "/contact";
  return `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PRODUCT_CATEGORIES = {
  cookingOil: {
    slug: "cooking-oil",
    name: "Edible Cooking Oil",
    href: "/products/cooking-oil",
  },
  rice: {
    slug: "rice",
    name: "Rice",
    href: "/products/rice",
  },
} as const;
