"use client";

import { useEffect, useState } from "react";
import { parseUa, ParsedUa } from "@/lib/ua";

export default function UserAgentTool() {
  const [ua, setUa] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedUa | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUa(navigator.userAgent);
    setParsed(parseUa(navigator.userAgent));
  }, []);

  const copy = () => {
    if (!ua) return;
    navigator.clipboard?.writeText(ua).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  const rows: [string, string][] = parsed
    ? [
        ["Browser", `${parsed.browser} ${parsed.browserVersion}`.trim()],
        ["Engine", parsed.engine],
        ["Operating system", parsed.os || "Unknown"],
        ["Device", parsed.device],
      ]
    : [];

  return (
    <section className="tool">
      <div className="ua-box">
        <code>{ua ?? <span className="skeleton" />}</code>
        <button className="copy-btn" onClick={copy} disabled={!ua}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      <div className="tool-result">
        <table className="result-table">
          <tbody>
            {(rows.length
              ? rows
              : Array.from({ length: 4 }, (_, i): [string, string] => [
                  `r${i}`,
                  "",
                ])
            ).map(([k, v], i) => (
              <tr key={i}>
                <td>{rows.length ? k : <span className="skeleton" />}</td>
                <td className="mono">
                  {rows.length ? v : <span className="skeleton" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
