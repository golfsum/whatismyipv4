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
    const dnt =
      navigator.doNotTrack === "1" ||
      (window as unknown as { doNotTrack?: string }).doNotTrack === "1"
        ? "Enabled"
        : "Not enabled";

    setRows([
      ["Browser", `${ua.browser} ${ua.browserVersion}`.trim()],
      ["Rendering engine", ua.engine],
      ["Operating system", ua.os || "Unknown"],
      ["Device type", ua.device],
      ["Platform", navigator.platform || "—"],
      ["Languages", (navigator.languages || [navigator.language]).join(", ")],
      ["CPU cores", String(n.hardwareConcurrency ?? "—")],
      ["Device memory", n.deviceMemory ? `${n.deviceMemory} GB` : "—"],
      ["Screen resolution", `${screen.width} × ${screen.height}`],
      ["Viewport", `${window.innerWidth} × ${window.innerHeight}`],
      ["Color depth", `${screen.colorDepth}-bit`],
      ["Pixel ratio", String(window.devicePixelRatio)],
      [
        "Time zone",
        Intl.DateTimeFormat().resolvedOptions().timeZone || "—",
      ],
      ["Cookies enabled", navigator.cookieEnabled ? "Yes" : "No"],
      ["Do Not Track", dnt],
      ["Online", navigator.onLine ? "Yes" : "No"],
      ["Touch support", "ontouchstart" in window ? "Yes" : "No"],
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
