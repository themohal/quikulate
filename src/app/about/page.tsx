import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";

export const metadata: Metadata = {
  title: "About - Quikulate",
  description:
    "Learn about Quikulate — a free online tool hub offering 28+ calculators, converters, text utilities, developer tools, and image tools.",
  alternates: { canonical: `${appUrl}/about` },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="relative">
          <div className="absolute inset-0 hero-gradient opacity-30" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-8">
            <h1
              className="text-3xl sm:text-4xl mb-3 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              About Quikulate
            </h1>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <div className="prose-custom">
            <p>
              Quikulate is a free online tool platform built to make everyday calculations,
              conversions, and text processing tasks fast and effortless. Whether you are a
              student converting your CGPA to a percentage, a developer formatting JSON, a
              business owner calculating profit margins, or anyone who needs to compress an
              image quickly &mdash; Quikulate has a tool for you.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe that useful online tools should be free, fast, and private. Too many
              tool websites are bloated with ads, require sign-ups, or upload your data to
              remote servers. Quikulate takes a different approach: every tool runs directly in
              your browser. Your data never leaves your device.
            </p>

            <h2>What We Offer</h2>
            <p>Quikulate provides 28+ free tools across six categories:</p>
            <ul>
              <li>
                <strong>Financial Calculators</strong> &mdash; EMI calculator,
                compound interest, profit margin, salary converter, tax calculator, and tip
                calculator.
              </li>
              <li>
                <strong>Educational Tools</strong> &mdash; CGPA to percentage
                converter, grade calculator, age calculator, percentage calculator, and GPA
                calculator.
              </li>
              <li>
                <strong>Text Tools</strong> &mdash; Word counter, character
                counter, case converter, Lorem Ipsum generator, and text-to-slug converter.
              </li>
              <li>
                <strong>Developer Tools</strong> &mdash; JSON formatter, regex
                tester, color picker, Base64 encoder/decoder, JWT decoder, and timestamp
                converter.
              </li>
              <li>
                <strong>Conversion Tools</strong> &mdash; Unit converter,
                currency converter with daily updated rates, timezone converter, and number base
                converter.
              </li>
              <li>
                <strong>Image Tools</strong> &mdash; Image compressor and image
                resizer, both running entirely in your browser.
              </li>
            </ul>

            <h2>Privacy First</h2>
            <p>
              All Quikulate tools process data locally in your browser. We do not upload, store,
              or transmit your input data to any server. The only exception is our currency
              converter, which fetches publicly available exchange rates. Your calculations, text,
              images, and files stay on your device at all times.
            </p>

            <h2>Built With Modern Technology</h2>
            <p>
              Quikulate is built with Next.js, React, and TypeScript, hosted on Vercel for
              maximum performance. Our tools load instantly and work on desktop, tablet, and
              mobile devices.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have a suggestion for a new tool? Found a bug? We would love to hear from you.
              Visit our{" "}
              <Link href="/contact">
                Contact page
              </Link>{" "}
              to get in touch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
