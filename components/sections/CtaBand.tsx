import Link from "next/link";

type CtaBandProps = {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
};

export function CtaBand({
  title = "Ready to specify your requirement?",
  description = "Share product, volume, and destination — our sales team will respond with next steps. Spot prices are not published on this site.",
  href = "/request-quote",
  label = "Request a Quote",
}: CtaBandProps) {
  return (
    <section className="border-t border-tg-secondary/30 bg-[#061a33] px-4 py-16 text-white md:px-6 md:py-20">
      <div className="mx-auto flex max-w-[var(--tg-container)] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-xl">
          <div className="h-px w-14 bg-tg-secondary" aria-hidden />
          <h2 className="mt-5 font-display text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 leading-relaxed text-white/75">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-12 shrink-0 items-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-7 text-sm font-semibold text-tg-text transition duration-300 hover:bg-tg-secondary/90"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
