import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { tools, getToolBySlug, getRelatedTools } from "@/lib/tools-registry";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ToolIcon from "@/components/tool-icon";

import dynamic from "next/dynamic";

const toolComponents: Record<string, React.ComponentType> = {
  "financial/emi-calculator": dynamic(() => import("@/components/tools/financial/emi-calculator")),
  "financial/compound-interest-calculator": dynamic(() => import("@/components/tools/financial/compound-interest-calculator")),
  "financial/profit-margin-calculator": dynamic(() => import("@/components/tools/financial/profit-margin-calculator")),
  "financial/salary-calculator": dynamic(() => import("@/components/tools/financial/salary-calculator")),
  "financial/tax-calculator": dynamic(() => import("@/components/tools/financial/tax-calculator")),
  "financial/tip-calculator": dynamic(() => import("@/components/tools/financial/tip-calculator")),
  "educational/cgpa-to-percentage": dynamic(() => import("@/components/tools/educational/cgpa-to-percentage")),
  "educational/grade-calculator": dynamic(() => import("@/components/tools/educational/grade-calculator")),
  "educational/age-calculator": dynamic(() => import("@/components/tools/educational/age-calculator")),
  "educational/percentage-calculator": dynamic(() => import("@/components/tools/educational/percentage-calculator")),
  "educational/gpa-calculator": dynamic(() => import("@/components/tools/educational/gpa-calculator")),
  "text/word-counter": dynamic(() => import("@/components/tools/text/word-counter")),
  "text/character-counter": dynamic(() => import("@/components/tools/text/character-counter")),
  "text/case-converter": dynamic(() => import("@/components/tools/text/case-converter")),
  "text/lorem-ipsum-generator": dynamic(() => import("@/components/tools/text/lorem-ipsum-generator")),
  "text/text-to-slug": dynamic(() => import("@/components/tools/text/text-to-slug")),
  "developer/json-formatter": dynamic(() => import("@/components/tools/developer/json-formatter")),
  "developer/regex-tester": dynamic(() => import("@/components/tools/developer/regex-tester")),
  "developer/color-picker": dynamic(() => import("@/components/tools/developer/color-picker")),
  "developer/base64-encoder-decoder": dynamic(() => import("@/components/tools/developer/base64-codec")),
  "developer/jwt-decoder": dynamic(() => import("@/components/tools/developer/jwt-decoder")),
  "developer/timestamp-converter": dynamic(() => import("@/components/tools/developer/timestamp-converter")),
  "conversion/unit-converter": dynamic(() => import("@/components/tools/conversion/unit-converter")),
  "conversion/currency-converter": dynamic(() => import("@/components/tools/conversion/currency-converter")),
  "conversion/timezone-converter": dynamic(() => import("@/components/tools/conversion/timezone-converter")),
  "conversion/number-base-converter": dynamic(() => import("@/components/tools/conversion/number-base-converter")),
  "image/image-compressor": dynamic(() => import("@/components/tools/image/image-compressor")),
  "image/image-resizer": dynamic(() => import("@/components/tools/image/image-resizer")),
};

type Props = {
  params: Promise<{ category: string; tool: string }>;
};

export async function generateStaticParams() {
  return tools.map((t) => ({
    category: t.category,
    tool: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, tool: toolSlug } = await params;
  const tool = getToolBySlug(category, toolSlug);
  if (!tool) return { title: "Tool Not Found" };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";
  return {
    title: `${tool.name} - Free Online Tool | Quikulate`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `${appUrl}/tools/${category}/${toolSlug}` },
    openGraph: {
      title: `${tool.name} - Quikulate`,
      description: tool.description,
      type: "website",
      url: `${appUrl}/tools/${category}/${toolSlug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { category, tool: toolSlug } = await params;
  const tool = getToolBySlug(category, toolSlug);

  if (!tool) notFound();

  const ToolComponent = toolComponents[`${category}/${toolSlug}`];
  const related = getRelatedTools(tool, 4);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app" },
      { "@type": "ListItem", position: 2, name: tool.categoryName, item: `${process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app"}/tools/${category}` },
      { "@type": "ListItem", position: 3, name: tool.name },
    ],
  };

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />

      <main className="flex-1">
        {/* Header with subtle gradient */}
        <div className="relative">
          <div className="absolute inset-0 hero-gradient opacity-50" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-24 pb-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[13px] text-[var(--text-tertiary)] mb-6">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                Home
              </Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/tools/${category}`} className="hover:text-[var(--accent)] transition-colors">
                {tool.categoryName}
              </Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[var(--text-secondary)]">{tool.name}</span>
            </nav>

            <h1
              className="text-3xl sm:text-4xl mb-3 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tool.name}
            </h1>
            <p className="text-[var(--text-secondary)] text-base max-w-2xl leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>

        {/* Tool Component */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
          <div className="tool-container surface-elevated p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
            <div className="relative">
              {ToolComponent ? <ToolComponent /> : <p className="text-[var(--text-tertiary)]">Tool coming soon...</p>}
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-5">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/tools/${r.category}/${r.slug}`}
                  className="group surface-card surface-card-accent p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--text-inverse)] transition-all duration-300 shrink-0">
                      <ToolIcon name={r.icon} size={16} />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium text-sm group-hover:text-[var(--accent)] transition-colors">
                      {r.name}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed pl-11">{r.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Privacy note */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
          <div className="flex items-center gap-3 py-4 px-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border)]">
            <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <p className="text-xs text-[var(--text-tertiary)]">
              All processing happens in your browser. No data is uploaded to any server.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
