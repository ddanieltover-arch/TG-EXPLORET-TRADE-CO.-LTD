import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import { StickyQuoteCTA } from "@/components/sections/StickyQuoteCTA";
import { COMPANY_SHORT_NAME, COMPANY_TAGLINE, PRODUCT_CATEGORIES } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: `Explore edible cooking oils and rice from ${COMPANY_SHORT_NAME} — specifications and packaging confirmed at quotation.`,
  path: "/products",
});

const CATEGORIES = [
  {
    ...PRODUCT_CATEGORIES.cookingOil,
    image: "/media/operations/cooking-oils-assortment.png",
    blurb:
      "Refined and specialty oils for retail packing, foodservice, and industrial programmes — grade and packing confirmed at quotation.",
  },
  {
    ...PRODUCT_CATEGORIES.rice,
    image: "/media/operations/tg-basmati-warehouse.png",
    blurb:
      "Thai jasmine, white, parboiled, glutinous, basmati, cargo, and specialty grades for wholesale and export.",
  },
] as const;

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-tg-border bg-tg-surface">
        <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 md:px-6 md:py-16">
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            {COMPANY_TAGLINE}
          </p>
          <h1 className="mt-3 font-display text-4xl text-tg-primary md:text-5xl">Products</h1>
          <div className="mt-4 h-px w-14 bg-tg-secondary" aria-hidden />
          <p className="mt-5 max-w-2xl leading-relaxed text-tg-muted">
            Two export-focused lines — edible cooking oils and rice. Each grade page lists
            specifications and packing formats; commercial terms are confirmed at quotation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 pb-32 md:px-6 md:py-16 md:pb-32">
        <div className="grid gap-8 md:grid-cols-2">
          {CATEGORIES.map((category, index) => (
            <ScrollReveal key={category.slug} delayMs={index * 90}>
              <Link
                href={category.href}
                className="tg-card-interactive group block overflow-hidden border border-tg-border bg-tg-surface"
              >
                <div className="relative aspect-[16/10] bg-tg-bg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="tg-img-zoom object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={category.slug === "cooking-oil"}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tg-primary/40 to-transparent opacity-80"
                    aria-hidden
                  />
                </div>
                <div className="border-t border-tg-border p-8">
                  <div className="h-px w-10 bg-tg-secondary" aria-hidden />
                  <h2 className="mt-4 font-display text-2xl text-tg-primary md:text-[1.65rem]">
                    {category.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-tg-muted">{category.blurb}</p>
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
      <StickyQuoteCTA hint="Request commercial terms for oils or rice — volume and destination help us respond faster." />
    </>
  );
}
