import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-tg-primary text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #c4a35a55, transparent 40%), radial-gradient(circle at 80% 60%, #145c4588, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[var(--tg-container)] flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
          <p className="text-sm font-semibold tracking-wide text-tg-secondary">
            TG EXPLORET TRADE CO., LTD
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            Thai sugar and rice, prepared for international trade
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
          Two staples. Export focus.
        </h2>
        <p className="mt-3 max-w-2xl text-tg-muted">
          Our catalogue concentrates on sugar and rice — so buyers can evaluate grades,
          packaging, and suitability without unrelated commodity noise.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/products/sugar"
            className="border border-tg-border bg-tg-surface p-8 transition hover:border-tg-secondary"
          >
            <h3 className="font-display text-2xl text-tg-primary">Sugar</h3>
            <p className="mt-2 text-sm text-tg-muted">
              Spec-first grades for industrial and wholesale buyers.
            </p>
          </Link>
          <Link
            href="/products/rice"
            className="border border-tg-border bg-tg-surface p-8 transition hover:border-tg-secondary"
          >
            <h3 className="font-display text-2xl text-tg-primary">Rice</h3>
            <p className="mt-2 text-sm text-tg-muted">
              Thai varieties presented with parameters buyers actually use.
            </p>
          </Link>
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
