import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublishStatus } from "@prisma/client";
import {
  addPackagingAction,
  addProductImageUrlAction,
  addSpecificationAction,
  deletePackagingAction,
  deleteProductImageAction,
  deleteSpecificationAction,
  setPrimaryImageAction,
  updateProductAction,
  uploadProductImageAction,
} from "@/actions/adminProducts";
import { AdminNav } from "@/components/admin/AdminNav";
import { isSupabaseStorageConfigured } from "@/lib/media";
import { getProductAdmin, listCategories } from "@/services/adminProductService";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Admin · Edit product",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProductEditPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductAdmin(id), listCategories()]);
  if (!product) notFound();

  const storageReady = isSupabaseStorageConfigured();
  const publicHref = `/products/${product.category.slug}/${product.slug}`;

  return (
    <div className="mx-auto max-w-[var(--tg-container)] px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-tg-muted">Admin</p>
          <h1 className="font-display text-3xl text-tg-primary">{product.name}</h1>
          <p className="mt-1 text-sm text-tg-muted">
            Public:{" "}
            {product.status === PublishStatus.PUBLISHED ? (
              <Link href={publicHref} className="underline">
                {publicHref}
              </Link>
            ) : (
              <span>not published</span>
            )}
          </p>
        </div>
        <AdminNav current="/admin/products" />
      </div>

      <section className="border border-tg-border bg-tg-surface p-6">
        <h2 className="font-display text-xl text-tg-primary">Core fields</h2>
        <form action={updateProductAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <input type="hidden" name="id" value={product.id} />
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Category</span>
            <select
              name="categoryId"
              defaultValue={product.categoryId}
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
              defaultValue={product.status}
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
              defaultValue={product.name}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Slug</span>
            <input
              name="slug"
              defaultValue={product.slug}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3 font-mono text-xs"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-tg-muted">Origin</span>
            <input
              name="originCountry"
              defaultValue={product.originCountry}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Short description</span>
            <input
              name="shortDescription"
              defaultValue={product.shortDescription ?? ""}
              className="mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3"
            />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium text-tg-muted">Description</span>
            <textarea
              name="description"
              rows={5}
              defaultValue={product.description ?? ""}
              className="mt-1 w-full rounded border border-tg-border bg-white px-3 py-2"
            />
          </label>
          <div>
            <button
              type="submit"
              className="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white"
            >
              Save product
            </button>
          </div>
        </form>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="border border-tg-border bg-tg-surface p-6">
          <h2 className="font-display text-xl text-tg-primary">Specifications</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {product.specifications.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-tg-border/60 py-2"
              >
                <span>
                  <strong>{s.label}</strong>: {s.value}
                  {s.unit ? ` ${s.unit}` : ""}
                </span>
                <form action={deleteSpecificationAction}>
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="id" value={s.id} />
                  <button type="submit" className="text-xs font-semibold text-red-800 underline">
                    Remove
                  </button>
                </form>
              </li>
            ))}
          </ul>
          <form action={addSpecificationAction} className="mt-4 grid gap-2">
            <input type="hidden" name="productId" value={product.id} />
            <input
              name="label"
              required
              placeholder="Label"
              className="min-h-10 rounded border border-tg-border px-3 text-sm"
            />
            <div className="flex gap-2">
              <input
                name="value"
                required
                placeholder="Value"
                className="min-h-10 flex-1 rounded border border-tg-border px-3 text-sm"
              />
              <input
                name="unit"
                placeholder="Unit"
                className="min-h-10 w-24 rounded border border-tg-border px-3 text-sm"
              />
            </div>
            <button
              type="submit"
              className="min-h-10 rounded bg-tg-primary px-3 text-sm font-semibold text-white"
            >
              Add specification
            </button>
          </form>
        </section>

        <section className="border border-tg-border bg-tg-surface p-6">
          <h2 className="font-display text-xl text-tg-primary">Packaging</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {product.packaging.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-tg-border/60 py-2"
              >
                <span>
                  {p.name}
                  {p.sizeLabel ? ` — ${p.sizeLabel}` : ""}
                </span>
                <form action={deletePackagingAction}>
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="id" value={p.id} />
                  <button type="submit" className="text-xs font-semibold text-red-800 underline">
                    Remove
                  </button>
                </form>
              </li>
            ))}
          </ul>
          <form action={addPackagingAction} className="mt-4 grid gap-2">
            <input type="hidden" name="productId" value={product.id} />
            <input
              name="name"
              required
              placeholder="Name"
              className="min-h-10 rounded border border-tg-border px-3 text-sm"
            />
            <input
              name="sizeLabel"
              placeholder="Size label"
              className="min-h-10 rounded border border-tg-border px-3 text-sm"
            />
            <button
              type="submit"
              className="min-h-10 rounded bg-tg-primary px-3 text-sm font-semibold text-white"
            >
              Add packaging
            </button>
          </form>
        </section>
      </div>

      <section className="mt-8 border border-tg-border bg-tg-surface p-6">
        <h2 className="font-display text-xl text-tg-primary">Images</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.images.map((img) => (
            <li key={img.id} className="border border-tg-border p-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-tg-bg">
                <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="240px" />
              </div>
              <p className="mt-2 text-xs text-tg-muted">{img.alt}</p>
              {img.isPrimary ? (
                <p className="text-xs font-semibold text-tg-secondary">Primary</p>
              ) : (
                <form action={setPrimaryImageAction} className="mt-1">
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="imageId" value={img.id} />
                  <button type="submit" className="text-xs font-semibold underline">
                    Set primary
                  </button>
                </form>
              )}
              <form action={deleteProductImageAction} className="mt-2">
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="id" value={img.id} />
                <button type="submit" className="text-xs font-semibold text-red-800 underline">
                  Remove
                </button>
              </form>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form action={addProductImageUrlAction} className="grid gap-2">
            <h3 className="text-sm font-semibold text-tg-primary">Attach by URL</h3>
            <input type="hidden" name="productId" value={product.id} />
            <input
              name="url"
              required
              type="url"
              placeholder="https://…"
              className="min-h-10 rounded border border-tg-border px-3 text-sm"
            />
            <input
              name="alt"
              required
              placeholder="Alt text"
              className="min-h-10 rounded border border-tg-border px-3 text-sm"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPrimary" /> Primary
            </label>
            <button
              type="submit"
              className="min-h-10 rounded bg-tg-primary px-3 text-sm font-semibold text-white"
            >
              Attach URL
            </button>
          </form>

          <form action={uploadProductImageAction} className="grid gap-2">
            <h3 className="text-sm font-semibold text-tg-primary">Upload to Supabase Storage</h3>
            {!storageReady ? (
              <p className="text-sm text-tg-muted">
                Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (and create a public
                bucket, default `product-images`) to enable uploads. URL attach works without them.
              </p>
            ) : (
              <>
                <input type="hidden" name="productId" value={product.id} />
                <input
                  name="file"
                  type="file"
                  accept="image/*"
                  required
                  className="text-sm"
                />
                <input
                  name="alt"
                  required
                  placeholder="Alt text"
                  className="min-h-10 rounded border border-tg-border px-3 text-sm"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isPrimary" /> Primary
                </label>
                <button
                  type="submit"
                  className="min-h-10 rounded bg-tg-primary px-3 text-sm font-semibold text-white"
                >
                  Upload
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
