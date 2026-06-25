// Central registry of tools - used by the homepage cards, footer, sitemap and
// internal-link sections so everything stays consistent.

export interface Tool {
  href: string;
  label: string;
  desc: string;
  category: "IP" | "Network" | "Browser" | "Privacy" | "Security" | "DNS" | "Developer";
  live: boolean; // false = "coming soon"
}

export const TOOLS: Tool[] = [
  // IP
  { href: "/", label: "What's My IP", desc: "Your public IPv4 & IPv6, ISP and location.", category: "IP", live: true },
  { href: "/what-is-my-ipv4", label: "IPv4 Lookup", desc: "Find your public IPv4 address.", category: "IP", live: true },
  { href: "/what-is-my-ipv6", label: "IPv6 Lookup", desc: "Find & test your IPv6 address.", category: "IP", live: true },
  { href: "/ip-location", label: "IP Location", desc: "See your IP on a map.", category: "IP", live: true },
  { href: "/what-is-my-router-ip", label: "Router IP Finder", desc: "Find your default gateway.", category: "IP", live: true },

  // Network
  { href: "/speedtest", label: "Speed Test", desc: "Download, upload, ping & jitter.", category: "Network", live: true },
  { href: "/subnet-calculator", label: "Subnet Calculator", desc: "CIDR, masks, host ranges.", category: "Network", live: true },

  // Privacy
  { href: "/vpn-check", label: "VPN Check", desc: "Is your VPN or proxy working?", category: "Privacy", live: true },
  { href: "/proxy-check", label: "Proxy Check", desc: "Detect proxy & datacenter IPs.", category: "Privacy", live: true },
  { href: "/ip-leak-test", label: "IP Leak Test", desc: "Detect WebRTC IP leaks.", category: "Privacy", live: true },
  { href: "/hide-my-ip", label: "Hide My IP", desc: "VPN, proxy & Tor compared.", category: "Privacy", live: true },

  // Browser
  { href: "/browser-info", label: "Browser Info", desc: "What your browser reveals.", category: "Browser", live: true },
  { href: "/user-agent", label: "User Agent", desc: "View & decode your user agent.", category: "Browser", live: true },

  // Security
  { href: "/ssl-checker", label: "SSL Checker", desc: "Inspect a site's HTTPS certificate.", category: "Security", live: true },
  { href: "/http-header-check", label: "HTTP Headers", desc: "View response & security headers.", category: "Security", live: true },
  { href: "/security-header-analyzer", label: "Security Headers", desc: "Grade a site's security headers.", category: "Security", live: true },

  // DNS
  { href: "/dns-lookup", label: "DNS Lookup", desc: "A, AAAA, CNAME, NS, TXT records.", category: "DNS", live: true },
  { href: "/reverse-dns", label: "Reverse DNS", desc: "IP → hostname (PTR) lookup.", category: "DNS", live: true },
  { href: "/mx-lookup", label: "MX Lookup", desc: "Mail server (MX) records.", category: "DNS", live: true },
  { href: "/spf-dmarc-lookup", label: "SPF & DMARC", desc: "Email security TXT records.", category: "DNS", live: true },

  // Developer
  { href: "/whois-lookup", label: "WHOIS Lookup", desc: "Domain registration details.", category: "Developer", live: true },
];

export const TOOL_CATEGORIES: Tool["category"][] = [
  "IP",
  "Network",
  "Privacy",
  "Security",
  "Browser",
  "DNS",
  "Developer",
];

export const LEGAL_LINKS: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookie Policy" },
];
