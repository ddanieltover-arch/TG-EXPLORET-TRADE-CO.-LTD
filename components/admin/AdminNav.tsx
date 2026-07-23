import Link from "next/link";
import { signOut } from "@/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/dealers", label: "Dealers" },
  { href: "/admin/distributors", label: "Distributors" },
];

export function AdminNav({ current }: { current?: string }) {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={
            current === l.href
              ? "font-semibold text-tg-secondary underline"
              : "font-semibold text-tg-primary underline"
          }
        >
          {l.label}
        </Link>
      ))}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/login" });
        }}
      >
        <button type="submit" className="font-semibold text-tg-muted underline">
          Sign out
        </button>
      </form>
    </div>
  );
}
