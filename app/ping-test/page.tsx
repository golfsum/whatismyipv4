import type { Metadata } from "next";
import PingTest from "@/components/PingTest";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Ping Test - Measure Your Latency & Jitter",
  description:
    "Free ping test. Measure your connection's latency and jitter right in your browser, with min, average and max round-trip times. No app needed.",
  keywords: ["ping test", "latency test", "jitter test", "test my ping", "internet latency"],
  alternates: { canonical: "/ping-test" },
};

const FAQ: QA[] = [
  {
    q: "What is a good ping?",
    a: "Under 30 ms is excellent, 30 to 60 ms is great for almost anything, and up to 100 ms is fine for browsing and video. Above that you'll feel lag in games and calls.",
  },
  {
    q: "How is this different from a browser ping?",
    a: "True ping uses ICMP, which browsers can't send. This test measures HTTP round-trip time to a nearby Cloudflare server instead, which tracks your real latency closely.",
  },
  {
    q: "Why does my ping jump around?",
    a: "That variation is jitter, usually caused by Wi-Fi or a congested connection. High jitter causes stutter in calls and games even when average ping looks fine.",
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
            { name: "Ping Test", href: "/ping-test" },
          ]}
        />
        <section className="hero">
          <h1>Ping Test</h1>
          <p>
            Measure your latency and jitter in your browser, with the minimum,
            average and maximum round-trip times.
          </p>
        </section>

        <PingTest />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>What ping and jitter tell you</h2>
          <p>
            Ping is the time it takes a small request to reach a server and come
            back, measured in milliseconds. Lower is better, and it matters far
            more than download speed for gaming and video calls. Jitter is how
            much that ping varies. Steady ping feels smooth even if it isn&apos;t
            the lowest.
          </p>
          <p>
            Seeing high numbers? Read{" "}
            <a href="/guides/how-to-lower-ping">how to lower your ping</a> and{" "}
            <a href="/guides/what-is-jitter">what jitter is</a>, or run a full{" "}
            <a href="/speedtest">speed test</a>.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
