"use client";

import {
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { QuoteForm } from "@/features/quotes/QuoteForm";

type QuoteRequestModalProps = {
  open: boolean;
  onClose: () => void;
  productLabel?: string;
};

export function QuoteRequestModal({
  open,
  onClose,
  productLabel,
}: QuoteRequestModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-tg-primary/55 backdrop-blur-[2px]"
        aria-label="Close quote request"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92vh,52rem)] w-full max-w-3xl flex-col overflow-hidden rounded-t-[var(--tg-radius-md)] border border-tg-border bg-tg-surface shadow-[0_24px_80px_rgba(6,26,51,0.35)] sm:rounded-[var(--tg-radius-md)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-tg-border px-5 py-4 md:px-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
              Quotation
            </p>
            <h2 id={titleId} className="mt-1 font-display text-2xl text-tg-primary md:text-3xl">
              Request a quote
            </h2>
            {productLabel ? (
              <p className="mt-1 text-sm text-tg-muted">{productLabel}</p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--tg-radius-md)] border border-tg-border text-tg-primary transition hover:border-tg-secondary hover:bg-tg-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-secondary"
            aria-label="Close"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 md:px-6 md:py-6">
          <Suspense
            fallback={
              <p className="text-sm text-tg-muted" role="status">
                Loading quotation form…
              </p>
            }
          >
            <QuoteForm key={productLabel || "quote"} productLabel={productLabel} />
          </Suspense>
        </div>
      </div>
    </div>,
    document.body,
  );
}

type QuoteRequestButtonProps = {
  productLabel: string;
  className?: string;
  children?: ReactNode;
};

/** Opens the RFQ modal with the given product prefilled. */
export function QuoteRequestButton({
  productLabel,
  className,
  children = "Request quote",
}: QuoteRequestButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex min-h-11 w-full items-center justify-center rounded-[var(--tg-radius-md)] bg-tg-primary px-4 text-sm font-semibold text-white transition hover:bg-tg-secondary hover:text-tg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-secondary"
        }
      >
        {children}
      </button>
      <QuoteRequestModal
        open={open}
        onClose={() => setOpen(false)}
        productLabel={productLabel}
      />
    </>
  );
}
