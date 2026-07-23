import type { Metadata } from "next";
import { LoginForm } from "@/features/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl?.startsWith("/admin")
    ? params.callbackUrl
    : "/admin";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-display text-3xl text-tg-primary">Admin sign in</h1>
      <p className="mt-2 text-sm text-tg-muted">
        Staff access only. Use the seeded admin credentials from your `.env`.
      </p>
      <div className="mt-8 border border-tg-border bg-tg-surface p-6">
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
