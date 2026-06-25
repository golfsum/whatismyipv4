"use client";

import { useEffect, useState, useCallback } from "react";

interface VpnVerdict {
  isVpn: boolean;
  confidence: number;
  provider: string | null;
  reason: string;
}

interface IpData {
  ip: string | null;
  ipVersion: number | null;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  continent: string | null;
  zip: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  currency: string | null;
  isp: string | null;
  org: string | null;
  asn: string | null;
  asName: string | null;
  reverse: string | null;
  mobile: boolean | null;
  proxy: boolean | null;
  hosting: boolean | null;
  vpn: VpnVerdict;
}

const SK = <span className="skeleton" />;

function flagEmoji(cc?: string | null): string {
  if (!cc || cc.length !== 2) return "🌐";
  const codePoints = cc
    .toUpperCase()
    .split("")
    .map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...codePoints);
}

export default function IpDashboard() {
  const [data, setData] = useState<IpData | null>(null);
  const [ipv4, setIpv4] = useState<string | null | undefined>(undefined);
  const [ipv6, setIpv6] = useState<string | null | undefined>(undefined);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Server-side enriched info (geo, ISP, VPN) for whichever stack the browser
  // connected with.
  useEffect(() => {
    fetch("/api/ip")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  // Detect IPv4 and IPv6 independently from the browser. These endpoints are
  // CORS-enabled and resolve over a single protocol family.
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setIpv4(d.ip || null))
      .catch(() => setIpv4(null));

    fetch("https://api6.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setIpv6(d.ip && d.ip.includes(":") ? d.ip : null))
      .catch(() => setIpv6(null));
  }, []);

  const primaryIp = data?.ip || ipv4 || (ipv6 ?? null);

  const copy = useCallback(() => {
    if (!primaryIp) return;
    navigator.clipboard?.writeText(primaryIp).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }, [primaryIp]);

  const copyValue = useCallback((value: string, field: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(
        () => setCopiedField((f) => (f === field ? null : f)),
        1600
      );
    });
  }, []);

  const hasLoc =
    data && data.latitude != null && data.longitude != null;
  const lat = data?.latitude ?? 0;
  const lon = data?.longitude ?? 0;
  const delta = 0.05;
  const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${
    lat + delta
  }`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <>
      {/* The big IP banner */}
      <section className="ip-hero" aria-live="polite">
        <div className="label">Your Public IP Address</div>
        <div className="ip-value">
          {error ? "Unavailable" : primaryIp ?? SK}
        </div>

        <div className="ip-row">
          <span className="chip">
            IPv4:{" "}
            <strong>
              {ipv4 === undefined ? SK : ipv4 ?? "Not detected"}
            </strong>
            {ipv4 && (
              <CopyIconButton
                value={ipv4}
                copied={copiedField === "ipv4"}
                onCopy={() => copyValue(ipv4, "ipv4")}
                label="Copy IPv4 address"
              />
            )}
          </span>
          <span className="chip">
            IPv6:{" "}
            <strong>
              {ipv6 === undefined ? SK : ipv6 ?? "Not detected"}
            </strong>
            {ipv6 && (
              <CopyIconButton
                value={ipv6}
                copied={copiedField === "ipv6"}
                onCopy={() => copyValue(ipv6, "ipv6")}
                label="Copy IPv6 address"
              />
            )}
          </span>
          {data?.countryCode && (
            <span className="chip">
              {flagEmoji(data.countryCode)} <strong>{data.country}</strong>
            </span>
          )}
        </div>

        <button className="copy-btn" onClick={copy} disabled={!primaryIp}>
          {copied ? "✓ Copied" : "Copy IP"}
        </button>
      </section>

      {/* VPN / proxy status */}
      <VpnBanner data={data} error={error} />

      {/* Map */}
      <div className="map-wrap">
        {hasLoc ? (
          <iframe
            title="Approximate location of your IP address on a map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div
            style={{
              height: 360,
              display: "grid",
              placeItems: "center",
              color: "var(--muted)",
            }}
          >
            {error ? "Map unavailable" : "Locating your IP on the map…"}
          </div>
        )}
        <div className="map-caption">
          <span>
            {hasLoc
              ? `Approximate location: ${[data?.city, data?.region, data?.country]
                  .filter(Boolean)
                  .join(", ")}`
              : "Location is approximate and based on your IP, not GPS."}
          </span>
          {hasLoc && (
            <a
              href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open larger map ↗
            </a>
          )}
        </div>
      </div>

      {/* Detail cards */}
      <div className="grid">
        <DetailCard
          title="Location"
          rows={[
            ["City", data?.city],
            ["Region", data?.region],
            ["Country", data ? `${flagEmoji(data.countryCode)} ${data.country ?? "-"}` : null],
            ["Postal", data?.zip],
            ["Timezone", data?.timezone],
          ]}
          loading={!data && !error}
        />
        <DetailCard
          title="Network"
          rows={[
            ["ISP", data?.isp],
            ["Organization", data?.org],
            ["ASN", data?.asn],
            ["Hostname", data?.reverse],
            ["Connection", data ? connectionType(data) : null],
          ]}
          loading={!data && !error}
        />
        <DetailCard
          title="IP Details"
          rows={[
            ["IP version", data?.ipVersion ? `IPv${data.ipVersion}` : null],
            ["Proxy/VPN", boolText(data?.proxy)],
            ["Datacenter", boolText(data?.hosting)],
            ["Mobile", boolText(data?.mobile)],
            ["Continent", data?.continent],
          ]}
          loading={!data && !error}
        />
      </div>
    </>
  );
}

function CopyIconButton({
  value,
  copied,
  onCopy,
  label,
}: {
  value: string;
  copied: boolean;
  onCopy: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`copy-icon${copied ? " copied" : ""}`}
      onClick={onCopy}
      title={label}
      aria-label={label}
    >
      {copied ? (
        // checkmark
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            d="M20 6L9 17l-5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // copy (two sheets) icon
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <rect
            x="9"
            y="9"
            width="11"
            height="11"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M5 15V5a2 2 0 0 1 2-2h10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function connectionType(d: IpData): string {
  if (d.mobile) return "Mobile / cellular";
  if (d.hosting) return "Datacenter / hosting";
  return "Broadband / residential";
}

function boolText(v: boolean | null | undefined): string | null {
  if (v == null) return null;
  return v ? "Yes" : "No";
}

function DetailCard({
  title,
  rows,
  loading,
}: {
  title: string;
  rows: [string, React.ReactNode][];
  loading: boolean;
}) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {rows.map(([k, v]) => (
        <div className="kv" key={k}>
          <span className="k">{k}</span>
          <span className="v">{loading ? SK : v ?? "-"}</span>
        </div>
      ))}
    </div>
  );
}

function VpnBanner({
  data,
  error,
}: {
  data: IpData | null;
  error: boolean;
}) {
  if (error) return null;
  if (!data) {
    return (
      <div className="vpn-banner">
        <div className="icon">🛡️</div>
        <div>
          <h3>Checking VPN / proxy status…</h3>
          <p>Analysing your network…</p>
        </div>
      </div>
    );
  }
  const v = data.vpn;
  return (
    <div className={`vpn-banner ${v.isVpn ? "is-vpn" : "no-vpn"}`}>
      <div className="icon">{v.isVpn ? "🛡️" : "✅"}</div>
      <div style={{ flex: 1 }}>
        <h3>
          {v.isVpn ? "VPN / Proxy detected" : "No VPN detected"}{" "}
          <span className={`badge ${v.isVpn ? "bad" : "good"}`}>
            {v.confidence}% confidence
          </span>
        </h3>
        <p>
          {v.provider ? `Likely provider: ${v.provider}. ` : ""}
          {v.reason}
        </p>
      </div>
    </div>
  );
}
