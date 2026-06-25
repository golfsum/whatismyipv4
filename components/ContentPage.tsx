import { SiteHeader, SiteFooter } from "./SiteChrome";
import Breadcrumbs from "./Breadcrumbs";

// Shared shell for text/legal pages: header, breadcrumb, article, footer.
export default function ContentPage({
  title,
  crumbLabel,
  crumbHref,
  updated,
  intro,
  children,
}: {
  title: string;
  crumbLabel: string;
  crumbHref: string;
  updated?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: crumbLabel, href: crumbHref },
          ]}
        />
        <article className="content legal">
          <h1>{title}</h1>
          {updated && <p className="muted updated">Last updated: {updated}</p>}
          {intro}
          {children}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
