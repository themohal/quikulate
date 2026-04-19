import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";

export const metadata: Metadata = {
  title: "Terms of Service - Quikulate",
  description: "Quikulate terms of service — usage terms for our free online tools.",
  alternates: { canonical: `${appUrl}/terms` },
};

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-[var(--text-tertiary)]">Last updated: April 2026</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <div className="prose-custom">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Quikulate ({appUrl}), you accept and agree to be bound by
              these Terms of Service. If you do not agree, please do not use our website.
            </p>

            <h2>2. Service Description</h2>
            <p>
              Quikulate provides free online tools including calculators, converters, text
              utilities, developer tools, and image processing tools. All tools run in your
              browser and are provided as-is for personal and commercial use.
            </p>

            <h2>3. No Warranty</h2>
            <p>
              All tools and calculations are provided &quot;AS IS&quot; without warranty of any kind.
              While we strive for accuracy, we do not guarantee that results are error-free.
              You should not rely solely on our tools for critical financial, legal, medical, or
              professional decisions. Always verify important calculations independently.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              Quikulate shall not be liable for any direct, indirect, incidental, consequential,
              or punitive damages arising from your use of our tools. Our total liability is
              limited to zero dollars, as our service is provided free of charge.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              The Quikulate website, its design, code, and branding are our intellectual
              property. You may use our tools freely but may not copy, redistribute, or create
              derivative works from our website without permission.
            </p>

            <h2>6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our tools for any unlawful purpose</li>
              <li>Attempt to disrupt or overload our servers</li>
              <li>Scrape or automatically access our website without permission</li>
              <li>Use our tools to process illegal or harmful content</li>
            </ul>

            <h2>7. Privacy</h2>
            <p>
              Your use of Quikulate is also governed by our Privacy Policy. All tool
              computations happen locally in your browser &mdash; we do not access, store, or
              transmit your input data.
            </p>

            <h2>8. Third-Party Content</h2>
            <p>
              Our website displays advertisements through Google AdSense. We are not responsible
              for the content or accuracy of third-party advertisements. Currency exchange rates
              are sourced from third-party APIs and may not reflect real-time market rates.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of
              Quikulate after changes constitutes acceptance of the updated terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms are governed by applicable international law. Any disputes shall be
              resolved through good-faith negotiation.
            </p>

            <h2>11. Contact</h2>
            <p>
              Questions about these terms? Contact us at support@quikulate.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
