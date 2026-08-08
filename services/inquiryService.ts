import { InquirySource, InquiryStatus } from "@prisma/client";
import { prisma } from "@/server/db";
import type { InquiryInput } from "@/lib/validation/inquiry";
import { sendInquiryConfirmation } from "@/services/emailService";

export async function createInquiry(
  input: InquiryInput,
  source: InquirySource = InquirySource.CONTACT,
  sourcePath?: string,
) {
  if (input.website) {
    throw new Error("Rejected");
  }

  const inquiry = await prisma.inquiry.create({
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
  });

  try {
    await sendInquiryConfirmation({
      to: inquiry.email,
      contactName: inquiry.contactName,
      companyName: inquiry.companyName,
      phone: inquiry.phone,
      country: inquiry.country,
      message: inquiry.message,
    });
  } catch (error) {
    // Form already saved — do not fail the request, but log loudly for Vercel/Resend triage.
    console.error("[email] inquiry confirmation failed after persist", {
      inquiryId: inquiry.id,
      to: inquiry.email,
      error: error instanceof Error ? error.message : error,
    });
  }

  return inquiry;
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
