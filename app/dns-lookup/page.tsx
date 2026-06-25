import type { Metadata } from "next";
import DnsTool from "@/components/DnsTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "DNS Lookup — Check A, AAAA, CNAME, NS, TXT Records",
  description:
    "Free DNS lookup tool. Check A, AAAA, CNAME, NS, MX, TXT, SOA and CAA records for any domain instantly, using secure DNS-over-HTTPS. No signup.",
  keywords: [
    "dns lookup",
    "dns checker",
    "dns records",
    "a record lookup",
    "txt record lookup",
    "ns lookup",
    "nslookup online",
  ],
  alternates: { canonical: "/dns-lookup" },
};

const FAQ: QA[] = [
  {
    q: "What is a DNS lookup?",
    a: "A DNS lookup queries the Domain Name System to find the records associated with a domain — such as the IP address (A/AAAA), mail servers (MX), or text records (TXT). It's how names like example.com turn into addresses computers can reach.",
  },
  {
    q: "What do the different record types mean?",
    a: "A = IPv4 address, AAAA = IPv6 address, CNAME = alias to another name, NS = authoritative name servers, MX = mail servers, TXT = free-form text (often SPF/verification), SOA = zone info, CAA = which CAs may issue certificates.",
  },
  {
    q: "What is TTL?",
    a: "TTL (time to live) is how long, in seconds, a record may be cached by resolvers before they re-check. Lower TTLs propagate changes faster but mean more lookups.",
  },
  {
    q: "Is this the same as nslookup?",
    a: "It serves the same purpose as the nslookup/dig commands, but runs in your browser over secure DNS-over-HTTPS — no terminal needed.",
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
            { name: "DNS Lookup", href: "/dns-lookup" },
          ]}
        />
        <section className="hero">
          <h1>DNS Lookup</h1>
          <p>
            Check any domain&apos;s DNS records — A, AAAA, CNAME, NS, MX, TXT, SOA
            and CAA — instantly, using secure DNS-over-HTTPS.
          </p>
        </section>

        <DnsTool defaultType="A" />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>How DNS works</h2>
          <p>
            The <strong>Domain Name System</strong> is the internet&apos;s phone
            book: it translates human-friendly names like <code>example.com</code>{" "}
            into the IP addresses machines use. When you visit a site, your device
            asks a DNS resolver for the domain&apos;s records, caches the answer
            for its TTL, and connects to the returned address.
          </p>
          <h3>Common record types</h3>
          <ul>
            <li><strong>A / AAAA</strong> — the IPv4 / IPv6 address of the host.</li>
            <li><strong>CNAME</strong> — an alias pointing to another domain.</li>
            <li><strong>MX</strong> — mail servers (see our <a href="/mx-lookup">MX lookup</a>).</li>
            <li><strong>TXT</strong> — verification and email policies like SPF and <a href="/spf-dmarc-lookup">DMARC</a>.</li>
            <li><strong>NS</strong> — the domain&apos;s authoritative name servers.</li>
          </ul>
          <h2>Related tools</h2>
          <p>
            Look up a hostname from an IP with <a href="/reverse-dns">Reverse DNS</a>,
            or check your own connection on the <a href="/">home page</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
