import type { Metadata } from "next";
import DnsTool from "@/components/DnsTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "TXT Lookup - Check a Domain's TXT Records",
  description:
    "Free TXT record lookup. Check the TXT records for any domain, including SPF, verification and DMARC entries, via secure DNS-over-HTTPS.",
  keywords: ["txt lookup", "txt record", "dns txt", "check txt records", "spf record"],
  alternates: { canonical: "/txt-lookup" },
};

const FAQ: QA[] = [
  {
    q: "What is a TXT record?",
    a: "A TXT record holds free-form text in DNS. It's widely used for email security (SPF and DMARC), domain ownership verification, and other service configuration.",
  },
  {
    q: "What's in a typical TXT record?",
    a: "Common ones include v=spf1 records that authorise mail senders, domain-verification strings from services like Google, and DMARC policies under _dmarc.yourdomain.",
  },
  {
    q: "Why do I see multiple TXT records?",
    a: "Domains often have several, one per service or policy. That's normal. Each is read independently by whatever service it's meant for.",
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
            { name: "TXT Lookup", href: "/txt-lookup" },
          ]}
        />
        <section className="hero">
          <h1>TXT Lookup</h1>
          <p>Check the TXT records for any domain, including SPF and verification entries.</p>
        </section>

        <DnsTool defaultType="TXT" types={["TXT", "A", "AAAA", "MX", "NS", "CNAME"]} />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>About TXT records</h2>
          <p>
            TXT records store text that other systems read. They power email
            authentication like SPF and DMARC, prove domain ownership for many
            services, and carry assorted configuration values.
          </p>
          <p>
            For email security specifically, use the{" "}
            <a href="/spf-dmarc-lookup">SPF &amp; DMARC checker</a>. See also the{" "}
            <a href="/dns-lookup">DNS lookup</a> tool.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
