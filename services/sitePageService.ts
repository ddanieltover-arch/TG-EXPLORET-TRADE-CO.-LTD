import { PublishStatus } from "@prisma/client";
import { safePublicQuery } from "@/lib/safePublicQuery";
import { prisma } from "@/server/db";

export async function listSitePagesAdmin() {
  return prisma.sitePage.findMany({ orderBy: { slug: "asc" } });
}

export async function getPublishedSitePage(slug: string) {
  return safePublicQuery(
    `sitePage:${slug}`,
    () =>
      prisma.sitePage.findFirst({
        where: { slug, status: PublishStatus.PUBLISHED },
      }),
    null,
  );
}

export async function getSitePageAdmin(slug: string) {
  return prisma.sitePage.findUnique({ where: { slug } });
}

export async function upsertSitePage(input: {
  slug: string;
  title: string;
  body: string;
  status: PublishStatus;
}) {
  return prisma.sitePage.upsert({
    where: { slug: input.slug },
    create: {
      slug: input.slug,
      title: input.title.trim(),
      body: input.body,
      status: input.status,
    },
    update: {
      title: input.title.trim(),
      body: input.body,
      status: input.status,
    },
  });
}
