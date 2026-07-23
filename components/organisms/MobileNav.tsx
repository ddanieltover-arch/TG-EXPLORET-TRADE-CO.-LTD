"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/certifications", label: "Certifications" },
  { href: "/export-markets", label: "Export" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

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

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--tg-radius-md)] border border-tg-border text-tg-primary"
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
          className="absolute inset-x-0 top-[var(--tg-header-height)] z-50 border-b border-tg-border bg-tg-surface px-4 py-4 shadow-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav aria-label="Mobile primary">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block min-h-11 rounded px-2 py-3 text-sm font-medium text-tg-text hover:bg-tg-bg hover:text-tg-primary"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
