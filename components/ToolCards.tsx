import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools";

// Grid of tool cards grouped by category. `exclude` skips a href (e.g. the
// current page).
export default function ToolCards({ exclude }: { exclude?: string }) {
  return (
    <div className="tool-cards">
      {TOOL_CATEGORIES.map((cat) => {
        const items = TOOLS.filter(
          (t) => t.category === cat && t.href !== exclude
        );
        if (items.length === 0) return null;
        return (
          <div key={cat} className="tool-cat">
            <h3>{cat}</h3>
            <div className="card-grid">
              {items.map((t) => (
                <a key={t.href} href={t.href} className="tool-card">
                  <span className="tc-label">{t.label}</span>
                  <span className="tc-desc">{t.desc}</span>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
