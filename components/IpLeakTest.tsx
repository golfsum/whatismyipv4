"use client";

import { useState, useCallback } from "react";

type Status = "idle" | "running" | "done" | "unsupported";

function isPrivate(ip: string): boolean {
  return (
    ip.endsWith(".local") ||
    /^10\./.test(ip) ||
    /^192\.168\./.test(ip) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    /^169\.254\./.test(ip) ||
    /^(fe80|fc|fd)/i.test(ip) ||
    ip === "127.0.0.1" ||
    ip === "::1"
  );
}

export default function IpLeakTest() {
  const [status, setStatus] = useState<Status>("idle");
  const [ips, setIps] = useState<string[]>([]);

  const run = useCallback(() => {
    const RTCPeer =
      window.RTCPeerConnection ||
      (window as unknown as { webkitRTCPeerConnection?: typeof RTCPeerConnection })
        .webkitRTCPeerConnection;
    if (!RTCPeer) {
      setStatus("unsupported");
      return;
    }
    setStatus("running");
    setIps([]);
    const found = new Set<string>();

    const pc = new RTCPeer({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pc.createDataChannel("leak");

    const ipRe =
      /((?:\d{1,3}\.){3}\d{1,3}|[a-f0-9]{1,4}(?::[a-f0-9]{0,4}){2,7}|[a-z0-9-]+\.local)/gi;

    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        // Gathering finished.
        setStatus("done");
        pc.close();
        return;
      }
      const matches = e.candidate.candidate.match(ipRe);
      if (matches) {
        matches.forEach((ip) => {
          if (ip && !found.has(ip)) {
            found.add(ip);
            setIps(Array.from(found));
          }
        });
      }
    };

    pc.createOffer()
      .then((o) => pc.setLocalDescription(o))
      .catch(() => setStatus("done"));

    // Safety timeout.
    setTimeout(() => {
      setStatus((s) => (s === "running" ? "done" : s));
      try {
        pc.close();
      } catch {
        /* ignore */
      }
    }, 5000);
  }, []);

  const publicIps = ips.filter((ip) => !isPrivate(ip));
  const localIps = ips.filter((ip) => isPrivate(ip));

  return (
    <section className="tool">
      <button
        className="copy-btn speedtest-btn"
        onClick={run}
        disabled={status === "running"}
      >
        {status === "running"
          ? "Testing…"
          : status === "idle"
          ? "Run IP Leak Test"
          : "Test Again"}
      </button>

      {status === "unsupported" && (
        <p className="muted" style={{ marginTop: 16 }}>
          Your browser has WebRTC disabled — that&apos;s good for privacy. No IPs
          could leak via WebRTC.
        </p>
      )}

      {(status === "running" || status === "done") && (
        <div className="tool-result" style={{ marginTop: 16 }}>
          <div className={`vpn-banner ${publicIps.length ? "is-vpn" : "no-vpn"}`}>
            <div className="icon">{publicIps.length ? "⚠️" : "✅"}</div>
            <div>
              <h3>
                {publicIps.length
                  ? "A public IP is exposed via WebRTC"
                  : status === "done"
                  ? "No public IP leaked via WebRTC"
                  : "Scanning…"}
              </h3>
              <p>
                {publicIps.length
                  ? "If you're on a VPN, this address may reveal your real connection. Disable WebRTC or use a VPN/extension that blocks it."
                  : "WebRTC did not expose a routable public IP address."}
              </p>
            </div>
          </div>

          {publicIps.length > 0 && (
            <>
              <h3 style={{ marginTop: 16 }}>Public IPs detected</h3>
              <table className="result-table">
                <tbody>
                  {publicIps.map((ip) => (
                    <tr key={ip}>
                      <td className="mono">{ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {localIps.length > 0 && (
            <>
              <h3 style={{ marginTop: 16 }}>Local addresses</h3>
              <table className="result-table">
                <tbody>
                  {localIps.map((ip) => (
                    <tr key={ip}>
                      <td className="mono">{ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="muted" style={{ marginTop: 8 }}>
                Modern browsers hide your true local IP behind an mDNS{" "}
                <code>.local</code> name — that&apos;s expected and harmless.
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
}
