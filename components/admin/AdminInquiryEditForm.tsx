"use client";

import { InquirySource, InquiryStatus } from "@prisma/client";
import { updateInquiryAction } from "@/actions/adminInquiries";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";

type AdminInquiryEditFormProps = {
  inquiry: {
    id: string;
    contactName: string;
    email: string;
    companyName: string | null;
    phone: string | null;
    country: string | null;
    message: string;
    source: InquirySource;
    sourcePath: string | null;
    status: InquiryStatus;
  };
};

const statuses = Object.values(InquiryStatus);
const sources = Object.values(InquirySource);

const fieldClass =
  "mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3 text-sm text-tg-text";

export function AdminInquiryEditForm({ inquiry }: AdminInquiryEditFormProps) {
  return (
    <AdminStatusForm
      action={updateInquiryAction}
      className="space-y-4"
      buttonClassName="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white transition hover:bg-tg-primary-hover disabled:opacity-60"
      saveLabel="Save changes"
      successMessage={`Inquiry for ${inquiry.contactName} updated`}
    >
      <input type="hidden" name="id" value={inquiry.id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Contact name</span>
          <input
            name="contactName"
            required
            defaultValue={inquiry.contactName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Business email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={inquiry.email}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Company name</span>
          <input
            name="companyName"
            defaultValue={inquiry.companyName ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Phone</span>
          <input
            name="phone"
            type="tel"
            defaultValue={inquiry.phone ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Country</span>
          <input name="country" defaultValue={inquiry.country ?? ""} className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Source</span>
          <select name="source" defaultValue={inquiry.source} className={fieldClass}>
            {sources.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-tg-muted">Source path</span>
          <input
            name="sourcePath"
            defaultValue={inquiry.sourcePath ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-tg-muted">Status</span>
          <select name="status" defaultValue={inquiry.status} className={fieldClass}>
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
            required
            rows={5}
            defaultValue={inquiry.message}
            className="mt-1 w-full rounded border border-tg-border bg-white px-3 py-2 text-sm text-tg-text"
          />
        </label>
      </div>
    </AdminStatusForm>
  );
}
