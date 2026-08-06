import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCT_CATEGORIES } from "@/lib/brand";
import { getPublishedProduct } from "@/services/productService";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProduct(PRODUCT_CATEGORIES.cookingOil.slug, slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription ?? undefined,
  };
}

export default async function CookingOilProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedProduct(PRODUCT_CATEGORIES.cookingOil.slug, slug);
  if (!product) notFound();

  const primary = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 md:px-6 md:py-16">
      <nav className="text-sm text-tg-muted" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={PRODUCT_CATEGORIES.cookingOil.href} className="hover:underline">
              {PRODUCT_CATEGORIES.cookingOil.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="text-tg-text" aria-current="page">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {primary ? (
            <div className="relative aspect-[4/3] overflow-hidden border border-tg-border bg-tg-surface">
              <Image
                src={primary.url}
                alt={primary.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          ) : null}
          {product.images.filter((img) => img.id !== primary?.id).length > 0 ? (
            <ul className="mt-3 grid grid-cols-4 gap-2">
              {product.images
                .filter((img) => img.id !== primary?.id)
                .map((img) => (
                  <li
                    key={img.id}
                    className="relative aspect-square overflow-hidden border border-tg-border"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="120px"
                      loading="lazy"
                    />
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
        <div>
          <h1 className="font-display text-4xl text-tg-primary">{product.name}</h1>
          {product.shortDescription ? (
            <p className="mt-3 text-lg text-tg-muted">{product.shortDescription}</p>
          ) : null}
          {product.description ? (
            <p className="mt-4 whitespace-pre-line text-tg-text">{product.description}</p>
          ) : null}
          <p className="mt-4 text-sm text-tg-muted">Origin: {product.originCountry}</p>
          <div className="mt-6 border border-tg-border bg-tg-surface p-6">
            <p className="text-sm font-semibold text-tg-primary">Ready to enquire?</p>
            <p className="mt-2 text-sm text-tg-muted">
              Share volume and destination for a sales response. We do not publish spot
              prices on this site.
            </p>
            <Link
              href={`/request-quote?product=${encodeURIComponent(product.name)}`}
              className="mt-4 inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white hover:bg-tg-primary-hover"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {product.specifications.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-tg-primary">Specifications</h2>
          <div className="mt-4 overflow-x-auto border border-tg-border">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Product specifications</caption>
              <thead className="bg-tg-bg text-tg-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Parameter</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {product.specifications.map((spec) => (
                  <tr key={spec.id} className="border-t border-tg-border">
                    <th scope="row" className="px-4 py-3 font-medium">
                      {spec.label}
                    </th>
                    <td className="px-4 py-3 font-mono text-xs md:text-sm">
                      {spec.value}
                      {spec.unit ? ` ${spec.unit}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {product.packaging.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-tg-primary">Packaging</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-tg-muted">
            {product.packaging.map((pack) => (
              <li key={pack.id}>
                <span className="text-tg-text">{pack.name}</span>
                {pack.sizeLabel ? ` — ${pack.sizeLabel}` : ""}
                {pack.notes ? ` (${pack.notes})` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
