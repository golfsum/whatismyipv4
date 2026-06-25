"use client";

import { useState } from "react";

interface Resolver {
  name: string;
  url: (n: string, t: string) => string;
  headers?: Record<string, string>;
}

const RESOLVERS: Resolver[] = [
  {
    name: "Google (8.8.8.8)",
    url: (n, t) => `https://dns.google/resolve?name=${n}&type=${t}`,
  },
  {
    name: "Cloudflare (1.1.1.1)",
    url: (n, t) => `https://cloudflare-dns.com/dns-query?name=${n}&type=${t}`,
    headers: { accept: "application/dns-json" },
  },
  {
    name: "Quad9 (9.9.9.9)",
    url: (n, t) => `https://dns.quad9.net:5053/dns-query?name=${n}&type=${t}`,
    headers: { accept: "application/dns-json" },
  },
];

interface Row {
  name: string;
  records: string[] | null; // null = unreachable
}

export default function DnsPropagation() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Row[] | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!name) return;
    setLoading(true);
    setRows(null);

    const results = await Promise.all(
      RESOLVERS.map(async (r): Promise<Row> => {
        try {
          const res = await fetch(r.url(encodeURIComponent(name), type), {
            headers: r.headers,
          });
          const data = await res.json();
          const records = (data.Answer || [])
            .map((a: { data: string }) => a.data)
            .sort();
          return { name: r.name, records };
        } catch {
          return { name: r.name, records: null };
        }
      })
    );
    setRows(results);
    setLoading(false);
  };

  // Are all reachable resolvers returning the same answer set?
  const reachable = rows?.filter((r) => r.records !== null) ?? [];
  const signatures = new Set(reachable.map((r) => (r.records || []).join("|")));
  const consistent = reachable.length > 1 && signatures.size === 1;

  return (
    <section className="tool">
      <form className="tool-form" onSubmit={run}>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          aria-label="Domain"
          autoComplete="off"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Record type">
          {["A", "AAAA", "CNAME", "MX", "TXT", "NS"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading || !domain.trim()}>
          {loading ? "Checking…" : "Check"}
        </button>
      </form>

      {rows && (
        <div className="tool-result">
          {reachable.length > 1 && (
            <div className={`vpn-banner ${consistent ? "no-vpn" : "is-vpn"}`}>
              <div className="icon">{consistent ? "✅" : "⏳"}</div>
              <div>
                <h3>
                  {consistent
                    ? "Consistent across resolvers"
                    : "Records vary between resolvers"}
                </h3>
                <p>
                  {consistent
                    ? "Every resolver we checked returns the same answer."
                    : "Different resolvers see different answers, which usually means a recent change is still propagating."}
                </p>
              </div>
            </div>
          )}
          <table className="result-table" style={{ marginTop: 14 }}>
            <thead>
              <tr>
                <th>Resolver</th>
                <th>{type} records</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td className="mono">
                    {r.records === null
                      ? "unreachable"
                      : r.records.length === 0
                      ? "no records"
                      : r.records.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted" style={{ marginTop: 10, fontSize: 13 }}>
            This compares answers from major public resolvers. For full
            worldwide propagation across dozens of locations, a dedicated
            global checker goes further.
          </p>
        </div>
      )}
    </section>
  );
}
