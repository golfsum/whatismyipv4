"use client";

import { useEffect, useState } from "react";

interface IpData {
  ip: string | null;
  isp: string | null;
  org: string | null;
  proxy: boolean | null;
  hosting: boolean | null;
  mobile: boolean | null;
  vpn: { isVpn: boolean; confidence: number; provider: string | null; reason: string };
}

const SK = <span className="skeleton" />;

export default function ProxyCheck() {
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

  const flagged = data ? !!(data.proxy || data.hosting || data.vpn.isVpn) : false;

  return (
    <section className="tool">
      <div className={`vpn-banner ${data ? (flagged ? "is-vpn" : "no-vpn") : ""}`}>
        <div className="icon">{!data ? "🛡️" : flagged ? "🛡️" : "✅"}</div>
        <div style={{ flex: 1 }}>
          <h3>
            {!data
              ? "Checking for a proxy…"
              : flagged
              ? "Proxy or datacenter connection detected"
              : "No proxy detected"}
          </h3>
          <p>{data ? data.vpn.reason : "Analysing your network…"}</p>
        </div>
      </div>

      <table className="result-table" style={{ marginTop: 16 }}>
        <tbody>
          <tr><td>Your IP</td><td className="mono">{data ? data.ip ?? "-" : SK}</td></tr>
          <tr><td>ISP</td><td className="mono">{data ? data.isp ?? "-" : SK}</td></tr>
          <tr><td>Organization</td><td className="mono">{data ? data.org ?? "-" : SK}</td></tr>
          <tr><td>Proxy flag</td><td className="mono">{data ? yesNo(data.proxy) : SK}</td></tr>
          <tr><td>Datacenter / hosting</td><td className="mono">{data ? yesNo(data.hosting) : SK}</td></tr>
          <tr><td>Mobile network</td><td className="mono">{data ? yesNo(data.mobile) : SK}</td></tr>
          <tr><td>VPN likelihood</td><td className="mono">{data ? `${data.vpn.confidence}%` : SK}</td></tr>
        </tbody>
      </table>
    </section>
  );
}

function yesNo(v: boolean | null): string {
  if (v == null) return "-";
  return v ? "Yes" : "No";
}
