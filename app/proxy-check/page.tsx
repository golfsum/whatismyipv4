import type { Metadata } from "next";
import ProxyCheck from "@/components/ProxyCheck";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Proxy Check - Are You Behind a Proxy or Datacenter IP?",
  description:
    "Free proxy check. See whether your connection looks like a proxy, VPN, or datacenter IP rather than a normal home network, with the reasons why.",
  keywords: ["proxy check", "am i behind a proxy", "proxy detection", "datacenter ip check", "is my ip a proxy"],
  alternates: { canonical: "/proxy-check" },
};

const FAQ: QA[] = [
  {
    q: "How does proxy detection work?",
    a: "We look at whether your IP belongs to a hosting or datacenter network, is flagged as a proxy, or matches a known VPN provider. Home and mobile connections usually come back clean.",
  },
  {
    q: "Why would my IP look like a proxy?",
    a: "Because you're using a VPN or proxy, or your ISP routes you through a datacenter range. Some business and mobile connections also trip these signals.",
  },
  {
    q: "Is being flagged a problem?",
    a: "Not for you directly, but some websites limit or block traffic from datacenter and proxy IPs. If a site keeps challenging you, your IP's reputation may be the reason.",
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
            { name: "Proxy Check", href: "/proxy-check" },
          ]}
        />
        <section className="hero">
          <h1>Proxy Check</h1>
          <p>
            See whether your connection looks like a proxy, VPN, or datacenter IP
            rather than a normal home network.
          </p>
        </section>

        <ProxyCheck />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Proxy, VPN, and datacenter IPs</h2>
          <p>
            A proxy or VPN routes your traffic through another server, so the IP
            websites see belongs to that server rather than your home connection.
            Many of those servers sit in datacenters, which is why hosting
            networks are a strong signal that traffic isn't coming from a regular
            household.
          </p>
          <p>
            Want more detail? Run a full <a href="/vpn-check">VPN check</a>, test
            for <a href="/ip-leak-test">WebRTC leaks</a>, or see your complete{" "}
            <a href="/">IP and connection report</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
