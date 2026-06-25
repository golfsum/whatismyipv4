import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import AdUnit from "@/components/AdUnit";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { TOOLS } from "@/lib/tools";
import { getGuide } from "@/lib/guides";
import { SITE_URL, ADSENSE_SLOT_TOP } from "@/lib/config";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Topic not found" };
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `/topics/${cat.slug}` },
    openGraph: {
      title: cat.title,
      description: cat.description,
      url: `/topics/${cat.slug}`,
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const tools = cat.toolHrefs
    .map((h) => TOOLS.find((t) => t.href === h))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const guides = cat.guideSlugs
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  const related = cat.related
    .map((s) => getCategory(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <SiteHeader />
      <main className="container">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Topics", href: "/tools" },
            { name: cat.name, href: `/topics/${cat.slug}` },
          ]}
        />
        <section className="hero">
          <h1>{cat.title}</h1>
          {cat.overview.slice(0, 1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        {cat.overview.length > 1 && (
          <article className="content">
            {cat.overview.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        )}

        {tools.length > 0 && (
          <section className="content">
            <h2>{cat.name} tools</h2>
            <div className="card-grid">
              {tools.map((t) => (
                <a key={t.href} href={t.href} className="tool-card">
                  <span className="tc-label">{t.label}</span>
                  <span className="tc-desc">{t.desc}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {guides.length > 0 && (
          <section className="content">
            <h2>{cat.name} guides</h2>
            <div className="guide-grid">
              {guides.map((g) => (
                <a key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
                  <span className="gc-title">{g.h1}</span>
                  <span className="gc-desc">{g.description}</span>
                  <span className="gc-meta">{g.readMins} min read</span>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="content faq">
          <h2>Frequently asked questions</h2>
          {cat.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>

        {related.length > 0 && (
          <section className="content">
            <h2>Related topics</h2>
            <ul className="link-list">
              {related.map((c) => (
                <li key={c.slug}>
                  <a href={`/topics/${c.slug}`}>{c.name}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />

      <Script
        id={`ld-faq-topic-${cat.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: cat.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <Script
        id={`ld-breadcrumb-topic-${cat.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              {
                "@type": "ListItem",
                position: 2,
                name: cat.name,
                item: `${SITE_URL}/topics/${cat.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
