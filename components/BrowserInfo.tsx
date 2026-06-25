"use client";

import { useEffect, useState } from "react";
import { parseUa } from "@/lib/ua";

type Row = [string, string];

export default function BrowserInfo() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    const n = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };
    const ua = parseUa(navigator.userAgent);
    const dntOn =
      navigator.doNotTrack === "1" ||
      (window as unknown as { doNotTrack?: string }).doNotTrack === "1";

    // Feature detection.
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

    // Simple privacy signal: more protections = higher score.
    let score = 50;
    if (dntOn) score += 15;
    if (!navigator.cookieEnabled) score += 20;
    if (!webrtc) score += 20;
    if ((navigator.languages || []).length <= 1) score += 5;
    score = Math.min(100, score);
    const scoreLabel =
      score >= 80 ? "Strong" : score >= 60 ? "Fair" : "Exposed";

    setRows([
      ["Browser", `${ua.browser} ${ua.browserVersion}`.trim()],
      ["Rendering engine", ua.engine],
      ["Operating system", ua.os || "Unknown"],
      ["Device type", ua.device],
      ["Platform", navigator.platform || "-"],
      ["Languages", (navigator.languages || [navigator.language]).join(", ")],
      ["CPU cores", String(n.hardwareConcurrency ?? "-")],
      ["Device memory", n.deviceMemory ? `${n.deviceMemory} GB` : "-"],
      ["Screen resolution", `${screen.width} × ${screen.height}`],
      ["Viewport", `${window.innerWidth} × ${window.innerHeight}`],
      ["Color depth", `${screen.colorDepth}-bit`],
      ["Pixel ratio", String(window.devicePixelRatio)],
      ["Time zone", Intl.DateTimeFormat().resolvedOptions().timeZone || "-"],
      ["Language", navigator.language || "-"],
      ["Cookies enabled", navigator.cookieEnabled ? "Yes" : "No"],
      ["JavaScript", "Enabled"],
      ["Do Not Track", dntOn ? "Enabled" : "Not enabled"],
      ["WebRTC support", webrtc ? "Supported" : "Not supported"],
      ["Canvas support", canvas ? "Supported" : "Not supported"],
      ["WebGL support", webgl ? "Supported" : "Not supported"],
      ["Touch support", "ontouchstart" in window ? "Yes" : "No"],
      ["Online", navigator.onLine ? "Yes" : "No"],
      ["Privacy score", `${score}/100 (${scoreLabel})`],
    ]);
  }, []);

  return (
    <section className="tool">
      <div className="tool-result">
        <table className="result-table">
          <tbody>
            {(rows ||
              Array.from({ length: 10 }, (_, i): Row => [`r${i}`, ""])).map(
              ([k, v], i) => (
                <tr key={i}>
                  <td>{rows ? k : <span className="skeleton" />}</td>
                  <td className="mono">{rows ? v : <span className="skeleton" />}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
