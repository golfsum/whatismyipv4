"use client";

import { useState } from "react";
import { dohQuery, DNS_TYPE_NAMES, DohAnswer } from "@/lib/doh";

export default function DnsTool({
  defaultType = "A",
  types = ["A", "AAAA", "CNAME", "NS", "MX", "TXT", "SOA", "CAA"],
  placeholder = "example.com",
}: {
  defaultType?: string;
  types?: string[];
  placeholder?: string;
}) {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState(defaultType);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<DohAnswer[] | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!name) return;
    setLoading(true);
    setError(null);
    setAnswers(null);
    try {
      const r = await dohQuery(name, type);
      setStatus(r.status);
      setAnswers(r.answers);
    } catch {
      setError("Lookup failed. Check the domain and try again.");
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
          placeholder={placeholder}
          aria-label="Domain name"
          autoComplete="off"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Record type">
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading || !domain.trim()}>
          {loading ? "Looking up…" : "Lookup"}
        </button>
      </form>

      {error && <p className="err">{error}</p>}

      {answers && (
        <div className="tool-result">
          {answers.length === 0 ? (
            <p className="muted">
              {status === 3
                ? "Domain not found (NXDOMAIN)."
                : `No ${type} records found.`}
            </p>
          ) : (
            <table className="result-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>TTL</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((a, i) => (
                  <tr key={i}>
                    <td>{a.name}</td>
                    <td>{DNS_TYPE_NAMES[a.type] || a.type}</td>
                    <td>{a.TTL}s</td>
                    <td className="mono">{a.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}
