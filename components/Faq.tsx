import Script from "next/script";

export interface QA {
  q: string;
  a: string;
}

// Renders an accessible FAQ section plus FAQPage structured data so the page is
// eligible for Google's rich-result FAQ snippets.
export default function Faq({
  items,
  id = "faq",
  heading = "Frequently asked questions",
}: {
  items: QA[];
  id?: string;
  heading?: string;
}) {
  return (
    <section className="content faq" id={id}>
      <h2>{heading}</h2>
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
      <Script
        id={`ld-faq-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
