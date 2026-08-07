import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { PRODUCT_CATEGORIES } from "@/lib/brand";
import { getPublishedProduct } from "@/services/productService";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProduct(PRODUCT_CATEGORIES.rice.slug, slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription ?? undefined,
  };
}

export default async function RiceProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedProduct(PRODUCT_CATEGORIES.rice.slug, slug);
  if (!product) notFound();

  const primary = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const orderedImages = primary
    ? [primary, ...product.images.filter((img) => img.id !== primary.id)]
    : product.images;

  return (
    <ProductDetailView
      name={product.name}
      shortDescription={product.shortDescription}
      description={product.description}
      originCountry={product.originCountry}
      categoryLabel="Rice"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: PRODUCT_CATEGORIES.rice.href, label: "Rice" },
        { label: product.name },
      ]}
      images={orderedImages.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
      }))}
      specifications={product.specifications}
      packaging={product.packaging}
    />
  );
}
