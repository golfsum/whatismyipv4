import type { Metadata } from "next";
import BrowserInfo from "@/components/BrowserInfo";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Browser Info - What Does My Browser Reveal?",
  description:
    "See exactly what your browser reveals about you: browser, OS, device, screen, time zone, language, CPU, cookies and more. Free, runs in your browser.",
  keywords: [
    "browser info",
    "what is my browser",
    "my browser information",
    "what does my browser reveal",
    "browser detection",
    "my screen resolution",
  ],
  alternates: { canonical: "/browser-info" },
};

const FAQ: QA[] = [
  {
    q: "What information does my browser reveal?",
    a: "Every website you visit can read your browser type and version, operating system, screen size, time zone, language and more, all of which is shown above. Put together, these details form a 'fingerprint' that can help identify you even without cookies.",
  },
  {
    q: "Is this information sent to a server?",
    a: "No. This page reads the data your browser already exposes and displays it locally in your browser. We don't store it.",
  },
  {
    q: "How do I reduce what my browser reveals?",
    a: "Use a privacy-focused browser (like Firefox or Brave), keep it updated, disable unnecessary extensions, and consider anti-fingerprinting settings. A VPN hides your IP but not these browser details.",
  },
  {
    q: "What is device memory and CPU cores?",
    a: "Some browsers expose an approximate amount of RAM (device memory) and the number of logical CPU cores. Sites use these to tune performance and, unfortunately, for fingerprinting too.",
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
            { name: "Browser Info", href: "/browser-info" },
          ]}
        />
        <section className="hero">
          <h1>What Does My Browser Reveal?</h1>
          <p>
            A detailed look at the information your web browser exposes to every
            site you visit: browser, OS, device, screen, time zone and more.
          </p>
        </section>

        <BrowserInfo />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Your browser is more revealing than you think</h2>
          <p>
            When you load a web page, your browser automatically shares dozens of
            details so the site can render correctly. Individually they seem
            harmless, but together they create a{" "}
            <strong>browser fingerprint</strong>: a combination unique enough to
            recognise you across visits, even in private mode and without cookies.
          </p>
          <h3>What each value means</h3>
          <ul>
            <li>
              <strong>Browser &amp; engine</strong>: the software rendering this
              page and its layout engine (Blink, WebKit or Gecko).
            </li>
            <li>
              <strong>Operating system &amp; device</strong>: your platform and
              whether you&apos;re on desktop, mobile or tablet.
            </li>
            <li>
              <strong>Screen, viewport &amp; pixel ratio</strong>: your display
              size and density. An unusual combination helps fingerprinting.
            </li>
            <li>
              <strong>Time zone &amp; language</strong>: strong hints about your
              region, independent of your <a href="/ip-location">IP location</a>.
            </li>
            <li>
              <strong>Color scheme</strong>: whether you prefer light or dark
              mode, exposed by the browser to style pages.
            </li>
            <li>
              <strong>CPU cores &amp; device memory</strong>: rough hardware
              specs some browsers report, used to tune performance and, sadly, to
              fingerprint.
            </li>
            <li>
              <strong>Cookies</strong>: whether the browser stores cookies. With
              them on, sites can remember you across visits.
            </li>
            <li>
              <strong>Do Not Track</strong>: a request not to be tracked. It&apos;s
              optional for sites to honour, so it&apos;s a weak signal.
            </li>
            <li>
              <strong>WebRTC</strong>: a feature that can leak your real IP, even
              behind a VPN. Test it with our{" "}
              <a href="/ip-leak-test">IP leak test</a>.
            </li>
            <li>
              <strong>Canvas &amp; WebGL</strong>: drawing APIs that render
              slightly differently on each device, a powerful fingerprinting
              source.
            </li>
            <li>
              <strong>User agent</strong>: the identification string your browser
              sends. Decode yours with the{" "}
              <a href="/user-agent">user agent tool</a>.
            </li>
            <li>
              <strong>Privacy score</strong>: our summary of how exposed your
              browser is, based on the signals above.
            </li>
          </ul>
          <h2>Protecting your privacy</h2>
          <p>
            A <a href="/vpn-check">VPN</a> masks your IP address but not these
            browser details. To reduce fingerprinting, use an up-to-date
            privacy-respecting browser and limit extensions. Check whether your
            real IP leaks with our <a href="/ip-leak-test">IP leak test</a>, and
            see your full network profile on the{" "}
            <a href="/">home page</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
