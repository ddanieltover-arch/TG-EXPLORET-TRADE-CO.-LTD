import { withDbRetry } from "@/lib/dbRetry";

/**
 * Run a Prisma read used by public pages. Retries transient connection failures
 * (common with Supabase pooler on Vercel). Falls back only after retries exhaust
 * so catalogue pages do not flash empty on a single blip.
 */
export async function safePublicQuery<T>(
  label: string,
  query: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await withDbRetry(label, query);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[safePublicQuery:${label}] fallback`, message.split("\n")[0]);
    return fallback;
  }
}
