import { InquirySource, InquiryStatus } from "@prisma/client";
import { withDbRetry } from "@/lib/dbRetry";
import type { InquiryInput } from "@/lib/validation/inquiry";
import { prisma } from "@/server/db";
import {
  sendInquiryConfirmation,
  sendInquirySalesAlert,
} from "@/services/emailService";

export async function createInquiry(
  input: InquiryInput,
  source: InquirySource = InquirySource.CONTACT,
  sourcePath?: string,
) {
  if (input.website) {
    throw new Error("Rejected");
  }

  const emailPayload = {
    to: input.email,
    contactName: input.contactName,
    companyName: input.companyName || null,
    phone: input.phone || null,
    country: input.country || null,
    message: input.message,
  };

  try {
    const inquiry = await withDbRetry("inquiry:create", () =>
      prisma.inquiry.create({
        data: {
          companyName: input.companyName || null,
          contactName: input.contactName,
          email: input.email,
          phone: input.phone || null,
          country: input.country || null,
          message: input.message,
          source,
          sourcePath: sourcePath ?? null,
          status: InquiryStatus.NEW,
        },
      }),
    );

    try {
      await sendInquiryConfirmation(emailPayload);
    } catch (error) {
      // Form already saved — do not fail the request, but log loudly for Vercel/Resend triage.
      console.error("[email] inquiry confirmation failed after persist", {
        inquiryId: inquiry.id,
        to: inquiry.email,
        error: error instanceof Error ? error.message : error,
      });
    }

    return inquiry;
  } catch (dbError) {
    const detail = dbError instanceof Error ? dbError.message : String(dbError);
    console.error("[inquiry] database persist failed — attempting email-only delivery", {
      detail: detail.split("\n")[0],
      email: input.email,
    });

    // Keep the buyer experience working when Supabase/Postgres is down on Vercel.
    try {
      await sendInquiryConfirmation(emailPayload, { requireDelivery: true });
    } catch (emailError) {
      // Prefer getting the lead to sales even if buyer confirmation fails (e.g. domain limits).
      console.error("[inquiry] full email delivery failed — trying sales alert only", {
        error: emailError instanceof Error ? emailError.message : emailError,
      });
      await sendInquirySalesAlert(emailPayload, { requireDelivery: true });
    }

    return {
      id: "email-only",
      companyName: input.companyName || null,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone || null,
      country: input.country || null,
      message: input.message,
      source,
      sourcePath: sourcePath ?? null,
      status: InquiryStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export async function listInquiries() {
  return prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function countNewInquiries() {
  return prisma.inquiry.count({ where: { status: InquiryStatus.NEW } });
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  return prisma.inquiry.update({ where: { id }, data: { status } });
}
