import type { Metadata } from "next";
import { PartnerForm } from "@/features/partners/PartnerForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dealer Registration",
  description: "Apply to become a dealer partner of TG Export Trade Company Limited.",
  path: "/dealer-registration",
});

export default function DealerRegistrationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Dealer registration</h1>
      <p className="mt-3 text-tg-muted">
        Tell us about your company and markets. Our team will review applications and follow
        up by email. Programme details are confirmed with the business before approval —
        a partner path most commodity catalogues omit.
      </p>
      <div className="mt-10">
        <PartnerForm kind="dealer" />
      </div>
    </div>
  );
}
