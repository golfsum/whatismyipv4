// Affiliate recommendations. The URLs below are placeholders pointing at each
// brand's homepage. Replace them with your own affiliate links once you join
// each program. Links render with rel="sponsored nofollow" and a visible
// disclosure, which keeps things compliant with Google and the FTC.

export interface AffiliateProduct {
  name: string;
  blurb: string;
  url: string;
  tag?: string; // e.g. "Best overall"
  specs: { label: string; value: string }[];
}

export const AFFILIATE_DISCLOSURE =
  "Some links on this page are affiliate links. If you sign up through them we may earn a commission, at no extra cost to you. It never changes what we recommend.";

export const VPN_PRODUCTS: AffiliateProduct[] = [
  {
    name: "NordVPN",
    blurb: "Fast, with a huge server network and independently audited no-logs policy. A safe all-rounder.",
    url: "https://nordvpn.com",
    tag: "Best overall",
    specs: [
      { label: "Price", value: "$$" },
      { label: "Devices", value: "10" },
      { label: "Streaming", value: "Excellent" },
      { label: "Torrents", value: "Yes" },
      { label: "Refund", value: "30 days" },
    ],
  },
  {
    name: "Surfshark",
    blurb: "Budget-friendly with unlimited simultaneous devices, so it covers the whole household on one plan.",
    url: "https://surfshark.com",
    tag: "Best value",
    specs: [
      { label: "Price", value: "$" },
      { label: "Devices", value: "Unlimited" },
      { label: "Streaming", value: "Great" },
      { label: "Torrents", value: "Yes" },
      { label: "Refund", value: "30 days" },
    ],
  },
  {
    name: "Proton VPN",
    blurb: "Privacy-first, based in Switzerland, with a genuinely usable free tier and open-source apps.",
    url: "https://protonvpn.com",
    tag: "Best for privacy",
    specs: [
      { label: "Price", value: "$$ (free tier)" },
      { label: "Devices", value: "10" },
      { label: "Streaming", value: "Good" },
      { label: "Torrents", value: "Yes" },
      { label: "Refund", value: "30 days" },
    ],
  },
  {
    name: "ExpressVPN",
    blurb: "Polished, beginner-friendly apps and reliable streaming, at a premium price.",
    url: "https://expressvpn.com",
    specs: [
      { label: "Price", value: "$$$" },
      { label: "Devices", value: "8" },
      { label: "Streaming", value: "Excellent" },
      { label: "Torrents", value: "Yes" },
      { label: "Refund", value: "30 days" },
    ],
  },
  {
    name: "Mullvad",
    blurb: "Privacy purist's choice. Flat pricing, anonymous accounts, no email required.",
    url: "https://mullvad.net",
    specs: [
      { label: "Price", value: "Flat €5/mo" },
      { label: "Devices", value: "5" },
      { label: "Streaming", value: "Limited" },
      { label: "Torrents", value: "Yes" },
      { label: "Refund", value: "30 days" },
    ],
  },
];

export const ROUTER_PRODUCTS: AffiliateProduct[] = [
  {
    name: "Wi-Fi 6 Router",
    blurb: "A modern standalone router. The biggest single upgrade if yours is more than a few years old.",
    url: "https://www.amazon.com/s?k=wifi+6+router",
    tag: "Best upgrade",
    specs: [
      { label: "Best for", value: "Small to medium homes" },
      { label: "Standard", value: "Wi-Fi 6" },
    ],
  },
  {
    name: "Mesh Wi-Fi System",
    blurb: "Several units that blanket a large or multi-floor home in one seamless network.",
    url: "https://www.amazon.com/s?k=mesh+wifi+system",
    tag: "Best coverage",
    specs: [
      { label: "Best for", value: "Large homes, dead spots" },
      { label: "Standard", value: "Wi-Fi 6 / 6E" },
    ],
  },
  {
    name: "Ethernet Cables",
    blurb: "The cheapest fix for lag and dropouts. Wire in your console, desktop or TV.",
    url: "https://www.amazon.com/s?k=cat6+ethernet+cable",
    specs: [
      { label: "Best for", value: "Gaming, 4K, stability" },
      { label: "Spec", value: "Cat 6 or better" },
    ],
  },
];

export function affiliateProducts(type: string): AffiliateProduct[] {
  if (type === "vpn") return VPN_PRODUCTS;
  if (type === "router") return ROUTER_PRODUCTS;
  return [];
}
