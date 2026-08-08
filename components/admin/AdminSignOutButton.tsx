"use client";

import { useState } from "react";
import { signOutAction } from "@/actions/adminAuth";

export function AdminSignOutButton() {
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      aria-busy={pending}
      className="rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3.5 py-2 text-sm font-medium text-tg-muted transition hover:border-tg-secondary hover:text-tg-primary disabled:opacity-60"
      onClick={() => {
        if (pending) return;
        setPending(true);
        void (async () => {
          try {
            await signOutAction();
            // Full document load so login renders with a cleared session cookie.
            window.location.assign("/admin/login");
          } catch {
            setPending(false);
            window.alert("Could not sign out. Please try again.");
          }
        })();
      }}
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
