"use client";

import { useEffect, useState } from "react";
import { parseUa } from "@/lib/ua";

type Row = [string, string];
interface Check {
  label: string;
  ok: boolean; // true = good for privacy
}
interface Privacy {
  score: number;
  label: string;
  checks: Check[];
}

const SK = <span className="skeleton" />;

export default function BrowserInfo() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [privacy, setPrivacy] = useState<Privacy | null>(null);

  useEffect(() => {
    const n = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };
    const ua = parseUa(navigator.userAgent);
    const dnt =
      navigator.doNotTrack === "1" ||
      (window as unknown as { doNotTrack?: string }).doNotTrack === "1";
    const secure = window.location.protocol === "https:";
    const cookies = navigator.cookieEnabled;

    const webrtc =
      typeof window.RTCPeerConnection !== "undefined" ||
      typeof (window as unknown as { webkitRTCPeerConnection?: unknown })
        .webkitRTCPeerConnection !== "undefined";
    let canvas = false;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      canvas = !!c.getContext("2d");
      webgl = !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch {
      /* ignore */
    }
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "Dark"
      : "Light";

    // ---- privacy score ----
    let score = 100;
    if (webrtc) score -= 12;
    if (!dnt) score -= 8;
    if (canvas && webgl) score -= 6;
    if (cookies) score -= 4;
    score -= 6; // IP always reveals approximate location
    score = Math.max(0, Math.min(100, score));
    const label = score >= 80 ? "Strong" : score >= 60 ? "Fair" : "Exposed";

    setPrivacy({
      score,
      label,
      checks: [
        { label: "Secure HTTPS connection", ok: secure },
        { label: "Do Not Track enabled", ok: dnt },
        { label: "WebRTC disabled (no IP leak path)", ok: !webrtc },
        { label: "Canvas / WebGL fingerprinting limited", ok: !(canvas && webgl) },
        { label: "Cookies restricted", ok: !cookies },
        { label: "Approximate location hidden", ok: false },
      ],
    });

    setRows([
      ["Browser", `${ua.browser} ${ua.browserVersion}`.trim()],
      ["Browser version", ua.browserVersion || "-"],
      ["Rendering engine", ua.engine],
      ["Operating system", ua.os || "Unknown"],
      ["Device type", ua.device],
      ["Platform", navigator.platform || "-"],
      ["Language", navigator.language || "-"],
      ["Languages", (navigator.languages || [navigator.language]).join(", ")],
      ["Time zone", Intl.DateTimeFormat().resolvedOptions().timeZone || "-"],
      ["Screen resolution", `${screen.width} × ${screen.height}`],
      ["Viewport", `${window.innerWidth} × ${window.innerHeight}`],
      ["Color depth", `${screen.colorDepth}-bit`],
      ["Pixel ratio", String(window.devicePixelRatio)],
      ["Color scheme", colorScheme],
      ["CPU cores", String(n.hardwareConcurrency ?? "-")],
      ["Device memory", n.deviceMemory ? `${n.deviceMemory} GB` : "Not exposed"],
      ["Cookies enabled", cookies ? "Yes" : "No"],
      ["JavaScript", "Enabled"],
      ["Do Not Track", dnt ? "Enabled" : "Not enabled"],
      ["WebRTC support", webrtc ? "Supported" : "Not supported"],
      ["Canvas support", canvas ? "Supported" : "Not supported"],
      ["WebGL support", webgl ? "Supported" : "Not supported"],
      ["Touch support", "ontouchstart" in window ? "Yes" : "No"],
      ["Online", navigator.onLine ? "Yes" : "No"],
      ["User agent", navigator.userAgent],
    ]);
  }, []);

  const tone = !privacy
    ? "warn"
    : privacy.score >= 80
    ? "good"
    : privacy.score >= 60
    ? "warn"
    : "bad";

  return (
    <>
      <section className="tool">
        <div className="privacy-score">
          <div className={`ps-ring ps-${tone}`}>
            <div className="ps-num">{privacy ? privacy.score : "…"}</div>
            <div className="ps-max">/100</div>
          </div>
          <div className="ps-meta">
            <h3>Browser Privacy Score</h3>
            <p className="muted">
              {privacy
                ? `${privacy.label}. This reflects how much your browser exposes to the sites you visit.`
                : "Analysing your browser…"}
            </p>
            {privacy && (
              <ul className="ps-checklist">
                {privacy.checks.map((c) => (
                  <li key={c.label} className={c.ok ? "ok" : "warn"}>
                    <span className="mark">{c.ok ? "✓" : "⚠"}</span>
                    {c.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="tool">
        <h3 style={{ marginTop: 0 }}>Full browser details</h3>
        <div className="tool-result">
          <table className="result-table">
            <tbody>
              {(rows || Array.from({ length: 10 }, (_, i): Row => [`r${i}`, ""])).map(
                ([k, v], i) => (
                  <tr key={i}>
                    <td>{rows ? k : SK}</td>
                    <td className="mono">{rows ? v : SK}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
