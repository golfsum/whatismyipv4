import type { Metadata } from "next";
import IpDashboard from "@/components/IpDashboard";
import InternetHealthReport from "@/components/InternetHealthReport";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Full Internet Check - Test Your Connection, IP, VPN & Speed",
  description:
    "Run a complete internet health check in one place: your IP, VPN status, location, speed, latency, DNS and a personalised network health score. Free, no signup.",
  keywords: [
    "internet health check",
    "full internet check",
    "test my internet connection",
    "network health check",
    "internet diagnostics",
  ],
  alternates: { canonical: "/internet-health-check" },
};

const FAQ: QA[] = [
  {
    q: "What does the full internet check measure?",
    a: "It pulls together your public IP and location, VPN and proxy status, a quick speed estimate, latency, DNS and a personalised network health score, so you get a complete picture of your connection in one place.",
  },
  {
    q: "How long does it take?",
    a: "A few seconds. The report runs automatically when the page loads and uses a small data sample for the speed estimate.",
  },
  {
    q: "Is it accurate?",
    a: "Geolocation and VPN detection are best-effort estimates, and the speed figure is a quick sample. For a precise speed result, run the full speed test.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Internet Health Check", href: "/internet-health-check" },
          ]}
        />
        <section className="hero">
          <h1>Full Internet Health Check</h1>
          <p>
            Your complete connection report in one place: IP and location, VPN
            status, speed, latency, DNS and an overall health score.
          </p>
        </section>

        <IpDashboard />

        <InternetHealthReport />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>What a full internet check tells you</h2>
          <p>
            Most connection problems come down to a handful of things: a slow or
            congested line, high latency, a DNS issue, or a privacy leak. This
            page checks all of them at once so you don&apos;t have to run five
            separate tools.
          </p>
          <ul>
            <li>
              <strong>IP &amp; location</strong>: your public address and where
              it places you.
            </li>
            <li>
              <strong>VPN &amp; privacy</strong>: whether your traffic looks
              masked, and what sites can still see.
            </li>
            <li>
              <strong>Speed &amp; latency</strong>: a quick estimate of download,
              upload and ping.
            </li>
            <li>
              <strong>Health score</strong>: a single number with plain-English
              advice on what to improve.
            </li>
          </ul>
          <p>
            Want to go deeper on any area? Run the{" "}
            <a href="/speedtest">full speed test</a>, the{" "}
            <a href="/ping-test">ping test</a>, or a{" "}
            <a href="/vpn-check">VPN check</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
