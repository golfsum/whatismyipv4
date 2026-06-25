import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE_NAME, LEGAL_UPDATED } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using ${SITE_NAME}'s free internet diagnostic tools.`,
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <ContentPage
      title="Terms of Service"
      crumbLabel="Terms"
      crumbHref="/terms"
      updated={LEGAL_UPDATED}
      intro={
        <p>
          By using {SITE_NAME} you agree to these terms. If you do not agree,
          please do not use the site.
        </p>
      }
    >
      <h2>Use of the site</h2>
      <p>
        {SITE_NAME} provides free, informational network diagnostic tools. You
        may use them for lawful, personal or business purposes. You agree not to
        abuse the service, including automated scraping, attempts to overload the
        infrastructure, or using the tools to probe networks you do not own or
        have permission to test.
      </p>

      <h2>No warranty &amp; accuracy</h2>
      <p>
        The tools are provided &quot;as is&quot; without warranties of any kind.
        Results - including IP geolocation, VPN detection, speed tests and DNS
        lookups - are <strong>estimates for informational purposes</strong> and
        may be inaccurate or incomplete. Geolocation is approximate and does not
        represent your exact address. Do not rely on results for any critical,
        legal, or security decision without independent verification.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {SITE_NAME} and its operators are
        not liable for any damages arising from your use of, or inability to use,
        the site or its results.
      </p>

      <h2>Third-party services &amp; ads</h2>
      <p>
        The site displays advertising and relies on third-party providers.
        We are not responsible for the content of ads or external sites. See the{" "}
        <a href="/privacy">Privacy Policy</a> and{" "}
        <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms at any time. Continued use after changes
        constitutes acceptance.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Visit our{" "}
        <a href="/contact">contact page</a>.
      </p>
    </ContentPage>
  );
}
