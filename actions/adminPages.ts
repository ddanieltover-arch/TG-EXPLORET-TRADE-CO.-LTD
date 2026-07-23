"use server";

import { PublishStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireCmsWrite } from "@/lib/adminAuth";
import { upsertSitePage } from "@/services/sitePageService";

const statuses = Object.values(PublishStatus);
const allowedSlugs = new Set(["about", "export-markets"]);

export async function updateSitePageAction(formData: FormData) {
  await requireCmsWrite();
  const slug = String(formData.get("slug") ?? "");
  const status = String(formData.get("status") ?? "") as PublishStatus;
  if (!allowedSlugs.has(slug) || !statuses.includes(status)) {
    throw new Error("Invalid input");
  }

  await upsertSitePage({
    slug,
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
    status,
  });

  revalidatePath("/admin/pages");
  revalidatePath(slug === "about" ? "/about" : "/export-markets");
}
