import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { LEGAL_DOCUMENTS } from "@/lib/legal/content";
import { pageMetadata } from "@/lib/seo";

const doc = LEGAL_DOCUMENTS.cookies;

export const metadata: Metadata = pageMetadata({
  title: doc.title,
  description: doc.description,
  path: "/cookies",
});

export default function CookiesPage() {
  return <LegalDocumentPage doc={doc} />;
}
