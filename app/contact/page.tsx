import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team - feedback, bug reports, tool requests and privacy questions.`,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <ContentPage
      title="Contact Us"
      crumbLabel="Contact"
      crumbHref="/contact"
      intro={
        <p>
          We&apos;d love your feedback. Whether you found a bug, want a new tool,
          or have a question about privacy, get in touch.
        </p>
      }
    >
      <p>
        Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>
          <strong>{CONTACT_EMAIL}</strong>
        </a>{" "}
        and we&apos;ll reply as soon as we can.
      </p>

      <h2>What to include</h2>
      <ul>
        <li>
          <strong>Bug reports</strong> - which tool, your browser/device, and
          what happened.
        </li>
        <li>
          <strong>Tool requests</strong> - what you&apos;d like to test or
          calculate.
        </li>
        <li>
          <strong>Privacy questions</strong> - see our{" "}
          <a href="/privacy">Privacy Policy</a> first; we&apos;re happy to clarify
          anything.
        </li>
      </ul>

      <p>
        Looking for something specific? Explore the{" "}
        <a href="/">full toolkit</a> or read our{" "}
        <a href="/about">about page</a>.
      </p>
    </ContentPage>
  );
}
