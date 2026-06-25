"use client";

import { useEffect, useState } from "react";
import { dohQuery } from "@/lib/doh";

type Rating = "Excellent" | "Good" | "Fair" | "Poor";

interface Metrics {
  download: number | null; // Mbps
  upload: number | null; // Mbps
  latency: number | null; // ms
  jitter: number | null; // ms
  ipv6: boolean;
  dns: boolean;
  secure: boolean;
  hosting: boolean | null;
  mobile: boolean | null;
  isVpn: boolean;
  isp: string | null;
}

interface Category {
  name: string;
  rating: Rating;
}

interface Finding {
  ok: boolean;
  text: string;
}

interface Report {
  overall: number;
  categories: Category[];
  findings: Finding[];
  suggestions: string[];
  capability: string;
}

const POINTS: Record<Rating, number> = {
  Excellent: 95,
  Good: 80,
  Fair: 60,
  Poor: 35,
};

function toneOf(r: Rating): string {
  return r === "Excellent" || r === "Good"
    ? "good"
    : r === "Fair"
    ? "warn"
    : "bad";
}

// ---- per-category rating logic -------------------------------------------
function connectionRating(dl: number | null, ul: number | null, lat: number | null): Rating {
  if (dl == null) return lat != null && lat < 80 ? "Good" : "Fair";
  if (dl >= 100 && (ul ?? 0) >= 10) return "Excellent";
  if (dl >= 50 && (ul ?? 0) >= 5) return "Good";
  if (dl >= 15) return "Fair";
  return "Poor";
}
function gamingRating(lat: number | null, jit: number | null): Rating {
  if (lat == null) return "Fair";
  if (lat < 30 && (jit == null || jit < 10)) return "Excellent";
  if (lat < 60) return "Good";
  if (lat < 100) return "Fair";
  return "Poor";
}
function streamingRating(dl: number | null): Rating {
  if (dl == null) return "Good";
  if (dl >= 50) return "Excellent";
  if (dl >= 25) return "Good";
  if (dl >= 10) return "Fair";
  return "Poor";
}
function remoteRating(ul: number | null, lat: number | null): Rating {
  if (ul == null) return lat != null && lat < 80 ? "Good" : "Fair";
  if (ul >= 10 && (lat == null || lat < 80)) return "Excellent";
  if (ul >= 5) return "Good";
  if (ul >= 2) return "Fair";
  return "Poor";
}
function callsRating(ul: number | null, lat: number | null, jit: number | null): Rating {
  if (ul == null) return lat != null && lat < 100 ? "Good" : "Fair";
  if (ul >= 3 && (lat == null || lat < 100) && (jit == null || jit < 30))
    return "Excellent";
  if (ul >= 1.5 && (lat == null || lat < 150)) return "Good";
  if (ul >= 0.8) return "Fair";
  return "Poor";
}
function privacyRating(isVpn: boolean, secure: boolean): Rating {
  if (isVpn && secure) return "Excellent";
  if (isVpn) return "Good";
  if (secure) return "Fair";
  return "Poor";
}

function buildReport(m: Metrics): Report {
  const categories: Category[] = [
    { name: "Connection", rating: connectionRating(m.download, m.upload, m.latency) },
    { name: "Privacy", rating: privacyRating(m.isVpn, m.secure) },
    { name: "Gaming", rating: gamingRating(m.latency, m.jitter) },
    { name: "Streaming", rating: streamingRating(m.download) },
    { name: "Remote Work", rating: remoteRating(m.upload, m.latency) },
    { name: "Video Calls", rating: callsRating(m.upload, m.latency, m.jitter) },
  ];
  const overall = Math.round(
    categories.reduce((s, c) => s + POINTS[c.rating], 0) / categories.length
  );

  const findings: Finding[] = [];
  if (m.download != null)
    findings.push({
      ok: m.download >= 25,
      text: `${m.download >= 50 ? "Fast" : m.download >= 25 ? "Good" : "Slow"} download (≈${m.download.toFixed(0)} Mbps)`,
    });
  if (m.upload != null)
    findings.push({
      ok: m.upload >= 5,
      text: `${m.upload >= 10 ? "Fast" : m.upload >= 5 ? "Good" : "Limited"} upload (≈${m.upload.toFixed(0)} Mbps)`,
    });
  if (m.latency != null)
    findings.push({
      ok: m.latency < 80,
      text: `${m.latency < 60 ? "Low" : m.latency < 100 ? "Moderate" : "High"} latency (${m.latency.toFixed(0)} ms)`,
    });
  findings.push({
    ok: !m.hosting,
    text: m.mobile
      ? "Mobile / cellular network"
      : m.hosting
      ? "Datacenter / hosting network"
      : "Residential ISP",
  });
  findings.push({
    ok: true,
    text: m.isVpn ? "VPN / proxy active" : "No VPN detected",
  });
  findings.push({ ok: m.ipv6, text: m.ipv6 ? "IPv6 supported" : "IPv6 unavailable" });
  findings.push({ ok: m.dns, text: m.dns ? "DNS resolving normally" : "DNS issues detected" });
  findings.push({ ok: m.secure, text: m.secure ? "Secure HTTPS connection" : "Connection not secure" });

  const suggestions: string[] = [];
  if (!m.ipv6)
    suggestions.push("Enable IPv6 if your router and ISP support it for a more future-proof connection.");
  suggestions.push("Use a fast, private DNS resolver like Cloudflare (1.1.1.1) or Google (8.8.8.8).");
  if (m.latency != null && m.latency >= 100)
    suggestions.push("Switch to a wired Ethernet connection or move closer to your router to reduce latency.");
  if (m.download != null && m.download < 25)
    suggestions.push("Your download speed is on the low side — consider a faster plan or contact your ISP.");
  if (!m.isVpn)
    suggestions.push("Use a VPN on public or untrusted Wi-Fi to protect your privacy.");
  suggestions.push("Restart your router every few months to clear its memory and apply firmware updates.");

  // Capability sentence.
  const caps: string[] = [];
  const sr = streamingRating(m.download);
  if (sr === "Excellent" || sr === "Good") caps.push("4K streaming");
  else if (sr === "Fair") caps.push("HD streaming");
  const gr = gamingRating(m.latency, m.jitter);
  if (gr === "Excellent" || gr === "Good") caps.push("online gaming");
  const cr = callsRating(m.upload, m.latency, m.jitter);
  if (cr === "Excellent" || cr === "Good") caps.push("video calls");
  const capability =
    caps.length > 0
      ? `Your connection appears capable of ${caps.join(", ").replace(/, ([^,]*)$/, " and $1")}.`
      : "Your connection may struggle with demanding tasks like 4K streaming or competitive gaming.";

  return { overall, categories, findings, suggestions, capability };
}

// ---- measurement ----------------------------------------------------------
async function quickSpeed(): Promise<Pick<Metrics, "download" | "upload" | "latency" | "jitter">> {
  try {
    const { default: SpeedTest } = await import("@cloudflare/speedtest");
    return await new Promise((resolve) => {
      const engine = new SpeedTest({
        autoStart: false,
        logAimApiUrl: null,
        // Small probe (~11 MB) for an automatic estimate; full test lives on /speedtest.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        measurements: [
          { type: "latency", numPackets: 10 },
          { type: "download", bytes: 1e6, count: 3 },
          { type: "download", bytes: 5e6, count: 1 },
          { type: "upload", bytes: 1e6, count: 3 },
        ] as any,
      });
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        const r = engine.results;
        const d = r.getDownloadBandwidth();
        const u = r.getUploadBandwidth();
        const l = r.getUnloadedLatency();
        const j = r.getUnloadedJitter();
        resolve({
          download: d ? d / 1e6 : null,
          upload: u ? u / 1e6 : null,
          latency: l ?? null,
          jitter: typeof j === "number" ? j : null,
        });
      };
      engine.onFinish = finish;
      engine.onError = () =>
        resolve({ download: null, upload: null, latency: null, jitter: null });
      engine.play();
      setTimeout(finish, 20000);
    });
  } catch {
    return { download: null, upload: null, latency: null, jitter: null };
  }
}

export default function InternetHealthReport() {
  const [report, setReport] = useState<Report | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [ipData, ipv6, dns, speed] = await Promise.all([
          fetch("/api/ip").then((r) => r.json()).catch(() => null),
          fetch("https://api6.ipify.org?format=json")
            .then((r) => r.json())
            .then((d) => !!(d.ip && d.ip.includes(":")))
            .catch(() => false),
          dohQuery("cloudflare.com", "A")
            .then((r) => r.status === 0 && r.answers.length > 0)
            .catch(() => false),
          quickSpeed(),
        ]);

        const m: Metrics = {
          download: speed.download,
          upload: speed.upload,
          latency: speed.latency,
          jitter: speed.jitter,
          ipv6,
          dns,
          secure:
            typeof window !== "undefined" &&
            window.location.protocol === "https:",
          hosting: ipData?.hosting ?? null,
          mobile: ipData?.mobile ?? null,
          isVpn: !!ipData?.vpn?.isVpn,
          isp: ipData?.isp ?? null,
        };
        if (!cancelled) setReport(buildReport(m));
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const tone =
    report == null
      ? "warn"
      : report.overall >= 85
      ? "good"
      : report.overall >= 60
      ? "warn"
      : "bad";
  const grade =
    report == null
      ? ""
      : report.overall >= 85
      ? "Excellent"
      : report.overall >= 70
      ? "Good"
      : report.overall >= 50
      ? "Fair"
      : "Needs attention";

  return (
    <section className="report">
      <h2 className="report-title">Internet Health Report</h2>

      {failed ? (
        <p className="muted">
          Couldn&apos;t generate your report. Please refresh and try again.
        </p>
      ) : !report ? (
        <div className="report-loading">
          <span className="spinner" />
          <p>Analysing your connection (uses ≈11&nbsp;MB of data)…</p>
        </div>
      ) : (
        <>
          <div className="report-head">
            <div className={`report-score report-score--${tone}`}>
              <div className="rs-num">{report.overall}</div>
              <div className="rs-max">/100</div>
            </div>
            <div className="report-grade">
              <span className="rg-label">Overall score</span>
              <span className={`rg-value rg-${tone}`}>{grade}</span>
              <p className="rg-cap">{report.capability}</p>
            </div>
          </div>

          <div className="report-cats">
            {report.categories.map((c) => (
              <div key={c.name} className={`cat-card cat-${toneOf(c.rating)}`}>
                <span className="cat-name">{c.name}</span>
                <span className="cat-rating">{c.rating}</span>
              </div>
            ))}
          </div>

          <div className="report-cols">
            <div className="report-col">
              <h3>Things we found</h3>
              <ul className="findings">
                {report.findings.map((f, i) => (
                  <li key={i} className={f.ok ? "ok" : "bad"}>
                    <span className="mark">{f.ok ? "✓" : "✕"}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="report-col">
              <h3>Suggestions</h3>
              <ul className="suggestions">
                {report.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="report-cta">
            Speeds are a quick estimate.{" "}
            <a href="/speedtest">Run a full speed test →</a>
          </p>
        </>
      )}
    </section>
  );
}
