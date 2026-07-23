import { AdminRole } from "@prisma/client";
import { auth } from "@/auth";

const fullWrite: AdminRole[] = [AdminRole.SUPER_ADMIN, AdminRole.ADMIN];
const cmsWrite: AdminRole[] = [...fullWrite, AdminRole.EDITOR];
const salesWrite: AdminRole[] = [...fullWrite, AdminRole.SALES_MANAGER];

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

function assertRole(role: AdminRole, allowed: AdminRole[], label: string) {
  if (!allowed.includes(role)) {
    throw new Error(`Forbidden — ${label} role required`);
  }
}

/** Full write: SUPER_ADMIN / ADMIN only. */
export async function requireAdminWrite() {
  const session = await requireAdmin();
  assertRole(session.user.role, fullWrite, "ADMIN");
  return session;
}

/** CMS: products, certifications, pages — SUPER_ADMIN / ADMIN / EDITOR. */
export async function requireCmsWrite() {
  const session = await requireAdmin();
  assertRole(session.user.role, cmsWrite, "CMS write");
  return session;
}

/** Sales workflows: quotes, inquiries, partners — SUPER_ADMIN / ADMIN / SALES_MANAGER. */
export async function requireSalesWrite() {
  const session = await requireAdmin();
  assertRole(session.user.role, salesWrite, "sales write");
  return session;
}
