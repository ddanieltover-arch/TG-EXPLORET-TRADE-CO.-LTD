import Link from "next/link";
import {
  COMPANY_DISPLAY_NAME,
  COMPANY_EMAIL,
  COMPANY_ORIGIN,
  PRODUCT_CATEGORIES,
} from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-tg-primary text-white">
      <div className="mx-auto grid max-w-[var(--tg-container)] gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-lg">{COMPANY_DISPLAY_NAME}</p>
          <p className="mt-2 text-sm text-white/80">
            Edible cooking oils and rice for international buyers.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-tg-secondary" id="footer-explore-heading">
            Explore
          </p>
          <nav aria-labelledby="footer-explore-heading">
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>
                <Link href={PRODUCT_CATEGORIES.cookingOil.href} className="hover:underline">
                  {PRODUCT_CATEGORIES.cookingOil.name}
                </Link>
              </li>
              <li>
                <Link href={PRODUCT_CATEGORIES.rice.href} className="hover:underline">
                  {PRODUCT_CATEGORIES.rice.name}
                </Link>
              </li>
              <li>
                <Link href="/request-quote" className="hover:underline">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/dealer-registration" className="hover:underline">
                  Dealer registration
                </Link>
              </li>
              <li>
                <Link href="/distributor-registration" className="hover:underline">
                  Distributor registration
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold text-tg-secondary">Contact</p>
          <p className="mt-3 text-sm text-white/85">
            <a href={`mailto:${COMPANY_EMAIL}`} className="hover:underline">
              {COMPANY_EMAIL}
            </a>
          </p>
          <p className="mt-1 text-sm text-white/70">{COMPANY_ORIGIN}</p>
        </div>
      </div>
      <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {COMPANY_DISPLAY_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
