"use client";

import { useActionState } from "react";
import { createInquiryAction, type CreateInquiryState } from "@/actions/inquiry";

const initial: CreateInquiryState = { ok: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(createInquiryAction, initial);

  if (state.ok) {
    return (
      <div
        className="rounded-[var(--tg-radius-md)] border border-tg-border bg-tg-surface p-6"
        role="status"
        aria-live="polite"
      >
        <h2 className="font-display text-2xl text-tg-primary">Message sent</h2>
        <p className="mt-2 text-tg-muted">{state.message}</p>
      </div>
    );
  }

  const messageError = state.fieldErrors?.message?.[0];

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.message && !state.ok ? (
        <p className="text-sm text-tg-error" role="alert">
          {state.message}
        </p>
      ) : null}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Contact name *" name="contactName" required error={state.fieldErrors?.contactName?.[0]} />
        <Field label="Business email *" name="email" type="email" required error={state.fieldErrors?.email?.[0]} />
        <Field label="Company" name="companyName" />
        <Field label="Phone / WhatsApp" name="phone" type="tel" />
        <Field label="Country" name="country" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? "message-error" : undefined}
          className="w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3 py-2"
        />
        {messageError ? (
          <p id="message-error" className="mt-1 text-xs text-tg-error" role="alert">
            {messageError}
          </p>
        ) : null}
      </div>
      <p className="text-xs text-tg-muted">
        We use your details only to respond to this message. See our{" "}
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
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
