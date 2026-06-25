import { SITE_NAME } from "@/lib/config";
import { TOOLS, LEGAL_LINKS, TOOL_CATEGORIES } from "@/lib/tools";

// Curated top-nav (most popular tools).
const NAV = [
  { href: "/speedtest", label: "Speed Test" },
  { href: "/vpn-check", label: "VPN Check" },
  { href: "/dns-lookup", label: "DNS Tools" },
  { href: "/browser-info", label: "Browser" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <a className="logo" href="/">
          <span className="dot" /> {SITE_NAME}
        </a>
        <nav className="nav">
          {NAV.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cols">
          {TOOL_CATEGORIES.map((cat) => (
            <div className="footer-col" key={cat}>
              <h4>{cat}</h4>
              {TOOLS.filter((t) => t.category === cat).map((t) => (
                <a key={t.href} href={t.href}>
                  {t.label}
                </a>
              ))}
            </div>
          ))}
          <div className="footer-col">
            <h4>Site</h4>
            {LEGAL_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {SITE_NAME} - Internet diagnostics &amp;
            network tools.
          </div>
          <div>
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
            >
              Map © OpenStreetMap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
