"use client";

import { useState } from "react";
import { dohQuery } from "@/lib/doh";

interface Found {
  spf: string[];
  dmarc: string[];
}

export default function SpfDmarcTool() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState<Found | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!name) return;
    setLoading(true);
    setError(null);
    setFound(null);
    try {
      const [spfRes, dmarcRes] = await Promise.all([
        dohQuery(name, "TXT"),
        dohQuery(`_dmarc.${name}`, "TXT"),
      ]);
      const clean = (s: string) => s.replace(/^"|"$/g, "").replace(/" "/g, "");
      setFound({
        spf: spfRes.answers
          .map((a) => clean(a.data))
          .filter((d) => /^v=spf1/i.test(d)),
        dmarc: dmarcRes.answers
          .map((a) => clean(a.data))
          .filter((d) => /^v=DMARC1/i.test(d)),
      });
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
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          aria-label="Domain name"
          autoComplete="off"
        />
        <button type="submit" disabled={loading || !domain.trim()}>
          {loading ? "Checking…" : "Check SPF & DMARC"}
        </button>
      </form>

      {error && <p className="err">{error}</p>}

      {found && (
        <div className="tool-result">
          <h3>SPF record</h3>
          {found.spf.length ? (
            found.spf.map((r, i) => (
              <pre className="record" key={i}>
                {r}
              </pre>
            ))
          ) : (
            <p className="muted">
              No SPF record found - email from this domain is easier to spoof.
            </p>
          )}

          <h3 style={{ marginTop: 18 }}>DMARC record</h3>
          {found.dmarc.length ? (
            found.dmarc.map((r, i) => (
              <pre className="record" key={i}>
                {r}
              </pre>
            ))
          ) : (
            <p className="muted">
              No DMARC record found - consider adding one to protect against
              spoofing.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
