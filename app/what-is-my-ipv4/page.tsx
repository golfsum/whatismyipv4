import type { Metadata } from "next";
import IpDashboard from "@/components/IpDashboard";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "What Is My IPv4 Address? — Find Your Public IPv4",
  description:
    "What is my IPv4 address? Instantly see your public IPv4 address, location, ISP and VPN status. Free IPv4 lookup, works on any device, no signup.",
  keywords: [
    "what is my ipv4",
    "my ipv4 address",
    "ipv4 address",
    "find my ipv4",
    "public ipv4",
    "check my ipv4",
  ],
  alternates: { canonical: "/what-is-my-ipv4" },
  openGraph: {
    title: "What Is My IPv4 Address? — Find Your Public IPv4",
    description: "See your public IPv4 address, location, ISP and VPN status.",
    url: "/what-is-my-ipv4",
  },
};

const FAQ: QA[] = [
  {
    q: "What is my IPv4 address?",
    a: "Your IPv4 address is the standard four-number public address that identifies your network on the internet, such as 203.0.113.42. It is shown at the top of this page exactly as servers and websites see it.",
  },
  {
    q: "What does an IPv4 address look like?",
    a: "An IPv4 address has four numbers (0–255) separated by dots, for example 192.0.2.1. Private home addresses usually start with 192.168, 10. or 172.16–31, while your public IPv4 is assigned by your ISP.",
  },
  {
    q: "What is the difference between public and private IPv4?",
    a: "Your public IPv4 is the single address your whole home network shows to the internet. Private IPv4 addresses (like 192.168.0.5) are used inside your network for each device. This page shows your public IPv4.",
  },
  {
    q: "Why is my IPv4 different from my friend's?",
    a: "Every internet connection gets its own public IPv4 from its ISP, tied to a rough geographic area. Different networks, cities and providers all have different addresses.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <h1>What Is My IPv4 Address?</h1>
          <p>
            Instantly find your public <strong>IPv4 address</strong> along with
            your location, ISP and VPN status — free and with no signup.
          </p>
        </section>

        <IpDashboard />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Understanding your IPv4 address</h2>
          <p>
            <strong>IPv4</strong> (Internet Protocol version 4) is the original
            and still most common internet addressing system. An IPv4 address is
            a 32-bit number shown as four octets separated by dots, like{" "}
            <code>198.51.100.24</code>. Each connection on the internet has a
            unique <strong>public IPv4</strong> address assigned by its Internet
            Service Provider.
          </p>

          <h3>Public vs private IPv4</h3>
          <p>
            Inside your home, every device (phone, laptop, TV) has a{" "}
            <strong>private</strong> IPv4 address handed out by your router, such
            as <code>192.168.1.10</code>. To the outside world, all of them share
            one <strong>public</strong> IPv4 — the address shown above. To find
            your local one, see{" "}
            <a href="/what-is-my-router-ip">what is my router IP</a>.
          </p>

          <h3>Why IPv4 addresses ran out</h3>
          <p>
            IPv4 supports about 4.3 billion addresses, which the explosion of
            internet-connected devices exhausted. That shortage led to the
            creation of <a href="/what-is-my-ipv6">IPv6</a>, with a practically
            unlimited supply. Many networks now run both side by side.
          </p>

          <p>
            Explore more: <a href="/ip-location">IP location</a>,{" "}
            <a href="/vpn-check">VPN check</a>, or test your{" "}
            <a href="/speedtest">internet speed</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
