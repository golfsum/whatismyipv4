"use client";

import { useState } from "react";

function ipToInt(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    const v = Number(p);
    if (!Number.isInteger(v) || v < 0 || v > 255) return null;
    n = (n << 8) | v;
  }
  return n >>> 0;
}

function intToIp(n: number): string {
  return [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");
}

interface Calc {
  network: string;
  broadcast: string;
  mask: string;
  wildcard: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  prefix: number;
  ipClass: string;
  isPrivate: boolean;
}

function calculate(ip: string, prefix: number): Calc | null {
  const ipInt = ipToInt(ip);
  if (ipInt === null || prefix < 0 || prefix > 32) return null;
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = prefix >= 31 ? 2 ** (32 - prefix) : 2 ** (32 - prefix);
  const usable = prefix >= 31 ? (prefix === 32 ? 1 : 2) : total - 2;
  const firstHost = prefix >= 31 ? network : (network + 1) >>> 0;
  const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;

  const firstOctet = (ipInt >>> 24) & 255;
  const ipClass =
    firstOctet < 128
      ? "A"
      : firstOctet < 192
      ? "B"
      : firstOctet < 224
      ? "C"
      : firstOctet < 240
      ? "D (multicast)"
      : "E (reserved)";
  const isPrivate =
    firstOctet === 10 ||
    (firstOctet === 172 && ((ipInt >>> 16) & 255) >= 16 && ((ipInt >>> 16) & 255) <= 31) ||
    (firstOctet === 192 && ((ipInt >>> 16) & 255) === 168);

  return {
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    mask: intToIp(mask),
    wildcard: intToIp(~mask >>> 0),
    firstHost: intToIp(firstHost),
    lastHost: intToIp(lastHost),
    totalHosts: total,
    usableHosts: usable,
    prefix,
    ipClass,
    isPrivate,
  };
}

export default function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.1");
  const [prefix, setPrefix] = useState(24);
  const [result, setResult] = useState<Calc | null>(() =>
    calculate("192.168.1.1", 24)
  );
  const [error, setError] = useState<string | null>(null);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const c = calculate(ip, prefix);
    if (!c) {
      setError("Enter a valid IPv4 address and prefix (0–32).");
      setResult(null);
      return;
    }
    setError(null);
    setResult(c);
  };

  const rows: [string, string][] = result
    ? [
        ["Network address", `${result.network}/${result.prefix}`],
        ["Usable host range", `${result.firstHost} – ${result.lastHost}`],
        ["Broadcast address", result.broadcast],
        ["Subnet mask", result.mask],
        ["Wildcard mask", result.wildcard],
        ["Total addresses", result.totalHosts.toLocaleString()],
        ["Usable hosts", result.usableHosts.toLocaleString()],
        ["IP class", result.ipClass],
        ["Type", result.isPrivate ? "Private" : "Public"],
      ]
    : [];

  return (
    <section className="tool">
      <form className="tool-form" onSubmit={run}>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="192.168.1.1"
          aria-label="IPv4 address"
          autoComplete="off"
        />
        <span className="slash">/</span>
        <select
          value={prefix}
          onChange={(e) => setPrefix(Number(e.target.value))}
          aria-label="Prefix length"
        >
          {Array.from({ length: 33 }, (_, i) => i).map((p) => (
            <option key={p} value={p}>
              /{p}
            </option>
          ))}
        </select>
        <button type="submit">Calculate</button>
      </form>

      {error && <p className="err">{error}</p>}

      {result && (
        <div className="tool-result">
          <table className="result-table">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td className="mono">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
