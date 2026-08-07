import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/sections/ScrollReveal";

const FORMATS = [
  {
    title: "Edible cooking oils",
    image: "/media/operations/oil-bottling-line.png",
    imageAlt: "Automated filling line for refined cooking oil bottles",
    items: [
      "Retail bottles (typically 0.5–5 L)",
      "Jerry cans / drums (confirm at quotation)",
      "Flexitank / bulk (confirm at quotation)",
    ],
  },
  {
    title: "Rice",
    image: "/media/operations/rice-bulk-qc-warehouse.png",
    imageAlt: "Bulk rice bags prepared and inspected for export packing",
    items: [
      "Retail bags (typically 1–5 kg)",
      "Commercial bags (typically 25–50 kg)",
      "Programme-specific formats confirmed with sales",
    ],
  },
] as const;

export function PackagingTeaser() {
  return (
    <section className="mx-auto max-w-[var(--tg-container)] px-4 py-20 md:px-6 md:py-24">
      <ScrollReveal>
        <p className="text-xs font-semibold tracking-[0.16em] text-tg-secondary uppercase">
          Packing
        </p>
        <h2 className="mt-3 font-display text-3xl text-tg-primary md:text-4xl">
          Packaging discussed at quotation
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-tg-muted">
          Catalogue pages list formats we commonly discuss. Exact sizes, private-label
          options, and minimum order quantities are confirmed with sales for each shipment.
        </p>
      </ScrollReveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {FORMATS.map((block, index) => (
          <ScrollReveal key={block.title} delayMs={index * 60}>
            <div className="h-full overflow-hidden border border-tg-border bg-tg-surface">
              <div className="relative aspect-[16/10] bg-tg-bg">
                <Image
                  src={block.image}
                  alt={block.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-tg-border p-8 md:p-10">
                <div className="h-px w-10 bg-tg-secondary" aria-hidden />
                <h3 className="mt-4 font-display text-xl text-tg-primary">{block.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-tg-muted">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tg-secondary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal>
        <p className="mt-10">
          <Link
            href="/request-quote"
            className="text-sm font-semibold text-tg-primary underline underline-offset-4"
          >
            Request packing options with your quote
          </Link>
        </p>
      </ScrollReveal>
    </section>
  );
}
