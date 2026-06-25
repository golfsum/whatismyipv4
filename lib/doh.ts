// Client-side DNS-over-HTTPS helper using Google's public resolver. CORS-enabled
// and free, so the DNS tools run entirely in the browser (no server cost).

export const DNS_TYPE_NAMES: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  12: "PTR",
  15: "MX",
  16: "TXT",
  28: "AAAA",
  33: "SRV",
  257: "CAA",
};

export interface DohAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface DohResult {
  status: number; // 0 = NOERROR, 3 = NXDOMAIN
  answers: DohAnswer[];
}

export async function dohQuery(
  name: string,
  type: string
): Promise<DohResult> {
  const res = await fetch(
    `https://dns.google/resolve?name=${encodeURIComponent(
      name
    )}&type=${encodeURIComponent(type)}`,
    { headers: { accept: "application/dns-json" } }
  );
  const data = await res.json();
  return {
    status: data.Status ?? -1,
    answers: (data.Answer || []) as DohAnswer[],
  };
}
