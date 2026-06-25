export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Block obviously private/internal targets to avoid SSRF.
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

const SECURITY_HEADERS = [
  { key: "strict-transport-security", label: "HSTS", why: "Forces HTTPS and blocks downgrade attacks." },
  { key: "content-security-policy", label: "Content-Security-Policy", why: "Limits where scripts and resources can load from." },
  { key: "x-frame-options", label: "X-Frame-Options", why: "Stops the page being framed (clickjacking)." },
  { key: "x-content-type-options", label: "X-Content-Type-Options", why: "Stops MIME-type sniffing." },
  { key: "referrer-policy", label: "Referrer-Policy", why: "Controls how much referrer info is shared." },
  { key: "permissions-policy", label: "Permissions-Policy", why: "Restricts browser features like camera and geolocation." },
];

export async function GET(req: Request) {
  let raw = (new URL(req.url).searchParams.get("url") || "").trim();
  if (!raw) return Response.json({ ok: false, error: "Enter a URL." });
  if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw;

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return Response.json({ ok: false, error: "That doesn't look like a valid URL." });
  }
  if (!/^https?:$/.test(target.protocol) || isBlockedHost(target.hostname)) {
    return Response.json({ ok: false, error: "That URL can't be checked." });
  }

  try {
    const res = await fetch(target.toString(), {
      redirect: "manual",
      headers: { "User-Agent": "WhatsMyIPv4-HeaderCheck/1.0" },
      signal: AbortSignal.timeout(8000),
    });

    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => {
      headers[k] = v;
    });

    const security = SECURITY_HEADERS.map((h) => ({
      label: h.label,
      why: h.why,
      present: Object.prototype.hasOwnProperty.call(headers, h.key),
    }));
    const score = security.filter((s) => s.present).length;

    return Response.json(
      {
        ok: true,
        url: target.toString(),
        status: res.status,
        headers,
        security,
        score,
        total: SECURITY_HEADERS.length,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return Response.json({ ok: false, error: "Could not reach that URL." });
  }
}
