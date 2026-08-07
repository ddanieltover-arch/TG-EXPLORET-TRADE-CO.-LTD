import Link from "next/link";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import {
  ProductCarouselTrack,
  type CarouselProduct,
} from "@/components/sections/ProductCarouselTrack";
import { PRODUCT_CATEGORIES } from "@/lib/brand";
import { getPublishedProductsForCarousel } from "@/services/productService";

function categoryHref(slug: string, productSlug: string) {
  if (slug === PRODUCT_CATEGORIES.cookingOil.slug) {
    return `${PRODUCT_CATEGORIES.cookingOil.href}/${productSlug}`;
  }
  if (slug === PRODUCT_CATEGORIES.rice.slug) {
    return `${PRODUCT_CATEGORIES.rice.href}/${productSlug}`;
  }
  return `/products/${slug}/${productSlug}`;
}

function categoryLabel(slug: string, fallback: string) {
  if (slug === PRODUCT_CATEGORIES.cookingOil.slug) return "Oil";
  if (slug === PRODUCT_CATEGORIES.rice.slug) return "Rice";
  return fallback;
}

export async function ProductCarousel() {
  const products = await getPublishedProductsForCarousel(14);
  if (products.length === 0) return null;

  const items: CarouselProduct[] = products.map((product) => {
    const image = product.images[0];
    return {
      id: product.id,
      name: product.name,
      href: categoryHref(product.category.slug, product.slug),
      categoryLabel: categoryLabel(product.category.slug, product.category.name),
      imageUrl: image?.url ?? null,
      imageAlt: image?.alt || product.name,
    };
  });

  return (
    <section className="overflow-hidden border-y border-tg-border bg-tg-surface py-20 md:py-24">
      <div className="mx-auto max-w-[var(--tg-container)] px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
                Featured products
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl text-tg-primary md:text-4xl">
                Grades buyers shortlist first
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
                A rotating look at edible oils and rice from the live catalogue — open any
                card for specifications and packing options.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[var(--tg-radius-md)] border border-tg-primary px-5 text-sm font-semibold text-tg-primary transition hover:bg-tg-primary hover:text-tg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-secondary"
            >
              View full catalogue
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-tg-surface to-transparent sm:w-16 md:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-tg-surface to-transparent sm:w-16 md:w-24"
          aria-hidden
        />
        <ProductCarouselTrack products={items} />
      </div>

      <p className="mx-auto mt-6 max-w-[var(--tg-container)] px-4 text-center text-xs text-tg-muted md:px-6">
        Hover to pause · click a product for specifications
      </p>
    </section>
  );
}
