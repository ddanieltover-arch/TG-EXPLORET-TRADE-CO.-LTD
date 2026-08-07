"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { createQuoteAction, type CreateQuoteState } from "@/actions/quote";
import { COMPANY_EMAIL } from "@/lib/brand";

const initial: CreateQuoteState = { ok: false };

const inputClass =
  "min-h-11 w-full rounded-[var(--tg-radius-md)] border border-tg-border bg-white px-3 text-tg-text transition focus:border-tg-secondary focus:outline-none focus:ring-2 focus:ring-tg-secondary/30";

type QuoteFormProps = {
  /** Prefills Product when opened from a product card / modal (overrides ?product=). */
  productLabel?: string;
};

export function QuoteForm({ productLabel }: QuoteFormProps) {
  const searchParams = useSearchParams();
  const productPrefill =
    productLabel?.trim() || searchParams.get("product")?.trim() || "";
  const [state, formAction, pending] = useActionState(createQuoteAction, initial);

  if (state.ok && state.referenceCode) {
    return (
      <div
        className="border border-tg-secondary/40 bg-white p-6 md:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="h-px w-12 bg-tg-secondary" aria-hidden />
        <h2 className="mt-4 font-display text-2xl text-tg-primary">Request received</h2>
        <p className="mt-3 leading-relaxed text-tg-muted">{state.message}</p>
        <p className="mt-5 border border-tg-border bg-tg-bg px-4 py-3 text-sm">
          Reference:{" "}
          <strong className="font-mono text-tg-primary">{state.referenceCode}</strong>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-tg-muted">
          Our sales team will follow up using the email you provided. For urgent matters,
          contact{" "}
          <a className="font-medium text-tg-primary underline" href={`mailto:${COMPANY_EMAIL}`}>
            {COMPANY_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {state.message && !state.ok ? (
        <p
          className="border border-tg-error/30 bg-tg-error/5 px-4 py-3 text-sm text-tg-error"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      {productPrefill ? (
        <p className="border border-tg-secondary/40 bg-tg-primary/5 px-4 py-3 text-sm text-tg-muted">
          Product prefilled from catalogue:{" "}
          <span className="font-semibold text-tg-primary">{productPrefill}</span>
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

      <fieldset className="space-y-5">
        <legend className="font-display text-lg text-tg-primary">Your company</legend>
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
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-tg-border pt-8">
        <legend className="font-display text-lg text-tg-primary">Requirement</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Product"
            name="productLabel"
            required
            placeholder="e.g. RBDW Sunflower Oil / Jasmine Rice (Thai Hom Mali)"
            defaultValue={productPrefill}
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
            <label htmlFor="incoterm" className="mb-1.5 block text-sm font-medium text-tg-text">
              Preferred Incoterm
            </label>
            <select
              id="incoterm"
              name="incoterm"
              className={inputClass}
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
      </fieldset>

      <div className="border-t border-tg-border pt-8">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-tg-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Packing preferences, certifications required, or other commercial notes"
          className={`${inputClass} py-2`}
        />
      </div>

      <p className="text-xs leading-relaxed text-tg-muted">
        We use your details only to respond to this quotation request. See our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>{" "}
        (draft pending legal review).
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--tg-radius-md)] bg-tg-primary px-6 text-sm font-semibold text-white transition hover:bg-tg-primary-hover disabled:opacity-60 sm:w-auto"
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
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
}) {
  const id = name;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-tg-text">
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
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-tg-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
