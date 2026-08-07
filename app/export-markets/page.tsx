import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import { COMPANY_LEGAL_NAME, COMPANY_SHORT_NAME, COMPANY_TAGLINE } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { getPublishedSitePage } from "@/services/sitePageService";

export const metadata: Metadata = pageMetadata({
  title: "Export Markets",
  description:
    "Incoterms (FOB, CIF, EXW, CNF), document expectations, and quotation guidance for edible cooking oil and rice buyers. Destination lists publish when confirmed.",
  path: "/export-markets",
});

export const dynamic = "force-dynamic";

const fallbackBody = `${COMPANY_LEGAL_NAME} supports international buyers of edible cooking oils and rice with clear product scope and structured quotation discussions.

Incoterms commonly discussed with buyers include FOB, CIF, EXW, and CNF. The appropriate term for a shipment depends on destination, packing, and logistics arrangements confirmed with sales.

Documentation typically requested for food commodity imports may include commercial invoice, packing list, bill of lading, and — where applicable — certificates of analysis or origin. Exact document sets vary by destination market and are confirmed per order.

A public list of destination countries will be published when the business confirms markets it actively serves. Until then, include your destination country or port in the quotation request so we can advise feasibility.`;

const INCOTERMS = [
  {
    code: "FOB",
    name: "Free On Board",
    body: "Often discussed when buyers arrange main carriage from the named port of shipment.",
  },
  {
    code: "CIF",
    name: "Cost, Insurance & Freight",
    body: "Discussed when cost, insurance, and freight to a named destination port are part of the commercial brief.",
  },
  {
    code: "EXW",
    name: "Ex Works",
    body: "Useful when buyers prefer to collect from named premises and control onward logistics.",
  },
  {
    code: "CNF",
    name: "Cost & Freight",
    body: "Discussed when freight to a named destination is included, with insurance arranged separately as agreed.",
  },
] as const;

const DOCUMENTS = [
  {
    title: "Commercial invoice",
    body: "Identifies parties, goods, values, and commercial terms for the shipment.",
  },
  {
    title: "Packing list",
    body: "Details packing units, weights, and marks for oils or rice consignments.",
  },
  {
    title: "Bill of lading",
    body: "Transport document issued for ocean freight, subject to carrier and Incoterm arrangements.",
  },
  {
    title: "Certificates (as applicable)",
    body: "Analysis, origin, or other certificates — only where available and confirmed for that shipment. We do not publish unverified cert badges.",
  },
] as const;

function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function ExportMarketsPage() {
  const page = await getPublishedSitePage("export-markets");
  const cmsTitle = page?.title;
  const storyParagraphs = paragraphs(page?.body ?? fallbackBody);

  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <Image
          src="/media/operations/container-ship-port.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#061a33]/94 via-[#0a2f5c]/88 to-[#0a2f5c]/65"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-28">
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            {COMPANY_TAGLINE}
          </p>
          <div className="mt-5 h-px w-14 bg-tg-secondary" aria-hidden />
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
            {cmsTitle ?? "Export markets & shipment terms"}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Incoterms, documentation expectations, and quotation guidance for edible cooking oil
            and rice buyers. Destination countries publish when confirmed — we do not invent a
            market list.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/request-quote"
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-6 text-sm font-semibold text-tg-text transition hover:bg-tg-secondary/90"
            >
              Request a Quote
            </Link>
            <Link
              href="/ordering-procedure"
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-white/35 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-tg-secondary hover:bg-white/10"
            >
              Ordering procedure
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
                Overview
              </p>
              <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
                How {COMPANY_SHORT_NAME} approaches export trade
              </h2>
              <div className="mt-4 h-px w-14 bg-tg-secondary" aria-hidden />
            </ScrollReveal>
            <div className="mt-8 max-w-3xl space-y-5 leading-relaxed text-tg-muted">
              {storyParagraphs.map((p) => (
                <ScrollReveal key={p.slice(0, 48)}>
                  <p className="whitespace-pre-line">{p}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <ScrollReveal delayMs={60}>
            <div className="relative aspect-[4/5] overflow-hidden border border-tg-border">
              <Image
                src="/media/operations/port-operations-safety.png"
                alt="Port operations coordinating container logistics for international export shipments"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Incoterms
            </p>
            <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
              Terms commonly discussed
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
              The right term depends on destination, packing, and logistics arrangements confirmed
              with sales. Select a preference on your quotation request to start the conversation.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {INCOTERMS.map((term, index) => (
              <ScrollReveal key={term.code} delayMs={index * 50}>
                <li className="h-full border border-tg-border bg-white p-8">
                  <p className="font-mono text-sm font-semibold tracking-wide text-tg-secondary">
                    {term.code}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-tg-primary">{term.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-tg-muted">{term.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-24">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            Documentation
          </p>
          <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
            Documents typically discussed
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
            Exact sets vary by destination market and are confirmed per order. Use this as
            guidance — not a guarantee of every certificate for every shipment.
          </p>
        </ScrollReveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {DOCUMENTS.map((doc, index) => (
            <ScrollReveal key={doc.title} delayMs={index * 40}>
              <li>
                <div className="h-px w-8 bg-tg-secondary" aria-hidden />
                <h3 className="mt-4 font-display text-xl text-tg-primary">{doc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tg-muted">{doc.body}</p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
        <ScrollReveal>
          <p className="mt-12 max-w-2xl border border-tg-border bg-tg-surface p-6 text-sm leading-relaxed text-tg-muted">
            <span className="font-semibold text-tg-primary">Destinations:</span> a public country
            list will publish when the business confirms markets it actively serves. Until then,
            include your destination country or port in the quotation request so we can advise
            feasibility.
          </p>
        </ScrollReveal>
      </section>

      <CtaBand
        title="Include destination in your quote"
        description="Share product, volume, destination port or country, and preferred Incoterms — our sales team will respond with next steps."
      />
    </>
  );
}
