import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { GUIDES, GUIDE_CATEGORIES } from "@/lib/guides";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Internet & Networking Guides",
  description:
    "Plain-English guides to internet and networking problems: slow connections, high ping, IP addresses, DNS, privacy and more. Free, no fluff.",
  alternates: { canonical: "/guides" },
};

export default function GuidesHub() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
          ]}
        />
        <section className="hero">
          <h1>Internet &amp; Networking Guides</h1>
          <p>
            Straight answers to the questions people actually ask about their
            connection, IP address, privacy and speed. No jargon, no fluff.
          </p>
        </section>

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <div className="content">
          {GUIDE_CATEGORIES.map((cat) => {
            const items = GUIDES.filter((g) => g.category === cat);
            if (items.length === 0) return null;
            return (
              <section key={cat} className="guide-cat">
                <h2 id={cat.toLowerCase()}>{cat}</h2>
                <div className="guide-grid">
                  {items.map((g) => (
                    <a
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="guide-card"
                    >
                      <span className="gc-title">{g.h1}</span>
                      <span className="gc-desc">{g.description}</span>
                      <span className="gc-meta">{g.readMins} min read</span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
