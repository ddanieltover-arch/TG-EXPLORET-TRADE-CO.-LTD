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
    <section className="tg-surface-premium-dark border-t border-tg-secondary/30 bg-[#061a33] px-4 py-16 text-white md:px-6 md:py-20">
      <div className="relative mx-auto flex max-w-[var(--tg-container)] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-xl">
          <div className="tg-gold-rule" aria-hidden />
          <h2 className="mt-5 font-display text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 leading-relaxed text-white/75">{description}</p>
        </div>
        <Link href={href} className="tg-btn-secondary min-h-12 shrink-0 px-7">
          {label}
        </Link>
      </div>
    </section>
  );
}
