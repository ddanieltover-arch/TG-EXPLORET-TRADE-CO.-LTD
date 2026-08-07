import Link from "next/link";
import { ScrollReveal } from "@/components/sections/ScrollReveal";

const PRINCIPLES = [
  {
    title: "Spec-led product pages",
    body: "Parameters and packing options sit on each SKU so importers can shortlist before talking to sales.",
  },
  {
    title: "Evidence before claims",
    body: "Certifications appear only when the business confirms the documents. We do not publish unverified badges or empty counters.",
  },
  {
    title: "Export conversation",
    body: "Quotation requests capture volume, destination, and preferred Incoterms so replies start from commercial context.",
  },
] as const;

const ACTIONS = [
  {
    href: "/quality-control",
    label: "Quality control",
    variant: "primary" as const,
  },
  {
    href: "/export-markets",
    label: "Export markets & Incoterms",
    variant: "secondary" as const,
  },
] as const;

export function TrustPrinciples() {
  return (
    <section className="tg-surface-premium border-y border-tg-border bg-tg-bg/60 px-4 py-20 md:px-6 md:py-24">
      <div className="relative mx-auto max-w-[var(--tg-container)]">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            How we work
          </p>
          <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
            Built for commercial evaluation
          </h2>
          <div className="tg-gold-rule mt-4" aria-hidden />
          <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
            We publish what buyers can verify — and leave unconfirmed claims off the public
            site.
          </p>
        </ScrollReveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {PRINCIPLES.map((item, index) => {
            const featured = index === 1;
            return (
              <ScrollReveal key={item.title} delayMs={index * 70}>
                <li
                  className={
                    featured
                      ? "flex h-full flex-col border border-tg-primary bg-tg-primary p-6 text-white transition-[border-color,transform] duration-[var(--tg-duration-med)] ease-[var(--tg-ease-out)] hover:border-tg-secondary md:p-7"
                      : "tg-card-interactive flex h-full flex-col border border-tg-border bg-tg-surface p-6 md:p-7"
                  }
                >
                  <span
                    className="font-display text-2xl text-tg-secondary"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 h-px w-8 bg-tg-secondary" aria-hidden />
                  <h3
                    className={
                      featured
                        ? "mt-4 font-display text-xl text-white"
                        : "mt-4 font-display text-xl text-tg-primary"
                    }
                  >
                    {item.title}
                  </h3>
                  <p
                    className={
                      featured
                        ? "mt-3 flex-1 text-sm leading-relaxed text-white/80"
                        : "mt-3 flex-1 text-sm leading-relaxed text-tg-muted"
                    }
                  >
                    {item.body}
                  </p>
                </li>
              </ScrollReveal>
            );
          })}
        </ul>

        <ScrollReveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "primary"
                    ? "tg-btn-primary hover:bg-tg-secondary hover:text-tg-primary"
                    : "inline-flex min-h-11 items-center justify-center rounded-[var(--tg-radius-md)] border border-tg-primary bg-transparent px-5 text-sm font-semibold text-tg-primary transition-[background-color,color,transform] duration-[var(--tg-duration-med)] ease-[var(--tg-ease-out)] hover:bg-tg-primary hover:text-tg-secondary active:scale-[0.98]"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
