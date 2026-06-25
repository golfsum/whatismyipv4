import type { Metadata } from "next";
import UserAgentTool from "@/components/UserAgentTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "What Is My User Agent? - View & Decode Your UA String",
  description:
    "See your browser's user agent string and what it means - browser, version, engine, operating system and device. Free user agent checker, copy with one click.",
  keywords: [
    "what is my user agent",
    "my user agent",
    "user agent string",
    "user agent checker",
    "browser user agent",
    "ua string",
  ],
  alternates: { canonical: "/user-agent" },
};

const FAQ: QA[] = [
  {
    q: "What is a user agent?",
    a: "A user agent is a text string your browser sends with every request to identify itself - including the browser name and version, rendering engine, and operating system. Servers use it to deliver compatible content.",
  },
  {
    q: "Why does my user agent look so complicated?",
    a: "For historical compatibility reasons, modern user agents include tokens like 'Mozilla/5.0' and 'like Gecko' even on browsers that aren't Mozilla or Gecko-based. It's legacy baggage every browser still carries.",
  },
  {
    q: "Can I change my user agent?",
    a: "Yes. Browser developer tools and extensions let you spoof your user agent, which is useful for testing. Note that many other signals (see our Browser Info tool) can still reveal your real browser.",
  },
  {
    q: "Is my user agent unique to me?",
    a: "Not on its own - many people share the same user agent. But combined with other browser attributes it contributes to a fingerprint that can be quite identifying.",
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
            { name: "User Agent", href: "/user-agent" },
          ]}
        />
        <section className="hero">
          <h1>What Is My User Agent?</h1>
          <p>
            Your browser&apos;s user agent string, decoded into the browser,
            engine, operating system and device it represents.
          </p>
        </section>

        <UserAgentTool />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Understanding the user agent string</h2>
          <p>
            The <strong>user agent</strong> (UA) is sent in an HTTP header with
            every page request. It tells the server which browser and platform
            you&apos;re using so it can serve compatible pages. A typical UA packs
            several tokens: a legacy <code>Mozilla/5.0</code> prefix, the platform
            (e.g. <code>Windows NT 10.0</code>), the engine (
            <code>AppleWebKit</code>), and the browser and version (
            <code>Chrome/124.0</code>).
          </p>
          <h3>What it&apos;s used for</h3>
          <ul>
            <li>Serving the right layout for desktop vs mobile.</li>
            <li>Feature detection fallbacks and compatibility fixes.</li>
            <li>Analytics - counting which browsers visitors use.</li>
            <li>Bot detection and, sometimes, fingerprinting.</li>
          </ul>
          <h2>Related tools</h2>
          <p>
            See everything else your browser exposes with{" "}
            <a href="/browser-info">Browser Info</a>, check your{" "}
            <a href="/">public IP address</a>, or test for{" "}
            <a href="/ip-leak-test">WebRTC IP leaks</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
