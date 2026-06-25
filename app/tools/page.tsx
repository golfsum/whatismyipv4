import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "All Tools - Free Internet & Network Diagnostics",
  description:
    "Every free tool on WhatsMyIPv4 in one place: IP lookup, speed test, VPN check, DNS tools, browser checks and more. No signup.",
  alternates: { canonical: "/tools" },
};

export default function ToolsHub() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools" },
          ]}
        />
        <section className="hero">
          <h1>All Tools</h1>
          <p>
            Every free internet and network tool we offer, grouped by what you
            need. Each one runs in your browser with no signup.
          </p>
        </section>

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <section className="content">
          <h2>Browse by topic</h2>
          <ul className="link-list">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <a href={`/category/${c.slug}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </section>

        <div className="content">
          {TOOL_CATEGORIES.map((cat) => {
            const items = TOOLS.filter((t) => t.category === cat);
            if (items.length === 0) return null;
            return (
              <section key={cat} className="tool-cat">
                <h2 id={cat.toLowerCase()}>{cat} tools</h2>
                <div className="card-grid">
                  {items.map((t) => (
                    <a key={t.href} href={t.href} className="tool-card">
                      <span className="tc-label">{t.label}</span>
                      <span className="tc-desc">{t.desc}</span>
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
