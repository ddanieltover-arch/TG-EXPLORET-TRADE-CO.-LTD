import type { Metadata } from "next";

const siteName = "TG Exploret Trade Co., Ltd";
const defaultTitle = "TG Exploret Trade Co., Ltd | Thai Sugar & Rice Export";
const defaultDescription =
  "Export-grade sugar and rice from Thailand. Clear specifications and responsive quotation for international buyers.";

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
    template: "%s | TG Exploret Trade",
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
      title: `${input.title} | TG Exploret Trade`,
      description: input.description,
      url,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | TG Exploret Trade`,
      description: input.description,
    },
  };
}
