import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/brand";
import { ScrollReveal } from "@/components/sections/ScrollReveal";

const CATEGORIES = [
  {
    ...PRODUCT_CATEGORIES.cookingOil,
    image: "/media/operations/cooking-oils-assortment.png",
    blurb:
      "Refined and specialty oils for retail packing, foodservice, and industrial programmes — grade and packing confirmed at quotation.",
    priority: false,
  },
  {
    ...PRODUCT_CATEGORIES.rice,
    image: "/media/operations/tg-basmati-warehouse.png",
    blurb:
      "Thai jasmine, white, parboiled, glutinous, basmati, cargo, and specialty grades for wholesale and export.",
    priority: false,
  },
] as const;

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-24">
      <ScrollReveal>
        <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
          Catalogue
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl text-tg-primary md:text-4xl">
          Two product lines. Export focus.
        </h2>
        <p className="mt-4 max-w-2xl text-tg-muted leading-relaxed">
          We concentrate on edible cooking oils and rice so buyers can evaluate grades and
          packaging without unrelated commodity noise.
        </p>
      </ScrollReveal>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
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
                  priority={category.priority}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tg-primary/40 to-transparent opacity-80"
                  aria-hidden
                />
              </div>
              <div className="border-t border-tg-border p-8">
                <div className="h-px w-10 bg-tg-secondary" aria-hidden />
                <h3 className="mt-4 font-display text-2xl text-tg-primary md:text-[1.65rem]">
                  {category.name}
                </h3>
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
    </section>
  );
}
