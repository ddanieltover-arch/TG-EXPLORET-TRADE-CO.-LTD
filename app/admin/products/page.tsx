import type { Metadata } from "next";
import Link from "next/link";
import { PublishStatus } from "@prisma/client";
import { createProductAction } from "@/actions/adminProducts";
import { AdminNav } from "@/components/admin/AdminNav";
import { listAllProductsAdmin, listCategories } from "@/services/adminProductService";

export const metadata: Metadata = {
  title: "Admin · Products",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    listAllProductsAdmin(),
    listCategories(),
  ]);

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">Products</h1>
        </div>
        <AdminNav current="/admin/products" />
      </div>

      <section className="mb-10 border border-tg-border bg-tg-surface p-6">
        <h2 className="font-display text-xl text-tg-primary">Create product</h2>
        <form action={createProductAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Category</span>
            <select
              name="categoryId"
              required
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
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
            <span className="font-medium text-tg-muted">Name</span>
            <input
              name="name"
              required
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Slug (optional)</span>
            <input
              name="slug"
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
              placeholder="auto from name"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Origin</span>
            <input
              name="originCountry"
              defaultValue="Thailand"
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Short description</span>
            <input
              name="shortDescription"
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white"
            >
              Create
            </button>
          </div>
        </form>
      </section>

      {products.length === 0 ? (
        <p className="border border-dashed border-tg-border p-8 text-tg-muted">No products yet.</p>
      ) : (
        <div className="overflow-x-auto border border-tg-border bg-tg-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-tg-border bg-tg-bg text-tg-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Specs / Pack / Images</th>
                <th className="px-4 py-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-tg-border/70">
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="font-mono text-xs text-tg-muted">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3">{p.category.name}</td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3 text-tg-muted">
                    {p._count.specifications} / {p._count.packaging} / {p._count.images}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${p.id}`}
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
