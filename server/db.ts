import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function databaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  // Serverless-friendly: keep pooler connections tiny on Vercel.
  if (/postgres(ql)?:\/\//i.test(url) && !/[?&]connection_limit=/.test(url)) {
    return `${url}${url.includes("?") ? "&" : "?"}connection_limit=1`;
  }
  return url;
}

const url = databaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: url ? { db: { url } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
