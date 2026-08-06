import Image from "next/image";
import Link from "next/link";
import { COMPANY_DISPLAY_NAME, PRODUCT_CATEGORIES } from "@/lib/brand";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-tg-primary text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #c9a24a55, transparent 40%), radial-gradient(circle at 80% 60%, #163a7288, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[var(--tg-container)] flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
          <p className="text-sm font-semibold tracking-wide text-tg-secondary">
            {COMPANY_DISPLAY_NAME}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            Edible oils and rice, prepared for international trade
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
            We help importers, distributors, and food manufacturers source consistent
            grades with clear specifications and export-ready support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request-quote"
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-white px-5 text-sm font-semibold text-tg-primary hover:bg-tg-bg"
            >
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-tg-secondary px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-display text-3xl text-tg-primary md:text-4xl">
          Two product lines. Export focus.
        </h2>
        <p className="mt-3 max-w-2xl text-tg-muted">
          Our catalogue concentrates on edible cooking oils and rice — so buyers can
          evaluate grades, packaging, and suitability without unrelated commodity noise.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href={PRODUCT_CATEGORIES.cookingOil.href}
            className="group overflow-hidden border border-tg-border bg-tg-surface transition hover:border-tg-secondary"
          >
            <div className="relative aspect-[16/10] bg-tg-bg">
              <Image
                src="/media/products/oil-sunflower.webp"
                alt={PRODUCT_CATEGORIES.cookingOil.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-tg-primary">
                {PRODUCT_CATEGORIES.cookingOil.name}
              </h3>
              <p className="mt-2 text-sm text-tg-muted">
                Sunflower, corn, soybean, rapeseed/canola, olive, palm, coconut, sesame,
                groundnut, and blended vegetable oils.
              </p>
            </div>
          </Link>
          <Link
            href={PRODUCT_CATEGORIES.rice.href}
            className="group overflow-hidden border border-tg-border bg-tg-surface transition hover:border-tg-secondary"
          >
            <div className="relative aspect-[16/10] bg-tg-bg">
              <Image
                src="/media/products/rice-jasmine.webp"
                alt={PRODUCT_CATEGORIES.rice.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-tg-primary">
                {PRODUCT_CATEGORIES.rice.name}
              </h3>
              <p className="mt-2 text-sm text-tg-muted">
                Jasmine, white, parboiled, glutinous, basmati, cargo, and specialty
                grades.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[var(--tg-container)]">
          <h2 className="font-display text-3xl text-tg-primary md:text-4xl">
            Built for commercial evaluation
          </h2>
          <p className="mt-3 max-w-2xl text-tg-muted">
            We publish what buyers can verify — and we leave unconfirmed claims off the
            public site.
          </p>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            <li>
              <h3 className="font-display text-xl text-tg-primary">Spec-led product pages</h3>
              <p className="mt-2 text-sm text-tg-muted">
                Parameters and packing options sit on each SKU so importers can shortlist
                before talking to sales.
              </p>
            </li>
            <li>
              <h3 className="font-display text-xl text-tg-primary">Evidence before claims</h3>
              <p className="mt-2 text-sm text-tg-muted">
                Certifications appear only when the business confirms the documents. We do
                not ship unverified badges or empty counters.
              </p>
            </li>
            <li>
              <h3 className="font-display text-xl text-tg-primary">Export conversation</h3>
              <p className="mt-2 text-sm text-tg-muted">
                Quotation requests capture volume, destination, and preferred Incoterms so
                replies start from commercial context.
              </p>
            </li>
          </ul>
          <p className="mt-8">
            <Link href="/certifications" className="text-sm font-semibold text-tg-primary underline">
              View certifications policy
            </Link>
            <span className="mx-2 text-tg-muted" aria-hidden>
              ·
            </span>
            <Link href="/export-markets" className="text-sm font-semibold text-tg-primary underline">
              Export markets &amp; Incoterms
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-tg-primary px-4 py-14 text-white md:px-6">
        <div className="mx-auto flex max-w-[var(--tg-container)] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl">Ready to specify your requirement?</h2>
            <p className="mt-2 max-w-xl text-white/80">
              Share product, volume, and destination — our sales team will respond with
              next steps.
            </p>
          </div>
          <Link
            href="/request-quote"
            className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-5 text-sm font-semibold text-tg-text hover:bg-tg-secondary/90"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
