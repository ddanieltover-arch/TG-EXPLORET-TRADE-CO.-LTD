import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteForm } from "@/features/quotes/QuoteForm";
import { COMPANY_EMAIL, COMPANY_SHORT_NAME, COMPANY_TAGLINE } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Request an export quotation for edible cooking oil or rice. Include product, quantity, destination, and preferred Incoterms. Spot prices are not published.",
  path: "/request-quote",
});

const PREP_ITEMS = [
  "Product grade or SKU of interest",
  "Approximate quantity / packing preference",
  "Destination country or port",
  "Preferred Incoterm (FOB, CIF, EXW, CNF)",
] as const;

export default function RequestQuotePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #c9a24a40, transparent 42%), radial-gradient(circle at 90% 70%, #163a7288, transparent 48%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            {COMPANY_TAGLINE}
          </p>
          <div className="mt-5 h-px w-14 bg-tg-secondary" aria-hidden />
          <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
            Request a quotation
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Share commercial details so {COMPANY_SHORT_NAME} can respond with availability and
            next steps. Fields marked * help us avoid follow-up delays. We do not publish spot
            prices on this website.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[var(--tg-container)] gap-10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-12 md:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 border border-tg-border bg-tg-surface p-6 md:p-8 lg:p-10">
          <div className="h-px w-12 bg-tg-secondary" aria-hidden />
          <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
            Quotation form
          </p>
          <h2 className="mt-2 font-display text-2xl text-tg-primary">Commercial details</h2>
          <p className="mt-2 text-sm leading-relaxed text-tg-muted">
            Submitting this form starts a sales conversation — it is not an online checkout and
            does not display pricing.
          </p>
          <div className="mt-8">
            <Suspense
              fallback={
                <p className="text-sm text-tg-muted" role="status">
                  Loading quotation form…
                </p>
              }
            >
              <QuoteForm />
            </Suspense>
          </div>
        </div>

        <aside className="space-y-6 md:pt-2">
          <div className="border border-tg-border bg-white p-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
              Before you submit
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-tg-muted">
              {PREP_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tg-secondary"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-tg-border bg-tg-primary p-6 text-white">
            <p className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
              Need help?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Prefer email, or have documents to share? Contact sales directly.
            </p>
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="mt-4 inline-flex text-sm font-semibold text-tg-secondary underline underline-offset-4"
            >
              {COMPANY_EMAIL}
            </a>
            <p className="mt-6 text-sm">
              <Link
                href="/export-markets"
                className="font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-tg-secondary"
              >
                Export markets &amp; Incoterms
              </Link>
            </p>
            <p className="mt-2 text-sm">
              <Link
                href="/products"
                className="font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-tg-secondary"
              >
                Browse catalogue
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
