"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/actions/login";

const initial: LoginState = { ok: false };

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      {state.message ? (
        <p className="text-sm text-tg-error" role="alert">
          {state.message}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="min-h-11 w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="min-h-11 w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-[var(--tg-radius-md)] bg-tg-primary px-4 text-sm font-semibold text-white hover:bg-tg-primary-hover disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
