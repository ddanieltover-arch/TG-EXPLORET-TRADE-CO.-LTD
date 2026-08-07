"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { COMPANY_TAGLINE } from "@/lib/brand";
import { moreInfoNav } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const panelId = useId();
  const moreId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "block min-h-11 rounded-[var(--tg-radius-md)] px-2 py-3 text-sm font-medium text-tg-text hover:bg-tg-bg hover:text-tg-primary";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--tg-radius-md)] border border-tg-border text-tg-primary transition hover:border-tg-secondary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="text-lg font-bold">
          {open ? "×" : "☰"}
        </span>
      </button>
      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full z-50 border-b border-tg-border bg-tg-surface px-4 py-5 shadow-[0_12px_40px_rgba(10,47,92,0.12)]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <p className="mb-3 text-[0.65rem] font-semibold tracking-[0.14em] text-tg-secondary uppercase">
            {COMPANY_TAGLINE}
          </p>
          <nav aria-label="Mobile primary">
            <ul className="space-y-1">
              <li>
                <Link href="/products" className={linkClass} onClick={() => setOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass} onClick={() => setOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between rounded-[var(--tg-radius-md)] px-2 py-3 text-left text-sm font-medium text-tg-text hover:bg-tg-bg hover:text-tg-primary"
                  aria-expanded={moreOpen}
                  aria-controls={moreId}
                  onClick={() => setMoreOpen((v) => !v)}
                >
                  More Info
                  <span
                    aria-hidden
                    className={`text-[0.65rem] transition-transform ${moreOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>
                {moreOpen ? (
                  <ul id={moreId} className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 px-1 pb-2">
                    {moreInfoNav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={linkClass} onClick={() => setOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
              <li>
                <Link href="/contact" className={linkClass} onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            href="/request-quote"
            className="mt-4 flex min-h-11 items-center justify-center rounded-[var(--tg-radius-md)] bg-tg-primary text-sm font-semibold text-white hover:bg-tg-primary-hover"
            onClick={() => setOpen(false)}
          >
            Request a Quote
          </Link>
        </div>
      ) : null}
    </div>
  );
}
