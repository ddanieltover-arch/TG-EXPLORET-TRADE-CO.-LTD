import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { LEGAL_DOCUMENTS } from "@/lib/legal/content";
import { pageMetadata } from "@/lib/seo";

const doc = LEGAL_DOCUMENTS.privacy;

export const metadata: Metadata = pageMetadata({
  title: doc.title,
  description: doc.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalDocumentPage doc={doc} />;
}
