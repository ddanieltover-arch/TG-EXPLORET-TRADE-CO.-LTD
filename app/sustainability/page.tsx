import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import {
  COMPANY_LEGAL_NAME,
  COMPANY_ORIGIN,
  COMPANY_SHORT_NAME,
  PRODUCT_CATEGORIES,
} from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sustainability",
  description: `How ${COMPANY_LEGAL_NAME} approaches responsible sourcing, environmental care, and transparent export supply for rice and refined cooking oils from ${COMPANY_ORIGIN}.`,
  path: "/sustainability",
});

const pillars = [
  {
    title: "Responsible sourcing",
    body: "We prioritise supply partners who follow sound agricultural practice, ethical labour expectations, and environmentally conscious production for rice and edible oils.",
    bullets: [
      "Long-term relationships with vetted growers, mills, and oil processors",
      "Preference for partners with documented land-use and handling practices",
      "Avoidance of deforestation-linked sourcing where origin information can be verified",
      "Regular commercial engagement so grade, season, and packing stay aligned",
    ],
  },
  {
    title: "Environmental stewardship",
    body: "We work to reduce waste and improve efficiency across storage, packing discussions, and export logistics for our dual product lines.",
    bullets: [
      "Efficient warehouse and packing coordination where we control the flow",
      "Waste reduction and reuse habits in packing and handling discussions",
      "Optimised container loads when shipment plans allow, to reduce empty space",
      "Ongoing evaluation of practical, lower-impact packing options with buyers",
    ],
  },
  {
    title: "Community and partnerships",
    body: "Stable purchasing relationships and clear communication help farming and processing partners plan production for rice and oil programmes.",
    bullets: [
      "Fair, transparent commercial dialogue with long-term partners",
      "Support for consistent offtake where programmes allow",
      "Knowledge sharing on grade expectations and packing discipline",
      "Local employment across coordination, storage, and logistics partners",
    ],
  },
] as const;

const productFocus = [
  {
    href: PRODUCT_CATEGORIES.rice.href,
    title: PRODUCT_CATEGORIES.rice.name,
    image: "/media/operations/rice-paddy-farming.png",
    body: "Promotion of mill standards, water-aware variety discussions where relevant, and clear grade specifications for wholesale and food-manufacturer buyers.",
  },
  {
    href: PRODUCT_CATEGORIES.cookingOil.href,
    title: PRODUCT_CATEGORIES.cookingOil.name,
    image: "/media/operations/cooking-oils-assortment.png",
    body: "Responsible refining and quality retention for retail, foodservice, and industrial oil programmes — without expanding into unrelated commodity lines.",
  },
] as const;

const transparency = [
  {
    title: "Documentation on request",
    body: "Origin and handling documents can be discussed per shipment. We publish certifications on this site only after the business confirms which documents are held.",
  },
  {
    title: "Buyer questionnaires",
    body: "We cooperate with reasonable sustainability and supplier questionnaires so importers can support their own ESG reporting.",
  },
  {
    title: "Clear product scope",
    body: "Our catalogue stays focused on rice and refined cooking oils, so sustainability conversations stay specific to what we actually supply.",
  },
] as const;

const improvements = [
  {
    title: "Annual practice review",
    body: "Sourcing, packing, and logistics habits are reviewed so programmes stay workable for partners and buyers.",
  },
  {
    title: "Buyer feedback",
    body: "Destination requirements and questionnaire feedback help us tighten documentation and communication.",
  },
  {
    title: "Evidence before claims",
    body: "Framework logos and certificates appear publicly only when the business confirms the underlying documents.",
  },
] as const;

const related = [
  {
    href: "/quality-control",
    title: "Quality Control",
    description: "Inspection stages from sourcing through pre-shipment checks.",
  },
  {
    href: "/about",
    title: "About us",
    description: "Our story, dual-product focus, and export approach.",
  },
  {
    href: "/export-markets",
    title: "Export markets",
    description: "Incoterms, documentation expectations, and quotation guidance.",
  },
  {
    href: "/privacy",
    title: "Privacy policy",
    description: "How we handle data shared through the website.",
  },
] as const;

export default function SustainabilityPage() {
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
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Our commitment</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Sustainability</h1>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              At {COMPANY_SHORT_NAME}, sustainability is part of how we operate — creating long-term
              value for clients, farming and processing partners, and the communities that support
              rice and refined cooking oil supply from {COMPANY_ORIGIN}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-quote"
                className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-white px-5 text-sm font-semibold text-tg-primary hover:bg-tg-bg"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-tg-secondary px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/15">
            <Image
              src="/media/operations/rice-paddy-farming.png"
              alt="Rice farming partners working in flooded paddies that support export supply"
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
            Creating long-term value through responsible practices — environmentally and socially —
            across the commercial supply of rice and refined edible cooking oils. We do not claim
            certifications or frameworks here until documents are confirmed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-tg-secondary">Core practices</p>
          <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
            How we approach responsibility
          </h2>
        </ScrollReveal>
        <div className="mt-10 space-y-12">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delayMs={index * 40}>
              <div
                className={`grid gap-6 border-tg-border md:grid-cols-[0.9fr_1.1fr] ${
                  index === 0 ? "pt-0" : "border-t pt-10"
                }`}
              >
                <div>
                  <h3 className="font-display text-2xl text-tg-primary">{pillar.title}</h3>
                  <p className="mt-3 text-tg-muted">{pillar.body}</p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-tg-muted">
                  {pillar.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Product focus</p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              Sustainability for what we actually sell
            </h2>
            <p className="mt-3 max-w-2xl text-tg-muted">
              Different commodities need different approaches. Ours stays specific to rice and
              refined cooking oils — not sugar, fertilizer, or other multi-commodity ranges.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {productFocus.map((item, index) => (
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
                    <h3 className="mt-0 inline-flex items-center gap-2 font-display text-2xl text-tg-primary">
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
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Transparency</p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              Supply chain visibility for buyers
            </h2>
            <p className="mt-3 text-tg-muted">
              Buyers increasingly need origin and handling visibility. We provide documentation and
              traceability information where available to support your own reporting — without
              publishing unverified claims.
            </p>
            <ul className="mt-8 space-y-6">
              {transparency.map((item) => (
                <li key={item.title}>
                  <h3 className="font-display text-xl text-tg-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-tg-muted">{item.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/quality-control" className="text-sm font-semibold text-tg-primary underline">
                Quality control process
              </Link>
            </p>
          </ScrollReveal>
          <ScrollReveal delayMs={60}>
            <div className="relative aspect-[4/5] overflow-hidden border border-tg-border">
              <Image
                src="/media/operations/grain-silos-exterior.png"
                alt="Grain storage and processing facilities supporting responsible supply programmes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Continuous improvement</p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              Goals we keep reviewing
            </h2>
            <p className="mt-3 max-w-2xl text-tg-muted">
              We regularly review sourcing and logistics practices to better match buyer expectations
              and practical improvements across rice and oil supply.
            </p>
          </ScrollReveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {improvements.map((item, index) => (
              <ScrollReveal key={item.title} delayMs={index * 40}>
                <li>
                  <h3 className="font-display text-xl text-tg-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-tg-muted">{item.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
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
              <h2 className="font-display text-3xl">Partner with a focused supplier</h2>
              <p className="mt-2 max-w-xl text-white/80">
                Request a quotation for rice or refined cooking oils — and ask sales how documentation
                can support your programme requirements.
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
