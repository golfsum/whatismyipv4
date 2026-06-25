import tls from "tls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanHost(input: string): string | null {
  let h = (input || "").trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
  h = h.split(":")[0];
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(h)) return null;
  return h;
}

interface CertInfo {
  ok: boolean;
  error?: string;
  host?: string;
  subject?: string;
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  altNames?: string[];
  protocol?: string | null;
}

function inspect(host: string): Promise<CertInfo> {
  return new Promise((resolve) => {
    const socket = tls.connect(
      { host, port: 443, servername: host, rejectUnauthorized: false },
      () => {
        const cert = socket.getPeerCertificate();
        const protocol = socket.getProtocol();
        socket.end();
        if (!cert || !cert.valid_to) {
          resolve({ ok: false, error: "No certificate found." });
          return;
        }
        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.round(
          (validTo.getTime() - Date.now()) / 86_400_000
        );
        resolve({
          ok: true,
          host,
          subject: cert.subject?.CN,
          issuer: cert.issuer?.O || cert.issuer?.CN,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          daysRemaining,
          altNames: cert.subjectaltname
            ? cert.subjectaltname.split(",").map((s) => s.replace(/DNS:/g, "").trim())
            : [],
          protocol,
        });
      }
    );
    socket.setTimeout(8000, () => {
      socket.destroy();
      resolve({ ok: false, error: "Connection timed out." });
    });
    socket.on("error", () => {
      resolve({ ok: false, error: "Could not connect to this host over HTTPS." });
    });
  });
}

export async function GET(req: Request) {
  const host = cleanHost(new URL(req.url).searchParams.get("host") || "");
  if (!host) {
    return Response.json({ ok: false, error: "Enter a valid domain name." });
  }
  const result = await inspect(host);
  return Response.json(result, { headers: { "Cache-Control": "no-store" } });
}
