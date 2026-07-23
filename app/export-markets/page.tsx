import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getPublishedSitePage } from "@/services/sitePageService";

export const metadata: Metadata = pageMetadata({
  title: "Export Markets",
  description:
    "International buyers of Thai sugar and rice — Incoterms discussion (FOB, CIF, EXW, CNF) and clear product scope.",
  path: "/export-markets",
});

export const revalidate = 60;

const fallback = {
  title: "Export markets",
  body: `We support international buyers with clear product scope and Incoterms discussion (FOB, CIF, EXW, CNF). Destination lists publish when confirmed by the business.`,
};

function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function ExportMarketsPage() {
  const page = await getPublishedSitePage("export-markets");
  const title = page?.title ?? fallback.title;
  const body = page?.body ?? fallback.body;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">{title}</h1>
      {paragraphs(body).map((p) => (
        <p key={p.slice(0, 40)} className="mt-4 text-tg-muted whitespace-pre-line">
          {p}
        </p>
      ))}
      <p className="mt-6">
        <Link href="/request-quote" className="font-semibold text-tg-primary underline">
          Request a Quote
        </Link>
      </p>
    </div>
  );
}
