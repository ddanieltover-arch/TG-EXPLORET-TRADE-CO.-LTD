import { PublishStatus } from "@prisma/client";
import { safePublicQuery } from "@/lib/safePublicQuery";
import { prisma } from "@/server/db";

export async function listCertificationsAdmin() {
  return prisma.certification.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function listPublishedCertifications() {
  return safePublicQuery(
    "certifications:published",
    () =>
      prisma.certification.findMany({
        where: { status: PublishStatus.PUBLISHED },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      }),
    [],
  );
}

export async function getCertificationAdmin(id: string) {
  return prisma.certification.findUnique({ where: { id } });
}

export type CertificationInput = {
  name: string;
  issuer?: string;
  summary?: string;
  documentUrl?: string;
  sortOrder?: number;
  status: PublishStatus;
};

export async function createCertification(input: CertificationInput) {
  return prisma.certification.create({
    data: {
      name: input.name.trim(),
      issuer: input.issuer?.trim() || null,
      summary: input.summary?.trim() || null,
      documentUrl: input.documentUrl?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
      status: input.status,
      publishedAt: input.status === PublishStatus.PUBLISHED ? new Date() : null,
    },
  });
}

export async function updateCertification(id: string, input: CertificationInput) {
  const existing = await prisma.certification.findUnique({ where: { id } });
  if (!existing) throw new Error("Certification not found");

  const becomingPublished =
    input.status === PublishStatus.PUBLISHED && existing.status !== PublishStatus.PUBLISHED;

  return prisma.certification.update({
    where: { id },
    data: {
      name: input.name.trim(),
      issuer: input.issuer?.trim() || null,
      summary: input.summary?.trim() || null,
      documentUrl: input.documentUrl?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
      status: input.status,
      publishedAt: becomingPublished
        ? new Date()
        : input.status === PublishStatus.PUBLISHED
          ? existing.publishedAt ?? new Date()
          : null,
    },
  });
}

export async function deleteCertification(id: string) {
  return prisma.certification.delete({ where: { id } });
}
