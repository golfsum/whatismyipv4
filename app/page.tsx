import Script from "next/script";
import IpDashboard from "@/components/IpDashboard";
import InternetHealthReport from "@/components/InternetHealthReport";
import ToolCards from "@/components/ToolCards";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import {
  SITE_NAME,
  SITE_URL,
  ADSENSE_SLOT_TOP,
  ADSENSE_SLOT_BOTTOM,
} from "@/lib/config";

const FAQ: QA[] = [
  {
    q: "What is my IP address?",
    a: "Your IP (Internet Protocol) address is the unique number that identifies your device on the internet. The big number at the top of this page is your current public IP address as seen by the websites and servers you connect to.",
  },
  {
    q: "What is the difference between IPv4 and IPv6?",
    a: "IPv4 addresses look like 192.0.2.1 and there are about 4.3 billion of them, which is no longer enough for every device on Earth. IPv6 addresses are much longer (for example 2001:0db8:85a3::8a2e:0370:7334) and provide a virtually unlimited supply. This page shows both your IPv4 and IPv6 address if your network supports them.",
  },
  {
    q: "Why is my IP location not exactly where I am?",
    a: "IP geolocation is approximate. It is based on databases that map IP ranges to regions, usually accurate to the city or ISP level but not to your street address. It does not use GPS, so the marker on the map shows a general area, not your precise position.",
  },
  {
    q: "How do I know if I'm connected to a VPN?",
    a: "Our VPN check looks at whether your IP belongs to a known VPN provider, a datacenter/hosting network, or has been flagged as a proxy. If you are on a VPN, your public IP will usually belong to the VPN company rather than your home internet provider.",
  },
  {
    q: "What is a good Network Health Score?",
    a: "The score blends your latency, IPv6 support, DNS resolution and whether you're on a secure connection. Anything above 85 is excellent, the 70s are good, and the 50s and 60s are fair. If yours comes back low, the suggestions under the score tell you what to fix.",
  },
  {
    q: "How do I find my IP address on my phone?",
    a: "Open this page in your phone's browser and your public IP shows up automatically, on both iPhone and Android. If you need your phone's private (local) IP instead, check Settings, then Wi-Fi, then tap your network.",
  },
  {
    q: "What can someone do with my IP address?",
    a: "With your IP alone, someone can estimate your city and ISP. They cannot see your name, exact address, or files. Use a VPN on untrusted networks if you want to mask it.",
  },
  {
    q: "Is this tool free?",
    a: `Yes. ${SITE_NAME} is completely free, requires no signup, and works on desktop and mobile. Every tool loads instantly in your browser.`,
  },
];

const TROUBLESHOOT: { problem: string; href: string; cta: string }[] = [
  { problem: "Internet feels slow?", href: "/speedtest", cta: "Run a speed test" },
  { problem: "High ping or lag?", href: "/speedtest", cta: "Check ping & jitter" },
  { problem: "Is my VPN actually working?", href: "/vpn-check", cta: "Run VPN check" },
  { problem: "Worried about IP leaks?", href: "/ip-leak-test", cta: "Test for leaks" },
  { problem: "DNS problems?", href: "/dns-lookup", cta: "Look up DNS records" },
  { problem: "Can't reach your router?", href: "/what-is-my-router-ip", cta: "Find your router IP" },
  { problem: "Email not delivering?", href: "/spf-dmarc-lookup", cta: "Check SPF & DMARC" },
  { problem: "Planning a network?", href: "/subnet-calculator", cta: "Subnet calculator" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="container">
        <section className="hero">
          <h1>What&apos;s My IP &amp; Complete Internet Diagnostics</h1>
          <p>
            See your public <strong>IP address</strong>, internet{" "}
            <strong>speed</strong>, <strong>VPN status</strong>, browser details
            and network health in one place. It&apos;s free, and there&apos;s
            nothing to sign up for.
          </p>
          <div className="cta-row">
            <a className="cta cta-primary" href="/speedtest">
              Speed Test
            </a>
            <a className="cta" href="/vpn-check">
              VPN Check
            </a>
            <a className="cta" href="#tools">
              All Tools
            </a>
          </div>
        </section>

        <IpDashboard />

        <InternetHealthReport />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <section className="content" id="tools">
          <h2>Free network &amp; internet tools</h2>
          <p>
            Everything you need to check and troubleshoot your connection. Every
            tool is free and runs right in your browser.
          </p>
          <ToolCards exclude="/" />
        </section>

        <section className="content" id="troubleshoot">
          <h2>Troubleshooting center</h2>
          <p>Having an internet problem? Start here.</p>
          <div className="trouble-grid">
            {TROUBLESHOOT.map((t) => (
              <a key={t.problem + t.href} href={t.href} className="trouble-card">
                <span className="t-problem">{t.problem}</span>
                <span className="t-cta">{t.cta} →</span>
              </a>
            ))}
          </div>
        </section>

        <AdUnit slot={ADSENSE_SLOT_BOTTOM} label="Advertisement" />

        <article className="content" id="about">
          <h2>Your IP address &amp; connection, explained</h2>
          <p>
            Every device on the internet has an <strong>IP address</strong>, the
            number that lets data find its way to and from you. When people ask{" "}
            <em>&quot;what is my IP?&quot;</em> they usually mean their{" "}
            <strong>public IP address</strong>: the one your router shows to the
            outside world. That&apos;s what you see at the top of this page, along
            with your location, ISP and VPN status.
          </p>
          <h3>IPv4 vs IPv6</h3>
          <p>
            <strong>IPv4</strong> looks like <code>203.0.113.42</code>;{" "}
            <strong>IPv6</strong> looks like{" "}
            <code>2001:db8:85a3::8a2e:370:7334</code>. The world ran out of IPv4
            addresses, so IPv6 was created with a vastly larger pool. See your{" "}
            <a href="/what-is-my-ipv6">IPv6 address</a> and{" "}
            <a href="/what-is-my-ipv4">IPv4 address</a> in detail.
          </p>
          <h3>Beyond your IP</h3>
          <p>
            Knowing your IP is just the start. Measure your line with the{" "}
            <a href="/speedtest">speed test</a>, confirm privacy with the{" "}
            <a href="/vpn-check">VPN check</a> and{" "}
            <a href="/ip-leak-test">IP leak test</a>, debug domains with our{" "}
            <a href="/dns-lookup">DNS tools</a>, or plan a network with the{" "}
            <a href="/subnet-calculator">subnet calculator</a>.
          </p>
        </article>

        <section className="content">
          <h2>Popular guides</h2>
          <p>
            Sort out a connection problem or just learn how this stuff works.
          </p>
          <ul className="link-list">
            <li><a href="/guides/why-is-my-internet-slow">Why is my internet slow?</a></li>
            <li><a href="/guides/how-to-lower-ping">How to lower your ping</a></li>
            <li><a href="/guides/can-someone-find-my-location-from-my-ip">Can someone find your address from your IP?</a></li>
            <li><a href="/guides/ipv4-vs-ipv6">IPv4 vs IPv6</a></li>
            <li><a href="/guides/vpn-vs-proxy">VPN vs proxy</a></li>
            <li><a href="/guides">Browse all guides →</a></li>
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
