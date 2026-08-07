import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/organisms/MobileNav";
import { MoreInfoMenu } from "@/components/organisms/MoreInfoMenu";
import {
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_TAGLINE,
} from "@/lib/brand";

const navLinkClass =
  "text-sm font-medium text-tg-text transition hover:text-tg-primary";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-tg-border bg-tg-surface/95 backdrop-blur-md supports-[backdrop-filter]:bg-tg-surface/85">
      <div className="hidden border-b border-tg-border/80 bg-tg-primary text-white md:block">
        <div className="mx-auto flex h-9 max-w-[var(--tg-container)] items-center justify-between gap-4 px-4 text-xs md:px-6">
          <p className="font-semibold tracking-[0.14em] text-tg-secondary uppercase">
            {COMPANY_TAGLINE}
          </p>
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="text-white/85 transition hover:text-tg-secondary"
          >
            {COMPANY_EMAIL}
          </a>
        </div>
      </div>

      <div className="relative mx-auto flex h-[var(--tg-header-height)] max-w-[var(--tg-container)] items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label={`${COMPANY_LEGAL_NAME} — home`}
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={512}
            height={373}
            priority
            className="h-9 w-auto shrink-0 md:h-10"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-base tracking-tight text-tg-primary sm:text-lg md:text-xl">
              {COMPANY_SHORT_NAME}
            </span>
            <span className="mt-0.5 hidden text-[0.6rem] font-semibold tracking-[0.14em] text-tg-secondary uppercase sm:block">
              {COMPANY_TAGLINE}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <Link href="/products" className={navLinkClass}>
            Products
          </Link>
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
          <MoreInfoMenu />
          <Link href="/contact" className={navLinkClass}>
            Contact
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/request-quote"
            className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-primary px-3 text-sm font-semibold text-white transition hover:bg-tg-primary-hover sm:px-5"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request a Quote</span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
