import type { Metadata } from "next";
import DnsTool from "@/components/DnsTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "NS Lookup - Find a Domain's Name Servers",
  description:
    "Free NS lookup. Find the authoritative name servers for any domain instantly via secure DNS-over-HTTPS. No signup.",
  keywords: ["ns lookup", "name server lookup", "nameserver lookup", "find name servers", "ns records"],
  alternates: { canonical: "/ns-lookup" },
};

const FAQ: QA[] = [
  {
    q: "What is an NS record?",
    a: "An NS (name server) record lists the authoritative name servers responsible for a domain's DNS. These are the servers that hold the real answers for the domain's records.",
  },
  {
    q: "Why does a domain have multiple name servers?",
    a: "For redundancy. If one name server is unreachable, others can still answer, so the domain stays online.",
  },
  {
    q: "How do I change my name servers?",
    a: "You set them at your domain registrar. Changing them points your domain to a different DNS provider, and it can take time to propagate.",
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
            { name: "NS Lookup", href: "/ns-lookup" },
          ]}
        />
        <section className="hero">
          <h1>NS Lookup</h1>
          <p>Find the authoritative name servers for any domain.</p>
        </section>

        <DnsTool defaultType="NS" types={["NS", "SOA", "A", "AAAA", "CNAME", "MX", "TXT"]} />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>About name servers</h2>
          <p>
            Name servers are the authoritative source for a domain&apos;s DNS
            records. When you change name servers, you move your domain&apos;s DNS
            to a new provider. Checking a domain&apos;s NS records confirms which
            provider currently runs its DNS.
          </p>
          <p>
            Related: <a href="/dns-lookup">DNS lookup</a>,{" "}
            <a href="/dns-propagation">DNS propagation</a>, and{" "}
            <a href="/whois-lookup">WHOIS lookup</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
