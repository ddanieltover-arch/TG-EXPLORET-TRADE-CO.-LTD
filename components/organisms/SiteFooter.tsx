import Image from "next/image";
import Link from "next/link";
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_DISPLAY_NAME,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_MAPS_HREF,
  COMPANY_ORIGIN,
  COMPANY_TAGLINE,
  PRODUCT_CATEGORIES,
} from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-tg-secondary/30 bg-tg-primary text-white">
      <div className="mx-auto grid max-w-[var(--tg-container)] gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_0.85fr_0.85fr] lg:gap-10 lg:px-6 lg:py-16 md:px-6 md:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-start gap-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={120}
              height={87}
              className="mt-0.5 h-10 w-auto brightness-0 invert"
            />
            <div>
              <p className="font-display text-lg leading-snug">{COMPANY_DISPLAY_NAME}</p>
              <p className="mt-1.5 text-[0.65rem] font-semibold tracking-[0.14em] text-tg-secondary uppercase">
                {COMPANY_TAGLINE}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
            Edible cooking oils and rice for international buyers. Quote-led wholesale supply
            from {COMPANY_ORIGIN}.
          </p>
          <Link href="/request-quote" className="tg-btn-secondary mt-6">
            Request a Quote
          </Link>
        </div>

        <div>
          <p
            className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase"
            id="footer-explore-heading"
          >
            Explore
          </p>
          <nav aria-labelledby="footer-explore-heading">
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-white/85 lg:grid-cols-1 xl:grid-cols-2">
              <li>
                <Link
                  href={PRODUCT_CATEGORIES.cookingOil.href}
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  {PRODUCT_CATEGORIES.cookingOil.name}
                </Link>
              </li>
              <li>
                <Link
                  href={PRODUCT_CATEGORIES.rice.href}
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  {PRODUCT_CATEGORIES.rice.name}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/quality-control"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Quality Control
                </Link>
              </li>
              <li>
                <Link
                  href="/ordering-procedure"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Ordering Procedure
                </Link>
              </li>
              <li>
                <Link
                  href="/export-markets"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Export Markets
                </Link>
              </li>
              <li>
                <Link
                  href="/dealer-registration"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Dealer registration
                </Link>
              </li>
              <li>
                <Link
                  href="/manufacturing-process"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Manufacturing Process
                </Link>
              </li>
              <li>
                <Link
                  href="/distributor-registration"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Distributor registration
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase">
            Contact
          </p>
          <p className="mt-4 text-sm text-white/85">
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
            >
              {COMPANY_EMAIL}
            </a>
          </p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-white/65">
            <a
              href={COMPANY_MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
            >
              {COMPANY_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
          </address>
          <p className="mt-3">
            <Link
              href="/contact"
              className="text-sm font-semibold text-white transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
            >
              Contact page →
            </Link>
          </p>
        </div>

        <div>
          <p
            className="text-xs font-semibold tracking-[0.14em] text-tg-secondary uppercase"
            id="footer-legal-heading"
          >
            Legal
          </p>
          <nav aria-labelledby="footer-legal-heading">
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              <li>
                <Link
                  href="/privacy"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="transition-[color] duration-[var(--tg-duration-fast)] ease-[var(--tg-ease-out)] hover:text-tg-secondary"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/55 md:px-6">
        <p>
          © {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
