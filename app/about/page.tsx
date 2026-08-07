import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import {
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_ORIGIN,
  COMPANY_SHORT_NAME,
  COMPANY_TAGLINE,
  PRODUCT_CATEGORIES,
} from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { getPublishedSitePage } from "@/services/sitePageService";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${COMPANY_LEGAL_NAME} — Thailand exporter of edible cooking oils and rice, established in 2018. Dual-core catalogue, structured quotation, Connecting Global Markets.`,
  path: "/about",
});

export const dynamic = "force-dynamic";

const fallbackBody = `${COMPANY_LEGAL_NAME} is a Thailand-based company established in 2018. We supply edible cooking oils and rice to wholesale and export buyers who need clear grade information, practical packaging options, and coordinated shipment discussions.

Our commercial focus is dual-core: refined and specialty edible oils for retail, foodservice, and industrial programmes, alongside rice varieties and broken grades suited to importers, distributors, and food manufacturers. We do not dilute that focus with unrelated commodity lines.

From inquiry to shipment discussions, we emphasise transparent communication, consistent grade expectations, and documentation support aligned to destination requirements. Buyers work with us through structured quotation requests — product, volume, destination, and preferred Incoterms — so sales conversations start with usable commercial context.

Quality and food-safety certifications appear on this website only after the business confirms which documents are held. Until then, we invite buyers to ask sales which certificates can be provided for a given shipment.`;

const values = [
  {
    title: "Rooted in Thailand",
    body: "We coordinate Thai rice and edible cooking oils with care for grade consistency, packing discipline, and export readiness.",
  },
  {
    title: "Dual-product clarity",
    body: "The catalogue stays focused on edible cooking oils and rice — so buyers can evaluate specs without unrelated commodity noise.",
  },
  {
    title: "Honest commercial dialogue",
    body: "If a grade, volume, or destination is not a fit, we say so quickly. You speak with people who can move the conversation forward.",
  },
  {
    title: "Flexible supply support",
    body: "Packing options, Incoterms, and shipment timing are confirmed per enquiry so programmes can adapt when plans change.",
  },
  {
    title: "Timely execution",
    body: "From inquiry to documentation, we aim for clear next steps, responsive follow-up, and reliable coordination with export partners.",
  },
  {
    title: "Quality before claims",
    body: "We publish certifications only when documents are confirmed. Ask sales which certificates can support a given shipment.",
  },
] as const;

const operations = [
  {
    src: "/media/operations/rice-bulk-qc-warehouse.png",
    alt: "Quality inspection of bulk Thailand rice bags in an export warehouse",
    caption: "Rice packing & inspection",
  },
  {
    src: "/media/operations/oil-bottling-line.png",
    alt: "Automated bottling line filling refined cooking oil for export",
    caption: "Oil packing programmes",
  },
  {
    src: "/media/operations/milling-storage-interior.png",
    alt: "Grain milling and storage facility with palletised sacks",
    caption: "Milling & storage",
  },
  {
    src: "/media/operations/port-operations-safety.png",
    alt: "Port operations team coordinating container terminal logistics",
    caption: "Export logistics",
  },
] as const;

function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function AboutPage() {
  const page = await getPublishedSitePage("about");
  const storyParagraphs = paragraphs(page?.body ?? fallbackBody);

  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <Image
          src="/media/operations/grain-silos-exterior.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-35"
          sizes="100vw"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#061a33]/95 via-[#0a2f5c]/88 to-[#0a2f5c]/60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-28">
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            {COMPANY_TAGLINE}
          </p>
          <div className="mt-5 h-px w-14 bg-tg-secondary" aria-hidden />
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-5xl lg:text-[3.25rem]">
            About {COMPANY_SHORT_NAME}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            A {COMPANY_ORIGIN}-based export partner for edible cooking oils and rice —
            established in 2018, built for importers, distributors, and food manufacturers.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-6 text-sm font-semibold text-tg-text transition hover:bg-tg-secondary/90"
            >
              Our products
            </Link>
            <Link
              href="/request-quote"
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-white/35 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-tg-secondary hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-tg-border bg-tg-surface px-4 py-12 md:px-6">
        <div className="mx-auto grid max-w-[var(--tg-container)] gap-8 sm:grid-cols-3">
          {[
            { label: "Established", value: "2018" },
            { label: "Origin", value: COMPANY_ORIGIN },
            { label: "Focus", value: "Oils & rice" },
          ].map((fact) => (
            <div key={fact.label}>
              <p className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
                {fact.label}
              </p>
              <p className="mt-2 font-display text-2xl text-tg-primary md:text-3xl">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-24">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            Our story
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl text-tg-primary md:text-4xl">
            {page?.title ?? "Dual-core export supply — oils and rice"}
          </h2>
          <div className="mt-4 h-px w-14 bg-tg-secondary" aria-hidden />
        </ScrollReveal>
        <div className="mt-8 max-w-3xl space-y-5 leading-relaxed text-tg-muted">
          {storyParagraphs.map((p) => (
            <ScrollReveal key={p.slice(0, 48)}>
              <p className="whitespace-pre-line">
                {p.includes(COMPANY_EMAIL) ? (
                  <>
                    {p.split(COMPANY_EMAIL)[0]}
                    <a className="font-medium text-tg-primary underline" href={`mailto:${COMPANY_EMAIL}`}>
                      {COMPANY_EMAIL}
                    </a>
                    {p.split(COMPANY_EMAIL)[1]}
                  </>
                ) : (
                  p
                )}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              What we supply
            </p>
            <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
              Two product lines. Export focus.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
              We keep the catalogue tight so buyers can compare grades, packing, and suitability
              for retail, foodservice, and industrial programmes.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <ScrollReveal>
              <Link
                href={PRODUCT_CATEGORIES.cookingOil.href}
                className="group block overflow-hidden border border-tg-border bg-tg-bg transition duration-300 hover:border-tg-secondary"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/media/operations/cooking-oils-assortment.png"
                    alt={PRODUCT_CATEGORIES.cookingOil.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="border-t border-tg-border p-8">
                  <div className="h-px w-10 bg-tg-secondary" aria-hidden />
                  <h3 className="mt-4 font-display text-2xl text-tg-primary">
                    {PRODUCT_CATEGORIES.cookingOil.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tg-muted">
                    Refined and specialty oils for retail, foodservice, and industrial programmes.
                    Grade and packing confirmed at quotation.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tg-primary">
                    View catalogue
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delayMs={80}>
              <Link
                href={PRODUCT_CATEGORIES.rice.href}
                className="group block overflow-hidden border border-tg-border bg-tg-bg transition duration-300 hover:border-tg-secondary"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/media/operations/tg-basmati-warehouse.png"
                    alt={PRODUCT_CATEGORIES.rice.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="border-t border-tg-border p-8">
                  <div className="h-px w-10 bg-tg-secondary" aria-hidden />
                  <h3 className="mt-4 font-display text-2xl text-tg-primary">
                    {PRODUCT_CATEGORIES.rice.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tg-muted">
                    Jasmine, white, parboiled, glutinous, basmati, cargo, broken, and specialty
                    grades for importers and food manufacturers.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tg-primary">
                    View catalogue
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-24">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            How we work
          </p>
          <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
            Built on trust and clear supply
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
            Long-term partnerships start with transparency, reliable grades, and export support
            that matches how international buyers actually buy — without invented capacity figures
            or unverified certification badges.
          </p>
        </ScrollReveal>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, index) => (
            <ScrollReveal key={item.title} delayMs={index * 40}>
              <li>
                <span className="font-display text-2xl text-tg-secondary/70" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl text-tg-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tg-muted">{item.body}</p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Operations
            </p>
            <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
              From grade selection to export discussion
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
              We coordinate sourcing, packing discussions, and documentation so oils and rice move
              from {COMPANY_ORIGIN} to your destination with commercial clarity.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operations.map((item, index) => (
              <ScrollReveal key={item.src} delayMs={index * 40}>
                <figure className="overflow-hidden border border-tg-border bg-tg-bg">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="border-t border-tg-border px-4 py-3 text-sm text-tg-muted">
                    {item.caption}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <div className="h-px w-8 bg-tg-secondary" aria-hidden />
              <h3 className="mt-4 font-display text-xl text-tg-primary">Reliable coordination</h3>
              <p className="mt-2 text-sm leading-relaxed text-tg-muted">
                From inquiry to delivery discussions — consistent grade expectations, clear
                documentation, and dedicated export follow-up.
              </p>
            </div>
            <div>
              <div className="h-px w-8 bg-tg-secondary" aria-hidden />
              <h3 className="mt-4 font-display text-xl text-tg-primary">Packing &amp; logistics</h3>
              <p className="mt-2 text-sm leading-relaxed text-tg-muted">
                Practical packing options for oils and rice are confirmed at quotation, aligned to
                destination and buyer programme needs.
              </p>
            </div>
            <div>
              <div className="h-px w-8 bg-tg-secondary" aria-hidden />
              <h3 className="mt-4 font-display text-xl text-tg-primary">Quality discipline</h3>
              <p className="mt-2 text-sm leading-relaxed text-tg-muted">
                Spec-led product pages help you shortlist first. Certification evidence is shared
                only when documents are confirmed for a given shipment.
              </p>
              <p className="mt-4">
                <Link
                  href="/quality-control"
                  className="text-sm font-semibold text-tg-primary underline underline-offset-4"
                >
                  Quality control process
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to partner with us?"
        description={`Share product, volume, and destination for a structured quotation on oils and rice. Contact ${COMPANY_EMAIL} for general enquiries.`}
      />
    </>
  );
}
