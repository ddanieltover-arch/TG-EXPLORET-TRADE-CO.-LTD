"use client";

import { useActionState } from "react";
import { createQuoteAction, type CreateQuoteState } from "@/actions/quote";

const initial: CreateQuoteState = { ok: false };

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(createQuoteAction, initial);

  if (state.ok && state.referenceCode) {
    return (
      <div
        className="rounded-[var(--tg-radius-md)] border border-tg-border bg-tg-surface p-6"
        role="status"
        aria-live="polite"
      >
        <h2 className="font-display text-2xl text-tg-primary">Request received</h2>
        <p className="mt-2 text-tg-muted">{state.message}</p>
        <p className="mt-4 text-sm">
          Reference: <strong className="text-tg-text">{state.referenceCode}</strong>
        </p>
        <p className="mt-2 text-sm text-tg-muted">
          Our sales team will follow up using the email you provided. For urgent matters,
          contact{" "}
          <a className="underline" href="mailto:sales@tgetradecoltd.com">
            sales@tgetradecoltd.com
          </a>
          .
        </p>
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

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Company name"
          name="companyName"
          required
          error={state.fieldErrors?.companyName?.[0]}
        />
        <Field
          label="Contact name"
          name="contactName"
          required
          error={state.fieldErrors?.contactName?.[0]}
        />
        <Field
          label="Business email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={state.fieldErrors?.email?.[0]}
        />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
        <Field
          label="Country"
          name="country"
          required
          error={state.fieldErrors?.country?.[0]}
        />
        <Field
          label="Product"
          name="productLabel"
          required
          placeholder="e.g. ICUMSA 45 / Thai Jasmine Rice"
          error={state.fieldErrors?.productLabel?.[0]}
        />
        <Field
          label="Quantity / unit"
          name="quantityText"
          required
          placeholder="e.g. 1×20ft container / 25 MT"
          error={state.fieldErrors?.quantityText?.[0]}
        />
        <Field
          label="Destination country / port"
          name="destination"
          required
          error={state.fieldErrors?.destination?.[0]}
        />
        <div>
          <label htmlFor="incoterm" className="mb-1.5 block text-sm font-medium">
            Preferred Incoterm
          </label>
          <select
            id="incoterm"
            name="incoterm"
            className="min-h-11 w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3 text-tg-text"
            defaultValue=""
          >
            <option value="">Select (optional)</option>
            <option value="FOB">FOB</option>
            <option value="CIF">CIF</option>
            <option value="EXW">EXW</option>
            <option value="CNF">CNF</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <Field label="Target shipment date" name="targetDate" type="date" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3 py-2 text-tg-text"
        />
      </div>

      <p className="text-xs text-tg-muted">
        We use your details only to respond to this quotation request. See our Privacy
        Policy when published.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-[var(--tg-radius-md)] bg-tg-primary px-6 text-sm font-semibold text-white hover:bg-tg-primary-hover disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Request quotation"}
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
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const id = name;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-11 w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3 text-tg-text"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-tg-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
