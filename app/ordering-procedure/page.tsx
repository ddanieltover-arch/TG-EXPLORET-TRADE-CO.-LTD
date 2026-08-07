import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import {
  COMPANY_LEGAL_NAME,
  COMPANY_SHORT_NAME,
  PRODUCT_CATEGORIES,
} from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ordering Procedure",
  description: `How to enquire, quote, confirm, and ship rice and refined cooking oils with ${COMPANY_LEGAL_NAME} — from first inquiry to after-sales support.`,
  path: "/ordering-procedure",
});

const steps = [
  {
    title: "Inquiry and requirements",
    body: "Share the commercial details we need to respond with availability and next steps for rice or refined cooking oil.",
    bullets: [
      "Product grade or SKU interest from our dual catalogue",
      "Target quantity (for example MT, FCL, or programme volume)",
      "Destination port or country and preferred Incoterms (FOB, CIF, EXW, CNF)",
      "Packaging preferences — bags, bulk, drums, flexitank, or other options discussed with sales",
    ],
  },
  {
    title: "Quotation and samples",
    body: "We provide a commercial quotation including Incoterms, indicative lead times, quality document expectations, and payment terms. Samples can be arranged for new buyers or new grades when practical.",
    bullets: [
      "Formal quotation valid for an agreed period",
      "Specification and Certificate of Analysis expectations outlined",
      "Sample shipment via courier when quality approval is required",
      "Optional third-party inspection coordination",
    ],
  },
  {
    title: "Contract and payment",
    body: "Once terms are agreed, we issue a proforma invoice and confirm the commercial paperwork. Payment is typically via Telegraphic Transfer (TT) or Letter of Credit (LC), depending on order size and buyer profile.",
    bullets: [
      "Proforma invoice with full commercial terms",
      "LC at sight or usance for qualified buyers where agreed",
      "Advance payment options often used for first-time orders",
      "Clear milestones for preparation and shipment",
    ],
  },
  {
    title: "Preparation and quality check",
    body: "Rice and refined oils are prepared, inspected, and documented against the agreed specifications before dispatch.",
    bullets: [
      "In-process checks aligned to rice grade or oil specification",
      "Pre-packing batch approval and lot identification",
      "SGS, Bureau Veritas, or buyer-nominated inspection on request",
      "Container loading supervision and photo records where arranged",
    ],
  },
  {
    title: "Shipment and documentation",
    body: "We coordinate logistics and assemble export documents for customs clearance at destination. Tracking updates are shared through transit as arrangements allow.",
    bullets: [
      "Bill of Lading, Commercial Invoice, and Packing List",
      "Certificate of Origin and phytosanitary certificates when required",
      "Additional declarations confirmed for the destination market",
      "COA and quality documents per batch or shipment",
    ],
  },
  {
    title: "After-sales support",
    body: "The relationship continues after delivery. We address documentation queries, quality concerns, and reorders so programmes stay consistent.",
    bullets: [
      "Clear point of contact for repeat buyers",
      "Fast response to post-shipment inquiries",
      "Reorder facilitation with consistent specifications",
      "Availability and lead-time updates when programmes continue",
    ],
  },
] as const;

const whyOrder = [
  {
    title: "Clear documentation",
    body: "Proforma invoices, certificates, and export paperwork are handled as part of the commercial process.",
  },
  {
    title: "Flexible Incoterms",
    body: "FOB, CIF, EXW, CNF, and other terms are discussed to suit your logistics setup.",
  },
  {
    title: "Dual-product focus",
    body: "The process stays specific to rice and refined cooking oils — not unrelated commodity lines.",
  },
  {
    title: "Dedicated support",
    body: "A structured path from inquiry through delivery, with sales follow-up after shipment.",
  },
] as const;

const documents = [
  "Purchase Order (PO) from the buyer when you use one",
  "Proforma Invoice from TG Export Trade",
  "Commercial Invoice and Packing List",
  "Certificate of Origin",
  "Bill of Lading (or equivalent transport document)",
  "Certificate of Analysis and other destination-required certificates",
  "Payment confirmation (for example TT advice or LC instruments)",
] as const;

const related = [
  {
    href: "/request-quote",
    title: "Request a Quote",
    description: "Start with a structured wholesale quotation form.",
  },
  {
    href: "/quality-control",
    title: "Quality Control",
    description: "How we verify grades before and during shipment.",
  },
  {
    href: "/products",
    title: "Products",
    description: "Browse rice and refined cooking oil grades.",
  },
  {
    href: "/contact",
    title: "Contact sales",
    description: "Speak with our export team about your programme.",
  },
] as const;

const productCategories = [
  {
    href: PRODUCT_CATEGORIES.cookingOil.href,
    title: PRODUCT_CATEGORIES.cookingOil.name,
    image: "/media/operations/cooking-oils-assortment.png",
    body: "Refined oils for retail, foodservice, and industrial programmes.",
  },
  {
    href: PRODUCT_CATEGORIES.rice.href,
    title: PRODUCT_CATEGORIES.rice.name,
    image: "/media/operations/tg-basmati-warehouse.png",
    body: "Jasmine, white, parboiled, glutinous, basmati, cargo, and specialty grades.",
  },
] as const;

export default function OrderingProcedurePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 22%, #c9a24a55, transparent 42%), radial-gradient(circle at 88% 72%, #163a7288, transparent 48%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[var(--tg-container)] gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-6 md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">How we work</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Ordering Procedure
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              {COMPANY_SHORT_NAME} keeps the order process simple, transparent, and efficient —
              from first inquiry to delivery support for rice and refined cooking oils.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-quote"
                className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-white px-5 text-sm font-semibold text-tg-primary hover:bg-tg-bg"
              >
                Start your order
              </Link>
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-tg-secondary px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse products
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/15">
            <Image
              src="/media/operations/container-ship-port.png"
              alt="Container vessel at port supporting international rice and oil export shipments"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-tg-border bg-tg-surface px-4 py-10 md:px-6">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <p className="max-w-3xl text-tg-muted">
            From inquiry to delivery — every step is structured for clarity. Spot prices are not
            published on this website; commercial terms are confirmed in writing for each rice or
            refined oil programme.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-tg-secondary">Streamlined process</p>
          <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
            Six steps to your order
          </h2>
        </ScrollReveal>
        <ol className="mt-10 space-y-12">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delayMs={index * 40}>
              <li
                className={`grid gap-6 border-tg-border md:grid-cols-[4rem_0.85fr_1.15fr] ${
                  index === 0 ? "pt-0" : "border-t pt-10"
                }`}
              >
                <p className="font-display text-3xl text-tg-secondary" aria-hidden>
                  {index + 1}
                </p>
                <div>
                  <h3 className="font-display text-2xl text-tg-primary">{step.title}</h3>
                  <p className="mt-3 text-tg-muted">{step.body}</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-tg-muted">
                  {step.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Why order with us</p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              Built for wholesale export buyers
            </h2>
          </ScrollReveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyOrder.map((item, index) => (
              <ScrollReveal key={item.title} delayMs={index * 40}>
                <li>
                  <h3 className="font-display text-xl text-tg-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-tg-muted">{item.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {productCategories.map((item, index) => (
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
                  <div className="p-6">
                    <h3 className="inline-flex items-center gap-2 font-display text-2xl text-tg-primary">
                      {item.title}
                      <span className="tg-link-arrow text-base font-semibold" aria-hidden>
                        →
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-tg-muted">{item.body}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">
              Documents typically involved
            </p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              Paperwork that keeps clearance smooth
            </h2>
            <p className="mt-3 text-tg-muted">
              Exact document sets vary by destination and Incoterms. Sales confirms what is required
              for your rice or refined oil shipment.
            </p>
            <ul className="mt-8 list-disc space-y-2 pl-5 text-sm text-tg-muted">
              {documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/export-markets" className="text-sm font-semibold text-tg-primary underline">
                Export markets &amp; Incoterms
              </Link>
            </p>
          </ScrollReveal>
          <ScrollReveal delayMs={60}>
            <div className="relative aspect-[4/5] overflow-hidden border border-tg-border">
              <Image
                src="/media/operations/port-operations-safety.png"
                alt="Port logistics coordination supporting clear commercial documentation for export"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 pb-16 md:px-6 md:pb-20">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-tg-secondary">Related</p>
          <h2 className="mt-2 font-display text-3xl text-tg-primary">You may also find helpful</h2>
        </ScrollReveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {related.map((link, index) => (
            <ScrollReveal key={link.href} delayMs={index * 40}>
              <li>
                <Link
                  href={link.href}
                  className="tg-card-interactive block h-full border border-tg-border bg-tg-surface p-5"
                >
                  <h3 className="font-display text-xl text-tg-primary">{link.title}</h3>
                  <p className="mt-2 text-sm text-tg-muted">{link.description}</p>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      <section className="bg-tg-primary px-4 py-14 text-white md:px-6">
        <ScrollReveal>
          <div className="mx-auto flex max-w-[var(--tg-container)] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl">Ready to place your enquiry?</h2>
              <p className="mt-2 max-w-xl text-white/80">
                Share product, quantity, destination, and preferred Incoterms — we will respond with
                a formal quotation path for rice or refined cooking oils.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/request-quote" className="tg-btn-secondary">
                Request a Quote
              </Link>
              <Link href="/contact" className="tg-btn-ghost">
                Contact us
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
