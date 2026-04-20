import type { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";

export const metadata: Metadata = {
  title: "Blog - Quikulate",
  description:
    "Tips, guides, and tutorials on calculators, converters, developer tools, and more. Learn how to make the most of free online tools.",
  alternates: { canonical: `${appUrl}/blog` },
  openGraph: {
    title: "Blog - Quikulate",
    description:
      "Tips, guides, and tutorials on calculators, converters, developer tools, and more.",
    type: "website",
    url: `${appUrl}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
