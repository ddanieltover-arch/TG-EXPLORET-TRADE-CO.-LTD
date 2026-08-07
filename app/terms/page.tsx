import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { LEGAL_DOCUMENTS } from "@/lib/legal/content";
import { pageMetadata } from "@/lib/seo";

const doc = LEGAL_DOCUMENTS.terms;

export const metadata: Metadata = pageMetadata({
  title: doc.title,
  description: doc.description,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocumentPage doc={doc} />;
}
