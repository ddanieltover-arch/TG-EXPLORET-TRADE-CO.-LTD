import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import {
  COMPANY_LEGAL_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_TAGLINE,
  PRODUCT_CATEGORIES,
} from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quality Control",
  description: `How ${COMPANY_LEGAL_NAME} verifies grade, packing, and documentation for rice and edible cooking oil exports — from sourcing through pre-shipment checks.`,
  path: "/quality-control",
});

const stages = [
  {
    title: "Source verification",
    body: "We work with trusted producers and mills so raw materials and refined oils meet agreed specifications before they enter an export programme.",
    bullets: [
      "Approved supply partners with periodic commercial re-qualification",
      "Farm and mill traceability discussions for rice programmes",
      "Processor and packing alignment for edible cooking oils",
      "Specification sheets matched to international buyer expectations",
    ],
  },
  {
    title: "Laboratory and in-process checks",
    body: "Grade and quality parameters are checked throughout handling and packing so export lots stay consistent with what buyers shortlist on our product pages.",
    bullets: [
      "Rice: moisture, broken grain percentage, appearance, and grade consistency",
      "Cooking oils: sensory checks, free fatty acid / acidity discussions, and appearance where relevant",
      "Contamination and foreign-matter vigilance during packing and storage coordination",
      "Batch identification so results can be tied back to a shipment discussion",
    ],
  },
  {
    title: "Pre-shipment inspection",
    body: "Final lot review and loading supervision help ensure what leaves Thailand matches the commercial agreement for the order.",
    bullets: [
      "Lot sampling before container sealing where the programme requires it",
      "Weight and count verification against the packing list",
      "Container condition and seal integrity checks",
      "Optional third-party inspection coordination on request",
    ],
  },
  {
    title: "Export documentation",
    body: "Certificates and supporting documents are coordinated per shipment — exact sets vary by destination and are confirmed with sales.",
    bullets: [
      "Certificate of Analysis (COA) discussed per batch or shipment",
      "Certificate of Origin from authorised channels when required",
      "Health or phytosanitary certificates as required by destination",
      "Additional declarations confirmed with sales for the specific market",
    ],
  },
] as const;

const productChecks = [
  {
    href: PRODUCT_CATEGORIES.rice.href,
    title: PRODUCT_CATEGORIES.rice.name,
    image: "/media/operations/rice-bulk-qc-warehouse.png",
    body: "Moisture, broken percentage, grain appearance, and packing integrity are central to rice export readiness.",
  },
  {
    href: PRODUCT_CATEGORIES.cookingOil.href,
    title: PRODUCT_CATEGORIES.cookingOil.name,
    image: "/media/operations/oil-bottling-line.png",
    body: "Oil programmes emphasise sensory quality, specification alignment, sealed packing, and clear labelling.",
  },
] as const;

const compliance = [
  {
    title: "Spec-led catalogue",
    body: "Product pages publish parameters buyers can evaluate before talking to sales — so quality conversations start from shared expectations.",
  },
  {
    title: "Evidence before claims",
    body: "We discuss destination requirements with buyers. Formal certifications appear on this website only after the business confirms which documents are held.",
  },
  {
    title: "Batch traceability",
    body: "Shipment discussions aim to keep lot identity, packing lists, and analysis documents aligned for your records.",
  },
  {
    title: "Third-party support",
    body: "Independent lab testing or inspection can be arranged on request to meet import needs in your market.",
  },
] as const;

const related = [
  {
    href: "/manufacturing-process",
    title: "Manufacturing Process",
    description: "Rice milling and oil refining pathways for export grades.",
  },
  {
    href: "/ordering-procedure",
    title: "Ordering Procedure",
    description: "From inquiry and quotation through shipment and after-sales.",
  },
  {
    href: "/export-markets",
    title: "Export markets",
    description: "Incoterms and document expectations for shipments.",
  },
  {
    href: "/products",
    title: "Products",
    description: "Oils and rice grades with specifications.",
  },
] as const;

export default function QualityControlPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <Image
          src="/media/operations/rice-bulk-qc-warehouse.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-30"
          sizes="100vw"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#061a33]/95 via-[#0a2f5c]/88 to-[#0a2f5c]/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 15%, #c9a24a33, transparent 42%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-28">
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            {COMPANY_TAGLINE}
          </p>
          <div className="tg-gold-rule mt-5" aria-hidden />
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
            Quality Control
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            At {COMPANY_SHORT_NAME}, quality is how we prepare edible cooking oils and rice for
            international buyers — across sourcing, packing, and pre-shipment stages. We do not
            publish unverified certification badges.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/request-quote" className="tg-btn-secondary px-6">
              Request a Quote
            </Link>
            <Link href="/manufacturing-process" className="tg-btn-ghost">
              Manufacturing process
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-tg-border bg-tg-surface px-4 py-10 md:px-6">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <p className="max-w-3xl leading-relaxed text-tg-muted">
            Every oil and rice programme we discuss is expected to meet agreed grade, packing, and
            documentation expectations. Ask sales which certificates can support a given shipment.
          </p>
        </div>
      </section>

      <section className="tg-surface-premium px-4 py-20 md:px-6 md:py-24">
        <div className="relative mx-auto max-w-[var(--tg-container)]">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            Export workflow
          </p>
          <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
            Assurance at every stage
          </h2>
          <div className="tg-gold-rule mt-4" aria-hidden />
        </ScrollReveal>
        <div className="mt-12 space-y-12">
          {stages.map((stage, index) => (
            <ScrollReveal key={stage.title} delayMs={index * 40}>
              <div className="grid gap-6 border-t border-tg-border pt-10 md:grid-cols-[4.5rem_0.85fr_1.15fr]">
                <p
                  className="flex h-11 w-11 items-center justify-center border border-tg-secondary/50 font-display text-sm text-tg-primary"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-2xl text-tg-primary">{stage.title}</h3>
                  <p className="mt-3 leading-relaxed text-tg-muted">{stage.body}</p>
                </div>
                <ul className="space-y-2.5 text-sm leading-relaxed text-tg-muted">
                  {stage.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tg-secondary"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </div>
      </section>

      <section className="tg-surface-premium border-y border-tg-border bg-tg-surface px-4 py-20 md:px-6 md:py-24">
        <div className="relative mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Product focus
            </p>
            <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
              Checks tailored to oils and rice
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
              Our quality approach stays specific to what we supply — not unrelated commodity lines.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {productChecks.map((item, index) => (
              <ScrollReveal key={item.href} delayMs={index * 70}>
                <Link
                  href={item.href}
                  className="tg-card-interactive group block overflow-hidden border border-tg-border bg-tg-bg"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="tg-img-zoom object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="border-t border-tg-border p-8">
                    <div className="h-px w-10 bg-tg-secondary" aria-hidden />
                    <h3 className="mt-4 font-display text-2xl text-tg-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-tg-muted">{item.body}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tg-primary">
                      View catalogue
                      <span className="tg-link-arrow" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Buyer support
            </p>
            <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
              Standards, documentation, and evidence
            </h2>
            <p className="mt-4 leading-relaxed text-tg-muted">
              Quality processes are designed for international buyers. Documentation and testing
              support are tailored to destination requirements confirmed with sales.
            </p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {compliance.map((item) => (
                <li key={item.title}>
                  <div className="h-px w-8 bg-tg-secondary" aria-hidden />
                  <h3 className="mt-3 font-display text-xl text-tg-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tg-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delayMs={60}>
            <div className="relative aspect-[4/5] overflow-hidden border border-tg-border">
              <Image
                src="/media/operations/milling-storage-interior.png"
                alt="Milling and storage facility supporting grade consistency"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
              <div
                className="absolute bottom-0 left-0 h-1 w-24 bg-tg-secondary"
                aria-hidden
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Related
            </p>
            <h2 className="mt-3 font-display text-3xl text-tg-primary">You may also find helpful</h2>
          </ScrollReveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {related.map((link, index) => (
              <ScrollReveal key={link.href} delayMs={index * 40}>
                <li>
                  <Link
                    href={link.href}
                    className="tg-card-interactive block h-full border border-tg-border bg-white p-6"
                  >
                    <h3 className="font-display text-xl text-tg-primary">{link.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-tg-muted">
                      {link.description}
                    </p>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Need quality documentation?"
        description="Ask for certificates, lab reports, or specifications for your oil or rice programme — we will confirm what can be provided for your destination."
      />
    </>
  );
}
