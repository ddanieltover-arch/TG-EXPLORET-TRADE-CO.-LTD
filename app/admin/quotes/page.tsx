import type { Metadata } from "next";
import Link from "next/link";
import { QuoteStatus } from "@prisma/client";
import { updateQuoteStatusAction } from "@/actions/adminQuotes";
import { AdminNav } from "@/components/admin/AdminNav";
import { listQuoteRequests } from "@/services/quoteService";

export const metadata: Metadata = {
  title: "Admin · Quotes",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statuses = Object.values(QuoteStatus);

export default async function AdminQuotesPage() {
  const quotes = await listQuoteRequests();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">Quote requests</h1>
        </div>
        <AdminNav current="/admin/quotes" />
      </div>

      {quotes.length === 0 ? (
        <p className="border border-dashed border-tg-border bg-tg-surface p-8 text-tg-muted">
          No quotation requests yet.
        </p>
      ) : (
        <div className="overflow-x-auto border border-tg-border bg-tg-surface">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Quotation requests</caption>
            <thead className="border-b border-tg-border bg-tg-bg text-tg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Destination</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-b border-tg-border/70 align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/quotes/${q.id}`}
                      className="font-mono text-xs font-semibold text-tg-primary underline"
                    >
                      {q.referenceCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{q.companyName}</div>
                    <div className="text-xs text-tg-muted">{q.email}</div>
                  </td>
                  <td className="px-4 py-3">{q.productLabel ?? "—"}</td>
                  <td className="px-4 py-3">{q.destination}</td>
                  <td className="px-4 py-3">
                    <form action={updateQuoteStatusAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={q.id} />
                      <input type="hidden" name="version" value={q.version} />
                      <label htmlFor={`status-${q.id}`} className="sr-only">
                        Status for {q.referenceCode}
                      </label>
                      <select
                        id={`status-${q.id}`}
                        name="status"
                        defaultValue={q.status}
                        className="min-h-9 rounded border border-tg-border bg-white px-2 text-xs"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded bg-tg-primary px-2 py-1 text-xs font-semibold text-white"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-tg-muted">
                    {q.createdAt.toISOString().slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
