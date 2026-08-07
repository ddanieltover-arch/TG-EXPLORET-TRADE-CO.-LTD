"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { moreInfoNav } from "@/lib/nav";

export function MoreInfoMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-medium text-tg-text transition hover:text-tg-primary"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        More Info
        <span aria-hidden className={`text-[0.65rem] transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="More Info"
          className="absolute left-1/2 top-full z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 pt-2"
        >
          {/* pt-2 keeps a hover bridge so the panel does not close while moving from the trigger */}
          <div className="rounded-[var(--tg-radius-md)] border border-tg-border bg-tg-surface p-3 shadow-[0_12px_40px_rgba(10,47,92,0.1)]">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {moreInfoNav.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className="block rounded px-2 py-2 text-sm font-medium text-tg-text transition hover:bg-tg-bg hover:text-tg-primary"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
