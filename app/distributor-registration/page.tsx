import type { Metadata } from "next";
import { PartnerForm } from "@/features/partners/PartnerForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Distributor Registration",
  description: "Apply to become a distributor partner of TG Export Trade Company Limited.",
  path: "/distributor-registration",
});

export default function DistributorRegistrationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Distributor registration</h1>
      <p className="mt-3 text-tg-muted">
        Share your distribution coverage and company details for edible cooking oil and rice
        programmes. We will review and respond by email.
      </p>
      <div className="mt-10">
        <PartnerForm kind="distributor" />
      </div>
    </div>
  );
}
