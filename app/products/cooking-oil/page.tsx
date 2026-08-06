import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCT_CATEGORIES } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { ProductCard } from "@/components/molecules/ProductCard";
import { getPublishedProductsByCategory } from "@/services/productService";

export const metadata: Metadata = pageMetadata({
  title: PRODUCT_CATEGORIES.cookingOil.name,
  description:
    "Refined and specialty edible oils for food manufacturing, retail packing, and export — request a quote for commercial terms.",
  path: PRODUCT_CATEGORIES.cookingOil.href,
});
export const revalidate = 60;

export default async function CookingOilHubPage() {
  const products = await getPublishedProductsByCategory(PRODUCT_CATEGORIES.cookingOil.slug);

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">
        {PRODUCT_CATEGORIES.cookingOil.name}
      </h1>
      <p className="mt-3 max-w-2xl text-tg-muted">
        Refined and specialty edible oils for food manufacturing, retail packing, and
        export programmes. Review each SKU for type and packing options, then request a
        quote with volume and destination. Spot prices are not published on this site.
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const primary =
            product.images.find((img) => img.isPrimary) ?? product.images[0];
          return (
            <ProductCard
              key={product.id}
              name={product.name}
              href={`${PRODUCT_CATEGORIES.cookingOil.href}/${product.slug}`}
              quoteHref={`/request-quote?product=${encodeURIComponent(product.name)}`}
              shortDescription={product.shortDescription}
              imageUrl={primary?.url}
              imageAlt={primary?.alt}
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
  );
}
