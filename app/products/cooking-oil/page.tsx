import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCT_CATEGORIES } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { ProductCard } from "@/components/molecules/ProductCard";
import { StickyQuoteCTA } from "@/components/sections/StickyQuoteCTA";
import { getPublishedProductsByCategory } from "@/services/productService";

export const metadata: Metadata = pageMetadata({
  title: PRODUCT_CATEGORIES.cookingOil.name,
  description:
    "Refined and specialty edible oils for food manufacturing, retail packing, and export — request a quote for commercial terms.",
  path: PRODUCT_CATEGORIES.cookingOil.href,
});
export const dynamic = "force-dynamic";

export default async function CookingOilHubPage() {
  const products = await getPublishedProductsByCategory(PRODUCT_CATEGORIES.cookingOil.slug);
  const categoryName = PRODUCT_CATEGORIES.cookingOil.name;

  return (
    <>
      <div className="border-b border-tg-border bg-tg-surface">
        <div className="mx-auto grid max-w-[var(--tg-container)] gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end md:px-6 md:py-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Catalogue
            </p>
            <h1 className="mt-3 font-display text-4xl text-tg-primary md:text-5xl">
              {categoryName}
            </h1>
            <div className="mt-4 h-px w-14 bg-tg-secondary" aria-hidden />
            <p className="mt-5 max-w-2xl leading-relaxed text-tg-muted">
              Refined and specialty edible oils for food manufacturing, retail packing, and
              export programmes. Review each SKU for type and packing options, then request a
              quote with volume and destination. Spot prices are not published.
            </p>
          </div>
          <div className="relative hidden aspect-[16/10] overflow-hidden md:block">
            <Image
              src="/media/operations/cooking-oils-assortment.png"
              alt=""
              fill
              className="object-cover"
              sizes="40vw"
              priority
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-l from-transparent to-tg-surface/20"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 pb-32 md:px-6 md:py-16 md:pb-32">
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const primary =
              product.images.find((img) => img.isPrimary) ?? product.images[0];
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                href={`${PRODUCT_CATEGORIES.cookingOil.href}/${product.slug}`}
                shortDescription={product.shortDescription}
                imageUrl={primary?.url}
                imageAlt={primary?.alt}
                categoryLabel="Oil"
              />
            );
          })}
        </ul>
        {products.length === 0 ? (
          <p className="mt-8 text-sm text-tg-muted">
            Catalogue is being prepared.{" "}
            <Link href="/contact" className="underline">
              Contact sales
            </Link>{" "}
            for current availability.
          </p>
        ) : null}
      </div>
      <StickyQuoteCTA hint="Request commercial terms for edible cooking oils — volume and destination help us respond faster." />
    </>
  );
}
