"use client";

import { useState } from "react";
import { dohQuery } from "@/lib/doh";

// Build the reverse-lookup name for an IPv4 or IPv6 address.
function reverseName(ip: string): string | null {
  const v4 = ip.trim();
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(v4)) {
    const parts = v4.split(".");
    if (parts.every((p) => Number(p) <= 255)) {
      return parts.reverse().join(".") + ".in-addr.arpa";
    }
  }
  // IPv6 (best effort): expand and nibble-reverse.
  if (v4.includes(":")) {
    try {
      const full = expandV6(v4);
      const nibbles = full.replace(/:/g, "").split("").reverse().join(".");
      return nibbles + ".ip6.arpa";
    } catch {
      return null;
    }
  }
  return null;
}

function expandV6(ip: string): string {
  const [head, tail] = ip.split("::");
  const headParts = head ? head.split(":") : [];
  const tailParts = tail ? tail.split(":") : [];
  const missing = 8 - (headParts.length + tailParts.length);
  const parts = [
    ...headParts,
    ...Array(Math.max(0, missing)).fill("0"),
    ...tailParts,
  ];
  return parts.map((p) => p.padStart(4, "0")).join(":");
}

export default function ReverseDns() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = reverseName(ip);
    if (!name) {
      setError("Please enter a valid IPv4 or IPv6 address.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await dohQuery(name, "PTR");
      setResult(r.answers.map((a) => a.data));
    } catch {
      setError("Lookup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="tool">
      <form className="tool-form" onSubmit={run}>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="8.8.8.8"
          aria-label="IP address"
          autoComplete="off"
        />
        <button type="submit" disabled={loading || !ip.trim()}>
          {loading ? "Looking up…" : "Reverse Lookup"}
        </button>
      </form>

      {error && <p className="err">{error}</p>}

      {result && (
        <div className="tool-result">
          {result.length === 0 ? (
            <p className="muted">No PTR (hostname) record found for this IP.</p>
          ) : (
            <table className="result-table">
              <thead>
                <tr>
                  <th>Hostname (PTR)</th>
                </tr>
              </thead>
              <tbody>
                {result.map((h, i) => (
                  <tr key={i}>
                    <td className="mono">{h}</td>
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
