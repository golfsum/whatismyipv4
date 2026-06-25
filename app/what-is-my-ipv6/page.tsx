import type { Metadata } from "next";
import IpDashboard from "@/components/IpDashboard";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "What Is My IPv6 Address? - Find & Test Your IPv6",
  description:
    "What is my IPv6 address? Instantly see your public IPv6 (and IPv4) address, check whether your connection supports IPv6, and learn what IPv6 means. Free, no signup.",
  keywords: [
    "what is my ipv6",
    "my ipv6 address",
    "ipv6 test",
    "ipv6 address",
    "find my ipv6",
    "do i have ipv6",
    "check ipv6",
  ],
  alternates: { canonical: "/what-is-my-ipv6" },
  openGraph: {
    title: "What Is My IPv6 Address? - Find & Test Your IPv6",
    description:
      "See your public IPv6 address and check if your connection supports IPv6.",
    url: "/what-is-my-ipv6",
  },
};

const FAQ: QA[] = [
  {
    q: "What is my IPv6 address?",
    a: "Your IPv6 address is the modern, longer form of IP address your device uses online, written in hexadecimal like 2001:0db8:85a3::8a2e:0370:7334. The tool above shows your public IPv6 address if your network and ISP support it.",
  },
  {
    q: "Why does it say 'Not detected' for IPv6?",
    a: "It means your current network connected over IPv4 only. Many home and mobile networks have not enabled IPv6 yet. This is normal and your internet will work fine - you simply do not have a public IPv6 address right now.",
  },
  {
    q: "Is IPv6 better than IPv4?",
    a: "IPv6 offers a vastly larger address space, more efficient routing, and removes the need for some forms of address translation (NAT). For everyday browsing you will not notice a difference, but IPv6 is the long-term future of the internet.",
  },
  {
    q: "Should I disable IPv6?",
    a: "Usually no. IPv6 is safe and increasingly required. Only disable it for specific troubleshooting if a particular app or VPN misbehaves, and re-enable it afterwards.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <h1>What Is My IPv6 Address?</h1>
          <p>
            Instantly find your public <strong>IPv6</strong> address and confirm
            whether your connection supports IPv6. Your IPv4 address and location
            are shown too.
          </p>
        </section>

        <IpDashboard />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Understanding IPv6</h2>
          <p>
            <strong>IPv6</strong> (Internet Protocol version 6) is the newest
            internet addressing system, created because the world ran out of the
            roughly 4.3 billion addresses available in{" "}
            <a href="/what-is-my-ipv4">IPv4</a>. An IPv6 address is 128 bits long
            and written as eight groups of hexadecimal digits, for example{" "}
            <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>, often shortened
            by collapsing zero groups to <code>2001:db8:85a3::8a2e:370:7334</code>
            .
          </p>

          <h3>Do I have IPv6?</h3>
          <p>
            If the IPv6 field above shows an address, your connection is{" "}
            <strong>IPv6-enabled</strong>. If it says &quot;Not detected,&quot;
            your network is currently IPv4-only - which is still very common and
            perfectly fine. Whether you get IPv6 depends on your ISP, your router
            settings and the network you are on.
          </p>

          <h3>IPv6 vs IPv4 at a glance</h3>
          <ul>
            <li>
              <strong>Length:</strong> IPv4 is 32-bit (≈4.3 billion addresses);
              IPv6 is 128-bit (340 undecillion addresses).
            </li>
            <li>
              <strong>Format:</strong> IPv4 uses decimal dotted notation; IPv6
              uses hexadecimal with colons.
            </li>
            <li>
              <strong>NAT:</strong> IPv6 gives devices globally unique addresses,
              reducing reliance on network address translation.
            </li>
          </ul>

          <p>
            Want the classic view? Check{" "}
            <a href="/">what is my IP address</a>, your{" "}
            <a href="/ip-location">IP location on a map</a>, or run a{" "}
            <a href="/vpn-check">VPN check</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
