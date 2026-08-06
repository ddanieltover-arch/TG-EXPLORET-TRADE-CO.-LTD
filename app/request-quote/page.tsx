import type { Metadata } from "next";
import { QuoteForm } from "@/features/quotes/QuoteForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Request an export quotation for edible cooking oil or rice. Include product, quantity, destination, and preferred Incoterms.",
  path: "/request-quote",
});

export default function RequestQuotePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Request a quotation</h1>
      <p className="mt-3 text-tg-muted">
        Provide commercial details so we can respond with relevant availability and next
        steps. Fields marked * help us avoid follow-up delays. We do not publish spot
        prices on this website.
      </p>
      <div className="mt-10">
        <QuoteForm />
      </div>
    </div>
  );
}
