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

        <section className="content">
          <h2>Trending searches</h2>
          <ul className="link-list">
            <li><a href="/guides/why-is-my-internet-slow">Why is my internet slow?</a></li>
            <li><a href="/guides/how-to-lower-ping">How to lower ping</a></li>
            <li><a href="/guides/ipv4-vs-ipv6">IPv4 vs IPv6</a></li>
            <li><a href="/browser-info">Browser fingerprint test</a></li>
            <li><a href="/guides/vpn-vs-proxy">VPN vs Proxy</a></li>
            <li><a href="/guides/best-dns-servers">Best DNS servers</a></li>
            <li><a href="/guides/packet-loss-explained">Packet loss explained</a></li>
            <li><a href="/what-is-my-ipv6">What is my IPv6?</a></li>
          </ul>
        </section>

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
