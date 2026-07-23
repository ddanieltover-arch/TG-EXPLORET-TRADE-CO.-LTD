import type { Metadata } from "next";
import Link from "next/link";
import { QuoteStatus } from "@prisma/client";
import { AdminNav } from "@/components/admin/AdminNav";
import { countNewInquiries } from "@/services/inquiryService";
import { countNewPartnerApplications } from "@/services/partnerService";
import { countQuotesByStatuses } from "@/services/quoteService";
import { prisma } from "@/server/db";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [pendingQuotes, newInquiries, partners, recentQuotes, recentInquiries, productCount] =
    await Promise.all([
      countQuotesByStatuses([QuoteStatus.NEW, QuoteStatus.IN_PROGRESS]),
      countNewInquiries(),
      countNewPartnerApplications(),
      prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.product.count(),
    ]);

  const widgets = [
    { label: "Pending quotations", value: pendingQuotes, href: "/admin/quotes" },
    { label: "New inquiries", value: newInquiries, href: "/admin/inquiries" },
    { label: "New dealer apps", value: partners.dealers, href: "/admin/dealers" },
    {
      label: "New distributor apps",
      value: partners.distributors,
      href: "/admin/distributors",
    },
  ];

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">Dashboard</h1>
        </div>
        <AdminNav current="/admin" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((w) => (
          <Link
            key={w.label}
            href={w.href}
            className="border border-tg-border bg-tg-surface p-5 hover:border-tg-secondary"
          >
            <p className="text-sm text-tg-muted">{w.label}</p>
            <p className="mt-2 font-display text-3xl text-tg-primary">{w.value}</p>
          </Link>
        ))}
      </div>

      <p className="mt-4 text-sm text-tg-muted">
        Catalogue:{" "}
        <Link href="/admin/products" className="font-semibold text-tg-primary underline">
          {productCount} products
        </Link>
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-xl text-tg-primary">Recent quotes</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {recentQuotes.length === 0 ? (
              <li className="text-tg-muted">No quotes yet.</li>
            ) : (
              recentQuotes.map((q) => (
                <li key={q.id} className="border border-tg-border bg-tg-surface px-4 py-3">
                  <Link
                    href={`/admin/quotes/${q.id}`}
                    className="font-mono text-xs font-semibold text-tg-primary underline"
                  >
                    {q.referenceCode}
                  </Link>{" "}
                  — {q.companyName} <span className="text-tg-muted">({q.status})</span>
                </li>
              ))
            )}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-tg-primary">Recent inquiries</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {recentInquiries.length === 0 ? (
              <li className="text-tg-muted">No inquiries yet.</li>
            ) : (
              recentInquiries.map((i) => (
                <li key={i.id} className="border border-tg-border bg-tg-surface px-4 py-3">
                  {i.contactName} — <span className="text-tg-muted">{i.status}</span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
