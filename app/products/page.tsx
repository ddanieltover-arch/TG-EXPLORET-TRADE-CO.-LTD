import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Explore Thai sugar and rice products from TG Exploret Trade — specifications and packaging confirmed at quotation.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Products</h1>
      <p className="mt-3 max-w-2xl text-tg-muted">
        Explore our sugar and rice catalogue. Detailed grade pages expand as product data
        is confirmed with the business.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href="/products/sugar"
          className="border border-tg-border bg-tg-surface p-8 hover:border-tg-secondary"
        >
          <h2 className="font-display text-2xl text-tg-primary">Sugar</h2>
          <p className="mt-2 text-sm text-tg-muted">ICUMSA grades and refined cane sugars.</p>
        </Link>
        <Link
          href="/products/rice"
          className="border border-tg-border bg-tg-surface p-8 hover:border-tg-secondary"
        >
          <h2 className="font-display text-2xl text-tg-primary">Rice</h2>
          <p className="mt-2 text-sm text-tg-muted">
            Jasmine, white, parboiled, glutinous, and broken classes.
          </p>
        </Link>
      </div>
    </div>
  );
}
