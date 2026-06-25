import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE_NAME, CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles data, cookies and advertising. We don't require accounts and never store your raw IP address.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <ContentPage
      title="Privacy Policy"
      crumbLabel="Privacy Policy"
      crumbHref="/privacy"
      updated={LEGAL_UPDATED}
      intro={
        <p>
          {SITE_NAME} (&quot;we&quot;, &quot;us&quot;) provides free internet
          diagnostic tools. This policy explains what data we process when you
          use the site, why, and the choices you have. We do not require an
          account and we do not sell your personal information.
        </p>
      }
    >
      <h2>Information we process</h2>
      <ul>
        <li>
          <strong>Your IP address.</strong> Because our core purpose is to show
          you your IP and related network details, your public IP is processed
          when you load a tool. We use it to look up approximate geolocation and
          network (ISP/ASN) information and display it back to you.
        </li>
        <li>
          <strong>Device &amp; browser data.</strong> Tools such as Browser Info
          read information your browser already exposes (user agent, screen size,
          time zone, language) to display it to you. This happens in your browser.
        </li>
        <li>
          <strong>Anonymous usage analytics.</strong> We count page views and
          unique visitors. Visitors are de-duplicated using a salted, one-way
          hash — we do <em>not</em> store your raw IP address in our analytics.
        </li>
      </ul>

      <h2>Cookies and advertising</h2>
      <p>
        We display ads through <strong>Google AdSense</strong>. Third-party
        vendors, including Google, use cookies to serve ads based on your prior
        visits to this and other websites. Google&apos;s use of advertising
        cookies enables it and its partners to serve ads to you based on your
        visits.
      </p>
      <ul>
        <li>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          You can opt out of third-party vendor cookies at{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>{" "}
          and{" "}
          <a
            href="https://www.youronlinechoices.eu"
            target="_blank"
            rel="noopener noreferrer"
          >
            youronlinechoices.eu
          </a>
          .
        </li>
      </ul>
      <p>
        See our <a href="/cookies">Cookie Policy</a> for more detail on the
        cookies used.
      </p>

      <h2>Third-party services</h2>
      <p>To provide our tools we send requests to these providers:</p>
      <ul>
        <li>
          <strong>Google AdSense</strong> — advertising (
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>
          ).
        </li>
        <li>
          <strong>ip-api.com</strong> — IP geolocation lookups.
        </li>
        <li>
          <strong>Cloudflare</strong> — powers the internet speed test.
        </li>
        <li>
          <strong>Google &amp; Cloudflare DNS</strong> — DNS-over-HTTPS lookups
          for the DNS tools.
        </li>
        <li>
          <strong>OpenStreetMap</strong> — map tiles for IP location.
        </li>
      </ul>

      <h2>Your rights (GDPR / CCPA)</h2>
      <p>
        Depending on where you live, you may have rights to access, correct or
        delete personal data, and to object to certain processing. Because we do
        not maintain accounts or store identifying records, we typically hold no
        personal data tied to you. For advertising choices, use the opt-out links
        above. To make a request, <a href="/contact">contact us</a>.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed to children under 13, and we do not knowingly
        collect personal information from them.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy; the date above reflects the latest revision.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
        or use our <a href="/contact">contact page</a>.
      </p>
    </ContentPage>
  );
}
