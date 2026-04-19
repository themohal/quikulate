import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";

export const metadata: Metadata = {
  title: "Refund Policy - Quikulate",
  description: "Quikulate refund policy — all our tools are completely free to use.",
  alternates: { canonical: `${appUrl}/refund` },
};

export default function RefundPage() {
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
              Refund Policy
            </h1>
            <p className="text-sm text-[var(--text-tertiary)]">Last updated: April 2026</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <div className="prose-custom">
            <h2>Free Service</h2>
            <p>
              Quikulate is a completely free service. All calculators, converters, text
              utilities, developer tools, and image tools on our website are available at no
              cost. We do not charge any fees, require subscriptions, or process payments
              from our users.
            </p>

            <h2>No Purchases, No Refunds</h2>
            <p>
              Since Quikulate does not sell any products or services, there are no purchases
              to refund. You can use all of our tools freely without providing any payment
              information.
            </p>

            <h2>Revenue Model</h2>
            <p>
              Quikulate is supported by advertising through Google AdSense. Advertisements
              displayed on our website are provided by third-party ad networks. We do not
              control the products or services advertised, and any purchases made through
              advertisements are subject to the refund policies of those respective
              advertisers and merchants.
            </p>

            <h2>Third-Party Advertisements</h2>
            <p>
              If you make a purchase through an advertisement displayed on Quikulate, please
              contact the merchant or advertiser directly regarding their refund policy. We
              are not responsible for transactions conducted through third-party
              advertisements.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this policy, please contact us at
              support@quikulate.com or through our{" "}
              <Link href="/contact">
                Contact page
              </Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
