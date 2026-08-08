"use client";

import {
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type AdminStatusFormProps = {
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
  className?: string;
  buttonClassName?: string;
  successMessage?: string;
  saveLabel?: string;
};

export function AdminStatusForm({
  action,
  children,
  className = "flex items-center gap-2",
  buttonClassName = "rounded bg-tg-primary px-2 py-1 text-xs font-semibold text-white transition hover:bg-tg-primary-hover disabled:opacity-60",
  successMessage = "Status saved",
  saveLabel = "Save",
}: AdminStatusFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    type: "ok" | "err";
    message: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <>
      <form
        className={className}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          startTransition(async () => {
            try {
              await action(formData);
              setToast({ type: "ok", message: successMessage });
              router.refresh();
            } catch {
              setToast({
                type: "err",
                message: "Could not save. Refresh and try again.",
              });
            }
          });
        }}
      >
        {children}
        <button type="submit" disabled={pending} className={buttonClassName}>
          {pending ? "Saving…" : saveLabel}
        </button>
      </form>

      {mounted && toast
        ? createPortal(
            <div
              role="status"
              aria-live="polite"
              className="fixed bottom-5 right-5 z-[80] max-w-sm border px-4 py-3 text-sm shadow-[0_12px_40px_rgba(6,26,51,0.2)]"
              style={{
                background: toast.type === "ok" ? "#0a2f5c" : "#fff5f5",
                color: toast.type === "ok" ? "#ffffff" : "#b42318",
                borderColor: toast.type === "ok" ? "#c9a24a" : "rgba(180,35,24,0.35)",
              }}
            >
              <p className="font-semibold">
                {toast.type === "ok" ? "Saved" : "Error"}
              </p>
              <p className={toast.type === "ok" ? "mt-1 text-white/85" : "mt-1"}>
                {toast.message}
              </p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
