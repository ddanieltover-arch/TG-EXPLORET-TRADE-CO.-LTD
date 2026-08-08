import fallbackData from "@/lib/catalogueFallbackData.json";

export type FallbackCatalogueProduct = (typeof fallbackData)[number];

type FallbackImage = FallbackCatalogueProduct["images"][number];

/** Shape compatible with catalogue hub cards + carousel. */
export type CatalogueListProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  originCountry: string;
  status: "PUBLISHED";
  category: { slug: string; name: string };
  images: Array<FallbackImage & { id: string; productId: string }>;
};

function toListProduct(row: FallbackCatalogueProduct): CatalogueListProduct {
  return {
    id: `fallback-${row.categorySlug}-${row.slug}`,
    slug: row.slug,
    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description,
    originCountry: row.originCountry,
    status: "PUBLISHED",
    category: { slug: row.categorySlug, name: row.categoryName },
    images: row.images.map((img, index) => ({
      ...img,
      id: `fallback-img-${row.slug}-${index}`,
      productId: `fallback-${row.categorySlug}-${row.slug}`,
    })),
  };
}

export function getFallbackProductsByCategory(categorySlug: string): CatalogueListProduct[] {
  return fallbackData
    .filter((row) => row.categorySlug === categorySlug)
    .map(toListProduct)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getFallbackProductsForCarousel(limit = 12): CatalogueListProduct[] {
  return fallbackData
    .map(toListProduct)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function getFallbackProduct(
  categorySlug: string,
  productSlug: string,
):
  | (CatalogueListProduct & {
      specifications: Array<{
        id: string;
        productId: string;
        label: string;
        value: string;
        unit: string | null;
        sortOrder: number;
      }>;
      packaging: Array<{
        id: string;
        productId: string;
        name: string;
        sizeLabel: string | null;
        notes: string | null;
        sortOrder: number;
      }>;
    })
  | null {
  const row = fallbackData.find(
    (item) => item.categorySlug === categorySlug && item.slug === productSlug,
  );
  if (!row) return null;

  const base = toListProduct(row);
  return {
    ...base,
    specifications: row.specifications.map((spec, index) => ({
      id: `fallback-spec-${row.slug}-${index}`,
      productId: base.id,
      label: spec.label,
      value: spec.value,
      unit: spec.unit,
      sortOrder: spec.sortOrder,
    })),
    packaging: row.packaging.map((pack, index) => ({
      id: `fallback-pack-${row.slug}-${index}`,
      productId: base.id,
      name: pack.name,
      sizeLabel: pack.sizeLabel,
      notes: pack.notes,
      sortOrder: pack.sortOrder,
    })),
  };
}
