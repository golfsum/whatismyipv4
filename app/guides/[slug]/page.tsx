import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import AdUnit from "@/components/AdUnit";
import AffiliateCards from "@/components/AffiliateCards";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { GUIDES, getGuide } from "@/lib/guides";
import {
  SITE_URL,
  SITE_NAME,
  ADSENSE_SLOT_TOP,
  CONTENT_UPDATED,
  CONTENT_AUTHOR,
} from "@/lib/config";

function sectionId(h2: string): string {
  return h2
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.related
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <SiteHeader />
      <main className="container">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
            { name: guide.h1, href: `/guides/${guide.slug}` },
          ]}
        />

        <article className="content guide">
          <p className="guide-meta">
            {guide.category} · {guide.readMins} min read · By {CONTENT_AUTHOR} ·
            Updated {CONTENT_UPDATED}
          </p>
          <h1>{guide.h1}</h1>
          {guide.intro.map((p, i) => (
            <p key={i} className="guide-intro">
              {p}
            </p>
          ))}

          {guide.sections.length > 2 && (
            <nav className="toc" aria-label="Table of contents">
              <span className="toc-title">On this page</span>
              <ul>
                {guide.sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#${sectionId(s.h2)}`}>{s.h2}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

          {guide.sections.map((s, i) => (
            <section key={i}>
              <h2 id={sectionId(s.h2)}>{s.h2}</h2>
              {s.body?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
              {s.steps && (
                <ol className="guide-steps">
                  {s.steps.map((st, j) => (
                    <li key={j}>{st}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </article>

        {guide.affiliate && <AffiliateCards type={guide.affiliate} />}

        {guide.faq.length > 0 && (
          <section className="content faq">
            <h2>Frequently asked questions</h2>
            {guide.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
        )}

        <section className="content related">
          {related.length > 0 && (
            <div className="related-block">
              <h2>Related guides</h2>
              <ul className="related-list">
                {related.map((g) => (
                  <li key={g.slug}>
                    <a href={`/guides/${g.slug}`}>{g.h1}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {guide.tools.length > 0 && (
            <div className="related-block">
              <h2>Related tools</h2>
              <ul className="related-list">
                {guide.tools.map((t) => (
                  <li key={t.href}>
                    <a href={t.href}>{t.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="guide-back">
            <a href="/guides">← All guides</a>
          </p>
        </section>
      </main>
      <SiteFooter />

      <Script
        id={`ld-article-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.h1,
            description: guide.description,
            author: { "@type": "Organization", name: CONTENT_AUTHOR },
            publisher: { "@type": "Organization", name: SITE_NAME },
            dateModified: new Date(CONTENT_UPDATED).toISOString(),
            mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
          }),
        }}
      />
      {guide.faq.length > 0 && (
        <Script
          id={`ld-faq-${guide.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: guide.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
