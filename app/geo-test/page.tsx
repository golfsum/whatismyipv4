import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Geolocation Testing Tool for Browser QA | Geo Test",
  description: "Compare browser geolocation, timezone, locale and IP location. Save test locations now and use them with the upcoming Geo Test browser extension.",
  alternates: { canonical: "/geo-test" },
};

const features = [
  ["Browser location diagnostics", "See what the browser Geolocation API reveals after you grant permission."],
  ["IP vs browser location", "Compare browser-level location signals with the IP location shown by WhatsMyIPv4."],
  ["Saved location profiles", "Save coordinates and timezones for recurring QA and localization tests."],
  ["Timezone and locale checks", "See the timezone and language signals a website can observe."],
  ["Extension-ready profiles", "Saved profiles are designed to work with the upcoming Chrome/Edge extension."],
  ["QA-first positioning", "Built for localization testing, regional UX checks and privacy diagnostics."],
];

export default function GeoTestPage() {
  return <>
    <SiteHeader />
    <main className="container">
      <section className="hero">
        <h1>Test what location your browser reveals</h1>
        <p>Geo Test compares browser geolocation, timezone, locale and your public IP location so you can spot mismatches and prepare reusable location profiles for QA testing.</p>
        <div className="cta-row">
          <a className="cta cta-primary" href="/geo-test/signup">Create free account</a>
          <a className="cta" href="/geo-test/login">Sign in</a>
        </div>
      </section>

      <section className="content">
        <h2>Browser geolocation testing without changing your normal IP tools</h2>
        <p>The existing WhatsMyIPv4 tools remain free. Geo Test adds an account layer for people who need repeatable location diagnostics and, later, browser-level location overrides for legitimate testing and privacy checks.</p>
        <div className="card-grid">{features.map(([title, desc]) => <article className="tool-card" key={title}><span className="tc-label">{title}</span><span className="tc-desc">{desc}</span></article>)}</div>
      </section>

      <section className="content">
        <h2>What works today</h2>
        <ul className="link-list">
          <li>Account signup and secure sign-in</li>
          <li>Browser geolocation permission test</li>
          <li>Timezone and browser locale detection</li>
          <li>Saved latitude, longitude and timezone profiles</li>
          <li>Comparison with the public IP details available on the main site</li>
        </ul>
      </section>

      <section className="content">
        <h2>Extension coming next</h2>
        <p>The planned Chrome/Edge extension will apply saved profiles to supported test tabs so developers and QA teams can test geolocation-aware experiences. The website remains the account, diagnostics and profile-management hub.</p>
        <p><strong>Planned pricing:</strong> Free for basic diagnostics and saved profiles, with Pro and Team plans for extension profiles, per-site rules, timezone matching, shared workspaces and test history.</p>
      </section>
    </main>
    <SiteFooter />
    <Script id="geo-product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: `${SITE_NAME} Geo Test`, url: `${SITE_URL}/geo-test`, applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
  </>;
}
