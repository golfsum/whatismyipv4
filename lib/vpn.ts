// ---------------------------------------------------------------------------
// Best-effort VPN / proxy / hosting detection.
//
// There is no 100% reliable way to detect a VPN without a paid commercial
// threat-intel feed. We combine three signals:
//   1. ip-api's `proxy` / `hosting` booleans (free tier security fields).
//   2. Whether the network is a known datacenter / hosting ASN (VPNs run on
//      datacenters, not residential ISPs).
//   3. Keyword matching of the org / ISP / ASN name against well-known VPN
//      provider brands so we can guess *which* VPN when possible.
// ---------------------------------------------------------------------------

export interface VpnSignal {
  ipInfo: {
    proxy?: boolean;
    hosting?: boolean;
    mobile?: boolean;
    org?: string;
    isp?: string;
    as?: string;
    asname?: string;
  };
}

export interface VpnVerdict {
  // true  -> very likely on a VPN / proxy
  // false -> very likely a normal residential / mobile connection
  isVpn: boolean;
  // 0..100 rough confidence
  confidence: number;
  // Friendly provider name if we could guess one, else null.
  provider: string | null;
  // Short human explanation of the reasoning.
  reason: string;
}

// Known consumer VPN brands -> matched against org/isp/as text.
const VPN_BRANDS: { name: string; patterns: string[] }[] = [
  { name: "NordVPN", patterns: ["nordvpn", "nord vpn", "tefincom"] },
  { name: "ExpressVPN", patterns: ["expressvpn", "express vpn"] },
  { name: "Surfshark", patterns: ["surfshark"] },
  { name: "Mullvad", patterns: ["mullvad", "31173"] },
  { name: "Proton VPN", patterns: ["protonvpn", "proton vpn", "proton ag"] },
  { name: "CyberGhost", patterns: ["cyberghost"] },
  { name: "Private Internet Access", patterns: ["private internet access", "london trust media", "pia"] },
  { name: "IPVanish", patterns: ["ipvanish"] },
  { name: "TunnelBear", patterns: ["tunnelbear"] },
  { name: "Windscribe", patterns: ["windscribe"] },
  { name: "Hide.me", patterns: ["hide.me", "hideme"] },
  { name: "VyprVPN", patterns: ["vyprvpn", "golden frog"] },
  { name: "PureVPN", patterns: ["purevpn", "gz systems"] },
  { name: "Hotspot Shield", patterns: ["hotspot shield", "aura", "pango"] },
  { name: "Atlas VPN", patterns: ["atlas vpn", "atlasvpn"] },
  { name: "TorGuard", patterns: ["torguard"] },
];

// Hosting / datacenter networks frequently used to host VPN exit nodes.
const DATACENTER_HINTS = [
  "m247", "datacamp", "leaseweb", "ovh", "hetzner", "digitalocean",
  "linode", "akamai", "amazon", "aws", "google cloud", "google llc",
  "microsoft", "azure", "oracle", "vultr", "choopa", "contabo",
  "g-core", "gcore", "packet", "hostwinds", "100tb", "psychz",
  "quadranet", "cogent", "scaleway", "online s.a.s", " colocrossing",
  "host europe", "servers.com", "fdcservers", "constant company",
];

function matchBrand(text: string): string | null {
  const t = text.toLowerCase();
  for (const brand of VPN_BRANDS) {
    if (brand.patterns.some((p) => t.includes(p))) return brand.name;
  }
  return null;
}

function looksLikeDatacenter(text: string): boolean {
  const t = text.toLowerCase();
  return DATACENTER_HINTS.some((h) => t.includes(h.trim()));
}

export function detectVpn(signal: VpnSignal): VpnVerdict {
  const { ipInfo } = signal;
  const haystack = [ipInfo.org, ipInfo.isp, ipInfo.as, ipInfo.asname]
    .filter(Boolean)
    .join(" ");

  const provider = matchBrand(haystack);
  const datacenter = looksLikeDatacenter(haystack);

  let confidence = 0;
  const reasons: string[] = [];

  if (provider) {
    confidence += 80;
    reasons.push(`network belongs to ${provider}`);
  }
  if (ipInfo.proxy) {
    confidence += 60;
    reasons.push("flagged as a proxy/VPN");
  }
  if (ipInfo.hosting) {
    confidence += 35;
    reasons.push("hosted on a datacenter network");
  }
  if (!ipInfo.hosting && datacenter) {
    confidence += 30;
    reasons.push("ISP looks like a datacenter provider");
  }
  if (ipInfo.mobile) {
    // Mobile carriers are almost never VPN exit nodes.
    confidence -= 25;
    reasons.push("connection is a mobile carrier");
  }

  confidence = Math.max(0, Math.min(100, confidence));
  const isVpn = confidence >= 50;

  let reason: string;
  if (reasons.length === 0) {
    reason = "Looks like a regular residential/business connection.";
  } else if (isVpn) {
    reason = "Likely a VPN/proxy: " + reasons.join("; ") + ".";
  } else {
    reason =
      "Probably not a VPN, but note: " + reasons.join("; ") + ".";
  }

  return {
    isVpn,
    confidence,
    provider: isVpn ? provider : null,
    reason,
  };
}
