import type { Metadata } from "next";
import SpeedTest from "@/components/SpeedTest";
import AdUnit from "@/components/AdUnit";
import Faq, { QA } from "@/components/Faq";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { ADSENSE_SLOT_TOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Internet Speed Test - Test Download, Upload & Ping",
  description:
    "Free internet speed test. Measure your download speed, upload speed, ping and jitter in seconds, right in your browser. No app, no signup.",
  keywords: [
    "speed test",
    "internet speed test",
    "wifi speed test",
    "test my internet speed",
    "download speed test",
    "upload speed",
    "ping test",
    "bandwidth test",
  ],
  alternates: { canonical: "/speedtest" },
  openGraph: {
    title: "Internet Speed Test - Download, Upload & Ping",
    description:
      "Measure your download, upload, ping and jitter in seconds, in your browser.",
    url: "/speedtest",
  },
};

const FAQ: QA[] = [
  {
    q: "How does this internet speed test work?",
    a: "It downloads and uploads random data between your browser and our servers and measures how fast it transfers, then reports your download speed, upload speed, ping (latency) and jitter. It runs entirely in your browser - no app needed.",
  },
  {
    q: "What is a good internet speed?",
    a: "For one person browsing and HD streaming, 25 Mbps download is comfortable. For 4K streaming, gaming and multiple users, 100 Mbps or more is ideal. Upload of 10 Mbps+ is good for video calls and uploading files.",
  },
  {
    q: "What is ping and jitter?",
    a: "Ping (latency) is how long data takes to make a round trip, in milliseconds - lower is better, especially for gaming and calls. Jitter is the variation in ping; high jitter causes stutter in video calls and online games.",
  },
  {
    q: "Why is my speed test result lower than my plan?",
    a: "Wi-Fi interference, distance from the router, other devices using bandwidth, VPNs, and your device itself can all reduce measured speed. For the most accurate result, test on a wired connection with nothing else running.",
  },
  {
    q: "Does the speed test use my data?",
    a: "Yes - a single run transfers roughly 20–30 MB. On a metered or mobile connection, keep that in mind before running it repeatedly.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <h1>Internet Speed Test</h1>
          <p>
            Measure your <strong>download</strong>, <strong>upload</strong>,{" "}
            <strong>ping</strong> and <strong>jitter</strong> in seconds -
            right in your browser, no app or signup required.
          </p>
        </section>

        <SpeedTest />

        <AdUnit slot={ADSENSE_SLOT_TOP} label="Advertisement" />

        <article className="content">
          <h2>Understanding your speed test results</h2>
          <p>
            A speed test measures how quickly data moves between your device and
            the internet. The three numbers that matter most are:
          </p>
          <ul>
            <li>
              <strong>Download speed</strong> - how fast you receive data
              (streaming, browsing, downloads). Measured in megabits per second
              (Mbps).
            </li>
            <li>
              <strong>Upload speed</strong> - how fast you send data (video
              calls, posting photos, backups).
            </li>
            <li>
              <strong>Ping &amp; jitter</strong> - latency and its variation,
              measured in milliseconds. Critical for gaming and calls.
            </li>
          </ul>

          <h3>Tips for an accurate test</h3>
          <ul>
            <li>Test on a wired connection when possible, or sit near the router.</li>
            <li>Pause downloads, streaming and other devices first.</li>
            <li>
              Turn off your <a href="/vpn-check">VPN</a> for your raw line speed,
              then test again with it on to see the impact.
            </li>
            <li>Run it a few times and take the best result.</li>
          </ul>

          <h2>Slow speeds? Check these</h2>
          <p>
            If results are far below your plan, restart your router, move closer
            to it, or contact your ISP. You can also confirm{" "}
            <a href="/">your IP and ISP</a> and your{" "}
            <a href="/ip-location">connection location</a> to make sure
            you&apos;re routed sensibly.
          </p>
        </article>

        <Faq items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
