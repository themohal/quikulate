import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";

export const metadata: Metadata = {
  title: "Privacy Policy - Quikulate",
  description: "Quikulate privacy policy — how we handle your data, cookies, and third-party services.",
  alternates: { canonical: `${appUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="relative">
          <div className="absolute inset-0 hero-gradient opacity-20" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-8">
            <h1
              className="text-3xl sm:text-4xl mb-3 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm text-[var(--text-tertiary)]">Last updated: April 2026</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <div className="prose-custom">
            <h2>1. Overview</h2>
            <p>
              Quikulate (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website at {appUrl}. This Privacy
              Policy explains how we collect, use, and protect your information when you use our
              free online tools.
            </p>

            <h2>2. Data We Collect</h2>
            <p>
              <strong>Tool usage:</strong> All calculations, text
              processing, and image manipulation happen entirely in your browser. We do not
              upload, store, or transmit your input data to any server. Your data stays on your
              device.
            </p>
            <p>
              <strong>Contact form:</strong> If you use our contact form,
              we collect your name, email address, and message to respond to your inquiry. This
              data is stored securely and deleted after your inquiry is resolved.
            </p>
            <p>
              <strong>Analytics:</strong> We may use anonymous, aggregated
              analytics to understand which tools are popular and improve our service. No
              personally identifiable information is collected for analytics.
            </p>

            <h2>3. Cookies and Local Storage</h2>
            <p>
              Quikulate itself does not use cookies for tracking. However, our advertising
              partners (Google AdSense) use cookies to serve personalized ads. We use browser
              localStorage to save your cookie consent preference and an anonymous visitor ID
              for basic analytics. You can clear this at any time by clearing your browser data.
            </p>

            <h2>4. Cookie Consent</h2>
            <p>
              When you first visit Quikulate, you will see a cookie consent banner at the
              bottom of the page. You may choose to accept or decline cookies:
            </p>
            <ul>
              <li><strong>Accept</strong> &mdash; Google AdSense may serve personalized ads based on your browsing history and interests.</li>
              <li><strong>Decline</strong> &mdash; Google AdSense will serve only non-personalized ads. No tracking cookies will be set for ad personalization.</li>
            </ul>
            <p>
              You can change your preference at any time by clearing your browser&apos;s localStorage
              data for this site, which will cause the consent banner to reappear on your next visit.
            </p>

            <h2>5. Google AdSense</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense
              is a third-party advertising service provided by Google LLC. Google AdSense uses
              cookies, including the DART cookie, to serve ads based on your visits to this
              and other websites on the internet.
            </p>
            <p>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads
              based on your visit to Quikulate and/or other sites on the internet. Users in
              the European Economic Area (EEA), UK, and Switzerland will only receive
              personalized ads if they have given consent through our cookie consent banner.
            </p>
            <p>
              You may opt out of personalized advertising by visiting the{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ad Settings page
              </a>
              . You can also opt out of third-party vendor cookies for personalized
              advertising at{" "}
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
                aboutads.info
              </a>{" "}
              or{" "}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
                networkadvertising.org
              </a>.
            </p>
            <p>
              For more information about how Google uses data, see{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                How Google uses data when you use our partners&apos; sites
              </a>.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Vercel</strong> &mdash; hosting and content delivery</li>
              <li><strong>Google AdSense</strong> &mdash; advertising</li>
              <li><strong>Supabase</strong> &mdash; contact form data storage</li>
              <li><strong>Exchange Rate APIs</strong> &mdash; currency conversion rates (public data only)</li>
            </ul>

            <h2>6. Children&apos;s Privacy</h2>
            <p>
              Quikulate is not directed at children under 13. We do not knowingly collect
              personal information from children. If you believe a child has provided us with
              personal data, please contact us immediately.
            </p>

            <h2>7. GDPR / CCPA Rights</h2>
            <p>
              If you are in the EU or California, you have the right to access, correct, or
              delete any personal data we hold about you. Since we collect minimal data (only
              contact form submissions), you can request deletion by contacting us at
              support@quikulate.com.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated date.
            </p>

            <h2>9. Contact</h2>
            <p>
              For privacy-related inquiries, email us at support@quikulate.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
