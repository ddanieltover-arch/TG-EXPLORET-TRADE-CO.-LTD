import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteDealerAction, updateDealerAction } from "@/actions/adminPartners";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminPartnerEditForm } from "@/components/admin/AdminPartnerEditForm";
import { getDealerApplicationById } from "@/services/partnerService";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Admin · Dealer detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDealerDetailPage({ params }: Props) {
  const { id } = await params;
  const application = await getDealerApplicationById(id);
  if (!application) notFound();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">{application.companyName}</h1>
          <p className="mt-1 text-sm text-tg-muted">Dealer application</p>
        </div>
        <AdminNav current="/admin/dealers" />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/dealers" className="text-sm font-semibold text-tg-primary underline">
          ← All dealers
        </Link>
        <AdminDeleteButton
          action={deleteDealerAction}
          id={application.id}
          confirmMessage={`Delete dealer application for ${application.companyName}? This cannot be undone.`}
          hrefAfter="/admin/dealers"
          className="rounded border border-tg-error/40 px-3 py-2 text-sm font-semibold text-tg-error transition hover:bg-tg-error/5 disabled:opacity-60"
        />
      </div>

      <section className="border border-tg-border bg-tg-surface p-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl text-tg-primary">Edit application</h2>
          <p className="text-xs text-tg-muted">
            Created {application.createdAt.toISOString().slice(0, 10)}
          </p>
        </div>
        <AdminPartnerEditForm
          application={application}
          action={updateDealerAction}
          successMessage={`Dealer ${application.companyName} updated`}
        />
      </section>
    </div>
  );
}
