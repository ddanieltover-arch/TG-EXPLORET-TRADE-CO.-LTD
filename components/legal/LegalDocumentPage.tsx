import Image from "next/image";
import Link from "next/link";
import type { LegalDocument } from "@/lib/legal/content";
import { COMPANY_EMAIL } from "@/lib/brand";

export function LegalDocumentPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <section className="relative overflow-hidden bg-tg-primary text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 25%, #c9a24a55, transparent 42%), radial-gradient(circle at 85% 70%, #163a7288, transparent 48%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[var(--tg-container)] px-4 py-14 md:px-6 md:py-20">
          <p className="text-sm font-semibold tracking-wide text-tg-secondary">Legal &amp; compliance</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
            {doc.title}
          </h1>
          {doc.intro ? (
            <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">{doc.intro}</p>
          ) : (
            <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">{doc.description}</p>
          )}
          <p className="mt-4 text-sm text-white/70">Last updated: {doc.lastUpdated}</p>
        </div>
      </section>

      <article className="mx-auto max-w-[var(--tg-container)] px-4 py-12 md:px-6 md:py-16">
        <aside
          className="border border-tg-border bg-tg-surface px-4 py-3 text-sm text-tg-muted"
          role="note"
        >
          Draft pending legal review. This template is published for transparency and operational
          clarity; counsel must approve before it is treated as final.
        </aside>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            {doc.sections.map((section) => (
              <section key={section.heading} className="mt-10 first:mt-0">
                <h2 className="font-display text-2xl text-tg-primary md:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="mt-3 text-tg-muted whitespace-pre-line">
                    {renderWithEmail(p)}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-tg-muted">
                    {section.bullets.map((item) => (
                      <li key={item.slice(0, 56)}>{renderWithEmail(item)}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold text-tg-secondary">On this site</p>
            <nav className="mt-3 space-y-2 text-sm" aria-label="Legal documents">
              <Link href="/privacy" className="block font-medium text-tg-primary underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block font-medium text-tg-primary underline">
                Terms of Use
              </Link>
              <Link href="/cookies" className="block font-medium text-tg-primary underline">
                Cookie Policy
              </Link>
              <Link href="/contact" className="block font-medium text-tg-primary underline">
                Contact
              </Link>
            </nav>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-tg-border">
              <Image
                src="/media/products/rice-jasmine.webp"
                alt="Thai rice — one of two product lines covered by our commercial website"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
            <p className="mt-3 text-xs text-tg-muted">
              Questions:{" "}
              <a className="underline" href={`mailto:${COMPANY_EMAIL}`}>
                {COMPANY_EMAIL}
              </a>
            </p>
          </aside>
        </div>

        {doc.relatedLinks && doc.relatedLinks.length > 0 ? (
          <section className="mt-16 border-t border-tg-border pt-12">
            <p className="text-sm font-semibold tracking-wide text-tg-secondary">Related</p>
            <h2 className="mt-2 font-display text-3xl text-tg-primary">You may also find helpful</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {doc.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block h-full border border-tg-border bg-tg-surface p-5 transition hover:border-tg-secondary"
                  >
                    <h3 className="font-display text-xl text-tg-primary">{link.title}</h3>
                    <p className="mt-2 text-sm text-tg-muted">{link.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-14 bg-tg-primary px-6 py-10 text-white md:px-10">
          <h2 className="font-display text-2xl md:text-3xl">
            {doc.slug === "privacy" ? "Questions about your data?" : "Need clarification?"}
          </h2>
          <p className="mt-2 max-w-xl text-white/80">
            {doc.slug === "privacy"
              ? "Our team can clarify how we handle information from website visits and commercial enquiries about rice and refined cooking oils."
              : "Contact sales if you have questions about this page or about sourcing rice and refined cooking oils."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-5 text-sm font-semibold text-tg-text hover:bg-tg-secondary/90"
            >
              Contact us
            </Link>
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] border border-white/40 px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              {COMPANY_EMAIL}
            </a>
          </div>
        </section>
      </article>
    </>
  );
}

function renderWithEmail(text: string) {
  if (!text.includes(COMPANY_EMAIL)) return text;
  const [before, after] = text.split(COMPANY_EMAIL);
  return (
    <>
      {before}
      <a className="underline" href={`mailto:${COMPANY_EMAIL}`}>
        {COMPANY_EMAIL}
      </a>
      {after}
    </>
  );
}
