import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getPublishedSitePage } from "@/services/sitePageService";

export const metadata: Metadata = pageMetadata({
  title: "Export Markets",
  description:
    "Incoterms (FOB, CIF, EXW, CNF), document expectations, and quotation guidance for edible cooking oil and rice buyers. Destination lists publish when confirmed.",
  path: "/export-markets",
});

export const dynamic = "force-dynamic";

const fallback = {
  title: "Export markets and shipment terms",
  body: `TG Export Trade supports international buyers of edible cooking oils and rice with clear product scope and structured quotation discussions.

Incoterms commonly discussed with buyers include FOB, CIF, EXW, and CNF. The appropriate term for a shipment depends on destination, packing, and logistics arrangements confirmed with sales.

Documentation typically requested for food commodity imports may include commercial invoice, packing list, bill of lading, and — where applicable — certificates of analysis or origin. Exact document sets vary by destination market and are confirmed per order.

A public list of destination countries will be published when the business confirms markets it actively serves. Until then, include your destination country or port in the quotation request so we can advise feasibility.`,
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
