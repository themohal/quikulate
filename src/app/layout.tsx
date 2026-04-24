import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/cookie-consent";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";

export const metadata: Metadata = {
  title: "Quikulate - Free Online Calculators, Converters & Developer Tools",
  description:
    "Free online tools: EMI calculator, CGPA converter, JSON formatter, unit converter, image compressor, and 25+ more. Fast, private, no signup required.",
  keywords: [
    "online calculator",
    "unit converter",
    "json formatter",
    "emi calculator",
    "cgpa to percentage",
    "word counter",
    "color picker",
    "image compressor",
    "currency converter",
    "free online tools",
  ],
  openGraph: {
    title: "Quikulate - Free Online Calculators, Converters & Developer Tools",
    description:
      "28+ free tools: calculators, converters, text utilities, developer tools, and more. Fast, private, no signup.",
    type: "website",
    siteName: "Quikulate",
    url: appUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quikulate - Free Online Tools",
    description:
      "28+ free tools: calculators, converters, text utilities, developer tools, and more.",
  },
  metadataBase: new URL(appUrl),
  verification: {
    google: "e0p6w0QinOjg0B053DbdTs4Z41KSSuqKU8mKWNfrcn8",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: appUrl },
  icons: {
    icon: "/webicon.png",
    shortcut: "/webicon.png",
    apple: "/webicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Quikulate",
  url: appUrl,
  description:
    "Free online calculators, converters, text tools, developer utilities, and image tools. Fast, private, no signup required.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${appUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {pubId && (
          <>
            <meta name="google-adsense-account" content={pubId} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsent />
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
