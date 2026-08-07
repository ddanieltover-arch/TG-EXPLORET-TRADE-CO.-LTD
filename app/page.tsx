import type { Metadata } from "next";
import {
  AboutTeaser,
  CategoryShowcase,
  CtaBand,
  HeroSection,
  MarketsTeaser,
  PackagingTeaser,
  ProductCarousel,
  QualityProcess,
  ScrollReveal,
  TrustPrinciples,
} from "@/components/sections";
import { COMPANY_LEGAL_NAME } from "@/lib/brand";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Edible Oils & Rice Export",
    description:
      "TG Export Trade Company Limited — Thailand exporter of edible cooking oils and rice. Clear specifications, structured quotation, and export-ready support for international buyers.",
    path: "/",
  }),
  title: {
    absolute: `${COMPANY_LEGAL_NAME} | Edible Oils & Rice Export`,
  },
  alternates: {
    canonical: siteUrl(),
  },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <ProductCarousel />
      <TrustPrinciples />
      <AboutTeaser />
      <QualityProcess />
      <PackagingTeaser />
      <MarketsTeaser />
      <ScrollReveal>
        <CtaBand />
      </ScrollReveal>
    </>
  );
}
