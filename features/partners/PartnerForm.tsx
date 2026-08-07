"use client";

import { useActionState } from "react";
import {
  createDealerAction,
  createDistributorAction,
  type PartnerFormState,
} from "@/actions/partner";

const initial: PartnerFormState = { ok: false };

export function PartnerForm({ kind }: { kind: "dealer" | "distributor" }) {
  const action = kind === "dealer" ? createDealerAction : createDistributorAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const label = kind === "dealer" ? "dealer" : "distributor";

  if (state.ok) {
    return (
      <div
        className="rounded-[var(--tg-radius-md)] border border-tg-border bg-tg-surface p-6"
        role="status"
        aria-live="polite"
      >
        <h2 className="font-display text-2xl text-tg-primary">Application received</h2>
        <p className="mt-2 text-tg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.message && !state.ok ? (
        <p className="text-sm text-tg-error" role="alert">
          {state.message}
        </p>
      ) : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company name *" name="companyName" required error={state.fieldErrors?.companyName?.[0]} />
        <Field label="Contact name *" name="contactName" required error={state.fieldErrors?.contactName?.[0]} />
        <Field label="Business email *" name="email" type="email" required error={state.fieldErrors?.email?.[0]} />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Country *" name="country" required error={state.fieldErrors?.country?.[0]} />
        <Field label="Markets served" name="marketsServed" placeholder="Countries / regions" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3 py-2"
          placeholder={`Tell us about your ${label} network`}
        />
      </div>
      <p className="text-xs text-tg-muted">
        We use your details only to review this application. See our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>{" "}
        (draft pending legal review).
      </p>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center rounded-[var(--tg-radius-md)] bg-tg-primary px-6 text-sm font-semibold text-white hover:bg-tg-primary-hover disabled:opacity-60"
      >
        {pending ? "Submitting…" : `Submit ${label} application`}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="min-h-11 w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3"
      />
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-tg-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
