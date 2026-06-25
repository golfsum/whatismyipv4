import type { Metadata } from "next";
import IpLeakTest from "@/components/IpLeakTest";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "IP Leak Test — Check for WebRTC IP Leaks",
  description:
    "Free WebRTC IP leak test. Check whether your real public IP is exposed through your browser even when you're using a VPN. Runs instantly in your browser.",
  keywords: [
    "ip leak test",
    "webrtc leak test",
    "webrtc ip leak",
    "vpn leak test",
    "dns leak",
    "is my vpn leaking",
  ],
  alternates: { canonical: "/ip-leak-test" },
};

const FAQ: QA[] = [
  {
    q: "What is a WebRTC IP leak?",
    a: "WebRTC is a browser feature for real-time audio/video. To connect peers it can discover your IP addresses — and in some cases reveal your real public IP even while a VPN is active, bypassing the tunnel.",
  },
  {
    q: "Why does the test only show a .local address?",
    a: "Modern browsers replace your real local IP with a random mDNS '.local' hostname to protect privacy. That's the expected, safe behaviour — it means your true local IP isn't being exposed.",
  },
  {
    q: "How do I fix a WebRTC leak?",
    a: "Use a VPN with built-in WebRTC leak protection, install a browser extension that disables WebRTC, or turn WebRTC off in your browser's settings/flags. Then re-run this test to confirm no public IP appears.",
  },
  {
    q: "Does this test send my IP anywhere?",
    a: "No. The detection happens entirely in your browser using WebRTC; we don't transmit or store the discovered addresses.",
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
            { name: "IP Leak Test", href: "/ip-leak-test" },
          ]}
        />
        <section className="hero">
          <h1>WebRTC IP Leak Test</h1>
          <p>
            Check whether your browser exposes your real public IP address
            through WebRTC — a common way VPNs leak your true location.
          </p>
        </section>

        <IpLeakTest />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Why WebRTC can leak your IP</h2>
          <p>
            WebRTC powers in-browser calls and file sharing. To establish a
            direct peer connection it asks a STUN server for your reachable IP
            addresses. That mechanism can surface your{" "}
            <strong>real public IP even when a VPN is connected</strong>, because
            the request may travel outside the VPN tunnel. The result: a site
            could see your true ISP-assigned address despite your VPN.
          </p>
          <h3>How to read the result</h3>
          <ul>
            <li>
              <strong>No public IP leaked</strong> — good. WebRTC isn&apos;t
              exposing a routable address.
            </li>
            <li>
              <strong>Public IP exposed</strong> — if it&apos;s your real
              (non-VPN) address while connected to a VPN, you have a leak to fix.
            </li>
            <li>
              <strong>.local addresses</strong> — harmless; your browser is
              masking your local IP with mDNS.
            </li>
          </ul>
          <h2>Next steps</h2>
          <p>
            Confirm your VPN is active with the{" "}
            <a href="/vpn-check">VPN check</a>, review what else your browser
            reveals in <a href="/browser-info">Browser Info</a>, and read{" "}
            <a href="/hide-my-ip">how to hide your IP</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
