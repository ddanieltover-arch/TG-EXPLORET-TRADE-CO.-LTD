import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/sections/ScrollReveal";

const INCOTERMS = ["FOB", "CIF", "EXW", "CNF"] as const;

export function MarketsTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-tg-border bg-tg-primary px-4 py-20 text-white md:px-6 md:py-24">
      <Image
        src="/media/operations/container-ship-port.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        loading="lazy"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#061a33]/94 via-[#0a2f5c]/88 to-[#0a2f5c]/72"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 30%, #c9a24a28, transparent 40%), radial-gradient(circle at 10% 80%, #163a7266, transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[var(--tg-container)]">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
            Trade terms
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
            Export terms — destination confirmed in your quote
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            We discuss Incoterms and documentation against the destination you name in the
            quotation request. A public country list will publish when the business confirms
            markets it actively serves — we do not invent destination counts.
          </p>
        </ScrollReveal>
        <ScrollReveal delayMs={40}>
          <ul
            className="mt-10 flex flex-wrap gap-3"
            aria-label="Common Incoterms discussed"
          >
            {INCOTERMS.map((term) => (
              <li
                key={term}
                className="border border-tg-secondary/50 bg-white/5 px-5 py-2.5 font-mono text-sm font-semibold tracking-wide text-tg-secondary"
              >
                {term}
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href="/export-markets"
              className="text-sm font-semibold text-white underline underline-offset-4 decoration-tg-secondary/70 hover:decoration-tg-secondary"
            >
              Export markets &amp; shipment guidance
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
