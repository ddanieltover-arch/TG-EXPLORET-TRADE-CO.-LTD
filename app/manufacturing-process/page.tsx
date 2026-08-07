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
  title: "Manufacturing Process",
  description: `How rice milling and refined cooking oil processing prepare ${COMPANY_LEGAL_NAME} export grades — from sourcing through packing and quality checks.`,
  path: "/manufacturing-process",
});

const riceSteps = [
  {
    title: "Cultivation and harvest",
    body: "Rice is grown in suitable regions of Thailand and harvested when grain moisture and maturity support milling quality for export programmes.",
  },
  {
    title: "Reception and drying",
    body: "Paddy is received, assessed, and dried to safe moisture levels so milling can proceed without quality loss.",
  },
  {
    title: "Cleaning and husking",
    body: "Foreign matter is removed and husks are separated to produce brown rice ready for further milling or cargo grades.",
  },
  {
    title: "Milling and polishing",
    body: "Bran layers are removed and grains are polished to the agreed white-rice appearance, broken percentage, and grade.",
  },
  {
    title: "Sorting and grading",
    body: "Colour sorting and grading separate whole kernels from broken and off-type grains to match buyer specifications.",
  },
  {
    title: "Packing for export",
    body: "Finished rice is packed in bags or other agreed formats, labelled, and staged for container loading with lot identity preserved.",
  },
] as const;

const oilSteps = [
  {
    title: "Sourcing crude or semi-refined oil",
    body: "Feedstock oils are selected to match the finished grade programme — sunflower, soybean, palm, coconut, and other catalogue oils.",
  },
  {
    title: "Degumming and refining",
    body: "Gums and free fatty acids are reduced through refining steps so the oil meets food-grade expectations for the intended use.",
  },
  {
    title: "Bleaching",
    body: "Colour bodies and residual impurities are reduced to achieve a clean, consistent appearance for retail or industrial packing.",
  },
  {
    title: "Deodorising",
    body: "Odour and flavour compounds are removed under controlled conditions to produce a stable, neutral refined cooking oil.",
  },
  {
    title: "Quality verification",
    body: "Sensory checks and specification parameters are verified against the agreed grade before packing is approved.",
  },
  {
    title: "Packing and export staging",
    body: "Oils are filled into bottles, jerry cans, drums, flexitanks, or other formats confirmed at quotation, then prepared for shipment.",
  },
] as const;

const enablers = [
  {
    title: "Process discipline",
    body: "Modern milling and refining lines rely on controlled settings so moisture, colour, acidity, and appearance stay within grade.",
  },
  {
    title: "Traceability",
    body: "Lot identity from preparation through packing supports Certificates of Analysis and destination documentation.",
  },
  {
    title: "Energy and waste care",
    body: "Partner facilities increasingly recover by-products (such as rice bran or refining co-products) and manage wastewater responsibly.",
  },
  {
    title: "Export readiness",
    body: "Final packing, labelling, and container loading are coordinated so commercial and quality documents travel with the cargo.",
  },
] as const;

const related = [
  {
    href: "/quality-control",
    title: "Quality Control",
    description: "Inspection stages from sourcing through pre-shipment checks.",
  },
  {
    href: "/ordering-procedure",
    title: "Ordering Procedure",
    description: "From inquiry and quotation through shipment and after-sales.",
  },
  {
    href: "/products",
    title: "Products",
    description: "Browse rice and refined cooking oil grades.",
  },
  {
    href: "/sustainability",
    title: "Sustainability",
    description: "Responsible sourcing across our dual product lines.",
  },
] as const;

export default function ManufacturingProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 24%, #c9a24a55, transparent 42%), radial-gradient(circle at 86% 70%, #163a7288, transparent 48%), radial-gradient(circle at 50% 100%, #ffffff08, transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[var(--tg-container)] gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-6 md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">How we produce</p>
            <div className="tg-gold-rule mt-3" aria-hidden />
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Manufacturing Process
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              {COMPANY_SHORT_NAME} supplies rice and refined cooking oils prepared through
              disciplined milling and refining pathways — not sugar manufacturing or unrelated
              commodity lines. Below is how our dual catalogue grades are typically prepared for
              export.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-white px-5 text-sm font-semibold text-tg-primary transition-[background-color,transform] duration-[var(--tg-duration-med)] ease-[var(--tg-ease-out)] hover:bg-tg-bg active:scale-[0.98]"
              >
                View products
              </Link>
              <Link href="/request-quote" className="tg-btn-ghost border-tg-secondary">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden border border-white/15">
            <Image
              src="/media/operations/rice-mill-process.png"
              alt="Modern rice mill facility with grain prepared for export programmes"
              fill
              className="tg-img-zoom object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-tg-border bg-tg-surface px-4 py-10 md:px-6">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <p className="max-w-3xl text-tg-muted">
            Processing details vary by grade, partner facility, and buyer specification. Sales
            confirms what applies to a given rice or refined oil shipment — including packing format
            and supporting documents.
          </p>
        </div>
      </section>

      <section className="tg-surface-premium px-4 py-16 md:px-6 md:py-20">
        <div className="relative mx-auto grid max-w-[var(--tg-container)] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">
              {PRODUCT_CATEGORIES.rice.name}
            </p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              From paddy to export-ready grain
            </h2>
            <div className="tg-gold-rule mt-3" aria-hidden />
            <p className="mt-3 text-tg-muted">
              Jasmine, white, parboiled, glutinous, basmati, cargo, and specialty grades follow a
              milling pathway tailored to moisture, broken percentage, and appearance targets.
            </p>
            <p className="mt-6">
              <Link
                href={PRODUCT_CATEGORIES.rice.href}
                className="text-sm font-semibold text-tg-primary underline"
              >
                Browse rice products
              </Link>
            </p>
          </ScrollReveal>
          <ol className="space-y-6">
            {riceSteps.map((step, index) => (
              <ScrollReveal key={step.title} delayMs={index * 40}>
                <li
                  className={`grid gap-3 border-tg-border sm:grid-cols-[3rem_1fr] ${
                    index === 0 ? "pt-0" : "border-t pt-6"
                  }`}
                >
                  <p className="font-display text-2xl text-tg-secondary" aria-hidden>
                    {index + 1}
                  </p>
                  <div>
                    <h3 className="font-display text-xl text-tg-primary">{step.title}</h3>
                    <p className="mt-2 text-sm text-tg-muted">{step.body}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
          <ScrollReveal delayMs={60} className="lg:col-span-2">
            <div className="group relative mt-4 aspect-[21/9] overflow-hidden border border-tg-border lg:mt-8">
              <Image
                src="/media/operations/warehouse-silos-interior.png"
                alt="Interior grain silos and sack storage after milling and grading"
                fill
                className="tg-img-zoom object-cover"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="tg-surface-premium border-y border-tg-border bg-tg-surface px-4 py-16 md:px-6 md:py-20">
        <div className="relative mx-auto max-w-[var(--tg-container)]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <ScrollReveal>
              <p className="text-sm font-semibold tracking-wide text-tg-secondary">
                {PRODUCT_CATEGORIES.cookingOil.name}
              </p>
              <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
                From feedstock to refined cooking oil
              </h2>
              <div className="tg-gold-rule mt-3" aria-hidden />
              <p className="mt-3 text-tg-muted">
                Refined oils for retail, foodservice, and industrial programmes typically pass
                through refining, bleaching, and deodorising (RBD) stages before packing.
              </p>
              <p className="mt-6">
                <Link
                  href={PRODUCT_CATEGORIES.cookingOil.href}
                  className="text-sm font-semibold text-tg-primary underline"
                >
                  Browse cooking oils
                </Link>
              </p>
            </ScrollReveal>
            <ol className="space-y-6">
              {oilSteps.map((step, index) => (
                <ScrollReveal key={step.title} delayMs={index * 40}>
                  <li
                    className={`grid gap-3 border-tg-border sm:grid-cols-[3rem_1fr] ${
                      index === 0 ? "pt-0" : "border-t pt-6"
                    }`}
                  >
                    <p className="font-display text-2xl text-tg-secondary" aria-hidden>
                      {index + 1}
                    </p>
                    <div>
                      <h3 className="font-display text-xl text-tg-primary">{step.title}</h3>
                      <p className="mt-2 text-sm text-tg-muted">{step.body}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
          <ScrollReveal delayMs={60}>
            <div className="group relative mt-12 aspect-[21/9] overflow-hidden border border-tg-border">
              <Image
                src="/media/operations/oil-bottling-line.png"
                alt="Refined cooking oil bottling line preparing wholesale packing for export"
                fill
                className="tg-img-zoom object-cover"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Across both lines</p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              What keeps quality consistent
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {enablers.map((item) => (
                <li key={item.title}>
                  <h3 className="font-display text-xl text-tg-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-tg-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delayMs={60}>
            <div className="relative aspect-[4/5] overflow-hidden border border-tg-border">
              <Image
                src="/media/operations/industrial-facility-night.png"
                alt="Industrial processing facility supporting refining and export readiness"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </ScrollReveal>
        </div>
        <p className="mt-8 text-sm text-tg-muted">
          Quality control sits alongside every stage — see our{" "}
          <Link href="/quality-control" className="font-semibold text-tg-primary underline">
            quality control process
          </Link>{" "}
          for inspection, documentation, and pre-shipment checks.
        </p>
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
              <h2 className="font-display text-3xl">Ready to specify a grade?</h2>
              <p className="mt-2 max-w-xl text-white/80">
                Browse the catalogue or request a quotation with product, volume, and destination for
                rice or refined cooking oils.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/request-quote" className="tg-btn-secondary">
                Request a Quote
              </Link>
              <Link href="/contact" className="tg-btn-ghost">
                Contact sales
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
