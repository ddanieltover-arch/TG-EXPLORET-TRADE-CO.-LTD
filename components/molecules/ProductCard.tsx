import Image from "next/image";
import Link from "next/link";
import { QuoteRequestButton } from "@/features/quotes/QuoteRequestModal";

type ProductCardProps = {
  name: string;
  href: string;
  shortDescription?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  /** Optional catalogue label (e.g. Rice) */
  categoryLabel?: string;
};

export function ProductCard({
  name,
  href,
  shortDescription,
  imageUrl,
  imageAlt,
  categoryLabel,
}: ProductCardProps) {
  return (
    <li className="tg-card-interactive group flex flex-col overflow-hidden border border-tg-border bg-tg-surface">
      <Link href={href} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-tg-bg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || name}
              fill
              className="tg-img-zoom object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-tg-bg" aria-hidden />
          )}
          <div
            className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-tg-primary/35 to-transparent"
            aria-hidden
          />
          {categoryLabel ? (
            <span className="absolute left-3 top-3 border border-tg-secondary/60 bg-tg-primary/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-tg-secondary uppercase backdrop-blur-sm">
              {categoryLabel}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col px-5 py-5">
          <div className="h-px w-8 bg-tg-secondary" aria-hidden />
          <h2 className="mt-3 font-display text-lg leading-snug text-tg-primary md:text-xl">
            {name}
          </h2>
          {shortDescription ? (
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-tg-muted">
              {shortDescription}
            </p>
          ) : (
            <span className="flex-1" aria-hidden />
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tg-primary">
            View specifications
            <span className="tg-link-arrow" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
      <div className="mt-auto border-t border-tg-border bg-tg-bg/40 px-5 py-3.5">
        <QuoteRequestButton productLabel={name} />
      </div>
    </li>
  );
}
