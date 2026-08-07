"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type CarouselProduct = {
  id: string;
  name: string;
  href: string;
  categoryLabel: string;
  imageUrl: string | null;
  imageAlt: string;
};

type ProductCarouselTrackProps = {
  products: CarouselProduct[];
};

/** Builds a long enough base row, then duplicates it for a seamless -50% loop. */
function buildLoopSets(products: CarouselProduct[], minCards = 8) {
  if (products.length === 0) return { base: [] as CarouselProduct[], loop: [] as CarouselProduct[] };

  const base: CarouselProduct[] = [];
  let i = 0;
  while (base.length < Math.max(minCards, products.length)) {
    const p = products[i % products.length]!;
    base.push({
      ...p,
      id: `${p.id}-base-${base.length}`,
    });
    i += 1;
  }

  const loop = [
    ...base,
    ...base.map((p, index) => ({ ...p, id: `${p.id}-dup-${index}` })),
  ];

  return { base, loop };
}

export function ProductCarouselTrack({ products }: ProductCarouselTrackProps) {
  // Assume reduced motion until measured — avoids a flash of motion for a11y users.
  const [reducedMotion, setReducedMotion] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    setReady(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { base, loop } = useMemo(() => buildLoopSets(products), [products]);
  const animate = ready && !reducedMotion;
  const items = animate ? loop : base;

  return (
    <div
      className={
        animate
          ? "tg-marquee group/marquee overflow-hidden"
          : "tg-marquee tg-marquee--static overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      }
      role="region"
      aria-label="Featured products"
      aria-roledescription="carousel"
    >
      <ul
        className={
          animate
            ? "tg-marquee-track flex w-max gap-4 px-4 py-1 md:gap-5 md:px-6"
            : "flex w-max gap-4 px-4 py-1 md:gap-5 md:px-6"
        }
      >
        {items.map((product) => (
          <li
            key={product.id}
            className="w-[15.5rem] shrink-0 py-3 sm:w-[17.5rem]"
          >
            <Link
              href={product.href}
              className="group relative z-0 flex h-full flex-col overflow-hidden border border-tg-border bg-tg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.04] hover:border-tg-secondary hover:shadow-[0_18px_44px_rgba(10,47,92,0.18)] focus-visible:z-10 focus-visible:-translate-y-2 focus-visible:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-secondary"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-tg-bg">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="280px"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-tg-bg" aria-hidden />
                )}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tg-primary/40 to-transparent"
                  aria-hidden
                />
                <span className="absolute left-3 top-3 border border-tg-secondary/60 bg-tg-primary/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-tg-secondary uppercase backdrop-blur-sm">
                  {product.categoryLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-4 py-4">
                <div className="h-px w-8 bg-tg-secondary" aria-hidden />
                <h3 className="mt-3 font-display text-lg leading-snug text-tg-primary">
                  {product.name}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-tg-primary">
                  View specs
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
