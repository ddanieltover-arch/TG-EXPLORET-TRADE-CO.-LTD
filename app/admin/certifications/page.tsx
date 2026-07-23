import type { Metadata } from "next";
import Link from "next/link";
import { PublishStatus } from "@prisma/client";
import { createCertificationAction } from "@/actions/adminCertifications";
import { AdminNav } from "@/components/admin/AdminNav";
import { listCertificationsAdmin } from "@/services/certificationService";

export const metadata: Metadata = {
  title: "Admin · Certifications",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const certs = await listCertificationsAdmin();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">Certifications</h1>
        </div>
        <AdminNav current="/admin/certifications" />
      </div>

      <p className="mb-6 text-sm text-tg-muted">
        Only publish certificates the business has confirmed. Unverified badges must stay draft.
      </p>

      <section className="mb-10 border border-tg-border bg-tg-surface p-6">
        <h2 className="font-display text-xl text-tg-primary">Add certification</h2>
        <form action={createCertificationAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Name</span>
            <input
              name="name"
              required
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Issuer</span>
            <input
              name="issuer"
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Status</span>
            <select
              name="status"
              defaultValue={PublishStatus.DRAFT}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            >
              {Object.values(PublishStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Summary</span>
            <textarea
              name="summary"
              rows={3}
              className="mt-1 w-full rounded border border-tg-border bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Document URL (optional)</span>
            <input
              name="documentUrl"
              type="url"
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <div>
            <button
              type="submit"
              className="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white"
            >
              Create
            </button>
          </div>
        </form>
      </section>

      {certs.length === 0 ? (
        <p className="border border-dashed border-tg-border p-8 text-tg-muted">
          No certifications yet.
        </p>
      ) : (
        <div className="overflow-x-auto border border-tg-border bg-tg-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-tg-border bg-tg-bg text-tg-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Issuer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((c) => (
                <tr key={c.id} className="border-b border-tg-border/70">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-tg-muted">{c.issuer ?? "—"}</td>
                  <td className="px-4 py-3">{c.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/certifications/${c.id}`}
                      className="font-semibold text-tg-primary underline"
                    >
                      Open
                    </Link>
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
