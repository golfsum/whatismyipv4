"use client";

import { useState } from "react";

interface Result {
  ok: boolean;
  error?: string;
  host?: string;
  subject?: string;
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  altNames?: string[];
  protocol?: string | null;
}

export default function SslChecker() {
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/ssl?host=${encodeURIComponent(host.trim())}`);
      setResult(await res.json());
    } catch {
      setResult({ ok: false, error: "Lookup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const expired = result?.daysRemaining != null && result.daysRemaining <= 0;
  const expiringSoon =
    result?.daysRemaining != null && result.daysRemaining > 0 && result.daysRemaining <= 14;

  return (
    <section className="tool">
      <form className="tool-form" onSubmit={run}>
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="example.com"
          aria-label="Domain name"
          autoComplete="off"
        />
        <button type="submit" disabled={loading || !host.trim()}>
          {loading ? "Checking…" : "Check SSL"}
        </button>
      </form>

      {result && !result.ok && <p className="err">{result.error}</p>}

      {result && result.ok && (
        <div className="tool-result">
          <div className={`vpn-banner ${expired ? "is-vpn" : "no-vpn"}`}>
            <div className="icon">{expired ? "⚠️" : "🔒"}</div>
            <div>
              <h3>
                {expired
                  ? "Certificate has expired"
                  : expiringSoon
                  ? "Certificate expires soon"
                  : "Certificate is valid"}
              </h3>
              <p>
                {expired
                  ? "Visitors will see a security warning."
                  : `Valid for ${result.daysRemaining} more day${
                      result.daysRemaining === 1 ? "" : "s"
                    }.`}
              </p>
            </div>
          </div>

          <table className="result-table">
            <tbody>
              <tr><td>Issued to</td><td className="mono">{result.subject || "-"}</td></tr>
              <tr><td>Issued by</td><td className="mono">{result.issuer || "-"}</td></tr>
              <tr><td>Valid from</td><td className="mono">{result.validFrom || "-"}</td></tr>
              <tr><td>Valid to</td><td className="mono">{result.validTo || "-"}</td></tr>
              <tr><td>Days remaining</td><td className="mono">{result.daysRemaining}</td></tr>
              <tr><td>Protocol</td><td className="mono">{result.protocol || "-"}</td></tr>
              {result.altNames && result.altNames.length > 0 && (
                <tr>
                  <td>Covers</td>
                  <td className="mono">{result.altNames.slice(0, 12).join(", ")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
