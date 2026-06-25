"use client";

import { useEffect, useState } from "react";
import { VPN_PRODUCTS, AFFILIATE_DISCLOSURE } from "@/lib/affiliates";

interface IpData {
  ip: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  isp: string | null;
  org: string | null;
  asn: string | null;
  proxy: boolean | null;
  hosting: boolean | null;
  vpn: { isVpn: boolean; confidence: number; provider: string | null; reason: string };
}

const SK = <span className="skeleton" />;

export default function VpnCheckResult() {
  const [data, setData] = useState<IpData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/ip")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="err">Could not check your connection. Please refresh.</p>;
  }

  const isVpn = !!data?.vpn.isVpn;
  const location = data
    ? [data.city, data.region, data.country].filter(Boolean).join(", ") || "Unknown"
    : null;

  return (
    <section className="tool">
      <div className={`vpn-banner ${data ? (isVpn ? "is-vpn" : "no-vpn") : ""}`}>
        <div className="icon">{!data ? "🛡️" : isVpn ? "🛡️" : "✅"}</div>
        <div style={{ flex: 1 }}>
          <h3>
            {!data
              ? "Checking your connection…"
              : isVpn
              ? "VPN or proxy detected"
              : "No VPN detected"}{" "}
            {data && (
              <span className={`badge ${isVpn ? "bad" : "good"}`}>
                {data.vpn.confidence}% confidence
              </span>
            )}
          </h3>
          <p>{data ? data.vpn.reason : "Analysing your network…"}</p>
        </div>
      </div>

      <table className="result-table" style={{ marginTop: 16 }}>
        <tbody>
          <tr><td>IP address</td><td className="mono">{data ? data.ip ?? "-" : SK}</td></tr>
          <tr><td>VPN detected</td><td className="mono">{data ? (isVpn ? "Yes" : "No") : SK}</td></tr>
          <tr><td>Proxy</td><td className="mono">{data ? yesNo(data.proxy) : SK}</td></tr>
          <tr><td>Datacenter</td><td className="mono">{data ? yesNo(data.hosting) : SK}</td></tr>
          <tr><td>ISP</td><td className="mono">{data ? data.isp ?? "-" : SK}</td></tr>
          <tr><td>ASN</td><td className="mono">{data ? data.asn ?? "-" : SK}</td></tr>
          <tr><td>Location</td><td className="mono">{data ? location : SK}</td></tr>
          <tr><td>Confidence</td><td className="mono">{data ? `${data.vpn.confidence}%` : SK}</td></tr>
        </tbody>
      </table>

      <p className="muted" style={{ marginTop: 10, fontSize: 13 }}>
        Detection is best-effort. Some premium VPNs use residential or obfuscated
        IPs that look like normal connections, so a &quot;no VPN&quot; result is
        not proof your VPN is off.
      </p>

      {data && !isVpn && (
        <div className="vpn-suggest">
          <p>
            Your connection does not appear to be using a VPN. If you use public
            Wi-Fi, travel often, or want more privacy from websites and networks,
            a reputable VPN can hide your public IP and encrypt your traffic.
          </p>
          <p className="affiliate-disclosure">{AFFILIATE_DISCLOSURE}</p>
          <div className="aff-grid">
            {VPN_PRODUCTS.map((p) => (
              <div key={p.name} className="aff-card">
                {p.tag && <span className="aff-tag">{p.tag}</span>}
                <h3>{p.name}</h3>
                <p className="aff-blurb">{p.blurb}</p>
                <a
                  className="aff-cta"
                  href={p.url}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                >
                  Visit {p.name} →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {data && isVpn && (
        <div className="vpn-suggest">
          <p>
            VPN detected. Your public IP appears to be masked. To be thorough,
            confirm nothing is leaking outside the tunnel and check what your
            browser still reveals:
          </p>
          <div className="card-grid">
            <a href="/dns-leak-test" className="tool-card">
              <span className="tc-label">DNS &amp; IP Leak Test</span>
              <span className="tc-desc">Check for WebRTC and DNS leaks.</span>
            </a>
            <a href="/ip-leak-test" className="tool-card">
              <span className="tc-label">IP Leak Test</span>
              <span className="tc-desc">Confirm your real IP stays hidden.</span>
            </a>
            <a href="/browser-info" className="tool-card">
              <span className="tc-label">Browser Fingerprint</span>
              <span className="tc-desc">See what your browser still exposes.</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

function yesNo(v: boolean | null): string {
  if (v == null) return "-";
  return v ? "Yes" : "No";
}
