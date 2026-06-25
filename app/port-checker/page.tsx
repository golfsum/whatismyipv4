import type { Metadata } from "next";
import PortChecker from "@/components/PortChecker";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Open Port Checker - Test If a Port Is Open",
  description:
    "Free port checker. Test whether a TCP port is open on your IP or any host, with quick presets for HTTP, HTTPS, SSH, RDP and more.",
  keywords: ["port checker", "open port checker", "port scanner", "check open port", "is my port open"],
  alternates: { canonical: "/port-checker" },
};

const FAQ: QA[] = [
  {
    q: "What does this port checker do?",
    a: "It tries to open a TCP connection to the host and port you enter. If the connection succeeds, the port is open and reachable from the internet. If it times out, the port is closed or a firewall is blocking it.",
  },
  {
    q: "Why is my port closed?",
    a: "Home routers block incoming connections by default for security. To open one you'd set up port forwarding on your router, and your ISP must not be using carrier-grade NAT.",
  },
  {
    q: "Is leaving ports closed a good thing?",
    a: "Yes. Closed incoming ports are normal and safer for home users. Only open a port when a specific app, like a game server, needs it.",
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
            { name: "Port Checker", href: "/port-checker" },
          ]}
        />
        <section className="hero">
          <h1>Open Port Checker</h1>
          <p>
            Test whether a TCP port is open on your IP or any host. Leave the
            host blank to check your own public IP.
          </p>
        </section>

        <PortChecker />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>How port checking works</h2>
          <p>
            Every internet service listens on a numbered port: web servers on 80
            and 443, SSH on 22, and so on. This tool attempts a connection to the
            port you choose. A successful connection means the port is open and
            something is listening. A timeout means it&apos;s closed or filtered
            by a firewall.
          </p>
          <h3>Common ports</h3>
          <ul>
            <li><strong>80 / 443</strong>: web traffic (HTTP / HTTPS).</li>
            <li><strong>22</strong>: SSH remote access.</li>
            <li><strong>25</strong>: email (SMTP).</li>
            <li><strong>3389</strong>: Windows Remote Desktop.</li>
          </ul>
          <p>
            Curious about carrier-grade NAT, which can stop port forwarding
            working at all? Read{" "}
            <a href="/guides/what-is-cgnat">what CGNAT is</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
