// Topic hubs. Each pulls together the relevant tools and guides so a visitor
// landing on, say, "DNS" can find every related tool and article in one place.
// Rendered by app/category/[slug]/page.tsx.

export interface Category {
  slug: string;
  name: string;
  title: string;
  description: string;
  overview: string[];
  toolHrefs: string[];
  guideSlugs: string[];
  faq: { q: string; a: string }[];
  related: string[]; // other category slugs
}

export const CATEGORIES: Category[] = [
  {
    slug: "networking",
    name: "Networking",
    title: "Networking Tools & Guides",
    description:
      "Test and troubleshoot your connection: speed, ping, packet loss, subnets and more, with plain-English guides to go with the tools.",
    overview: [
      "Networking covers everything about how your connection performs and behaves. Whether your internet feels slow, your ping is high, or you just want to understand your setup, the tools and guides here help you measure the problem and fix it.",
      "Start with a speed test for a baseline, then use the guides to interpret the numbers and improve them.",
    ],
    toolHrefs: ["/", "/speedtest", "/subnet-calculator", "/what-is-my-router-ip"],
    guideSlugs: [
      "why-is-my-internet-slow",
      "how-to-speed-up-internet",
      "how-to-lower-ping",
      "packet-loss-explained",
      "what-is-jitter",
      "download-vs-upload-speed",
      "ethernet-vs-wifi",
      "fiber-vs-cable-internet",
      "what-is-cgnat",
    ],
    faq: [
      {
        q: "How do I test my connection?",
        a: "Run the speed test for download, upload, ping and jitter, then open the home page for a full network report and health score.",
      },
      {
        q: "What's the most common cause of network problems?",
        a: "Wi-Fi. Distance, interference and old hardware account for most slow or unstable connections. Wiring in or improving your Wi-Fi fixes the majority of issues.",
      },
    ],
    related: ["speed", "gaming", "dns"],
  },
  {
    slug: "privacy",
    name: "Privacy",
    title: "Online Privacy Tools & Guides",
    description:
      "See what you're exposing online and learn how to share less: VPN checks, IP leak tests, browser fingerprinting and tracking explained.",
    overview: [
      "Every site you visit learns more about you than you'd expect, from your IP and rough location to your browser fingerprint. These tools show exactly what's visible, and the guides explain how to take back control.",
    ],
    toolHrefs: ["/vpn-check", "/ip-leak-test", "/hide-my-ip", "/browser-info"],
    guideSlugs: [
      "can-someone-find-my-location-from-my-ip",
      "what-websites-can-see-about-you",
      "browser-fingerprinting-explained",
      "cookies-explained",
      "incognito-mode-explained",
      "how-accurate-is-ip-geolocation",
    ],
    faq: [
      {
        q: "Does a VPN make me private?",
        a: "It hides your IP and encrypts traffic, which helps, but cookies and fingerprinting still identify you. Real privacy combines a VPN with a privacy browser and good habits.",
      },
      {
        q: "What can websites actually see about me?",
        a: "Your IP and rough location, your browser and device details, language and time zone, and enough combined to fingerprint you. They can't see your name or files unless you provide them.",
      },
    ],
    related: ["vpn", "browser", "internet-basics"],
  },
  {
    slug: "vpn",
    name: "VPN",
    title: "VPN Tools & Guides",
    description:
      "Check whether your VPN is working and learn how VPNs really work: what they hide, how they compare to proxies and Tor, and whether you need one.",
    overview: [
      "A VPN is a useful privacy tool that's often oversold. These guides cut through the marketing so you know what a VPN actually does, and the tools confirm yours is working and not leaking.",
    ],
    toolHrefs: ["/vpn-check", "/ip-leak-test", "/hide-my-ip"],
    guideSlugs: [
      "what-is-a-vpn",
      "should-i-use-a-vpn",
      "vpn-vs-proxy",
      "vpn-vs-tor",
      "how-to-test-your-vpn",
    ],
    faq: [
      {
        q: "How do I know my VPN is working?",
        a: "Run the VPN check and IP leak test while connected. Your IP and location should match the VPN server, with no real IP leaking through WebRTC.",
      },
      {
        q: "Are free VPNs safe?",
        a: "Some are, but running a VPN costs money, so a few free services log or sell your data. A reputable paid provider is the safer choice.",
      },
    ],
    related: ["privacy", "internet-basics", "browser"],
  },
  {
    slug: "dns",
    name: "DNS",
    title: "DNS Tools & Guides",
    description:
      "Look up DNS records and learn how DNS works: lookups, reverse DNS, MX and SPF, plus guides on changing, flushing and choosing the best DNS.",
    overview: [
      "DNS is the internet's address book, turning names into IP addresses. These tools let you inspect any domain's records, and the guides explain how to speed up and secure your own DNS.",
    ],
    toolHrefs: ["/dns-lookup", "/reverse-dns", "/mx-lookup", "/spf-dmarc-lookup"],
    guideSlugs: [
      "what-is-dns",
      "how-to-change-dns",
      "how-to-flush-dns",
      "best-dns-servers",
      "dns-over-https",
      "google-dns-vs-cloudflare-dns",
      "best-dns-for-gaming",
    ],
    faq: [
      {
        q: "Should I change my DNS?",
        a: "It's a simple, reversible tweak that can speed up the first connection to new sites and add privacy. Cloudflare (1.1.1.1) and Google (8.8.8.8) are the popular free choices.",
      },
      {
        q: "What's a DNS lookup?",
        a: "It's a query that finds the records tied to a domain, such as its IP address or mail servers. Use the DNS lookup tool to check any domain.",
      },
    ],
    related: ["networking", "gaming", "privacy"],
  },
  {
    slug: "gaming",
    name: "Gaming",
    title: "Gaming Network Tools & Guides",
    description:
      "Lower your ping, kill lag, and pick the best DNS for gaming. Tools and guides focused on the latency and stability that online games need.",
    overview: [
      "For gaming, latency and stability beat raw download speed every time. These guides focus on the changes that actually make games feel sharp, and the speed test measures the ping and jitter that matter.",
    ],
    toolHrefs: ["/speedtest", "/"],
    guideSlugs: [
      "how-to-lower-ping",
      "reduce-gaming-lag",
      "best-dns-for-gaming",
      "ethernet-vs-wifi",
      "packet-loss-explained",
    ],
    faq: [
      {
        q: "What's the best fix for gaming lag?",
        a: "A wired Ethernet connection. It gives lower, steadier ping and almost no packet loss, which is exactly what games need.",
      },
      {
        q: "Does a faster plan help gaming?",
        a: "Barely. Bandwidth helps downloads, not latency. Wiring in and cutting congestion do far more for your ping.",
      },
    ],
    related: ["networking", "dns", "speed"],
  },
  {
    slug: "browser",
    name: "Browser",
    title: "Browser Tools & Guides",
    description:
      "See exactly what your browser reveals: user agent, device details, and fingerprint, plus guides on cookies, tracking and private browsing.",
    overview: [
      "Your browser quietly shares dozens of details with every site you visit. These tools show you exactly what's exposed, and the guides explain how tracking and fingerprinting really work.",
    ],
    toolHrefs: ["/browser-info", "/user-agent", "/ip-leak-test"],
    guideSlugs: [
      "browser-fingerprinting-explained",
      "what-websites-can-see-about-you",
      "cookies-explained",
      "incognito-mode-explained",
    ],
    faq: [
      {
        q: "What does my browser reveal?",
        a: "Your browser and version, operating system, device, screen size, language and time zone, among other things. The Browser Info tool shows the full list.",
      },
      {
        q: "Does incognito mode hide me?",
        a: "Only from your own device's history. Websites still see your IP and browser details. See the incognito guide for what it does and doesn't do.",
      },
    ],
    related: ["privacy", "vpn", "internet-basics"],
  },
  {
    slug: "internet-basics",
    name: "Internet Basics",
    title: "Internet Basics: IP Addresses Explained",
    description:
      "Understand IP addresses from the ground up: IPv4 vs IPv6, public vs private, static vs dynamic, and why your IP changes.",
    overview: [
      "New to how the internet addresses devices? Start here. These guides explain IP addresses in plain English, and the tools show you your own IP, location and network details.",
    ],
    toolHrefs: ["/", "/what-is-my-ipv4", "/what-is-my-ipv6", "/ip-location"],
    guideSlugs: [
      "ipv4-vs-ipv6",
      "private-vs-public-ip",
      "static-vs-dynamic-ip",
      "why-does-my-ip-keep-changing",
      "how-to-change-your-ip-address",
      "can-someone-find-my-location-from-my-ip",
      "how-accurate-is-ip-geolocation",
    ],
    faq: [
      {
        q: "What is my IP address?",
        a: "It's the unique number that identifies your network online. Your public IP is shown at the top of the home page.",
      },
      {
        q: "What's the difference between IPv4 and IPv6?",
        a: "IPv4 is the original, shorter format that ran low on addresses. IPv6 is the newer format with a practically unlimited supply. Many networks use both.",
      },
    ],
    related: ["networking", "privacy", "dns"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
