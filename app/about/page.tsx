import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPublishedSitePage } from "@/services/sitePageService";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "TG Exploret Trade Co., Ltd — Thailand sugar and rice exporter established in 2018.",
  path: "/about",
});

export const revalidate = 60;

const fallback = {
  title: "About TG Exploret Trade Co., Ltd",
  body: `TG Exploret Trade Co., Ltd is a Thailand-based company established in 2018. We focus on sugar and rice for wholesale and export buyers who need clarity on grade, packaging, and shipment coordination.

Contact: sales@tgetradecoltd.com`,
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
          {p.includes("sales@tgetradecoltd.com") ? (
            <>
              {p.split("sales@tgetradecoltd.com")[0]}
              <a className="underline" href="mailto:sales@tgetradecoltd.com">
                sales@tgetradecoltd.com
              </a>
              {p.split("sales@tgetradecoltd.com")[1]}
            </>
          ) : (
            p
          )}
        </p>
      ))}
    </div>
  );
}
