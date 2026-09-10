import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Browser Geolocation vs IP Location | Geo Test",
  description: "Compare public IP location, browser coordinates, timezone and locale. Save Geo Test reference profiles for repeatable website location checks.",
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
        <h1>Browser geolocation vs IP location</h1>
        <p>Inspect browser coordinates, timezone and locale separately, then compare them with the public IP information on WhatsMyIPv4. Save reference profiles for repeatable website QA.</p>
        <div className="cta-row">
          <a className="cta cta-primary" href="/geo-test/signup">Create free account</a>
          <a className="cta" href="/geo-test/login">Sign in</a>
        </div>
      </section>

      <section className="content">
        <h2>Four location signals that are easy to confuse</h2>
        <p>An IP location is an estimate associated with a network address. Browser geolocation uses a permission-controlled browser API. Timezone and locale describe browser settings, not a person's exact physical address. Geo Test keeps these readings separate so a mismatch is easier to investigate.</p>
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
        <p>Saving a profile does not change your public IP address or apply a location to other websites. Use profiles as QA references, then test authorized sites with the appropriate browser developer tools.</p>
      </section>

      <section className="content">
        <h2>Extension coming next</h2>
        <p>The planned Chrome/Edge extension is not part of the current website workflow. When released, it is intended to apply saved profiles to supported test tabs. Today, the website is the account, diagnostics and profile-management hub.</p>
        <p><strong>Planned pricing:</strong> Free for basic diagnostics and saved profiles, with Pro and Team plans for extension profiles, per-site rules, timezone matching, shared workspaces and test history.</p>
      </section>
    </main>
    <SiteFooter />
    <Script id="geo-product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: `${SITE_NAME} Geo Test`, url: `${SITE_URL}/geo-test`, applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
  </>;
}
