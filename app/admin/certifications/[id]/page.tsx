import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublishStatus } from "@prisma/client";
import {
  deleteCertificationAction,
  updateCertificationAction,
} from "@/actions/adminCertifications";
import { AdminNav } from "@/components/admin/AdminNav";
import { getCertificationAdmin } from "@/services/certificationService";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Admin · Edit certification",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCertificationEditPage({ params }: Props) {
  const { id } = await params;
  const cert = await getCertificationAdmin(id);
  if (!cert) notFound();

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">{cert.name}</h1>
        </div>
        <AdminNav current="/admin/certifications" />
      </div>

      <p className="mb-4 text-sm">
        <Link href="/admin/certifications" className="font-semibold text-tg-primary underline">
          ← All certifications
        </Link>
      </p>

      <section className="border border-tg-border bg-tg-surface p-6">
        <form action={updateCertificationAction} className="grid gap-3 md:grid-cols-2">
          <input type="hidden" name="id" value={cert.id} />
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Name</span>
            <input
              name="name"
              required
              defaultValue={cert.name}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Issuer</span>
            <input
              name="issuer"
              defaultValue={cert.issuer ?? ""}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Status</span>
            <select
              name="status"
              defaultValue={cert.status}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            >
              {Object.values(PublishStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Sort order</span>
            <input
              name="sortOrder"
              type="number"
              defaultValue={cert.sortOrder}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Summary</span>
            <textarea
              name="summary"
              rows={4}
              defaultValue={cert.summary ?? ""}
              className="mt-1 w-full rounded border border-tg-border bg-white px-3 py-2"
            />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Document URL</span>
            <input
              name="documentUrl"
              type="url"
              defaultValue={cert.documentUrl ?? ""}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              className="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </form>
        <form action={deleteCertificationAction} className="mt-6 border-t border-tg-border pt-4">
          <input type="hidden" name="id" value={cert.id} />
          <button type="submit" className="text-sm font-semibold text-red-800 underline">
            Delete certification
          </button>
        </form>
      </section>
    </div>
  );
}
