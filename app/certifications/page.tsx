import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { listPublishedCertifications } from "@/services/certificationService";

export const metadata: Metadata = pageMetadata({
  title: "Certifications",
  description:
    "Confirmed quality and trade certifications for TG Exploret Trade Co., Ltd. Unverified badges are not published.",
  path: "/certifications",
});

export const revalidate = 60;

export default async function CertificationsPage() {
  const certs = await listPublishedCertifications();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">Certifications</h1>
      {certs.length === 0 ? (
        <p className="mt-4 text-tg-muted">
          Certification documents will appear here after the business confirms which certificates
          are held. We do not publish unverified badges.
        </p>
      ) : (
        <ul className="mt-8 space-y-6">
          {certs.map((c) => (
            <li key={c.id} className="border-b border-tg-border pb-6">
              <h2 className="font-display text-2xl text-tg-primary">{c.name}</h2>
              {c.issuer ? <p className="mt-1 text-sm text-tg-muted">Issuer: {c.issuer}</p> : null}
              {c.summary ? <p className="mt-3 text-tg-muted whitespace-pre-line">{c.summary}</p> : null}
              {c.documentUrl ? (
                <p className="mt-3">
                  <a
                    href={c.documentUrl}
                    className="font-semibold text-tg-primary underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View document
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8">
        <Link href="/request-quote" className="font-semibold text-tg-primary underline">
          Request a Quote
        </Link>
      </p>
    </div>
  );
}
