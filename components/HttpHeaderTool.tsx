"use client";

import { useState } from "react";

interface SecItem {
  label: string;
  why: string;
  present: boolean;
}
interface Result {
  ok: boolean;
  error?: string;
  url?: string;
  status?: number;
  headers?: Record<string, string>;
  security?: SecItem[];
  score?: number;
  total?: number;
}

export default function HttpHeaderTool({
  focus = "all",
}: {
  focus?: "all" | "security";
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/headers?url=${encodeURIComponent(url.trim())}`);
      setResult(await res.json());
    } catch {
      setResult({ ok: false, error: "Request failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="tool">
      <form className="tool-form" onSubmit={run}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          aria-label="URL"
          autoComplete="off"
        />
        <button type="submit" disabled={loading || !url.trim()}>
          {loading ? "Checking…" : "Check"}
        </button>
      </form>

      {result && !result.ok && <p className="err">{result.error}</p>}

      {result && result.ok && (
        <div className="tool-result">
          {result.security && (
            <>
              <div className="grade-line">
                <span className="grade-num">
                  {result.score}/{result.total}
                </span>
                <span>security headers present</span>
              </div>
              <table className="result-table">
                <tbody>
                  {result.security.map((s) => (
                    <tr key={s.label}>
                      <td>
                        <span className={s.present ? "ok-mark" : "bad-mark"}>
                          {s.present ? "✓" : "✕"}
                        </span>{" "}
                        {s.label}
                      </td>
                      <td className="muted-cell">{s.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {focus === "all" && result.headers && (
            <>
              <h3 style={{ marginTop: 18 }}>
                All response headers (HTTP {result.status})
              </h3>
              <table className="result-table">
                <tbody>
                  {Object.entries(result.headers).map(([k, v]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td className="mono">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </section>
  );
}
