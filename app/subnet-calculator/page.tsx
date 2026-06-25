import type { Metadata } from "next";
import SubnetCalculator from "@/components/SubnetCalculator";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Subnet Calculator - CIDR, Netmask & Host Range",
  description:
    "Free IPv4 subnet calculator. Enter an IP and CIDR prefix to get the network address, broadcast, subnet mask, wildcard, host range and number of usable hosts.",
  keywords: [
    "subnet calculator",
    "cidr calculator",
    "ip calculator",
    "subnet mask calculator",
    "network address calculator",
    "cidr to ip range",
  ],
  alternates: { canonical: "/subnet-calculator" },
};

const FAQ: QA[] = [
  {
    q: "What is a subnet calculator?",
    a: "It takes an IP address and a CIDR prefix (like /24) and works out the network address, broadcast address, subnet mask, usable host range and total hosts, so you don't have to do the binary math yourself.",
  },
  {
    q: "What does the /24 (CIDR) mean?",
    a: "The number after the slash is how many bits are fixed for the network. /24 means the first 24 bits are the network and the last 8 identify hosts, giving 256 addresses (254 usable).",
  },
  {
    q: "Why are there two fewer usable hosts than total?",
    a: "In a normal subnet the first address is the network identifier and the last is the broadcast address, so they can't be assigned to devices. /31 and /32 are special cases used for point-to-point links and single hosts.",
  },
  {
    q: "What's the difference between a public and private IP here?",
    a: "Private ranges (10.x, 172.16–31.x, 192.168.x) are used inside local networks and aren't routable on the internet. The calculator flags whether your input falls in a private range.",
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
            { name: "Subnet Calculator", href: "/subnet-calculator" },
          ]}
        />
        <section className="hero">
          <h1>Subnet Calculator</h1>
          <p>
            Enter an IPv4 address and CIDR prefix to instantly get the network,
            broadcast, mask, wildcard, host range and usable host count.
          </p>
        </section>

        <SubnetCalculator />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>How subnetting works</h2>
          <p>
            An IPv4 address has 32 bits. A subnet splits those bits into a{" "}
            <strong>network part</strong> and a <strong>host part</strong>. The
            CIDR prefix (e.g. <code>/24</code>) says how many leading bits belong
            to the network. The remaining bits address individual hosts within
            that network.
          </p>
          <h3>Key terms</h3>
          <ul>
            <li>
              <strong>Network address</strong>: the first address; identifies
              the subnet itself.
            </li>
            <li>
              <strong>Broadcast address</strong>: the last address; reaches all
              hosts on the subnet.
            </li>
            <li>
              <strong>Subnet mask</strong>: the dotted-decimal form of the
              prefix (e.g. <code>255.255.255.0</code> for /24).
            </li>
            <li>
              <strong>Wildcard mask</strong>: the inverse of the mask, used in
              ACLs and routing.
            </li>
            <li>
              <strong>Usable hosts</strong>: total addresses minus the network
              and broadcast addresses.
            </li>
          </ul>
          <h2>Common subnet sizes</h2>
          <table className="simple-table">
            <thead>
              <tr>
                <th>CIDR</th>
                <th>Mask</th>
                <th>Usable hosts</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr>
              <tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr>
              <tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr>
              <tr><td>/27</td><td>255.255.255.224</td><td>30</td></tr>
              <tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>
              <tr><td>/30</td><td>255.255.255.252</td><td>2</td></tr>
            </tbody>
          </table>
          <p>
            Need your own network details? Find your{" "}
            <a href="/what-is-my-router-ip">router IP</a> and{" "}
            <a href="/">public IP address</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
