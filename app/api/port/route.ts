import net from "net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function firstIp(value: string | null): string {
  if (!value) return "";
  return value.split(",")[0]?.trim() || "";
}

function isBlockedHost(host: string): boolean {
  const h = host.toLowerCase();
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "::1" ||
    h.startsWith("10.") ||
    h.startsWith("192.168.") ||
    h.startsWith("169.254.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h) ||
    h.endsWith(".local") ||
    h.endsWith(".internal")
  );
}

function validHost(h: string): boolean {
  return (
    /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(h) || // domain
    /^\d{1,3}(\.\d{1,3}){3}$/.test(h) || // IPv4
    h.includes(":") // IPv6
  );
}

function checkPort(host: string, port: number): Promise<{ open: boolean; ms: number }> {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    let done = false;
    const finish = (open: boolean) => {
      if (done) return;
      done = true;
      try {
        socket.destroy();
      } catch {
        /* ignore */
      }
      resolve({ open, ms: Date.now() - start });
    };
    socket.setTimeout(5000);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
    try {
      socket.connect(port, host);
    } catch {
      finish(false);
    }
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const port = parseInt(url.searchParams.get("port") || "", 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return Response.json({ ok: false, error: "Enter a port between 1 and 65535." });
  }

  let host = (url.searchParams.get("host") || "").trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
  if (!host) {
    // Default to the visitor's public IP.
    const headers = (req as Request & { headers: Headers }).headers;
    host = firstIp(headers.get("x-forwarded-for")) || headers.get("x-real-ip") || "";
  }
  if (!host || !validHost(host)) {
    return Response.json({ ok: false, error: "Enter a valid host or IP address." });
  }
  if (isBlockedHost(host)) {
    return Response.json({ ok: false, error: "That host can't be checked." });
  }

  const result = await checkPort(host, port);
  return Response.json(
    { ok: true, host, port, open: result.open, ms: result.ms },
    { headers: { "Cache-Control": "no-store" } }
  );
}
