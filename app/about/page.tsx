import type { Metadata } from "next";
import { COMPANY_EMAIL, COMPANY_LEGAL_NAME } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { getPublishedSitePage } from "@/services/sitePageService";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${COMPANY_LEGAL_NAME} — Thailand edible cooking oils and rice exporter established in 2018.`,
  path: "/about",
});

export const dynamic = "force-dynamic";

const fallback = {
  title: `About ${COMPANY_LEGAL_NAME}`,
  body: `${COMPANY_LEGAL_NAME} is a Thailand-based company established in 2018. We supply edible cooking oils and rice to wholesale and export buyers who need clear grade information, practical packaging options, and coordinated shipment discussions.

Our commercial focus is dual-core: refined and specialty edible oils for retail, foodservice, and industrial programmes, alongside rice varieties and broken grades suited to importers, distributors, and food manufacturers. We do not dilute that focus with unrelated commodity lines.

Buyers work with us through structured quotation requests — product, volume, destination, and preferred Incoterms — so sales conversations start with usable commercial context rather than a generic enquiry form.

Quality and food-safety certifications appear on this website only after the business confirms which documents are held. Until then, we invite buyers to ask sales which certificates can be provided for a given shipment.

Contact: ${COMPANY_EMAIL}`,
};

function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function AboutPage() {
  const page = await getPublishedSitePage("about");
  const title = page?.title ?? fallback.title;
  const body = page?.body ?? fallback.body;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl text-tg-primary">{title}</h1>
      {paragraphs(body).map((p) => (
        <p key={p.slice(0, 40)} className="mt-4 text-tg-muted whitespace-pre-line">
          {p.includes(COMPANY_EMAIL) ? (
            <>
              {p.split(COMPANY_EMAIL)[0]}
              <a className="underline" href={`mailto:${COMPANY_EMAIL}`}>
                {COMPANY_EMAIL}
              </a>
              {p.split(COMPANY_EMAIL)[1]}
            </>
          ) : (
            p
          )}
        </p>
      ))}
    </div>
  );
}
