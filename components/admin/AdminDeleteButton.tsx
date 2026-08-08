"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type AdminDeleteButtonProps = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  label?: string;
  confirmMessage: string;
  className?: string;
  /** Navigate here after a successful delete (e.g. back to list). */
  hrefAfter?: string;
};

export function AdminDeleteButton({
  action,
  id,
  label = "Delete",
  confirmMessage,
  className = "rounded border border-tg-error/40 px-2 py-1 text-xs font-semibold text-tg-error transition hover:bg-tg-error/5 disabled:opacity-60",
  hrefAfter,
}: AdminDeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <>
      <button
        type="button"
        disabled={pending}
        className={className}
        onClick={() => {
          if (!window.confirm(confirmMessage)) return;
          const formData = new FormData();
          formData.set("id", id);
          startTransition(async () => {
            try {
              await action(formData);
              if (hrefAfter) {
                router.push(hrefAfter);
                return;
              }
              setToast("Deleted");
              router.refresh();
            } catch {
              setToast("Could not delete. Refresh and try again.");
            }
          });
        }}
      >
        {pending ? "Deleting…" : label}
      </button>

      {mounted && toast
        ? createPortal(
            <div
              role="status"
              aria-live="polite"
              className="fixed bottom-5 right-5 z-[80] max-w-sm border border-tg-error/30 bg-white px-4 py-3 text-sm text-tg-error shadow-[0_12px_40px_rgba(6,26,51,0.2)]"
            >
              <p className="font-semibold">
                {toast.startsWith("Could not") ? "Error" : "Deleted"}
              </p>
              <p className="mt-1">{toast}</p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
