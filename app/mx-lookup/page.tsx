import type { Metadata } from "next";
import DnsTool from "@/components/DnsTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "MX Lookup - Check a Domain's Mail Server Records",
  description:
    "Free MX record lookup. Find the mail servers (MX records) and their priorities for any domain, instantly via DNS-over-HTTPS. No signup.",
  keywords: [
    "mx lookup",
    "mx record lookup",
    "mail server lookup",
    "check mx records",
    "email dns",
    "mx checker",
  ],
  alternates: { canonical: "/mx-lookup" },
};

const FAQ: QA[] = [
  {
    q: "What is an MX record?",
    a: "An MX (Mail eXchange) record tells other mail servers where to deliver email for a domain. Each MX record points to a mail server hostname and has a priority - lower numbers are tried first.",
  },
  {
    q: "What does the MX priority mean?",
    a: "When a domain lists multiple mail servers, the priority (preference) value decides order: the lowest number is the primary, higher numbers are backups used if the primary is unavailable.",
  },
  {
    q: "Why does a domain have no MX records?",
    a: "It may not receive email, or it uses the A record as a fallback. Domains that use Google Workspace, Microsoft 365 or other providers will show that provider's mail servers here.",
  },
  {
    q: "How do MX records relate to SPF and DMARC?",
    a: "MX controls where mail is delivered; SPF and DMARC (stored as TXT records) control who is allowed to send mail as your domain. Check those with our SPF & DMARC tool.",
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
            { name: "MX Lookup", href: "/mx-lookup" },
          ]}
        />
        <section className="hero">
          <h1>MX Record Lookup</h1>
          <p>
            Find the mail servers (MX records) and priorities for any domain,
            instantly via secure DNS-over-HTTPS.
          </p>
        </section>

        <DnsTool defaultType="MX" types={["MX", "TXT", "A", "AAAA", "CNAME"]} />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Understanding MX records</h2>
          <p>
            When someone emails <code>you@example.com</code>, the sending server
            looks up <code>example.com</code>&apos;s <strong>MX records</strong>{" "}
            to find where to deliver the message. Each record lists a mail server
            and a <strong>priority</strong>; servers try the lowest priority
            first and fall back to higher ones.
          </p>
          <h3>What to check</h3>
          <ul>
            <li>That MX records exist and point to the right provider.</li>
            <li>That priorities are sensible (one clear primary).</li>
            <li>
              That email authentication is set up - verify{" "}
              <a href="/spf-dmarc-lookup">SPF &amp; DMARC</a> too.
            </li>
          </ul>
          <h2>Related tools</h2>
          <p>
            Run a full <a href="/dns-lookup">DNS lookup</a> for other record
            types, or a <a href="/reverse-dns">reverse DNS</a> on a mail
            server&apos;s IP.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
