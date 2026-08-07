import Image from "next/image";
import Link from "next/link";
import { COMPANY_LEGAL_NAME, COMPANY_ORIGIN } from "@/lib/brand";
import { ScrollReveal } from "@/components/sections/ScrollReveal";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <div className="relative aspect-[4/3] overflow-hidden bg-tg-bg">
            <Image
              src="/media/operations/tg-basmati-warehouse.png"
              alt="TG Export Trade rice packing prepared for wholesale and export programmes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
            <div
              className="absolute bottom-0 left-0 h-1 w-24 bg-tg-secondary"
              aria-hidden
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delayMs={60}>
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            About us
          </p>
          <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
            {COMPANY_ORIGIN}-based partner for oils and rice export
          </h2>
          <p className="mt-5 leading-relaxed text-tg-muted">
            {COMPANY_LEGAL_NAME} supplies edible cooking oils and rice to wholesale and
            export buyers who need clear grade information, practical packaging options, and
            coordinated shipment discussions. Established in 2018, we keep a dual-core focus
            — refined and specialty oils alongside rice programmes — without diluting the
            catalogue with unrelated commodities.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-11 items-center border-b border-tg-secondary pb-0.5 text-sm font-semibold text-tg-primary transition hover:border-tg-primary"
          >
            Read our company profile
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
