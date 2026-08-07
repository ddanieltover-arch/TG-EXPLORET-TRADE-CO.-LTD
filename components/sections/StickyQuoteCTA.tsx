"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY_SHORT_NAME } from "@/lib/brand";

type StickyQuoteCTAProps = {
  /** Pre-filled product label for /request-quote?product= */
  productLabel?: string;
  /** Short supporting line shown on larger screens */
  hint?: string;
};

/**
 * Bottom sticky quote affordance for catalogue pages.
 * Navy / gold brand bar — hidden on /request-quote.
 */
export function StickyQuoteCTA({
  productLabel,
  hint = "Share volume and destination for a sales response.",
}: StickyQuoteCTAProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/request-quote")) return null;

  const href = productLabel
    ? `/request-quote?product=${encodeURIComponent(productLabel)}`
    : "/request-quote";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 md:p-4"
      role="region"
      aria-label="Request a quote"
    >
      <div className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-4 border border-tg-secondary/40 bg-tg-primary px-4 py-3.5 text-white shadow-[0_12px_40px_rgba(6,26,51,0.35)] md:px-5">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-tg-secondary uppercase">
            {COMPANY_SHORT_NAME}
          </p>
          <p className="mt-0.5 truncate text-sm text-white/85">
            {productLabel ? (
              <>
                Quote for <span className="font-medium text-white">{productLabel}</span>
              </>
            ) : (
              hint
            )}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-[var(--tg-radius-md)] bg-tg-secondary px-5 text-sm font-semibold text-tg-text transition hover:bg-tg-secondary/90 sm:w-auto"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
