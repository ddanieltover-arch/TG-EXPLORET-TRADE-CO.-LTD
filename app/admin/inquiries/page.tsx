import type { Metadata } from "next";
import Link from "next/link";
import { InquiryStatus } from "@prisma/client";
import { deleteInquiryAction, updateInquiryStatusAction } from "@/actions/adminInquiries";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { listInquiries } from "@/services/inquiryService";

export const metadata: Metadata = {
  title: "Admin · Inquiries",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statuses = Object.values(InquiryStatus);

export default async function AdminInquiriesPage() {
  const inquiries = await listInquiries();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">Inquiries</h1>
        </div>
        <AdminNav current="/admin/inquiries" />
      </div>

      {inquiries.length === 0 ? (
        <p className="border border-dashed border-tg-border bg-tg-surface p-8 text-tg-muted">
          No inquiries yet.
        </p>
      ) : (
        <div className="overflow-x-auto border border-tg-border bg-tg-surface">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Buyer inquiries</caption>
            <thead className="border-b border-tg-border bg-tg-bg text-tg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => (
                <tr key={item.id} className="border-b border-tg-border/70 align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/inquiries/${item.id}`}
                      className="font-semibold text-tg-primary underline"
                    >
                      {item.contactName}
                    </Link>
                    <div className="text-xs text-tg-muted">{item.email}</div>
                    {item.companyName ? (
                      <div className="text-xs text-tg-muted">{item.companyName}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">{item.source}</td>
                  <td className="max-w-md px-4 py-3 text-tg-muted">{item.message}</td>
                  <td className="px-4 py-3">
                    <AdminStatusForm
                      action={updateInquiryStatusAction}
                      successMessage={`Inquiry status updated for ${item.contactName}`}
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <label htmlFor={`inq-status-${item.id}`} className="sr-only">
                        Status
                      </label>
                      <select
                        id={`inq-status-${item.id}`}
                        name="status"
                        defaultValue={item.status}
                        className="min-h-9 rounded border border-tg-border bg-white px-2 text-xs"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </AdminStatusForm>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-tg-muted">
                    {item.createdAt.toISOString().slice(0, 10)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex flex-nowrap items-center gap-2">
                      <Link
                        href={`/admin/inquiries/${item.id}`}
                        className="rounded border border-tg-border px-2 py-1 text-xs font-semibold text-tg-primary transition hover:border-tg-primary"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        action={deleteInquiryAction}
                        id={item.id}
                        confirmMessage={`Delete inquiry from ${item.contactName}? This cannot be undone.`}
                      />
                    </div>
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
