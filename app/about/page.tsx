import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} is a free internet diagnostics and network troubleshooting toolkit - IP lookup, speed test, VPN check, DNS tools and more.`,
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <ContentPage
      title={`About ${SITE_NAME}`}
      crumbLabel="About"
      crumbHref="/about"
      intro={
        <p>
          {SITE_NAME} is a free <strong>internet diagnostics and network
          troubleshooting toolkit</strong>. Whether you want to know your IP
          address, test your connection speed, confirm your VPN is working, or
          debug a DNS issue, you can do it here in seconds. No sign-up, no app.
        </p>
      }
    >
      <h2>What we offer</h2>
      <ul>
        <li>
          <strong>IP tools</strong>: your public IPv4 &amp; IPv6, geolocation,
          ISP/ASN and router IP.
        </li>
        <li>
          <strong>Network tools</strong>: internet speed test and a subnet /
          CIDR calculator.
        </li>
        <li>
          <strong>Privacy tools</strong>: VPN/proxy detection and a WebRTC IP
          leak test.
        </li>
        <li>
          <strong>Browser tools</strong>: what your browser reveals and full
          user-agent details.
        </li>
        <li>
          <strong>DNS tools</strong>: DNS, reverse DNS, MX, SPF and DMARC
          lookups.
        </li>
      </ul>

      <h2>Why we built it</h2>
      <p>
        Most &quot;what is my IP&quot; sites stop at a single number. We wanted a
        place that actually helps you <em>solve internet problems</em>. We measure
        what&apos;s happening, explain what the numbers mean, and point you to the
        next useful tool or guide. Every result comes with plain-English context
        so you learn something, not just look something up.
      </p>

      <h2>How it works</h2>
      <p>
        Our tools run in your browser wherever possible (for speed and privacy)
        and use trusted infrastructure, such as Cloudflare for speed testing and
        public DNS-over-HTTPS resolvers for DNS lookups. We don&apos;t require
        accounts and we don&apos;t store your raw IP address in our analytics. See
        our <a href="/privacy">Privacy Policy</a> for details.
      </p>

      <h2>Get started</h2>
      <p>
        Head to the <a href="/">home page</a> to see your IP and connection
        overview, run a <a href="/speedtest">speed test</a>, or browse the full
        toolkit in the footer below.
      </p>
    </ContentPage>
  );
}
