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
        className="tg-nav-link inline-flex items-center gap-1 text-sm font-medium text-tg-text hover:text-tg-primary"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        data-active={open ? "true" : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        More Info
        <span
          aria-hidden
          className={`text-[0.65rem] transition-transform duration-[var(--tg-duration-med)] ease-[var(--tg-ease-out)] ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {/* Outer keeps centering transform; inner owns panel motion */}
      <div className="absolute left-1/2 top-full z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 pt-2">
        <div
          id={menuId}
          role="menu"
          aria-label="More Info"
          className={open ? "tg-panel--open" : "tg-panel"}
          aria-hidden={!open}
        >
          <div className="rounded-[var(--tg-radius-md)] border border-tg-border bg-tg-surface p-3 shadow-[0_12px_40px_rgba(10,47,92,0.1)]">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {moreInfoNav.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    tabIndex={open ? 0 : -1}
                    className="block rounded px-2 py-2 text-sm font-medium text-tg-text transition-[background-color,color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:bg-tg-bg hover:text-tg-primary"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
