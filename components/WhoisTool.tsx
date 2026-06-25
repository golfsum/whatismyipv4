"use client";

import { useState } from "react";

interface Result {
  ok: boolean;
  error?: string;
  domain?: string;
  registrar?: string | null;
  status?: string[];
  registered?: string | null;
  updated?: string | null;
  expires?: string | null;
  nameservers?: string[];
}

function fmtDate(d?: string | null): string {
  if (!d) return "-";
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch {
    return d;
  }
}

export default function WhoisTool() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/whois?domain=${encodeURIComponent(domain.trim())}`);
      setResult(await res.json());
    } catch {
      setResult({ ok: false, error: "Lookup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="tool">
      <form className="tool-form" onSubmit={run}>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          aria-label="Domain name"
          autoComplete="off"
        />
        <button type="submit" disabled={loading || !domain.trim()}>
          {loading ? "Looking up…" : "WHOIS Lookup"}
        </button>
      </form>

      {result && !result.ok && <p className="err">{result.error}</p>}

      {result && result.ok && (
        <div className="tool-result">
          <table className="result-table">
            <tbody>
              <tr><td>Domain</td><td className="mono">{result.domain}</td></tr>
              <tr><td>Registrar</td><td className="mono">{result.registrar || "-"}</td></tr>
              <tr><td>Registered</td><td className="mono">{fmtDate(result.registered)}</td></tr>
              <tr><td>Last updated</td><td className="mono">{fmtDate(result.updated)}</td></tr>
              <tr><td>Expires</td><td className="mono">{fmtDate(result.expires)}</td></tr>
              {result.status && result.status.length > 0 && (
                <tr><td>Status</td><td className="mono">{result.status.join(", ")}</td></tr>
              )}
              {result.nameservers && result.nameservers.length > 0 && (
                <tr>
                  <td>Name servers</td>
                  <td className="mono">{result.nameservers.join(", ").toLowerCase()}</td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="muted" style={{ marginTop: 10, fontSize: 13 }}>
            Data via RDAP, the modern WHOIS protocol. Some registries hide
            personal contact details for privacy.
          </p>
        </div>
      )}
    </section>
  );
}
