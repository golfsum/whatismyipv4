import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "What Is My Router IP? - Find Your Default Gateway (192.168.x.x)",
  description:
    "What is my router IP address? Learn how to find your router's local gateway IP (like 192.168.0.1 or 192.168.1.1) on Windows, Mac, Android and iPhone, plus a list of common defaults.",
  keywords: [
    "what is my router ip",
    "router ip address",
    "default gateway",
    "192.168.1.1",
    "192.168.0.1",
    "find router ip",
    "how to login to router",
    "local ip address",
  ],
  alternates: { canonical: "/what-is-my-router-ip" },
  openGraph: {
    title: "What Is My Router IP? - Find Your Default Gateway",
    description:
      "How to find your router's local gateway IP on any device, plus common defaults.",
    url: "/what-is-my-router-ip",
  },
};

const COMMON: { brand: string; ip: string }[] = [
  { brand: "Most routers", ip: "192.168.1.1" },
  { brand: "TP-Link, D-Link, Netgear", ip: "192.168.0.1" },
  { brand: "Xfinity / Comcast", ip: "10.0.0.1" },
  { brand: "Linksys", ip: "192.168.1.1" },
  { brand: "ASUS", ip: "192.168.1.1 / 192.168.50.1" },
  { brand: "Some ISPs / Apple", ip: "10.0.0.1 / 10.0.1.1" },
];

const FAQ: QA[] = [
  {
    q: "What is my router's IP address?",
    a: "Your router's IP (the 'default gateway') is the local address you type into a browser to open its settings - most often 192.168.1.1, 192.168.0.1 or 10.0.0.1. It is a private address used only inside your home network.",
  },
  {
    q: "What is the difference between my router IP and my public IP?",
    a: "Your router IP is a private/local address (like 192.168.1.1) reachable only inside your network. Your public IP is the single address your whole network shows to the internet. To see your public IP, open the What Is My IP home page.",
  },
  {
    q: "How do I log in to my router?",
    a: "Type your router's IP into a web browser's address bar and press Enter. Enter the admin username and password (often printed on a sticker on the router). If you've never changed them, common defaults are admin/admin or admin/password.",
  },
  {
    q: "192.168.1.1 isn't loading - what now?",
    a: "Make sure you're connected to that router's Wi-Fi or cable, then find the real gateway using the steps above (it may be 192.168.0.1 or 10.0.0.1). Check for typos, and try a different browser or incognito window.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <h1>What Is My Router IP Address?</h1>
          <p>
            Your <strong>router IP</strong> (default gateway) is the local
            address you use to open your router&apos;s settings - usually
            something like <code>192.168.1.1</code>. Here&apos;s how to find it
            on any device.
          </p>
        </section>

        <div className="callout">
          <strong>Looking for your public IP instead?</strong> That&apos;s the
          address the internet sees - <a href="/">check your public IP here</a>.
          This page is about your <em>local</em> router/gateway address.
        </div>

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Find your router IP by device</h2>

          <h3>Windows</h3>
          <p>
            Press <code>Win + R</code>, type <code>cmd</code> and press Enter.
            In the command prompt type <code>ipconfig</code> and look for{" "}
            <strong>Default Gateway</strong> under your active adapter.
          </p>

          <h3>macOS</h3>
          <p>
            Open <strong>System Settings → Network</strong>, select your
            connection, click <strong>Details</strong> → <strong>TCP/IP</strong>{" "}
            and read the <strong>Router</strong> field. Or run{" "}
            <code>netstat -nr | grep default</code> in Terminal.
          </p>

          <h3>Android</h3>
          <p>
            Go to <strong>Settings → Network &amp; internet → Wi-Fi</strong>, tap
            your network, and view the <strong>Gateway</strong> under advanced /
            IP details.
          </p>

          <h3>iPhone &amp; iPad</h3>
          <p>
            Open <strong>Settings → Wi-Fi</strong>, tap the ⓘ next to your
            network, and read the <strong>Router</strong> field.
          </p>

          <h2>Common default router IP addresses</h2>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Router / ISP</th>
                <th>Typical gateway IP</th>
              </tr>
            </thead>
            <tbody>
              {COMMON.map((r) => (
                <tr key={r.brand}>
                  <td>{r.brand}</td>
                  <td>
                    <code>{r.ip}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Router IP vs public IP</h2>
          <p>
            Your <strong>router IP</strong> is private - it only works inside
            your home and every household uses similar ranges. Your{" "}
            <a href="/what-is-my-ipv4">public IPv4 address</a> is what the
            internet sees. Curious where that places you?{" "}
            <a href="/ip-location">See your IP location on a map</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
