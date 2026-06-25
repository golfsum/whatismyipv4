import type { Metadata } from "next";
import IpDashboard from "@/components/IpDashboard";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "VPN Check - Is My VPN Working? (Free VPN & Proxy Test)",
  description:
    "Is my VPN working? Free VPN check tests whether your connection is routed through a VPN or proxy, shows the IP and location others see, and detects leaks. No signup.",
  keywords: [
    "vpn check",
    "is my vpn working",
    "vpn test",
    "am i connected to a vpn",
    "check vpn",
    "proxy check",
    "vpn leak test",
    "what vpn am i using",
  ],
  alternates: { canonical: "/vpn-check" },
  openGraph: {
    title: "VPN Check - Is My VPN Working?",
    description:
      "Test whether your connection is routed through a VPN or proxy and see the IP others see.",
    url: "/vpn-check",
  },
};

const FAQ: QA[] = [
  {
    q: "Is my VPN working?",
    a: "If the status banner above says a VPN or proxy is detected and the location shown matches your VPN server (not your real city), your VPN is working. If it shows your real ISP and home city, your VPN is off or not routing traffic.",
  },
  {
    q: "How do you detect a VPN?",
    a: "We check whether your IP belongs to a known VPN brand (NordVPN, ExpressVPN, Surfshark, Proton VPN, Mullvad and others), whether it sits on a datacenter/hosting network rather than a consumer ISP, and whether it is flagged as a proxy. These signals are combined into a confidence score.",
  },
  {
    q: "Can a VPN be 100% undetectable?",
    a: "No tool can guarantee detection. Some premium VPNs use residential or obfuscated IPs that look like normal connections, so they may show as 'No VPN detected' even while active. A confident detection is reliable; a non-detection is not proof a VPN is off.",
  },
  {
    q: "What is a DNS or IP leak?",
    a: "A leak happens when some of your traffic bypasses the VPN tunnel, exposing your real IP or DNS provider. If the IP shown here is your real one while your VPN is connected, you may have a leak - try reconnecting or enabling your VPN's kill switch.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <h1>VPN Check - Is My VPN Working?</h1>
          <p>
            Instantly test whether your connection is routed through a{" "}
            <strong>VPN or proxy</strong>, and see the exact IP address and
            location the rest of the internet sees.
          </p>
        </section>

        <IpDashboard />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>How to confirm your VPN is working</h2>
          <ol>
            <li>
              <strong>Turn your VPN off</strong> and note the IP and city shown
              above - that&apos;s your real connection.
            </li>
            <li>
              <strong>Connect your VPN</strong> and reload this page.
            </li>
            <li>
              If the IP, ISP and <a href="/ip-location">location</a> now show the
              VPN server (a different city/country and a datacenter network),
              your VPN is working correctly.
            </li>
          </ol>

          <h2>Reading the VPN status</h2>
          <p>
            The banner gives a <strong>confidence score</strong>. A high score
            with a recognised provider name means we&apos;re confident your
            traffic is going through a VPN. A normal home or mobile connection
            reports <strong>&quot;No VPN detected&quot;</strong>. Note that some
            privacy-focused VPNs use residential-looking IPs and can slip past
            detection - a non-detection is not proof your VPN is off.
          </p>

          <h2>Why use a VPN?</h2>
          <ul>
            <li>Hide your real IP and approximate location from websites.</li>
            <li>Encrypt traffic on public Wi-Fi.</li>
            <li>Access region-restricted content.</li>
          </ul>
          <p>
            New to this? Read <a href="/hide-my-ip">how to hide your IP</a>, or
            check <a href="/">your current IP address</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
