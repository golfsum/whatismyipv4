import type { Metadata } from "next";
import SslChecker from "@/components/SslChecker";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "SSL Certificate Checker - Test Any Site's HTTPS",
  description:
    "Free SSL checker. Enter a domain to see its HTTPS certificate details: who issued it, when it expires, what it covers, and the TLS version.",
  keywords: ["ssl checker", "ssl certificate checker", "check ssl", "https checker", "certificate expiry"],
  alternates: { canonical: "/ssl-checker" },
};

const FAQ: QA[] = [
  {
    q: "What does this SSL checker do?",
    a: "It connects to a domain over HTTPS and reads its certificate, then shows who issued it, when it expires, which names it covers, and the TLS version in use.",
  },
  {
    q: "Why does my certificate expiry matter?",
    a: "When a certificate expires, visitors see a security warning and may not be able to reach your site. Most certificates auto-renew, but it's worth checking if you manage your own.",
  },
  {
    q: "What is TLS?",
    a: "TLS is the encryption behind HTTPS. Modern sites should use TLS 1.2 or 1.3. Older versions are considered insecure.",
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
            { name: "SSL Checker", href: "/ssl-checker" },
          ]}
        />
        <section className="hero">
          <h1>SSL Certificate Checker</h1>
          <p>
            Enter any domain to inspect its HTTPS certificate: the issuer,
            expiry date, covered names, and TLS version.
          </p>
        </section>

        <SslChecker />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>What an SSL certificate does</h2>
          <p>
            An SSL/TLS certificate proves a website is who it claims to be and
            encrypts the connection between your browser and the server. It's
            what turns <code>http</code> into the padlocked <code>https</code>.
            Without a valid certificate, browsers warn visitors away.
          </p>
          <h3>What to check</h3>
          <ul>
            <li>That the certificate is valid and not expired.</li>
            <li>That it covers the exact name you use, including www if needed.</li>
            <li>That it uses a modern TLS version (1.2 or 1.3).</li>
          </ul>
          <p>
            Want to dig deeper into a site? Check its{" "}
            <a href="/http-header-check">HTTP headers</a> or run a{" "}
            <a href="/whois-lookup">WHOIS lookup</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
