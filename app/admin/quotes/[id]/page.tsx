import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteQuoteAction } from "@/actions/adminQuotes";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminQuoteEditForm } from "@/components/admin/AdminQuoteEditForm";
import { getQuoteRequestById } from "@/services/quoteService";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Admin · Quote detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminQuoteDetailPage({ params }: Props) {
  const { id } = await params;
  const quote = await getQuoteRequestById(id);
  if (!quote) notFound();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">{quote.referenceCode}</h1>
          <p className="mt-1 text-sm text-tg-muted">{quote.companyName}</p>
        </div>
        <AdminNav current="/admin/quotes" />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/quotes" className="text-sm font-semibold text-tg-primary underline">
          ← All quotes
        </Link>
        <AdminDeleteButton
          action={deleteQuoteAction}
          id={quote.id}
          confirmMessage={`Delete quote ${quote.referenceCode}? This cannot be undone.`}
          hrefAfter="/admin/quotes"
          className="rounded border border-tg-error/40 px-3 py-2 text-sm font-semibold text-tg-error transition hover:bg-tg-error/5 disabled:opacity-60"
        />
      </div>

      <section className="border border-tg-border bg-tg-surface p-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl text-tg-primary">Edit quote</h2>
          <p className="text-xs text-tg-muted">
            Created {quote.createdAt.toISOString().slice(0, 10)} · Version {quote.version}
          </p>
        </div>
        <AdminQuoteEditForm
          quote={{
            id: quote.id,
            version: quote.version,
            referenceCode: quote.referenceCode,
            companyName: quote.companyName,
            contactName: quote.contactName,
            email: quote.email,
            phone: quote.phone,
            country: quote.country,
            productLabel: quote.productLabel ?? quote.product?.name ?? "",
            quantityText: quote.quantityText,
            destination: quote.destination,
            incoterm: quote.incoterm,
            targetDate: quote.targetDate,
            message: quote.message,
            status: quote.status,
          }}
        />
        <p className="mt-4 text-xs text-tg-muted">
          Optimistic concurrency: if another editor saved first, refresh and retry.
        </p>
      </section>
    </div>
  );
}
