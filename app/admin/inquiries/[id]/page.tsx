import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteInquiryAction } from "@/actions/adminInquiries";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminInquiryEditForm } from "@/components/admin/AdminInquiryEditForm";
import { AdminNav } from "@/components/admin/AdminNav";
import { getInquiryById } from "@/services/inquiryService";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Admin · Inquiry detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInquiryDetailPage({ params }: Props) {
  const { id } = await params;
  const inquiry = await getInquiryById(id);
  if (!inquiry) notFound();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">{inquiry.contactName}</h1>
          <p className="mt-1 text-sm text-tg-muted">{inquiry.email}</p>
        </div>
        <AdminNav current="/admin/inquiries" />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/inquiries" className="text-sm font-semibold text-tg-primary underline">
          ← All inquiries
        </Link>
        <AdminDeleteButton
          action={deleteInquiryAction}
          id={inquiry.id}
          confirmMessage={`Delete inquiry from ${inquiry.contactName}? This cannot be undone.`}
          hrefAfter="/admin/inquiries"
          className="rounded border border-tg-error/40 px-3 py-2 text-sm font-semibold text-tg-error transition hover:bg-tg-error/5 disabled:opacity-60"
        />
      </div>

      <section className="border border-tg-border bg-tg-surface p-6">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl text-tg-primary">Edit inquiry</h2>
          <p className="text-xs text-tg-muted">
            Created {inquiry.createdAt.toISOString().slice(0, 10)} · {inquiry.source}
          </p>
        </div>
        <AdminInquiryEditForm inquiry={inquiry} />
      </section>
    </div>
  );
}
