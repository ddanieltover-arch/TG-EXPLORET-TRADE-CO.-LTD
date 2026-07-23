import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPublishedProductsByCategory } from "@/services/productService";

export const metadata: Metadata = pageMetadata({
  title: "Sugar",
  description:
    "Thai refined and industrial sugar grades from TG Exploret Trade — request a quote for commercial terms.",
  path: "/products/sugar",
});
export const revalidate = 60;

export default async function SugarHubPage() {
  const products = await getPublishedProductsByCategory("sugar");

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Sugar</h1>
      <p className="mt-3 max-w-2xl text-tg-muted">
        Spec-first sugar pages for wholesale and industrial buyers.
      </p>
      <ul className="mt-10 space-y-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-tg-border bg-tg-surface px-5 py-4"
          >
            <div>
              <Link
                href={`/products/sugar/${product.slug}`}
                className="font-medium text-tg-primary hover:underline"
              >
                {product.name}
              </Link>
              {product.shortDescription ? (
                <p className="mt-1 text-sm text-tg-muted">{product.shortDescription}</p>
              ) : null}
            </div>
            <Link
              href={`/request-quote?product=${encodeURIComponent(product.name)}`}
              className="text-sm font-semibold text-tg-primary underline"
            >
              Request quote
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
