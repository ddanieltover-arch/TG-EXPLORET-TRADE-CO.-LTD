import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { COMPANY_SHORT_NAME, PRODUCT_CATEGORIES } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: `Explore edible cooking oils and rice from ${COMPANY_SHORT_NAME} — specifications and packaging confirmed at quotation.`,
  path: "/products",
});

const CATEGORIES = [
  {
    ...PRODUCT_CATEGORIES.cookingOil,
    image: "/media/products/oil-sunflower.webp",
    blurb:
      "Sunflower, corn, soybean, rapeseed/canola, olive, palm, coconut, sesame, groundnut, and blended vegetable oils.",
  },
  {
    ...PRODUCT_CATEGORIES.rice,
    image: "/media/products/rice-jasmine.webp",
    blurb:
      "Jasmine, white, parboiled, glutinous, basmati, cargo, Riceberry, and broken grades.",
  },
] as const;

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Products</h1>
      <p className="mt-3 max-w-2xl text-tg-muted">
        Explore our edible cooking oil and rice catalogue. Each grade page lists available
        specifications and packaging formats; commercial terms are confirmed at quotation.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={category.href}
            className="group overflow-hidden border border-tg-border bg-tg-surface hover:border-tg-secondary"
          >
            <div className="relative aspect-[16/10] bg-tg-bg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8">
              <h2 className="font-display text-2xl text-tg-primary">{category.name}</h2>
              <p className="mt-2 text-sm text-tg-muted">{category.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
