import type { Metadata } from "next";
import { PublishStatus } from "@prisma/client";
import { updateSitePageAction } from "@/actions/adminPages";
import { AdminNav } from "@/components/admin/AdminNav";
import { getSitePageAdmin, listSitePagesAdmin } from "@/services/sitePageService";

export const metadata: Metadata = {
  title: "Admin · Pages",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const editable = [
  { slug: "about", label: "About", publicPath: "/about" },
  { slug: "export-markets", label: "Export markets", publicPath: "/export-markets" },
] as const;

export default async function AdminPagesPage() {
  await listSitePagesAdmin();

  const pages = await Promise.all(
    editable.map(async (meta) => ({
      ...meta,
      page: await getSitePageAdmin(meta.slug),
    })),
  );

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">Marketing pages</h1>
        </div>
        <AdminNav current="/admin/pages" />
      </div>

      <div className="space-y-10">
        {pages.map(({ slug, label, publicPath, page }) => (
          <section key={slug} className="border border-tg-border bg-tg-surface p-6">
            <h2 className="font-display text-xl text-tg-primary">{label}</h2>
            <p className="mt-1 text-sm text-tg-muted">
              Public path: {publicPath}
              {page ? ` · current status ${page.status}` : " · not seeded yet"}
            </p>
            <form action={updateSitePageAction} className="mt-4 grid gap-3">
              <input type="hidden" name="slug" value={slug} />
              <label className="text-sm">
                <span className="font-medium text-tg-muted">Title</span>
                <input
                  name="title"
                  required
                  defaultValue={page?.title ?? label}
                  className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
                />
              </label>
              <label className="text-sm">
                <span className="font-medium text-tg-muted">Body (paragraphs; blank line = break)</span>
                <textarea
                  name="body"
                  required
                  rows={8}
                  defaultValue={page?.body ?? ""}
                  className="mt-1 w-full rounded border border-tg-border bg-white px-3 py-2"
                />
              </label>
              <label className="text-sm max-w-xs">
                <span className="font-medium text-tg-muted">Status</span>
                <select
                  name="status"
                  defaultValue={page?.status ?? PublishStatus.PUBLISHED}
                  className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
                >
                  {Object.values(PublishStatus).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <button
                  type="submit"
                  className="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white"
                >
                  Save {label}
                </button>
              </div>
            </form>
          </section>
        ))}
      </div>
    </div>
  );
}
