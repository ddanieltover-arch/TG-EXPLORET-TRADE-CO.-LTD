import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  href: string;
  quoteHref: string;
  shortDescription?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export function ProductCard({
  name,
  href,
  quoteHref,
  shortDescription,
  imageUrl,
  imageAlt,
}: ProductCardProps) {
  return (
    <li className="overflow-hidden border border-tg-border bg-tg-surface">
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] bg-tg-bg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || name}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : null}
        </div>
        <div className="px-5 py-4">
          <h2 className="font-medium text-tg-primary group-hover:underline">{name}</h2>
          {shortDescription ? (
            <p className="mt-1 text-sm text-tg-muted">{shortDescription}</p>
          ) : null}
        </div>
      </Link>
      <div className="border-t border-tg-border px-5 py-3">
        <Link
          href={quoteHref}
          className="text-sm font-semibold text-tg-primary underline"
        >
          Request quote
        </Link>
      </div>
    </li>
  );
}
