import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteStatus } from "@prisma/client";
import { updateQuoteStatusAction } from "@/actions/adminQuotes";
import { AdminNav } from "@/components/admin/AdminNav";
import { getQuoteRequestById } from "@/services/quoteService";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Admin · Quote detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statuses = Object.values(QuoteStatus);

export default async function AdminQuoteDetailPage({ params }: Props) {
  const { id } = await params;
  const quote = await getQuoteRequestById(id);
  if (!quote) notFound();

  const rows: { label: string; value: string }[] = [
    { label: "Reference", value: quote.referenceCode },
    { label: "Company", value: quote.companyName },
    { label: "Contact", value: quote.contactName },
    { label: "Email", value: quote.email },
    { label: "Phone", value: quote.phone ?? "—" },
    { label: "Country", value: quote.country },
    { label: "Product", value: quote.productLabel ?? quote.product?.name ?? "—" },
    { label: "Quantity", value: quote.quantityText },
    { label: "Destination", value: quote.destination },
    { label: "Incoterm", value: quote.incoterm ?? "—" },
    {
      label: "Target date",
      value: quote.targetDate ? quote.targetDate.toISOString().slice(0, 10) : "—",
    },
    { label: "Created", value: quote.createdAt.toISOString() },
    { label: "Updated", value: quote.updatedAt.toISOString() },
    { label: "Version", value: String(quote.version) },
  ];

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

      <p className="mb-4 text-sm">
        <Link href="/admin/quotes" className="font-semibold text-tg-primary underline">
          ← All quotes
        </Link>
      </p>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="border border-tg-border bg-tg-surface">
          <dl className="divide-y divide-tg-border text-sm">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]">
                <dt className="font-medium text-tg-muted">{r.label}</dt>
                <dd className="text-tg-text break-words">{r.value}</dd>
              </div>
            ))}
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]">
              <dt className="font-medium text-tg-muted">Message</dt>
              <dd className="whitespace-pre-wrap text-tg-text">{quote.message ?? "—"}</dd>
            </div>
          </dl>
        </section>

        <section className="border border-tg-border bg-tg-surface p-6 self-start">
          <h2 className="font-display text-xl text-tg-primary">Update status</h2>
          <form action={updateQuoteStatusAction} className="mt-4 space-y-3">
            <input type="hidden" name="id" value={quote.id} />
            <input type="hidden" name="version" value={quote.version} />
            <label className="block text-sm">
              <span className="font-medium text-tg-muted">Status</span>
              <select
                name="status"
                defaultValue={quote.status}
                className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="min-h-11 w-full rounded-[var(--tg-radius-md)] bg-tg-primary text-sm font-semibold text-white"
            >
              Save status
            </button>
          </form>
          <p className="mt-4 text-xs text-tg-muted">
            Optimistic concurrency: if another editor saved first, refresh and retry.
          </p>
        </section>
      </div>
    </div>
  );
}
