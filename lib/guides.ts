// Content hub. Each guide is rendered by app/guides/[slug]/page.tsx and listed
// on app/guides. Adding a guide here automatically creates its page, sitemap
// entry, and "related guides" links.

export type GuideCategory =
  | "Networking"
  | "Privacy"
  | "Gaming"
  | "DNS"
  | "Speed"
  | "Comparisons";

export interface GuideSection {
  h2: string;
  body?: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string; // <title>
  h1: string;
  description: string; // meta description
  category: GuideCategory;
  keywords: string[];
  readMins: number;
  intro: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  related: string[]; // other guide slugs
  tools: { href: string; label: string }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "why-is-my-internet-slow",
    title: "Why Is My Internet Slow? Common Causes and Fixes",
    h1: "Why Is My Internet So Slow?",
    description:
      "Slow internet has a handful of usual suspects. Here's how to find the real cause, from Wi-Fi interference to ISP throttling, and what actually fixes it.",
    category: "Networking",
    keywords: [
      "why is my internet slow",
      "internet slow",
      "slow wifi",
      "how to fix slow internet",
      "internet slow today",
    ],
    readMins: 6,
    intro: [
      "Slow internet is frustrating, and it's rarely just one thing. Before you call your provider, it helps to figure out whether the problem is your plan, your Wi-Fi, a single device, or the connection itself.",
      "Start with a speed test on a wired connection if you can. That one number tells you a lot about where to look next.",
    ],
    sections: [
      {
        h2: "First, measure it",
        body: [
          "Run a speed test and compare the result to the speed you're paying for. If a wired computer gets close to your plan but Wi-Fi devices don't, the issue is your Wi-Fi, not your internet.",
        ],
      },
      {
        h2: "The usual causes",
        bullets: [
          "Wi-Fi distance and interference. Walls, floors and other networks all weaken the signal. Speeds drop fast the further you sit from the router.",
          "Too many devices. Streaming, downloads and backups running at once share the same pipe.",
          "An old router. Hardware from several years ago can't keep up with a modern plan.",
          "Your plan. Sometimes the connection is simply doing what you pay for, and you need a faster tier.",
          "ISP congestion. Evenings are busy. If speeds only sag at peak hours, the network is congested.",
          "Background apps. Cloud sync, updates and torrents quietly eat bandwidth.",
        ],
      },
      {
        h2: "Quick fixes that usually help",
        bullets: [
          "Restart your router. It clears its memory and often picks a cleaner Wi-Fi channel.",
          "Move closer to the router, or switch to a wired connection for anything important.",
          "Pause big downloads and check what else is using the network.",
          "Use the 5 GHz band when you're near the router; it's faster than 2.4 GHz at short range.",
          "Update your router firmware, or replace a router that's more than four or five years old.",
        ],
      },
      {
        h2: "When to call your ISP",
        body: [
          "If a wired device still can't reach your plan's speed after a restart, the problem is likely upstream. Note the times it happens and the speeds you measured, then contact your provider with that evidence.",
        ],
      },
    ],
    faq: [
      {
        q: "Does restarting the router really help?",
        a: "Often, yes. It clears the router's memory, drops stale connections, and can switch to a less crowded Wi-Fi channel. It's the first thing worth trying.",
      },
      {
        q: "Why is my internet slow only at night?",
        a: "That's a classic sign of network congestion. Lots of people in your area are online at the same time, so the shared capacity gets stretched. It usually clears up off-peak.",
      },
      {
        q: "Is Wi-Fi slower than a wired connection?",
        a: "Almost always. Wi-Fi loses speed over distance and through walls, and it shares the air with neighbouring networks. A cable gives you the full, stable speed.",
      },
    ],
    related: ["how-to-lower-ping", "ethernet-vs-wifi", "why-does-my-ip-keep-changing"],
    tools: [
      { href: "/speedtest", label: "Speed Test" },
      { href: "/", label: "Check your IP & connection" },
    ],
  },

  {
    slug: "how-to-lower-ping",
    title: "How to Lower Your Ping for Gaming",
    h1: "How to Lower Your Ping",
    description:
      "High ping ruins online games. Here's what ping and jitter actually are, what causes lag, and the changes that genuinely bring your latency down.",
    category: "Gaming",
    keywords: [
      "how to lower ping",
      "lower ping",
      "reduce lag",
      "high ping fix",
      "best ping for gaming",
    ],
    readMins: 6,
    intro: [
      "In online games, ping matters more than raw download speed. A blazing connection with high latency still feels laggy, while a modest connection with low ping feels sharp.",
      "Ping is the round trip time for data to reach the game server and come back, measured in milliseconds. Lower is better. Under 30 ms feels instant, 30 to 60 ms is great, and anything over 100 ms starts to drag.",
    ],
    sections: [
      {
        h2: "What causes high ping",
        bullets: [
          "Distance to the server. Picking a server far away adds unavoidable delay.",
          "Wi-Fi. Wireless adds latency and jitter that a cable doesn't.",
          "A congested connection. Downloads or other people streaming compete with your game.",
          "An overloaded router, or old networking hardware.",
          "Your ISP's routing, which you can't always control.",
        ],
      },
      {
        h2: "What actually lowers it",
        bullets: [
          "Plug in. A wired Ethernet connection is the single biggest win for ping and stability.",
          "Choose the closest game server or region.",
          "Stop other downloads and ask housemates to pause streaming while you play.",
          "Turn on Quality of Service (QoS) in your router and prioritise your gaming device if it's supported.",
          "Restart the router to clear congestion, and keep its firmware updated.",
          "Close background apps that sync or update in the background.",
        ],
      },
      {
        h2: "What about jitter?",
        body: [
          "Jitter is how much your ping bounces around. Steady ping feels smooth even if it's not the lowest. High jitter causes rubber-banding and stutter, and it's usually a Wi-Fi or congestion problem, so the wired and QoS fixes above help here too.",
        ],
      },
    ],
    faq: [
      {
        q: "What is a good ping for gaming?",
        a: "Under 30 ms is excellent, 30 to 60 ms is great for almost any game, and up to 100 ms is playable. Above that you'll start to notice lag, especially in fast shooters.",
      },
      {
        q: "Does a VPN lower ping?",
        a: "Usually not. A VPN adds an extra hop, which tends to raise ping. The rare exception is when your ISP routes traffic badly and a VPN happens to take a shorter path.",
      },
      {
        q: "Will a faster internet plan lower my ping?",
        a: "Not by much. More bandwidth helps downloads, not latency. Wiring in and reducing congestion does far more for ping than upgrading your plan.",
      },
    ],
    related: ["why-is-my-internet-slow", "ethernet-vs-wifi", "google-dns-vs-cloudflare-dns"],
    tools: [
      { href: "/speedtest", label: "Test ping & jitter" },
      { href: "/", label: "Internet Health Report" },
    ],
  },

  {
    slug: "can-someone-find-my-location-from-my-ip",
    title: "Can Someone Find Your Address From Your IP?",
    h1: "Can Someone Find Your Address From Your IP Address?",
    description:
      "Worried someone can track you down from your IP? Here's what an IP address actually reveals, what it doesn't, and how to keep your real location private.",
    category: "Privacy",
    keywords: [
      "can someone find my location from my ip",
      "find address from ip",
      "can ip be traced",
      "is my ip private",
      "ip tracking",
    ],
    readMins: 5,
    intro: [
      "The short answer is no, not your actual street address. An IP address points to a general area and your internet provider, not your front door.",
      "It's still worth understanding exactly what it gives away, because the details surprise people in both directions.",
    ],
    sections: [
      {
        h2: "What your IP does reveal",
        bullets: [
          "A rough location, usually your city or region. On mobile it can be off by a long way.",
          "Your internet service provider.",
          "Whether you're on a home, mobile or business network.",
        ],
      },
      {
        h2: "What it doesn't reveal",
        bullets: [
          "Your name.",
          "Your home address.",
          "Your phone number or anything on your devices.",
        ],
      },
      {
        h2: "Who can link an IP to a person",
        body: [
          "Only your ISP knows which customer an IP was assigned to, and they'll only hand that over with a legal request such as a court order. A random person online cannot turn your IP into your identity.",
          "The map you see on IP lookup sites is an estimate from a database, not GPS. It often lands on your ISP's local hub or the centre of your city rather than where you actually are.",
        ],
      },
      {
        h2: "How to keep your location private",
        bullets: [
          "Use a VPN to replace your real IP with the VPN server's.",
          "Be cautious sharing your IP in games, forums or peer-to-peer apps.",
          "Check for WebRTC leaks, which can expose your real IP even behind a VPN.",
        ],
      },
    ],
    faq: [
      {
        q: "Can someone hack me with just my IP?",
        a: "Not on its own. An IP is like a postal address for data. Attacks need an actual vulnerability to exploit, and a typical home router blocks unsolicited incoming connections.",
      },
      {
        q: "How accurate is the location shown for my IP?",
        a: "Country level is very accurate. City level varies and can be wrong by tens of kilometres, particularly on mobile networks where many users share a regional gateway.",
      },
      {
        q: "Does a VPN really hide my location?",
        a: "Yes. Sites then see the VPN server's IP and location instead of yours. Just make sure your browser isn't leaking your real IP through WebRTC.",
      },
    ],
    related: ["how-accurate-is-ip-geolocation", "vpn-vs-proxy", "why-does-my-ip-keep-changing"],
    tools: [
      { href: "/ip-location", label: "See your IP location" },
      { href: "/vpn-check", label: "VPN Check" },
      { href: "/ip-leak-test", label: "IP Leak Test" },
    ],
  },

  {
    slug: "why-does-my-ip-keep-changing",
    title: "Why Does My IP Address Keep Changing?",
    h1: "Why Does My IP Address Keep Changing?",
    description:
      "Your public IP changing now and then is normal. Here's why it happens, the difference between dynamic and static IPs, and how to get a fixed one if you need it.",
    category: "Networking",
    keywords: [
      "why does my ip keep changing",
      "ip address changing",
      "dynamic ip",
      "ip changed",
      "get a static ip",
    ],
    readMins: 5,
    intro: [
      "If your IP address looks different from one day to the next, nothing is broken. Most home connections use dynamic addresses that rotate from time to time.",
    ],
    sections: [
      {
        h2: "Why it happens",
        body: [
          "Internet providers own a pool of addresses and hand them out as needed. This is more efficient than permanently reserving one address per customer, so your address can change when your router reconnects, when your lease expires, or simply when the ISP reorganises its pool.",
        ],
        bullets: [
          "You rebooted your router or it lost power.",
          "The address lease from your ISP expired and renewed.",
          "You switched networks, for example from Wi-Fi to mobile data.",
          "You connected to a VPN, which swaps in a different IP entirely.",
        ],
      },
      {
        h2: "Is a changing IP a problem?",
        body: [
          "For everyday browsing, no. You won't notice. It only matters if you're hosting something that needs a constant address, like a game server, a security camera you reach from outside, or remote access to a home computer.",
        ],
      },
      {
        h2: "How to get a fixed address",
        bullets: [
          "Ask your ISP for a static IP. Many offer one, sometimes for a small fee.",
          "Use a dynamic DNS service, which keeps a hostname pointed at your changing IP automatically.",
        ],
      },
    ],
    faq: [
      {
        q: "Is a static or dynamic IP better?",
        a: "For normal use, dynamic is fine and usually free. Static is better only if you host services that need a constant address. See our static vs dynamic IP comparison for the full picture.",
      },
      {
        q: "Does my IP change if I turn off my router?",
        a: "It might. When the router reconnects it asks for an address again, and the ISP may hand back a different one. Leaving it on for long stretches makes the address more likely to stay put.",
      },
    ],
    related: ["static-vs-dynamic-ip", "what-is-cgnat", "why-is-my-internet-slow"],
    tools: [
      { href: "/", label: "Check your current IP" },
      { href: "/what-is-my-ipv4", label: "IPv4 Lookup" },
    ],
  },

  {
    slug: "what-is-cgnat",
    title: "What Is CGNAT (Carrier-Grade NAT)?",
    h1: "What Is CGNAT, and Does It Affect You?",
    description:
      "CGNAT lets ISPs share one public IP among many customers. Here's what that means for gaming, hosting and port forwarding, and how to tell if you're behind it.",
    category: "Networking",
    keywords: [
      "what is cgnat",
      "carrier grade nat",
      "cgnat gaming",
      "am i behind cgnat",
      "double nat",
    ],
    readMins: 5,
    intro: [
      "CGNAT, short for Carrier-Grade NAT, is a way for internet providers to stretch their limited supply of IPv4 addresses by sharing a single public address across many customers at once.",
      "Most of the time you'd never know. It only shows up when you try to do something that needs the outside world to reach you directly.",
    ],
    sections: [
      {
        h2: "Why ISPs use it",
        body: [
          "There aren't enough IPv4 addresses to give every customer their own. CGNAT puts many households behind one shared public IP, with the carrier juggling the connections behind the scenes. It's cheaper than buying more addresses and buys time until IPv6 is everywhere.",
        ],
      },
      {
        h2: "What it affects",
        bullets: [
          "Port forwarding stops working, because you don't control the shared public IP.",
          "Hosting a game or server for others to connect to becomes difficult.",
          "Some peer-to-peer apps and remote access tools struggle.",
          "Online gaming may show a strict or moderate NAT type.",
        ],
      },
      {
        h2: "How to tell if you're behind CGNAT",
        body: [
          "Compare the public IP shown on this site with the WAN IP listed in your router's settings. If they're different, and the router's WAN address is in a shared range like 100.64.x.x, you're almost certainly behind CGNAT.",
        ],
      },
      {
        h2: "What you can do",
        bullets: [
          "Ask your ISP for a public or static IPv4 address, which usually sidesteps CGNAT.",
          "Use IPv6 if your ISP and the service support it, since CGNAT is an IPv4 workaround.",
          "For remote access, use a relay or tunnelling service that doesn't need incoming ports.",
        ],
      },
    ],
    faq: [
      {
        q: "Is CGNAT the same as double NAT?",
        a: "They're related but not identical. Double NAT is usually two routers in your own home. CGNAT adds another layer of translation at the ISP, on top of your home router.",
      },
      {
        q: "Does CGNAT slow down my internet?",
        a: "Not noticeably for normal browsing or streaming. Its downsides are about reachability, like port forwarding and hosting, rather than raw speed.",
      },
    ],
    related: ["why-does-my-ip-keep-changing", "ipv4-vs-ipv6", "what-is-my-router-ip"],
    tools: [
      { href: "/", label: "Check your public IP" },
      { href: "/what-is-my-router-ip", label: "Find your router IP" },
    ],
  },

  {
    slug: "how-accurate-is-ip-geolocation",
    title: "How Accurate Is IP Geolocation?",
    h1: "How Accurate Is IP Geolocation?",
    description:
      "IP geolocation can place you in the right city, or miss by a hundred miles. Here's how it works, why it's often wrong, and what affects the accuracy.",
    category: "Privacy",
    keywords: [
      "how accurate is ip geolocation",
      "ip location accuracy",
      "why is my ip location wrong",
      "ip geolocation",
    ],
    readMins: 5,
    intro: [
      "IP geolocation is good at the country level and rough everywhere below that. If a map shows you in the wrong town, the database is doing its best with limited information, not reading your GPS.",
    ],
    sections: [
      {
        h2: "How it works",
        body: [
          "Companies build databases that map ranges of IP addresses to locations. They gather this from regional registries, ISP records, and clues like network routing. When you look up an IP, the tool returns the location on file for that range.",
        ],
      },
      {
        h2: "Why it's often off",
        bullets: [
          "ISPs assign addresses from regional pools, so your IP may map to a hub city, not yours.",
          "Mobile networks route huge areas through a few gateways, so phones can appear far from where they are.",
          "VPNs and proxies move you to wherever their server is.",
          "Databases go stale as providers reassign address blocks.",
        ],
      },
      {
        h2: "How accurate is it really?",
        body: [
          "Country accuracy is typically well above 95 percent. City accuracy is much lower and varies by region and connection type. It's good enough to pick a language or a nearby store, but not to pinpoint a person.",
        ],
      },
    ],
    faq: [
      {
        q: "Why does my IP show the wrong city?",
        a: "Your ISP probably registered the address to a regional hub rather than your exact town, or the geolocation database is out of date for that block. It's normal and not something you can directly fix.",
      },
      {
        q: "Can IP geolocation find my exact address?",
        a: "No. It works at the city or ISP level at best and never uses GPS. Your precise location isn't in any IP database.",
      },
    ],
    related: ["can-someone-find-my-location-from-my-ip", "vpn-vs-proxy", "ipv4-vs-ipv6"],
    tools: [
      { href: "/ip-location", label: "See your IP location" },
      { href: "/", label: "Full IP details" },
    ],
  },

  // ---- Comparisons --------------------------------------------------------
  {
    slug: "ipv4-vs-ipv6",
    title: "IPv4 vs IPv6: What's the Difference?",
    h1: "IPv4 vs IPv6",
    description:
      "IPv4 and IPv6 are the two versions of internet addressing. Here's how they differ, why IPv6 exists, and whether you need to care about it.",
    category: "Comparisons",
    keywords: [
      "ipv4 vs ipv6",
      "difference between ipv4 and ipv6",
      "ipv6 vs ipv4",
      "do i need ipv6",
    ],
    readMins: 5,
    intro: [
      "IPv4 and IPv6 are both ways of giving every device on the internet an address. IPv4 came first and is still everywhere. IPv6 is the newer system built to fix IPv4's biggest limit: it ran out of addresses.",
    ],
    sections: [
      {
        h2: "The core difference",
        body: [
          "An IPv4 address is 32 bits, written as four numbers like 203.0.113.42. That allows about 4.3 billion addresses, which sounded like plenty in the 1980s and isn't anymore.",
          "An IPv6 address is 128 bits, written in hexadecimal like 2001:db8:85a3::8a2e:370:7334. The pool is so large it's effectively unlimited, enough for every device many times over.",
        ],
      },
      {
        h2: "What else changes",
        bullets: [
          "Address supply: IPv4 is exhausted, IPv6 is practically infinite.",
          "NAT: IPv4 leans on address sharing and translation, IPv6 can give every device its own public address.",
          "Format: IPv4 uses dotted decimal, IPv6 uses colon-separated hex.",
          "Adoption: IPv4 still carries most traffic, but IPv6 keeps growing.",
        ],
      },
      {
        h2: "Do you need IPv6?",
        body: [
          "For everyday use you won't notice a difference, and plenty of connections are still IPv4 only. IPv6 is the long-term direction, and turning it on (if your ISP offers it) can help with peer-to-peer apps and sidestep carrier-grade NAT. There's no downside to having both, which is what most modern networks run.",
        ],
      },
    ],
    faq: [
      {
        q: "Is IPv6 faster than IPv4?",
        a: "Not meaningfully for browsing. IPv6 can route a little more efficiently and avoid some NAT overhead, but you won't see a speed difference in normal use.",
      },
      {
        q: "Should I disable IPv6?",
        a: "Usually not. It's safe and increasingly expected. Only turn it off temporarily if a specific app or VPN misbehaves, then turn it back on.",
      },
    ],
    related: ["what-is-cgnat", "why-does-my-ip-keep-changing", "google-dns-vs-cloudflare-dns"],
    tools: [
      { href: "/what-is-my-ipv6", label: "Test your IPv6" },
      { href: "/what-is-my-ipv4", label: "IPv4 Lookup" },
    ],
  },

  {
    slug: "vpn-vs-proxy",
    title: "VPN vs Proxy: Which Should You Use?",
    h1: "VPN vs Proxy",
    description:
      "VPNs and proxies both hide your IP, but they work differently. Here's how they compare on privacy, speed and what each is actually good for.",
    category: "Comparisons",
    keywords: [
      "vpn vs proxy",
      "proxy vs vpn",
      "difference between vpn and proxy",
      "is a vpn better than a proxy",
    ],
    readMins: 5,
    intro: [
      "Both a VPN and a proxy route your traffic through another server so websites see a different IP. The big difference is encryption and scope, and that decides which one fits your needs.",
    ],
    sections: [
      {
        h2: "How they differ",
        bullets: [
          "A VPN encrypts all your device's traffic and sends it through a secure tunnel.",
          "A proxy reroutes a single app or browser, and usually doesn't encrypt anything.",
          "A VPN protects everything at once, a proxy protects only what you point at it.",
        ],
      },
      {
        h2: "Privacy and security",
        body: [
          "A reputable VPN is the stronger choice for privacy because it encrypts your data, which matters on public Wi-Fi. A proxy mainly changes your apparent location and offers little protection from anyone watching the connection.",
        ],
      },
      {
        h2: "Speed and convenience",
        body: [
          "Proxies are lightweight and can be quick because there's no encryption overhead. A good VPN adds only a small slowdown while covering your whole device. For casual geo-shifting in one app a proxy is fine. For real privacy, choose a VPN.",
        ],
      },
    ],
    faq: [
      {
        q: "Is a VPN safer than a proxy?",
        a: "Yes. A VPN encrypts your traffic and covers the whole device. Most proxies don't encrypt anything, so they're easier to snoop on.",
      },
      {
        q: "Does either one make me fully anonymous?",
        a: "No. Cookies, logins and browser fingerprinting can still identify you. Hiding your IP is one layer of privacy, not the whole thing.",
      },
    ],
    related: ["can-someone-find-my-location-from-my-ip", "how-accurate-is-ip-geolocation", "ipv4-vs-ipv6"],
    tools: [
      { href: "/vpn-check", label: "VPN Check" },
      { href: "/ip-leak-test", label: "IP Leak Test" },
      { href: "/hide-my-ip", label: "How to hide your IP" },
    ],
  },

  {
    slug: "google-dns-vs-cloudflare-dns",
    title: "Google DNS vs Cloudflare DNS: Which Is Better?",
    h1: "Google DNS vs Cloudflare DNS",
    description:
      "8.8.8.8 or 1.1.1.1? Compare Google and Cloudflare's public DNS on speed, privacy and features, and learn how to switch.",
    category: "Comparisons",
    keywords: [
      "google dns vs cloudflare dns",
      "1.1.1.1 vs 8.8.8.8",
      "best dns server",
      "fastest dns",
      "cloudflare dns",
    ],
    readMins: 5,
    intro: [
      "Switching to a public DNS resolver can make websites load a touch faster and add a layer of privacy over your ISP's default. The two most popular are Google's 8.8.8.8 and Cloudflare's 1.1.1.1, and both are free.",
    ],
    sections: [
      {
        h2: "The quick comparison",
        bullets: [
          "Cloudflare (1.1.1.1) markets itself on speed and privacy, with a promise not to log your queries to identify you and to wipe logs quickly.",
          "Google (8.8.8.8) is rock solid and globally distributed, backed by Google's infrastructure.",
          "Both are fast almost everywhere. Which is fastest for you depends on your location.",
        ],
      },
      {
        h2: "Privacy",
        body: [
          "Both are better for privacy than most ISP resolvers, and both support encrypted DNS. Cloudflare leans harder on privacy in its public commitments. Google keeps minimal logs for its public resolver. Either is a step up from a default ISP resolver that may log and monetise your browsing.",
        ],
      },
      {
        h2: "How to switch",
        body: [
          "You can set DNS on your router to cover every device, or on a single device in its network settings. Use 1.1.1.1 and 1.0.0.1 for Cloudflare, or 8.8.8.8 and 8.8.4.4 for Google. Change takes effect immediately and is easy to undo.",
        ],
      },
    ],
    faq: [
      {
        q: "Which DNS is fastest?",
        a: "It depends on where you are, but both are among the fastest public resolvers. The difference is usually a few milliseconds. Try each and keep whichever feels snappier.",
      },
      {
        q: "Will changing DNS speed up my internet?",
        a: "It can make the first connection to a site resolve a little quicker, but it won't increase your bandwidth. Think faster lookups, not faster downloads.",
      },
    ],
    related: ["how-to-lower-ping", "why-is-my-internet-slow", "ipv4-vs-ipv6"],
    tools: [
      { href: "/dns-lookup", label: "DNS Lookup" },
      { href: "/reverse-dns", label: "Reverse DNS" },
    ],
  },

  {
    slug: "static-vs-dynamic-ip",
    title: "Static vs Dynamic IP: What's the Difference?",
    h1: "Static IP vs Dynamic IP",
    description:
      "Should you pay for a static IP or stick with the dynamic one your ISP gives you? Here's how they differ and who actually needs a fixed address.",
    category: "Comparisons",
    keywords: [
      "static vs dynamic ip",
      "static ip vs dynamic ip",
      "do i need a static ip",
      "dynamic ip",
    ],
    readMins: 4,
    intro: [
      "A static IP stays the same. A dynamic IP can change over time. Most homes get a dynamic address by default, and for most people that's exactly right.",
    ],
    sections: [
      {
        h2: "Dynamic IP",
        body: [
          "Your ISP assigns an address from a shared pool and may change it now and then. It's free, it's the default, and it's slightly more private because your address isn't fixed to you for long.",
        ],
      },
      {
        h2: "Static IP",
        body: [
          "A static address is reserved for you and never changes. That's useful if you host services, run a mail or game server, use remote access, or need allow-list access to a work system. ISPs often charge a small fee for one.",
        ],
      },
      {
        h2: "Which do you need?",
        bullets: [
          "Choose dynamic if you mostly browse, stream and game. You'll never notice it changing.",
          "Choose static if you host something others connect to, or need a fixed address for remote access or allow-lists.",
          "A middle ground is dynamic DNS, which keeps a hostname pointed at your changing IP for free.",
        ],
      },
    ],
    faq: [
      {
        q: "Is a static IP more secure?",
        a: "Not inherently. A fixed address is easier to target over time, but security comes from your firewall and software, not from whether the IP changes. Dynamic addresses are slightly more private day to day.",
      },
      {
        q: "Does a static IP cost money?",
        a: "Usually. Many ISPs offer one as a paid add-on, especially on business plans. Dynamic addresses come free with most connections.",
      },
    ],
    related: ["why-does-my-ip-keep-changing", "what-is-cgnat", "ipv4-vs-ipv6"],
    tools: [
      { href: "/", label: "Check your current IP" },
      { href: "/what-is-my-ipv4", label: "IPv4 Lookup" },
    ],
  },
];

export const GUIDE_CATEGORIES: GuideCategory[] = [
  "Networking",
  "Speed",
  "Gaming",
  "Privacy",
  "DNS",
  "Comparisons",
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
