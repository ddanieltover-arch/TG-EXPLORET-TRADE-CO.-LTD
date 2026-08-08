"use client";

import { ApplicationStatus } from "@prisma/client";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";

type PartnerFields = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  country: string;
  marketsServed: string | null;
  message: string | null;
  status: ApplicationStatus;
};

type AdminPartnerEditFormProps = {
  application: PartnerFields;
  action: (formData: FormData) => Promise<void>;
  successMessage: string;
};

const statuses = Object.values(ApplicationStatus);

const fieldClass =
  "mt-1 w-full min-h-10 rounded border border-tg-border bg-white px-3 text-sm text-tg-text";

export function AdminPartnerEditForm({
  application,
  action,
  successMessage,
}: AdminPartnerEditFormProps) {
  return (
    <AdminStatusForm
      action={action}
      className="space-y-4"
      buttonClassName="min-h-11 rounded-[var(--tg-radius-md)] bg-tg-primary px-5 text-sm font-semibold text-white transition hover:bg-tg-primary-hover disabled:opacity-60"
      saveLabel="Save changes"
      successMessage={successMessage}
    >
      <input type="hidden" name="id" value={application.id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Company name</span>
          <input
            name="companyName"
            required
            defaultValue={application.companyName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Contact name</span>
          <input
            name="contactName"
            required
            defaultValue={application.contactName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Business email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={application.email}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Phone</span>
          <input
            name="phone"
            type="tel"
            defaultValue={application.phone ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Country</span>
          <input
            name="country"
            required
            defaultValue={application.country}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-tg-muted">Markets served</span>
          <input
            name="marketsServed"
            defaultValue={application.marketsServed ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-tg-muted">Status</span>
          <select name="status" defaultValue={application.status} className={fieldClass}>
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
            defaultValue={application.message ?? ""}
            className="mt-1 w-full rounded border border-tg-border bg-white px-3 py-2 text-sm text-tg-text"
          />
        </label>
      </div>
    </AdminStatusForm>
  );
}
