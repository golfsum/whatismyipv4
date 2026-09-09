import Script from "next/script";
import IpDashboard from "@/components/IpDashboard";
import InternetHealthReport from "@/components/InternetHealthReport";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import {
  SITE_NAME,
  SITE_URL,
  ADSENSE_SLOT_TOP,
  ADSENSE_SLOT_BOTTOM,
} from "@/lib/config";

const FEATURED = [
  "/",
  "/speedtest",
  "/vpn-check",
  "/browser-info",
  "/dns-lookup",
  "/ssl-checker",
  "/subnet-calculator",
  "/whois-lookup",
].map((href) => TOOLS.find((t) => t.href === href)).filter(Boolean) as {
  href: string;
  label: string;
  desc: string;
}[];

const LATEST_GUIDES = [
  { href: "/guides/why-is-my-internet-slow", label: "Why is my internet slow?" },
  { href: "/guides/how-to-lower-ping", label: "How to lower your ping" },
  { href: "/guides/what-is-a-vpn", label: "What is a VPN?" },
  { href: "/guides/ipv4-vs-ipv6", label: "IPv4 vs IPv6" },
];

const FAQ: QA[] = [
  {
    q: "What is my IPv4 address?",
    a: "Your public IPv4 address is the dotted number shown at the top of this page, such as 192.0.2.1. It identifies your internet connection to websites and online services. The value appears automatically when the page loads.",
  },
  {
    q: "What is my IP address?",
    a: "Your IP (Internet Protocol) address is the unique number that identifies your device or internet connection online. This page shows your current public IP address as seen by the websites you connect to.",
  },
  {
    q: "What is the difference between IPv4 and IPv6?",
    a: "IPv4 addresses look like 192.0.2.1 and there are only about 4.3 billion of them. IPv6 addresses are much longer, like 2001:db8::8a2e:370:7334, with a practically unlimited supply. This page shows both if your network supports them.",
  },
  {
    q: "How do I know if I'm connected to a VPN?",
    a: "Our VPN check looks at whether your IP belongs to a known VPN provider, a datacenter network, or a flagged proxy. On a VPN, your public IP usually belongs to the VPN company rather than your home provider.",
  },
  {
    q: "What is a good Network Health Score?",
    a: "The score blends latency, IPv6 support, DNS and a secure connection. Above 85 is excellent, the 70s are good, and the 50s and 60s are fair. The suggestions under the score tell you what to fix.",
  },
  {
    q: "How do I find my IP address on my phone?",
    a: "Open this page in your phone's browser and your public IP appears automatically, on both iPhone and Android. For your phone's local IP, check Settings, then Wi-Fi, then tap your network.",
  },
  {
    q: "Is this tool free?",
    a: `Yes. ${SITE_NAME} is completely free, needs no signup, and works on desktop and mobile. Every tool loads instantly in your browser.`,
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="container">
        <section className="hero">
          <h1>What Is My IPv4 Address?</h1>
          <p>
            Check your <strong>public IPv4 address</strong> instantly, then see your
            IPv6 address, ISP, approximate location, VPN status, internet speed,
            latency and network health. Free, no signup.
          </p>
          <div className="cta-row">
            <a className="cta cta-primary" href="/internet-health-check">
              Run Full Internet Check
            </a>
            <a className="cta" href="/speedtest">
              Speed Test
            </a>
            <a className="cta" href="/tools">
              All Tools
            </a>
          </div>
        </section>

        <IpDashboard />

        <section className="content">
          <h2>Check your current public IPv4 address</h2>
          <p>
            Your public IPv4 address is the address websites see when your device
            connects to the internet. Use the IP details above to confirm your
            current address, then check your ISP and approximate IP location or
            compare IPv4 with IPv6.
          </p>
          <ul className="link-list">
            <li><a href="/ip-location">Check your IP location</a></li>
            <li><a href="/vpn-check">Check whether your IP is using a VPN or proxy</a></li>
            <li><a href="/guides/ipv4-vs-ipv6">Learn the difference between IPv4 and IPv6</a></li>
          </ul>
        </section>

        <InternetHealthReport />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <section className="content">
          <div className="section-head">
            <h2>Popular tools</h2>
            <a href="/tools" className="see-all">
              View all tools →
            </a>
          </div>
          <div className="card-grid">
            {FEATURED.map((t) => (
              <a key={t.href} href={t.href} className="tool-card">
                <span className="tc-label">{t.label}</span>
                <span className="tc-desc">{t.desc}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="content">
          <h2>Browse by topic</h2>
          <p>Pick a topic to find the right tools and guides for the job.</p>
          <div className="card-grid">
            {CATEGORIES.map((c) => (
              <a key={c.slug} href={`/topics/${c.slug}`} className="tool-card">
                <span className="tc-label">{c.name}</span>
                <span className="tc-desc">{c.description}</span>
              </a>
            ))}
          </div>
        </section>

        <AdUnit slot={ADSENSE_SLOT_BOTTOM} label="Advertisement" />

        <section className="content">
          <div className="section-head">
            <h2>Latest guides</h2>
            <a href="/guides" className="see-all">
              View all guides →
            </a>
          </div>
          <ul className="link-list">
            {LATEST_GUIDES.map((g) => (
              <li key={g.href}>
                <a href={g.href}>{g.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <Faq items={FAQ} />
      </main>

      <SiteFooter />

      <Script
        id="ld-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: SITE_NAME,
            url: SITE_URL,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </>
  );
}
