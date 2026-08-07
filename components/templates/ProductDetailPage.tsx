import Image from "next/image";
import Link from "next/link";
import { StickyQuoteCTA } from "@/components/sections/StickyQuoteCTA";

export type ProductDetailData = {
  name: string;
  shortDescription: string | null;
  description: string | null;
  originCountry: string;
  images: {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
  }[];
  specifications: {
    id: string;
    label: string;
    value: string;
    unit: string | null;
  }[];
  packaging: {
    id: string;
    name: string;
    sizeLabel: string | null;
    notes: string | null;
  }[];
};

type ProductDetailPageProps = {
  product: ProductDetailData;
  categoryName: string;
  categoryHref: string;
  categoryLabel: string;
};

export function ProductDetailPage({
  product,
  categoryName,
  categoryHref,
  categoryLabel,
}: ProductDetailPageProps) {
  const primary = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const quoteHref = `/request-quote?product=${encodeURIComponent(product.name)}`;

  return (
    <>
      <div className="border-b border-tg-border bg-tg-surface">
        <div className="mx-auto max-w-[var(--tg-container)] px-4 py-6 md:px-6">
          <nav className="text-sm text-tg-muted" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-tg-primary hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-tg-primary hover:underline">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={categoryHref} className="hover:text-tg-primary hover:underline">
                  {categoryName}
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
        </div>
      </div>

      <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 pb-32 md:px-6 md:py-14 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            {primary ? (
              <div className="relative aspect-[4/3] overflow-hidden border border-tg-border bg-tg-bg">
                <Image
                  src={primary.url}
                  alt={primary.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-tg-primary/30 to-transparent"
                  aria-hidden
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
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              {categoryLabel}
            </p>
            <div className="mt-3 h-px w-12 bg-tg-secondary" aria-hidden />
            <h1 className="mt-4 font-display text-3xl text-tg-primary md:text-4xl">
              {product.name}
            </h1>
            {product.shortDescription ? (
              <p className="mt-4 text-lg leading-relaxed text-tg-muted">
                {product.shortDescription}
              </p>
            ) : null}
            {product.description ? (
              <p className="mt-4 whitespace-pre-line leading-relaxed text-tg-text">
                {product.description}
              </p>
            ) : null}
            <p className="mt-5 text-sm text-tg-muted">
              Origin: <span className="font-medium text-tg-text">{product.originCountry}</span>
            </p>

            <div className="mt-8 border border-tg-secondary/40 bg-tg-primary p-6 text-white md:p-8">
              <p className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
                Commercial enquiry
              </p>
              <p className="mt-3 font-display text-xl">Request a quotation</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Share volume and destination for a sales response. We do not publish spot
                prices on this site.
              </p>
              <Link
                href={quoteHref}
                className="mt-5 inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-6 text-sm font-semibold text-tg-text transition hover:bg-tg-secondary/90"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {product.specifications.length > 0 ? (
          <section className="mt-16 border-t border-tg-border pt-12">
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Specifications
            </p>
            <h2 className="mt-2 font-display text-2xl text-tg-primary md:text-3xl">
              Technical parameters
            </h2>
            <div className="mt-6 overflow-x-auto border border-tg-border bg-white">
              <table className="min-w-full text-left text-sm">
                <caption className="sr-only">Product specifications</caption>
                <thead className="border-b border-tg-border bg-tg-bg text-tg-muted">
                  <tr>
                    <th className="px-5 py-3.5 font-medium">Parameter</th>
                    <th className="px-5 py-3.5 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr
                      key={spec.id}
                      className={index % 2 === 0 ? "bg-tg-surface" : "bg-white"}
                    >
                      <th scope="row" className="px-5 py-3.5 font-medium text-tg-primary">
                        {spec.label}
                      </th>
                      <td className="px-5 py-3.5 font-mono text-xs text-tg-text md:text-sm">
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
          <section className="mt-12">
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Packing
            </p>
            <h2 className="mt-2 font-display text-2xl text-tg-primary md:text-3xl">
              Packaging options
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {product.packaging.map((pack) => (
                <li
                  key={pack.id}
                  className="border border-tg-border bg-tg-surface px-5 py-4 text-sm"
                >
                  <span className="font-medium text-tg-primary">{pack.name}</span>
                  {pack.sizeLabel ? (
                    <span className="text-tg-muted"> — {pack.sizeLabel}</span>
                  ) : null}
                  {pack.notes ? (
                    <p className="mt-1 text-tg-muted">({pack.notes})</p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-tg-muted">
              Exact MOQ and container loads are confirmed at quotation.
            </p>
          </section>
        ) : null}
      </div>

      <StickyQuoteCTA
        productLabel={product.name}
        hint={`Request a quote for ${product.name}.`}
      />
    </>
  );
}
