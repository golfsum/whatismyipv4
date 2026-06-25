import type { Metadata } from "next";
import ReverseDns from "@/components/ReverseDns";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Reverse DNS Lookup — IP Address to Hostname (PTR)",
  description:
    "Free reverse DNS lookup. Enter an IPv4 or IPv6 address to find its PTR (hostname) record. Runs in your browser via DNS-over-HTTPS.",
  keywords: [
    "reverse dns lookup",
    "reverse dns",
    "ptr record lookup",
    "ip to hostname",
    "rdns lookup",
    "reverse ip lookup",
  ],
  alternates: { canonical: "/reverse-dns" },
};

const FAQ: QA[] = [
  {
    q: "What is a reverse DNS (PTR) lookup?",
    a: "A reverse DNS lookup maps an IP address back to a hostname using a PTR record — the opposite of a normal lookup that maps a name to an IP. For example, 8.8.8.8 resolves to dns.google.",
  },
  {
    q: "Why doesn't my IP have a PTR record?",
    a: "Not every IP has reverse DNS configured. Home/residential IPs often have a generic ISP-assigned PTR or none at all. Reverse DNS is set by whoever controls the IP block (usually your ISP or host).",
  },
  {
    q: "Why is reverse DNS important?",
    a: "Mail servers use it to help verify senders and fight spam — a missing or mismatched PTR can cause your email to be rejected. It's also handy for diagnostics and identifying what owns an IP.",
  },
  {
    q: "Does it work for IPv6?",
    a: "Yes. Enter an IPv6 address and we build the ip6.arpa reverse name automatically before querying its PTR record.",
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
            { name: "Reverse DNS", href: "/reverse-dns" },
          ]}
        />
        <section className="hero">
          <h1>Reverse DNS Lookup</h1>
          <p>
            Find the hostname (PTR record) behind any IPv4 or IPv6 address — the
            reverse of a normal DNS lookup.
          </p>
        </section>

        <ReverseDns />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>What reverse DNS tells you</h2>
          <p>
            A standard <a href="/dns-lookup">DNS lookup</a> turns a name into an
            IP. <strong>Reverse DNS</strong> does the opposite: it asks &quot;what
            hostname is registered for this IP?&quot; via a <strong>PTR</strong>{" "}
            record stored under the special <code>in-addr.arpa</code> (IPv4) or{" "}
            <code>ip6.arpa</code> (IPv6) zones.
          </p>
          <h3>Where it&apos;s used</h3>
          <ul>
            <li>
              <strong>Email deliverability</strong> — receiving servers check
              that a sending IP&apos;s PTR matches its forward record.
            </li>
            <li>
              <strong>Network diagnostics</strong> — identifying which host or
              provider an address belongs to.
            </li>
            <li>
              <strong>Logging</strong> — turning raw IPs in logs into readable
              names.
            </li>
          </ul>
          <h2>Related tools</h2>
          <p>
            Want your own details? See your <a href="/">public IP</a>, its{" "}
            <a href="/ip-location">location</a>, and run a{" "}
            <a href="/dns-lookup">forward DNS lookup</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
