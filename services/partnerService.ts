import { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/server/db";
import type { PartnerApplicationInput } from "@/lib/validation/partner";
import { sendPartnerApplicationAlert } from "@/services/emailService";

export async function createDealerApplication(input: PartnerApplicationInput) {
  if (input.website) throw new Error("Rejected");

  const app = await prisma.dealerApplication.create({
    data: {
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone || null,
      country: input.country,
      marketsServed: input.marketsServed || null,
      message: input.message || null,
      status: ApplicationStatus.NEW,
    },
  });

  try {
    await sendPartnerApplicationAlert({
      type: "dealer",
      companyName: app.companyName,
      email: app.email,
      contactName: app.contactName,
      phone: app.phone,
      country: app.country,
      marketsServed: app.marketsServed,
      message: app.message,
    });
  } catch (error) {
    console.error("[email] dealer application alert failed", error);
  }

  return app;
}

export async function createDistributorApplication(input: PartnerApplicationInput) {
  if (input.website) throw new Error("Rejected");

  const app = await prisma.distributorApplication.create({
    data: {
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone || null,
      country: input.country,
      marketsServed: input.marketsServed || null,
      message: input.message || null,
      status: ApplicationStatus.NEW,
    },
  });

  try {
    await sendPartnerApplicationAlert({
      type: "distributor",
      companyName: app.companyName,
      email: app.email,
      contactName: app.contactName,
      phone: app.phone,
      country: app.country,
      marketsServed: app.marketsServed,
      message: app.message,
    });
  } catch (error) {
    console.error("[email] distributor application alert failed", error);
  }

  return app;
}

export async function listDealerApplications() {
  return prisma.dealerApplication.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
}

export async function listDistributorApplications() {
  return prisma.distributorApplication.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
}

export async function getDealerApplicationById(id: string) {
  return prisma.dealerApplication.findUnique({ where: { id } });
}

export async function getDistributorApplicationById(id: string) {
  return prisma.distributorApplication.findUnique({ where: { id } });
}

export async function countNewPartnerApplications() {
  const [dealers, distributors] = await Promise.all([
    prisma.dealerApplication.count({ where: { status: ApplicationStatus.NEW } }),
    prisma.distributorApplication.count({ where: { status: ApplicationStatus.NEW } }),
  ]);
  return { dealers, distributors };
}

export async function updateDealerApplicationStatus(id: string, status: ApplicationStatus) {
  return prisma.dealerApplication.update({ where: { id }, data: { status } });
}

export async function updateDistributorApplicationStatus(
  id: string,
  status: ApplicationStatus,
) {
  return prisma.distributorApplication.update({ where: { id }, data: { status } });
}
