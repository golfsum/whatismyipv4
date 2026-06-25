import type { Metadata } from "next";
import IpDashboard from "@/components/IpDashboard";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "IP Location — Where Is My IP Address? (Map Lookup)",
  description:
    "Where is my IP address located? See your IP geolocation on a map with city, region, country, ISP and timezone. Free IP location lookup, no signup.",
  keywords: [
    "ip location",
    "where is my ip",
    "my ip location",
    "ip address location",
    "ip geolocation",
    "what is my location",
    "ip on map",
  ],
  alternates: { canonical: "/ip-location" },
  openGraph: {
    title: "IP Location — Where Is My IP Address?",
    description:
      "See your IP geolocation on a map with city, region, country and ISP.",
    url: "/ip-location",
  },
};

const FAQ: QA[] = [
  {
    q: "Where is my IP address located?",
    a: "The map above shows the approximate location of your public IP address, including the city, region and country your ISP assigns it to. It is based on geolocation databases, not GPS, so it shows a general area rather than your exact address.",
  },
  {
    q: "How accurate is IP geolocation?",
    a: "Country-level accuracy is typically very high (95%+). City-level accuracy varies and can be off by tens of kilometres, especially on mobile networks where the IP may map to your carrier's hub rather than your actual town.",
  },
  {
    q: "Can someone find my home address from my IP?",
    a: "No. An IP address reveals an approximate area and your ISP, but not your name or street address. Only your ISP can link an IP to a customer, and only with a legal request.",
  },
  {
    q: "How do I change my IP location?",
    a: "Use a VPN to appear in a different city or country. The map will then show the VPN server's location instead of yours. See our guide on how to hide your IP.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <h1>Where Is My IP Address Located?</h1>
          <p>
            See your <strong>IP location on a map</strong> — city, region,
            country, ISP and timezone — based on your public IP address.
          </p>
        </section>

        <IpDashboard />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>How IP geolocation works</h2>
          <p>
            Every public IP address is registered to an{" "}
            <strong>Internet Service Provider</strong> and a rough geographic
            region. Geolocation databases map ranges of IP addresses to a city,
            region and country. When you load this page we look up your{" "}
            <a href="/">public IP address</a> and place a marker on the map at
            its estimated coordinates.
          </p>

          <h3>Why the map isn&apos;t exactly your house</h3>
          <p>
            IP location is <strong>approximate by design</strong>. It often
            points to your ISP&apos;s nearest network hub or the centre of your
            city, not your front door. It does not use your device&apos;s GPS.
            Accuracy is usually best for fixed broadband and least precise on
            mobile data, where many users share a carrier gateway.
          </p>

          <h3>Want to change where you appear?</h3>
          <p>
            A <a href="/vpn-check">VPN</a> routes your traffic through a server
            elsewhere, so the map shows that server&apos;s location instead. Read{" "}
            <a href="/hide-my-ip">how to hide your IP address</a> for the options
            and trade-offs.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
