import type { Metadata } from "next";
import IpLeakTest from "@/components/IpLeakTest";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "DNS & IP Leak Test - Is Your VPN Leaking?",
  description:
    "Free DNS and IP leak test. Check whether your real IP leaks through WebRTC while a VPN is active, and learn how to confirm your DNS isn't leaking.",
  keywords: ["dns leak test", "ip leak test", "vpn leak test", "webrtc leak", "is my vpn leaking"],
  alternates: { canonical: "/dns-leak-test" },
};

const FAQ: QA[] = [
  {
    q: "What is a DNS leak?",
    a: "A DNS leak happens when your device sends DNS lookups outside the VPN tunnel, usually to your ISP's resolver. Even with a VPN hiding your traffic, that can reveal which sites you visit.",
  },
  {
    q: "What is a WebRTC leak?",
    a: "WebRTC is a browser feature that can discover your real public IP for peer connections, sometimes bypassing the VPN. The test above checks for this directly in your browser.",
  },
  {
    q: "How do I confirm my DNS isn't leaking?",
    a: "The most reliable way is your VPN's own leak-test page or a dedicated DNS-leak service, because checking the resolver behind your requests needs special test infrastructure. Most good VPNs include DNS-leak protection you can enable in settings.",
  },
  {
    q: "How do I fix a leak?",
    a: "Enable your VPN's leak protection and kill switch, disable WebRTC in your browser or use an extension that blocks it, and prefer the VPN's built-in DNS. Then re-run the test.",
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
            { name: "DNS & IP Leak Test", href: "/dns-leak-test" },
          ]}
        />
        <section className="hero">
          <h1>DNS &amp; IP Leak Test</h1>
          <p>
            Check whether your real public IP leaks through WebRTC while a VPN is
            active. This is the most common way a VPN exposes your identity.
          </p>
        </section>

        <IpLeakTest />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Leaks that defeat a VPN</h2>
          <p>
            A VPN only protects you if <em>all</em> your traffic goes through the
            tunnel. Two common leaks break that promise:
          </p>
          <ul>
            <li>
              <strong>WebRTC leaks</strong> expose your real public IP through
              the browser, even with a VPN connected. The test above catches
              these.
            </li>
            <li>
              <strong>DNS leaks</strong> send your lookups to your ISP&apos;s
              resolver instead of the VPN&apos;s, revealing the sites you visit.
            </li>
          </ul>
          <h2>How to check your DNS resolver</h2>
          <p>
            A precise DNS-leak test needs special server infrastructure to see
            which resolver answered your request, so the most reliable check is
            your VPN provider&apos;s own leak-test page, or a dedicated DNS-leak
            service. Make sure your VPN&apos;s DNS-leak protection is switched on.
          </p>
          <p>
            Related: run a <a href="/vpn-check">VPN check</a>, the{" "}
            <a href="/ip-leak-test">IP leak test</a>, or read{" "}
            <a href="/guides/how-to-test-your-vpn">how to test your VPN</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
