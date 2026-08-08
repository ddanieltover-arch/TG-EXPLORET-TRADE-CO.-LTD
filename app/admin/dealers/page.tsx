import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationStatus } from "@prisma/client";
import { deleteDealerAction, updateDealerStatusAction } from "@/actions/adminPartners";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { listDealerApplications } from "@/services/partnerService";

export const metadata: Metadata = {
  title: "Admin · Dealers",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statuses = Object.values(ApplicationStatus);

export default async function AdminDealersPage() {
  const apps = await listDealerApplications();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-3xl text-tg-primary">Dealer applications</h1>
        <AdminNav current="/admin/dealers" />
      </div>
      {apps.length === 0 ? (
        <p className="border border-dashed border-tg-border p-8 text-tg-muted">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto border border-tg-border bg-tg-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-tg-border bg-tg-bg text-tg-muted">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Markets</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} className="border-b border-tg-border/70 align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/dealers/${a.id}`}
                      className="font-semibold text-tg-primary underline"
                    >
                      {a.companyName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{a.contactName}</div>
                    <div className="text-xs text-tg-muted">{a.email}</div>
                  </td>
                  <td className="px-4 py-3">{a.country}</td>
                  <td className="px-4 py-3 text-tg-muted">{a.marketsServed ?? "—"}</td>
                  <td className="px-4 py-3">
                    <AdminStatusForm
                      action={updateDealerStatusAction}
                      successMessage={`Dealer status updated for ${a.companyName}`}
                    >
                      <input type="hidden" name="id" value={a.id} />
                      <label htmlFor={`dealer-status-${a.id}`} className="sr-only">
                        Status
                      </label>
                      <select
                        id={`dealer-status-${a.id}`}
                        name="status"
                        defaultValue={a.status}
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
                    {a.createdAt.toISOString().slice(0, 10)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex flex-nowrap items-center gap-2">
                      <Link
                        href={`/admin/dealers/${a.id}`}
                        className="rounded border border-tg-border px-2 py-1 text-xs font-semibold text-tg-primary transition hover:border-tg-primary"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        action={deleteDealerAction}
                        id={a.id}
                        confirmMessage={`Delete dealer application for ${a.companyName}? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-sm">
        <Link href="/dealer-registration" className="text-tg-primary underline">
          Public dealer form
        </Link>
      </p>
    </div>
  );
}
