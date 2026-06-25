import type { Metadata } from "next";
import HttpHeaderTool from "@/components/HttpHeaderTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Security Header Analyzer - Grade a Site's Headers",
  description:
    "Free security header analyzer. Check whether a site sets HSTS, CSP, X-Frame-Options and other headers that protect visitors, with a simple score.",
  keywords: ["security header analyzer", "security headers", "hsts check", "csp check", "header security scan"],
  alternates: { canonical: "/security-header-analyzer" },
};

const FAQ: QA[] = [
  {
    q: "What is a security header?",
    a: "It's an HTTP response header that tells the browser to enforce a protection, like forcing HTTPS (HSTS) or blocking the page from being framed (X-Frame-Options).",
  },
  {
    q: "What's a good score?",
    a: "More is better, but context matters. A simple static site rarely needs all six, while a site handling logins or payments should set most of them.",
  },
  {
    q: "How do I add these headers?",
    a: "They're set on your web server or hosting platform. Most frameworks and CDNs let you add response headers in a config file or dashboard.",
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
            { name: "Security Headers", href: "/security-header-analyzer" },
          ]}
        />
        <section className="hero">
          <h1>Security Header Analyzer</h1>
          <p>
            Check whether a site sets the headers that protect visitors, such as
            HSTS, Content-Security-Policy and X-Frame-Options.
          </p>
        </section>

        <HttpHeaderTool focus="security" />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>The headers that matter</h2>
          <ul>
            <li><strong>HSTS</strong>: forces browsers to use HTTPS only.</li>
            <li><strong>Content-Security-Policy</strong>: limits where scripts and resources can load from, the strongest defence against cross-site scripting.</li>
            <li><strong>X-Frame-Options</strong>: stops your page being embedded in a frame, which prevents clickjacking.</li>
            <li><strong>X-Content-Type-Options</strong>: stops the browser guessing file types.</li>
            <li><strong>Referrer-Policy</strong>: controls how much address information is shared when users click away.</li>
            <li><strong>Permissions-Policy</strong>: restricts powerful features like camera and location.</li>
          </ul>
          <p>
            See the raw response with the{" "}
            <a href="/http-header-check">HTTP header checker</a>, or verify a
            site's <a href="/ssl-checker">SSL certificate</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
