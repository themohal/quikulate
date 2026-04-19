import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { categories, getToolsByCategory, getCategoryBySlug } from "@/lib/tools-registry";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ToolIcon from "@/components/tool-icon";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category Not Found" };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";
  return {
    title: `${cat.name} - Free Online Tools | Quikulate`,
    description: cat.description,
    alternates: { canonical: `${appUrl}/tools/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) notFound();

  const catTools = getToolsByCategory(category);

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 hero-gradient opacity-40" aria-hidden="true" />
          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-24 pb-8">
            <nav className="flex items-center gap-2 text-[13px] text-[var(--text-tertiary)] mb-6">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                Home
              </Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[var(--text-secondary)]">{cat.name}</span>
            </nav>

            <h1
              className="text-3xl sm:text-4xl mb-3 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {cat.name}
            </h1>
            <p className="text-[var(--text-secondary)] text-base max-w-2xl leading-relaxed">
              {cat.description}
            </p>
          </div>
        </div>

        {/* Tool grid */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.category}/${tool.slug}`}
                className="group surface-card surface-card-accent p-5 h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[var(--accent-glow)]">
                    <ToolIcon name={tool.icon} size={18} />
                  </div>
                  <svg
                    className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h2 className="text-[var(--text-primary)] font-medium text-[15px] leading-snug mb-1.5 group-hover:text-[var(--accent)] transition-colors duration-200">
                  {tool.name}
                </h2>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  {tool.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
