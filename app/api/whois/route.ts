export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanDomain(input: string): string | null {
  const d = (input || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/^www\./, "");
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(d)) return null;
  return d;
}

// Pulls a readable name out of an RDAP vCard entity.
function vcardName(entity: { vcardArray?: unknown }): string | null {
  try {
    const arr = (entity.vcardArray as unknown[])?.[1] as unknown[];
    const fn = arr.find((row) => Array.isArray(row) && row[0] === "fn") as
      | unknown[]
      | undefined;
    return fn ? String(fn[3]) : null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const domain = cleanDomain(new URL(req.url).searchParams.get("domain") || "");
  if (!domain) {
    return Response.json({ ok: false, error: "Enter a valid domain name." });
  }

  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      redirect: "follow",
      headers: { Accept: "application/rdap+json" },
      signal: AbortSignal.timeout(9000),
    });
    if (res.status === 404) {
      return Response.json({ ok: false, error: "Domain not found or not registered." });
    }
    if (!res.ok) {
      return Response.json({ ok: false, error: "WHOIS lookup failed for this domain." });
    }
    const data = await res.json();

    const events: Record<string, string> = {};
    for (const e of data.events || []) {
      if (e.eventAction && e.eventDate) events[e.eventAction] = e.eventDate;
    }

    let registrar: string | null = null;
    for (const ent of data.entities || []) {
      if ((ent.roles || []).includes("registrar")) {
        registrar = vcardName(ent);
        break;
      }
    }

    const nameservers = (data.nameservers || [])
      .map((n: { ldhName?: string }) => n.ldhName)
      .filter(Boolean);

    return Response.json(
      {
        ok: true,
        domain: data.ldhName || domain,
        registrar,
        status: data.status || [],
        registered: events.registration || null,
        updated: events["last changed"] || null,
        expires: events.expiration || null,
        nameservers,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return Response.json({ ok: false, error: "WHOIS lookup failed. Try again." });
  }
}
