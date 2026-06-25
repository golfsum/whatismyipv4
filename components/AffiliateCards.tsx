import { affiliateProducts, AFFILIATE_DISCLOSURE } from "@/lib/affiliates";

const HEADINGS: Record<string, string> = {
  vpn: "Recommended VPNs",
  router: "Recommended Wi-Fi gear",
};

export default function AffiliateCards({ type }: { type: string }) {
  const products = affiliateProducts(type);
  if (products.length === 0) return null;

  return (
    <section className="content affiliate">
      <h2>{HEADINGS[type] || "Recommendations"}</h2>
      <p className="affiliate-disclosure">{AFFILIATE_DISCLOSURE}</p>
      <div className="aff-grid">
        {products.map((p) => (
          <div key={p.name} className="aff-card">
            {p.tag && <span className="aff-tag">{p.tag}</span>}
            <h3>{p.name}</h3>
            <p className="aff-blurb">{p.blurb}</p>
            <ul className="aff-specs">
              {p.specs.map((s) => (
                <li key={s.label}>
                  <span className="aff-spec-label">{s.label}</span>
                  <span className="aff-spec-value">{s.value}</span>
                </li>
              ))}
            </ul>
            <a
              className="aff-cta"
              href={p.url}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Visit {p.name} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
