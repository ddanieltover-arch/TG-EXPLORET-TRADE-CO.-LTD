const RETRIES = 3;
const BASE_DELAY_MS = 150;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isTransientDbError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /can't reach database|connection|timeout|pool|ECONNRESET|ECONNREFUSED|prepared statement|Server has closed|Timed out|P1001|P1002|P1017|P2024/i.test(
    message,
  );
}

/** Retry transient Prisma/Supabase pooler failures before surfacing the error. */
export async function withDbRetry<T>(
  label: string,
  operation: () => Promise<T>,
  retries = RETRIES,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      const transient = isTransientDbError(error);
      console.error(
        `[withDbRetry:${label}] attempt ${attempt}/${retries}`,
        message.split("\n")[0],
      );

      if (!transient || attempt === retries) break;
      await sleep(BASE_DELAY_MS * attempt);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(String(lastError ?? `Database operation failed: ${label}`));
}
