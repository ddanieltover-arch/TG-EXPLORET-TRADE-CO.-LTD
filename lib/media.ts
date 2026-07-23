import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Product media via Supabase Storage (ACR-001).
 * Admin uploads use the service role key (server-only).
 */

const DEFAULT_BUCKET = "product-images";

export function isSupabaseStorageConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function getStorageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET?.trim() || DEFAULT_BUCKET;
}

function getServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase Storage is not configured");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Local placeholder path (replace with Supabase Storage / client photos in prod). */
export function demoProductImage(seed: string) {
  return seed.toLowerCase().includes("rice")
    ? "/media/products/rice-primary.svg"
    : "/media/products/sugar-primary.svg";
}

export type UploadedImage = {
  url: string;
  publicId: string;
};

function publicObjectUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const bucket = getStorageBucket();
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Upload a file buffer to Supabase Storage (public bucket).
 * `publicId` stores the object path within the bucket.
 */
export async function uploadProductImageBuffer(
  buffer: Buffer,
  opts?: { folder?: string; filename?: string; contentType?: string },
): Promise<UploadedImage> {
  if (!isSupabaseStorageConfigured()) {
    throw new Error("Supabase Storage is not configured");
  }

  const folder = (opts?.folder ?? "products").replace(/^\/+|\/+$/g, "");
  const ext = opts?.contentType?.includes("png")
    ? "png"
    : opts?.contentType?.includes("webp")
      ? "webp"
      : opts?.contentType?.includes("gif")
        ? "gif"
        : "jpg";
  const rawName = opts?.filename?.split(/[/\\]/).pop() || "";
  const name =
    rawName.replace(/[^\w.-]+/g, "-") ||
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${folder}/${name}`;

  const supabase = getServiceClient();
  const bucket = getStorageBucket();

  const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType: opts?.contentType || "image/jpeg",
    upsert: false,
  });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  const url = data.publicUrl || publicObjectUrl(path);

  return { url, publicId: path };
}
