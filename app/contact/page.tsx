import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/features/inquiries/ContactForm";
import { COMPANY_EMAIL, COMPANY_LEGAL_NAME } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${COMPANY_LEGAL_NAME} for edible cooking oil and rice export enquiries.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Contact sales</h1>
      <p className="mt-4 text-tg-muted">
        Email{" "}
        <a className="font-medium text-tg-primary underline" href={`mailto:${COMPANY_EMAIL}`}>
          {COMPANY_EMAIL}
        </a>{" "}
        or send a message below. For a structured quotation — product, quantity,
        destination, and preferred Incoterms — use{" "}
        <Link href="/request-quote" className="underline">
          Request a Quote
        </Link>
        .
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
