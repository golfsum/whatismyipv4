import type { Metadata } from "next";
import HttpHeaderTool from "@/components/HttpHeaderTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "HTTP Header Checker - View Any Site's Response Headers",
  description:
    "Free HTTP header checker. See the response headers any URL returns, plus a quick check of the key security headers like HSTS and CSP.",
  keywords: ["http header check", "http headers", "response headers", "check headers", "view http headers"],
  alternates: { canonical: "/http-header-check" },
};

const FAQ: QA[] = [
  {
    q: "What are HTTP headers?",
    a: "They're extra information a server sends with every response, covering things like content type, caching, cookies, and security policies. Browsers act on them behind the scenes.",
  },
  {
    q: "Which security headers should a site have?",
    a: "The important ones are HSTS, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. This tool flags which are present.",
  },
  {
    q: "Why does a site show fewer headers than expected?",
    a: "Some servers only return certain headers on full page loads, or strip them behind a CDN. This tool reads what the server returns for the URL you enter.",
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
            { name: "HTTP Headers", href: "/http-header-check" },
          ]}
        />
        <section className="hero">
          <h1>HTTP Header Checker</h1>
          <p>
            Enter a URL to see the response headers it returns, along with a
            quick read on its key security headers.
          </p>
        </section>

        <HttpHeaderTool focus="all" />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Why headers matter</h2>
          <p>
            Headers control caching, content types, cookies, and security. For
            site owners and developers they're the quickest way to confirm a
            server is configured the way you expect. For everyone else, the
            security headers are a useful signal of how seriously a site takes
            safety.
          </p>
          <p>
            For a focused security grade, try the{" "}
            <a href="/security-header-analyzer">security header analyzer</a>, or
            check a site's <a href="/ssl-checker">SSL certificate</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
