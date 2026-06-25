import type { Metadata } from "next";
import SpfDmarcTool from "@/components/SpfDmarcTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "SPF & DMARC Lookup - Check Email Security Records",
  description:
    "Free SPF and DMARC checker. Look up a domain's SPF and DMARC email-authentication records to see if it's protected against spoofing. Runs via DNS-over-HTTPS.",
  keywords: [
    "spf lookup",
    "dmarc lookup",
    "spf checker",
    "dmarc checker",
    "email authentication",
    "spf record check",
    "dmarc record check",
  ],
  alternates: { canonical: "/spf-dmarc-lookup" },
};

const FAQ: QA[] = [
  {
    q: "What is an SPF record?",
    a: "SPF (Sender Policy Framework) is a TXT record listing which mail servers are allowed to send email for your domain. Receiving servers use it to detect forged senders.",
  },
  {
    q: "What is a DMARC record?",
    a: "DMARC builds on SPF and DKIM. It's a TXT record at _dmarc.yourdomain that tells receivers what to do with messages that fail authentication (none, quarantine, or reject) and where to send reports.",
  },
  {
    q: "Do I need both SPF and DMARC?",
    a: "Yes - together with DKIM they form modern email authentication. SPF and DKIM verify the sender; DMARC enforces a policy and gives you visibility. Missing records make your domain easier to spoof.",
  },
  {
    q: "What does a good DMARC policy look like?",
    a: "Start with p=none to monitor, then move to p=quarantine and ideally p=reject once you've confirmed legitimate mail passes. Always include a rua= address to receive aggregate reports.",
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
            { name: "SPF & DMARC", href: "/spf-dmarc-lookup" },
          ]}
        />
        <section className="hero">
          <h1>SPF &amp; DMARC Lookup</h1>
          <p>
            Check whether a domain has SPF and DMARC email-authentication records
            - the records that stop attackers spoofing its email.
          </p>
        </section>

        <SpfDmarcTool />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Why email authentication matters</h2>
          <p>
            Without authentication, anyone can forge email that appears to come
            from your domain. <strong>SPF</strong>, <strong>DKIM</strong> and{" "}
            <strong>DMARC</strong> work together to prove a message is genuine and
            tell receivers how to handle fakes - protecting your brand and
            improving deliverability.
          </p>
          <h3>What this tool checks</h3>
          <ul>
            <li>
              <strong>SPF</strong> - the <code>v=spf1</code> TXT record on your
              domain listing authorised senders.
            </li>
            <li>
              <strong>DMARC</strong> - the <code>v=DMARC1</code> TXT record at{" "}
              <code>_dmarc.yourdomain</code> defining your enforcement policy.
            </li>
          </ul>
          <p>
            DKIM uses a selector that varies per provider, so it isn&apos;t
            auto-discoverable here - check your email provider&apos;s docs for
            your DKIM selector.
          </p>
          <h2>Related tools</h2>
          <p>
            See where mail is delivered with <a href="/mx-lookup">MX Lookup</a>,
            or inspect all records with <a href="/dns-lookup">DNS Lookup</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
