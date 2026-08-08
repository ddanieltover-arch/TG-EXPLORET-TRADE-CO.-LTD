"use client";

import { Incoterm, QuoteStatus } from "@prisma/client";
import { updateQuoteAction } from "@/actions/adminQuotes";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";

type AdminQuoteEditFormProps = {
  quote: {
    id: string;
    version: number;
    referenceCode: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string | null;
    country: string;
    productLabel: string | null;
    quantityText: string;
    destination: string;
    incoterm: Incoterm | null;
    targetDate: Date | string | null;
    message: string | null;
    status: QuoteStatus;
  };
};

const statuses = Object.values(QuoteStatus);
const incoterms = Object.values(Incoterm);

const fieldClass =
  "mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3 text-sm text-tg-text";

export function AdminQuoteEditForm({ quote }: AdminQuoteEditFormProps) {
  const targetDate =
    quote.targetDate instanceof Date
      ? quote.targetDate.toISOString().slice(0, 10)
      : quote.targetDate
        ? String(quote.targetDate).slice(0, 10)
        : "";

  return (
    <AdminStatusForm
      action={updateQuoteAction}
      className="space-y-4"
      buttonClassName="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white transition hover:bg-tg-primary-hover disabled:opacity-60"
      saveLabel="Save changes"
      successMessage={`Quote ${quote.referenceCode} updated`}
    >
      <input type="hidden" name="id" value={quote.id} />
      <input type="hidden" name="version" value={quote.version} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Company name</span>
          <input
            name="companyName"
            required
            defaultValue={quote.companyName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Contact name</span>
          <input
            name="contactName"
            required
            defaultValue={quote.contactName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Business email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={quote.email}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Phone</span>
          <input name="phone" type="tel" defaultValue={quote.phone ?? ""} className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Country</span>
          <input name="country" required defaultValue={quote.country} className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Product</span>
          <input
            name="productLabel"
            required
            defaultValue={quote.productLabel ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Quantity / unit</span>
          <input
            name="quantityText"
            required
            defaultValue={quote.quantityText}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Destination</span>
          <input
            name="destination"
            required
            defaultValue={quote.destination}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Incoterm</span>
          <select name="incoterm" defaultValue={quote.incoterm ?? ""} className={fieldClass}>
            <option value="">None</option>
            {incoterms.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Target date</span>
          <input
            name="targetDate"
            type="date"
            defaultValue={targetDate}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-tg-muted">Status</span>
          <select name="status" defaultValue={quote.status} className={fieldClass}>
            {statuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-tg-muted">Message</span>
          <textarea
            name="message"
            rows={4}
            defaultValue={quote.message ?? ""}
            className="mt-1 w-full rounded border border-tg-border bg-white px-3 py-2 text-sm text-tg-text"
          />
        </label>
      </div>
    </AdminStatusForm>
  );
}
