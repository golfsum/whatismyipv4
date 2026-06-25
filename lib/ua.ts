// Lightweight user-agent parser (no dependency). Good enough to label the
// common browsers, engines, OSes and device types.

export interface ParsedUa {
  browser: string;
  browserVersion: string;
  engine: string;
  os: string;
  device: string;
}

export function parseUa(ua: string): ParsedUa {
  const u = ua || "";

  // Browser + version (order matters).
  let browser = "Unknown";
  let browserVersion = "";
  const m = (re: RegExp) => {
    const r = u.match(re);
    return r ? r[1] : "";
  };
  if (/Edg\//.test(u)) {
    browser = "Microsoft Edge";
    browserVersion = m(/Edg\/([\d.]+)/);
  } else if (/OPR\/|Opera/.test(u)) {
    browser = "Opera";
    browserVersion = m(/(?:OPR|Opera)\/([\d.]+)/);
  } else if (/Firefox\//.test(u)) {
    browser = "Firefox";
    browserVersion = m(/Firefox\/([\d.]+)/);
  } else if (/Chrome\//.test(u)) {
    browser = "Chrome";
    browserVersion = m(/Chrome\/([\d.]+)/);
  } else if (/Version\/.*Safari/.test(u)) {
    browser = "Safari";
    browserVersion = m(/Version\/([\d.]+)/);
  }

  // Engine.
  let engine = "Unknown";
  if (/Gecko\/|rv:/.test(u) && /Firefox/.test(u)) engine = "Gecko";
  else if (/AppleWebKit/.test(u)) engine = /Chrome|Edg|OPR/.test(u) ? "Blink" : "WebKit";

  // OS.
  let os = "Unknown";
  if (/Windows NT 10/.test(u)) os = "Windows 10/11";
  else if (/Windows NT 6\.3/.test(u)) os = "Windows 8.1";
  else if (/Windows/.test(u)) os = "Windows";
  else if (/Android/.test(u)) os = "Android " + m(/Android ([\d.]+)/);
  else if (/iPhone|iPad|iPod/.test(u)) os = "iOS " + m(/OS ([\d_]+)/).replace(/_/g, ".");
  else if (/Mac OS X/.test(u)) os = "macOS " + m(/Mac OS X ([\d_]+)/).replace(/_/g, ".");
  else if (/CrOS/.test(u)) os = "ChromeOS";
  else if (/Linux/.test(u)) os = "Linux";

  // Device type.
  let device = "Desktop";
  if (/iPad|Tablet/.test(u)) device = "Tablet";
  else if (/Mobi|iPhone|Android.*Mobile/.test(u)) device = "Mobile";

  return { browser, browserVersion, engine, os: os.trim(), device };
}
