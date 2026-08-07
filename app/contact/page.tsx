import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/features/inquiries/ContactForm";
import {
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_ORIGIN,
  COMPANY_SHORT_NAME,
  PRODUCT_CATEGORIES,
} from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${COMPANY_LEGAL_NAME} for wholesale pricing, availability, and export enquiries on refined cooking oils and rice.`,
  path: "/contact",
});

const channels = [
  {
    title: "Email sales",
    detail: COMPANY_EMAIL,
    note: "Fastest for product questions and volume programmes",
    href: `mailto:${COMPANY_EMAIL}`,
    external: true,
  },
  {
    title: "Request a quote",
    detail: "Structured RFQ form",
    note: "Best when you already know product, volume, and destination",
    href: "/request-quote",
    external: false,
  },
  {
    title: "Origin",
    detail: COMPANY_ORIGIN,
    note: "Export coordination for rice and refined edible cooking oils",
    href: "/about",
    external: false,
  },
] as const;

const nextSteps = [
  {
    step: "1",
    title: "Send your message",
    body: `Your enquiry reaches our sales team at ${COMPANY_EMAIL}.`,
  },
  {
    step: "2",
    title: "Confirmation",
    body: "You receive an automatic confirmation when the message is accepted.",
  },
  {
    step: "3",
    title: "Sales follow-up",
    body: "We respond with availability, clarification questions, or next steps — typically within 1–2 business days.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #c9a24a55, transparent 42%), radial-gradient(circle at 88% 75%, #163a7288, transparent 48%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[var(--tg-container)] gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-end md:px-6 md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Contact {COMPANY_SHORT_NAME}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Let&apos;s talk rice and refined oil supply
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              Reach our team for wholesale pricing discussions, product availability, and export
              logistics on edible cooking oils and rice — not unrelated commodity lines.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-white px-5 text-sm font-semibold text-tg-primary hover:bg-tg-bg"
              >
                Email sales directly
              </a>
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-tg-secondary px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse products
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/15">
            <Image
              src="/media/operations/tg-basmati-warehouse.png"
              alt="TG Export Trade rice packing ready for wholesale export programmes"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-tg-border bg-tg-surface px-4 py-10 md:px-6">
        <div className="mx-auto flex max-w-[var(--tg-container)] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-tg-muted">
            Need help with a grade, packing option, or destination? Our sales team assists with
            product enquiries, quotations, and export coordination for rice and refined cooking oils.
          </p>
          <p className="text-sm font-semibold text-tg-primary">
            Typical response: 1–2 business days
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <p className="text-sm font-semibold tracking-wide text-tg-secondary">Reach our team</p>
        <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
          Pick the channel that fits
        </h2>
        <p className="mt-3 max-w-2xl text-tg-muted">
          For product quotes and volume orders, email or the form below is usually fastest. Use the
          quotation form when you already have commercial details ready.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.title} className="border border-tg-border bg-tg-surface p-6">
              <h3 className="font-display text-xl text-tg-primary">{channel.title}</h3>
              {channel.external ? (
                <a
                  href={channel.href}
                  className="mt-2 block text-sm font-semibold text-tg-primary underline break-all"
                >
                  {channel.detail}
                </a>
              ) : (
                <Link
                  href={channel.href}
                  className="mt-2 block text-sm font-semibold text-tg-primary underline"
                >
                  {channel.detail}
                </Link>
              )}
              <p className="mt-2 text-sm text-tg-muted">{channel.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-tg-border bg-tg-surface px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-[var(--tg-container)] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Send a message</p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
              Tell us what you need
            </h2>
            <p className="mt-3 text-tg-muted">
              Pricing, availability, shipping questions, or a general enquiry about rice and refined
              edible oils. Include destination and approximate volume when you can.
            </p>
            <ol className="mt-8 space-y-5">
              {nextSteps.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tg-primary text-sm font-semibold text-white"
                    aria-hidden
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-tg-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-tg-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 relative aspect-[16/10] overflow-hidden border border-tg-border">
              <Image
                src="/media/operations/rice-bulk-qc-warehouse.png"
                alt="Bulk rice bags prepared and inspected for export shipment discussions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="border border-tg-border bg-tg-bg p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--tg-container)] px-4 py-16 md:px-6 md:py-20">
        <p className="text-sm font-semibold tracking-wide text-tg-secondary">Looking for a grade?</p>
        <h2 className="mt-2 font-display text-3xl text-tg-primary md:text-4xl">
          Explore our dual catalogue
        </h2>
        <p className="mt-3 max-w-2xl text-tg-muted">
          Specs and packing notes sit on each product page. Start there, then request a quote with
          volume and destination.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href={PRODUCT_CATEGORIES.cookingOil.href}
            className="group overflow-hidden border border-tg-border bg-tg-surface transition hover:border-tg-secondary"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/media/operations/cooking-oils-assortment.png"
                alt={PRODUCT_CATEGORIES.cookingOil.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl text-tg-primary">
                {PRODUCT_CATEGORIES.cookingOil.name}
              </h3>
              <p className="mt-2 text-sm text-tg-muted">
                Refined oils for retail, foodservice, and industrial programmes.
              </p>
            </div>
          </Link>
          <Link
            href={PRODUCT_CATEGORIES.rice.href}
            className="group overflow-hidden border border-tg-border bg-tg-surface transition hover:border-tg-secondary"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/media/operations/tg-basmati-warehouse.png"
                alt={PRODUCT_CATEGORIES.rice.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl text-tg-primary">{PRODUCT_CATEGORIES.rice.name}</h3>
              <p className="mt-2 text-sm text-tg-muted">
                Jasmine, white, parboiled, glutinous, basmati, cargo, and specialty grades.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-tg-primary px-4 py-14 text-white md:px-6">
        <div className="mx-auto flex max-w-[var(--tg-container)] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl">Ready for a commercial quotation?</h2>
            <p className="mt-2 max-w-xl text-white/80">
              Share product, quantity, destination, and preferred Incoterms so we can reply with
              usable next steps.
            </p>
          </div>
          <Link
            href="/request-quote"
            className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-5 text-sm font-semibold text-tg-text hover:bg-tg-secondary/90"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
