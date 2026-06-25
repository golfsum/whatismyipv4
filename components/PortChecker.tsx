"use client";

import { useState } from "react";

interface Result {
  ok: boolean;
  error?: string;
  host?: string;
  port?: number;
  open?: boolean;
  ms?: number;
}

const COMMON = [
  { port: 80, label: "HTTP (80)" },
  { port: 443, label: "HTTPS (443)" },
  { port: 22, label: "SSH (22)" },
  { port: 21, label: "FTP (21)" },
  { port: 25, label: "SMTP (25)" },
  { port: 3389, label: "RDP (3389)" },
];

export default function PortChecker() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("443");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const run = async (p?: number) => {
    const usePort = p ?? parseInt(port, 10);
    setLoading(true);
    setResult(null);
    try {
      const q = new URLSearchParams();
      if (host.trim()) q.set("host", host.trim());
      q.set("port", String(usePort));
      const res = await fetch(`/api/port?${q.toString()}`);
      setResult(await res.json());
    } catch {
      setResult({ ok: false, error: "Check failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="tool">
      <form
        className="tool-form"
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="Host or IP (blank = your IP)"
          aria-label="Host"
          autoComplete="off"
        />
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Port"
          aria-label="Port"
          style={{ flex: "0 0 90px" }}
          autoComplete="off"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking…" : "Check Port"}
        </button>
      </form>

      <div className="port-presets">
        {COMMON.map((c) => (
          <button
            key={c.port}
            className="chip-btn"
            onClick={() => {
              setPort(String(c.port));
              run(c.port);
            }}
            disabled={loading}
          >
            {c.label}
          </button>
        ))}
      </div>

      {result && !result.ok && <p className="err">{result.error}</p>}

      {result && result.ok && (
        <div className="tool-result">
          <div className={`vpn-banner ${result.open ? "no-vpn" : "is-vpn"}`}>
            <div className="icon">{result.open ? "✅" : "⛔"}</div>
            <div>
              <h3>
                Port {result.port} is {result.open ? "open" : "closed or filtered"}{" "}
                on {result.host}
              </h3>
              <p>
                {result.open
                  ? `Responded in ${result.ms} ms.`
                  : "No response within the timeout. The port may be closed, or a firewall is blocking it."}
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="muted" style={{ marginTop: 12, fontSize: 13 }}>
        This checks whether a port accepts connections from the internet. Home
        connections block most incoming ports by default, which is normal and
        good for security.
      </p>
    </section>
  );
}
