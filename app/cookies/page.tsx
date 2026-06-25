import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE_NAME, LEGAL_UPDATED } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `What cookies ${SITE_NAME} uses for analytics and advertising, and how to control them.`,
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return (
    <ContentPage
      title="Cookie Policy"
      crumbLabel="Cookie Policy"
      crumbHref="/cookies"
      updated={LEGAL_UPDATED}
      intro={
        <p>
          Cookies are small files stored by your browser. {SITE_NAME} uses a
          limited set of cookies and similar technologies, described below.
        </p>
      }
    >
      <h2>Types of cookies we use</h2>
      <ul>
        <li>
          <strong>Essential.</strong> Required for the site to function and for
          your preferences (for example, dismissing notices). These cannot be
          switched off.
        </li>
        <li>
          <strong>Analytics.</strong> We measure aggregate page views and unique
          visitors. Visitors are counted using a salted one-way hash rather than
          stored identifiers.
        </li>
        <li>
          <strong>Advertising.</strong> Google AdSense and its partners set
          cookies to show and measure ads, including personalized ads based on
          your browsing. See our <a href="/privacy">Privacy Policy</a>.
        </li>
      </ul>

      <h2>Managing cookies</h2>
      <ul>
        <li>
          Control or delete cookies in your browser settings. Most browsers let
          you block third-party cookies.
        </li>
        <li>
          Opt out of personalized ads at{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>{" "}
          and{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>
          .
        </li>
      </ul>
      <p>
        Blocking some cookies may affect ad relevance but will not stop the
        diagnostic tools from working.
      </p>
    </ContentPage>
  );
}
