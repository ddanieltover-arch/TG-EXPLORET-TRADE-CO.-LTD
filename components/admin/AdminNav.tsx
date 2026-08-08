import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/dealers", label: "Dealers" },
  { href: "/admin/distributors", label: "Distributors" },
];

export function AdminNav({ current }: { current?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <nav
        aria-label="Admin sections"
        className="inline-flex max-w-full flex-wrap rounded-[var(--tg-radius-md)] border border-tg-border bg-tg-bg/80 p-1"
      >
        {links.map((link) => {
          const active = current === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "rounded-[calc(var(--tg-radius-md)-2px)] bg-tg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm"
                  : "rounded-[calc(var(--tg-radius-md)-2px)] px-3.5 py-2 text-sm font-medium text-tg-muted transition hover:bg-white hover:text-tg-primary"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <AdminSignOutButton />
    </div>
  );
}
