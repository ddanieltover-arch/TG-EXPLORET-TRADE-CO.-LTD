import type { Metadata } from "next";

import {
  COMPANY_LEGAL_NAME,
  COMPANY_SHORT_NAME,
} from "@/lib/brand";

const siteName = COMPANY_LEGAL_NAME;
const defaultTitle = `${COMPANY_LEGAL_NAME} | Edible Oils & Rice Export`;
const defaultDescription =
  "Export-grade edible cooking oils and rice. Clear specifications and responsive quotation for international buyers.";

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.AUTH_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${COMPANY_SHORT_NAME}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function pageMetadata(input: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = input.path ? `${siteUrl()}${input.path}` : undefined;
  return {
    title: input.title,
    description: input.description,
    openGraph: {
      title: `${input.title} | ${COMPANY_SHORT_NAME}`,
      description: input.description,
      url,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${COMPANY_SHORT_NAME}`,
      description: input.description,
    },
  };
}
