/**
 * Run a Prisma read used by public pages. Retries transient connection failures
 * (common with Supabase pooler on Vercel). Only falls back after retries exhaust —
 * so catalogue pages do not flash empty on a single blip.
 */

const RETRIES = 3;
const BASE_DELAY_MS = 120;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientDbError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /can't reach database|connection|timeout|pool|ECONNRESET|ECONNREFUSED|prepared statement|Server has closed|Timed out|P1001|P1002|P1017/i.test(
    message,
  );
}

export async function safePublicQuery<T>(
  label: string,
  query: () => Promise<T>,
  fallback: T,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    try {
      return await query();
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      const transient = isTransientDbError(error);
      console.error(
        `[safePublicQuery:${label}] attempt ${attempt}/${RETRIES}`,
        message.split("\n")[0],
      );

      if (!transient || attempt === RETRIES) break;
      await sleep(BASE_DELAY_MS * attempt);
    }
  }

  if (lastError) {
    const message =
      lastError instanceof Error ? lastError.message : String(lastError);
    console.error(`[safePublicQuery:${label}] fallback`, message.split("\n")[0]);
  }

  return fallback;
}
