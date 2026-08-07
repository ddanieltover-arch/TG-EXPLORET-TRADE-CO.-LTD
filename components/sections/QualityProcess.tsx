import Image from "next/image";
import { ScrollReveal } from "@/components/sections/ScrollReveal";

const STEPS = [
  {
    title: "Requirement & specs",
    body: "Share product grade, volume, destination, and preferred Incoterms so we can match catalogue options accurately.",
  },
  {
    title: "Grade matching",
    body: "Sales aligns available oil or rice grades and packing formats to your brief — without publishing spot prices.",
  },
  {
    title: "Packing confirmation",
    body: "Retail, commercial, or bulk formats are confirmed per order against what the programme can support.",
  },
  {
    title: "Documentation",
    body: "Commercial documents and any certificates available for the shipment are confirmed with sales before dispatch.",
  },
  {
    title: "Shipment coordination",
    body: "Logistics and Incoterms stay clear through to delivery terms agreed with your team.",
  },
] as const;

const LEAD_STEPS = STEPS.slice(0, 2);
const TRAIL_STEPS = STEPS.slice(2);

/** Featured navy cards: first step + documentation (middle of the bottom row). */
const FEATURED_INDEXES = new Set([0, 3]);

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const featured = FEATURED_INDEXES.has(index);
  const n = String(index + 1).padStart(2, "0");

  return (
    <li
      className={
        featured
          ? "flex h-full flex-col border border-tg-primary bg-tg-primary p-6 text-white transition duration-300 hover:border-tg-secondary md:p-7"
          : "flex h-full flex-col border border-tg-border bg-tg-bg/40 p-6 transition duration-300 hover:border-tg-secondary hover:bg-tg-surface md:p-7"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={
            featured
              ? "flex h-10 w-10 items-center justify-center border border-tg-secondary/70 font-display text-sm text-tg-secondary"
              : "flex h-10 w-10 items-center justify-center border border-tg-secondary/50 bg-tg-surface font-display text-sm text-tg-primary"
          }
          aria-hidden
        >
          {n}
        </span>
        <span
          className={
            featured
              ? "text-[0.65rem] font-semibold tracking-[0.14em] text-tg-secondary/90 uppercase"
              : "text-[0.65rem] font-semibold tracking-[0.14em] text-tg-muted uppercase"
          }
        >
          Step {n}
        </span>
      </div>
      <div className="mt-5 h-px w-10 bg-tg-secondary" aria-hidden />
      <h3
        className={
          featured
            ? "mt-4 font-display text-xl text-white"
            : "mt-4 font-display text-xl text-tg-primary"
        }
      >
        {step.title}
      </h3>
      <p
        className={
          featured
            ? "mt-3 flex-1 text-sm leading-relaxed text-white/80"
            : "mt-3 flex-1 text-sm leading-relaxed text-tg-muted"
        }
      >
        {step.body}
      </p>
    </li>
  );
}

export function QualityProcess() {
  return (
    <section className="border-y border-tg-border bg-tg-surface px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-[var(--tg-container)]">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
                Export workflow
              </p>
              <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
                From enquiry to shipment discussion
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
                A practical path focused on clarity at each step. Certification documents are
                listed publicly only after the business confirms them.
              </p>
            </ScrollReveal>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-5">
              {LEAD_STEPS.map((step, index) => (
                <ScrollReveal key={step.title} delayMs={index * 45}>
                  <StepCard step={step} index={index} />
                </ScrollReveal>
              ))}
            </ol>
          </div>

          <ScrollReveal delayMs={50} className="h-full min-h-[16rem] lg:min-h-[22rem]">
            <div className="relative h-full min-h-[16rem] overflow-hidden border border-tg-border lg:min-h-[22rem]">
              <Image
                src="/media/operations/container-ship-port.png"
                alt="Container ship at port — export logistics from enquiry through shipment"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-tg-primary/45 via-tg-primary/10 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-tg-secondary uppercase">
                  Export logistics
                </p>
                <p className="mt-1 font-display text-lg text-white md:text-xl">
                  Clear terms through to shipment
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ol
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3"
          start={3}
        >
          {TRAIL_STEPS.map((step, index) => (
            <ScrollReveal key={step.title} delayMs={index * 45}>
              <StepCard step={step} index={index + 2} />
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
