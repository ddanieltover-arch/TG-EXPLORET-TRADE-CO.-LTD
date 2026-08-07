import Image from "next/image";
import Link from "next/link";
import {
  COMPANY_DISPLAY_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_TAGLINE,
} from "@/lib/brand";

export function HeroSection() {
  return (
    <section className="relative min-h-[min(92vh,54rem)] overflow-hidden bg-tg-primary text-white">
      <Image
        src="/media/products/rice-sacks.webp"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#061a33]/95 via-[#0a2f5c]/88 to-[#0a2f5c]/55"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 20%, #c9a24a33, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(92vh,54rem)] max-w-[var(--tg-container)] flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
        <div className="tg-hero-enter flex items-center gap-3">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={160}
            height={116}
            className="h-12 w-auto brightness-0 invert md:h-14"
            priority
          />
          <div>
            <p className="font-display text-lg tracking-tight text-white md:text-xl">
              {COMPANY_SHORT_NAME}
            </p>
            <p className="mt-0.5 text-[0.65rem] font-semibold tracking-[0.18em] text-tg-secondary uppercase sm:text-xs">
              {COMPANY_TAGLINE}
            </p>
          </div>
        </div>

        <div
          className="tg-hero-enter tg-hero-enter-delay-1 mt-8 h-px w-16 origin-left bg-tg-secondary"
          aria-hidden
        />

        <div className="tg-hero-enter tg-hero-enter-delay-2">
          <p className="mt-6 max-w-2xl text-xs font-semibold tracking-[0.14em] text-white/70 uppercase md:text-sm">
            {COMPANY_DISPLAY_NAME}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.12] md:text-5xl lg:text-[3.5rem]">
            Edible oils and rice for international trade
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Thailand-based exporter helping importers and food manufacturers source
            consistent grades — with clear specifications and structured quotation.
          </p>
        </div>

        <div className="tg-hero-enter tg-hero-enter-delay-3 mt-9 flex flex-wrap gap-3">
          <Link
            href="/request-quote"
            className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-6 text-sm font-semibold text-tg-text transition duration-300 hover:bg-tg-secondary/90"
          >
            Request a Quote
          </Link>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-white/35 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-tg-secondary hover:bg-white/10"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
