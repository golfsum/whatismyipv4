import type { Metadata } from "next";
import DnsTool from "@/components/DnsTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "CNAME Lookup - Check a Domain's CNAME Records",
  description:
    "Free CNAME lookup. Check the CNAME (alias) records for any hostname instantly via secure DNS-over-HTTPS. No signup.",
  keywords: ["cname lookup", "cname record", "alias record", "check cname", "dns cname"],
  alternates: { canonical: "/cname-lookup" },
};

const FAQ: QA[] = [
  {
    q: "What is a CNAME record?",
    a: "A CNAME (canonical name) record points one hostname to another, acting as an alias. For example, www.example.com might be a CNAME to example.com.",
  },
  {
    q: "Can the root domain have a CNAME?",
    a: "Generally no. The root (apex) domain can't use a plain CNAME because it needs other records like NS and SOA. Many DNS providers offer 'CNAME flattening' or ALIAS records to work around this.",
  },
  {
    q: "Why use a CNAME?",
    a: "CNAMEs make it easy to point subdomains at a service (like a CDN or app host) without hardcoding IP addresses, so the target can change without you updating your DNS.",
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
            { name: "CNAME Lookup", href: "/cname-lookup" },
          ]}
        />
        <section className="hero">
          <h1>CNAME Lookup</h1>
          <p>Check the CNAME (alias) records for any hostname.</p>
        </section>

        <DnsTool defaultType="CNAME" types={["CNAME", "A", "AAAA", "NS", "MX", "TXT"]} />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>About CNAME records</h2>
          <p>
            A CNAME points one name at another, so the alias inherits whatever
            the target resolves to. It&apos;s commonly used to point subdomains
            at a CDN, app platform, or another domain you control.
          </p>
          <p>
            Related: <a href="/dns-lookup">DNS lookup</a>,{" "}
            <a href="/ns-lookup">NS lookup</a>, and{" "}
            <a href="/reverse-dns">reverse DNS</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
