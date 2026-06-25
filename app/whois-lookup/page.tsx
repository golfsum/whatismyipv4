import type { Metadata } from "next";
import WhoisTool from "@/components/WhoisTool";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "WHOIS Lookup - Domain Registration Details",
  description:
    "Free WHOIS lookup. Find a domain's registrar, registration and expiry dates, status, and name servers, using the modern RDAP protocol.",
  keywords: ["whois lookup", "whois", "domain lookup", "domain registration", "domain expiry check"],
  alternates: { canonical: "/whois-lookup" },
};

const FAQ: QA[] = [
  {
    q: "What is a WHOIS lookup?",
    a: "It returns registration details for a domain, such as the registrar, when it was registered, when it expires, and its name servers. This tool uses RDAP, the modern replacement for classic WHOIS.",
  },
  {
    q: "Why can't I see the owner's name?",
    a: "Most registries now redact personal contact details for privacy, often using a privacy service. You'll usually see the registrar and dates, but not the individual's name.",
  },
  {
    q: "How do I check when a domain expires?",
    a: "Enter the domain above and look at the Expires field. It's handy for spotting domains about to lapse or confirming your own renewal dates.",
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
            { name: "WHOIS Lookup", href: "/whois-lookup" },
          ]}
        />
        <section className="hero">
          <h1>WHOIS Lookup</h1>
          <p>
            Find a domain's registrar, registration and expiry dates, status,
            and name servers.
          </p>
        </section>

        <WhoisTool />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>What WHOIS tells you</h2>
          <p>
            Every registered domain has a record of who registered it and when.
            WHOIS, and its modern successor RDAP, expose the public parts of that
            record: the registrar that manages it, the key dates, the current
            status, and the name servers that run its DNS.
          </p>
          <p>
            Pair this with a <a href="/dns-lookup">DNS lookup</a> to see the
            domain's live records, or check its{" "}
            <a href="/ssl-checker">SSL certificate</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
