import Image from "next/image";
import Link from "next/link";
import { StickyQuoteCTA } from "@/components/sections/StickyQuoteCTA";
import { QuoteRequestButton } from "@/features/quotes/QuoteRequestModal";

type BreadcrumbItem = { href?: string; label: string };

type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

type ProductSpec = {
  id: string;
  label: string;
  value: string;
  unit?: string | null;
};

type ProductPack = {
  id: string;
  name: string;
  sizeLabel?: string | null;
  notes?: string | null;
};

type ProductDetailViewProps = {
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  originCountry: string;
  categoryLabel: string;
  breadcrumbs: BreadcrumbItem[];
  images: ProductImage[];
  specifications: ProductSpec[];
  packaging: ProductPack[];
};

export function ProductDetailView({
  name,
  shortDescription,
  description,
  originCountry,
  categoryLabel,
  breadcrumbs,
  images,
  specifications,
  packaging,
}: ProductDetailViewProps) {
  const primary = images[0];
  const gallery = images.slice(1);

  return (
    <>
      <div className="mx-auto max-w-[var(--tg-container)] px-4 py-12 pb-32 md:px-6 md:py-16 md:pb-32">
        <nav className="text-sm text-tg-muted" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            {breadcrumbs.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-tg-primary hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-tg-text" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
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
                <span className="absolute left-4 top-4 border border-tg-secondary/60 bg-tg-primary/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-tg-secondary uppercase backdrop-blur-sm">
                  {categoryLabel}
                </span>
              </div>
            ) : (
              <div className="aspect-[4/3] border border-tg-border bg-tg-bg" aria-hidden />
            )}
            {gallery.length > 0 ? (
              <ul className="mt-3 grid grid-cols-4 gap-2">
                {gallery.map((img) => (
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
              Export grade
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight text-tg-primary md:text-4xl lg:text-[2.75rem]">
              {name}
            </h1>
            <div className="mt-4 h-px w-14 bg-tg-secondary" aria-hidden />
            {shortDescription ? (
              <p className="mt-5 text-lg leading-relaxed text-tg-muted">{shortDescription}</p>
            ) : null}
            {description ? (
              <p className="mt-4 whitespace-pre-line leading-relaxed text-tg-text">
                {description}
              </p>
            ) : null}
            <dl className="mt-6 grid gap-3 border border-tg-border bg-tg-surface p-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold tracking-[0.12em] text-tg-secondary uppercase">
                  Origin
                </dt>
                <dd className="mt-1 text-sm font-medium text-tg-primary">{originCountry}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.12em] text-tg-secondary uppercase">
                  Commercial terms
                </dt>
                <dd className="mt-1 text-sm text-tg-muted">Confirmed at quotation</dd>
              </div>
            </dl>

            <div className="mt-6 border border-tg-secondary/35 bg-tg-primary p-6 text-white">
              <p className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
                Request commercial terms
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Share volume, destination, and preferred Incoterms for a sales response. Spot
                prices are not published on this site.
              </p>
              <QuoteRequestButton
                productLabel={name}
                className="mt-5 inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-5 text-sm font-semibold text-tg-text transition hover:bg-tg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request a Quote
              </QuoteRequestButton>
            </div>
          </div>
        </div>

        {specifications.length > 0 ? (
          <section className="mt-16">
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Technical data
            </p>
            <h2 className="mt-3 font-display text-2xl text-tg-primary md:text-3xl">
              Specifications
            </h2>
            <div className="mt-4 h-px w-12 bg-tg-secondary" aria-hidden />
            <div className="mt-6 overflow-x-auto border border-tg-border">
              <table className="min-w-full text-left text-sm">
                <caption className="sr-only">Product specifications for {name}</caption>
                <thead className="bg-tg-primary text-white">
                  <tr>
                    <th className="px-4 py-3.5 font-medium">Parameter</th>
                    <th className="px-4 py-3.5 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr
                      key={spec.id}
                      className={
                        index % 2 === 0
                          ? "border-t border-tg-border bg-tg-surface"
                          : "border-t border-tg-border bg-white"
                      }
                    >
                      <th scope="row" className="px-4 py-3.5 font-medium text-tg-primary">
                        {spec.label}
                      </th>
                      <td className="px-4 py-3.5 font-mono text-xs text-tg-text md:text-sm">
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

        {packaging.length > 0 ? (
          <section className="mt-12">
            <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
              Packing
            </p>
            <h2 className="mt-3 font-display text-2xl text-tg-primary md:text-3xl">
              Packaging options
            </h2>
            <div className="mt-4 h-px w-12 bg-tg-secondary" aria-hidden />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {packaging.map((pack) => (
                <li
                  key={pack.id}
                  className="border border-tg-border bg-tg-surface px-5 py-4"
                >
                  <p className="font-display text-lg text-tg-primary">{pack.name}</p>
                  {pack.sizeLabel ? (
                    <p className="mt-1 text-sm text-tg-muted">{pack.sizeLabel}</p>
                  ) : null}
                  {pack.notes ? (
                    <p className="mt-2 text-xs leading-relaxed text-tg-muted">{pack.notes}</p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-tg-muted">
              Exact sizes and MOQ are confirmed with sales for each shipment.
            </p>
          </section>
        ) : null}
      </div>
      <StickyQuoteCTA
        productLabel={name}
        hint={`Request a quote for ${name}.`}
      />
    </>
  );
}
