/**
 * Run a Prisma read used by public pages. On connection/init failures
 * (common during Vercel builds when DATABASE_URL is wrong or unreachable),
 * return the fallback instead of failing the whole build.
 */
export async function safePublicQuery<T>(
  label: string,
  query: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await query();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[safePublicQuery:${label}]`, message.split("\n")[0]);
    return fallback;
  }
}
