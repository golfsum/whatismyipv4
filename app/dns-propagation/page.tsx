import type { Metadata } from "next";
import DnsPropagation from "@/components/DnsPropagation";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "DNS Propagation Checker - Compare Public Resolvers",
  description:
    "Free DNS propagation check. Compare a domain's records across Google, Cloudflare and Quad9 to see whether a recent DNS change has taken effect.",
  keywords: ["dns propagation", "dns propagation checker", "dns propagation check", "check dns propagation"],
  alternates: { canonical: "/dns-propagation" },
};

const FAQ: QA[] = [
  {
    q: "What is DNS propagation?",
    a: "When you change a DNS record, resolvers around the world keep the old answer cached until it expires. Propagation is the period while that change spreads. It can take minutes to a couple of days depending on the record's TTL.",
  },
  {
    q: "How does this checker work?",
    a: "It queries the same record from several major public resolvers at once and compares the answers. If they all match, the change has likely propagated. If they differ, it's still spreading.",
  },
  {
    q: "How long does propagation take?",
    a: "Usually a few minutes to a few hours, but it can take up to 48 hours. Lowering a record's TTL before you make a change makes future updates propagate faster.",
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
            { name: "DNS Propagation", href: "/dns-propagation" },
          ]}
        />
        <section className="hero">
          <h1>DNS Propagation Checker</h1>
          <p>
            Compare a domain&apos;s records across major public resolvers to see
            whether a recent DNS change has taken effect.
          </p>
        </section>

        <DnsPropagation />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Why records take time to update</h2>
          <p>
            DNS is cached at every step to keep the internet fast. Each record
            has a TTL (time to live) that tells resolvers how long to hold the
            answer before checking again. After you make a change, resolvers keep
            serving the old value until their cache expires, which is why a new
            record can appear in some places before others.
          </p>
          <p>
            Want to inspect the records themselves? Use the{" "}
            <a href="/dns-lookup">DNS lookup</a> tool, or learn{" "}
            <a href="/guides/what-is-dns">how DNS works</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
