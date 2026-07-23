import Link from "next/link";
import { MobileNav } from "@/components/organisms/MobileNav";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/certifications", label: "Certifications" },
  { href: "/export-markets", label: "Export" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-tg-border bg-tg-surface/95">
      <div className="relative mx-auto flex h-[var(--tg-header-height)] max-w-[var(--tg-container)] items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="font-display text-lg tracking-tight text-tg-primary md:text-xl">
          TG EXPLORET TRADE CO., LTD
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-tg-text hover:text-tg-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/request-quote"
            className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-primary px-3 text-sm font-semibold text-white hover:bg-tg-primary-hover sm:px-4"
          >
            Request Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
