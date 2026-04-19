import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quikulate.vercel.app";
  return {
    title: `${post.title} - Quikulate Blog`,
    description: post.description,
    alternates: { canonical: `${appUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let inTable = false;
  let tableRows: string[][] = [];

  function flushTable() {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-6 rounded-lg border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-3)]">
                {tableRows[0].map((cell, i) => (
                  <th key={i} className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(2).map((row, ri) => (
                <tr key={ri} className="border-b border-[var(--border)] last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2.5 px-4 text-[var(--text-secondary)]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
    inTable = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("|")) {
      inTable = true;
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith("## ")) {
      if (inList) { inList = false; }
      elements.push(
        <h2
          key={i}
          className="text-2xl mt-10 mb-4 text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-[var(--text-primary)] mt-7 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      if (!inList) { inList = true; }
      const text = line.slice(2);
      const parts = text.split(/(\*\*.*?\*\*)/g);
      elements.push(
        <li key={i} className="ml-6 list-disc text-[var(--text-secondary)] mb-1.5">
          {parts.map((part, pi) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={pi} className="text-[var(--text-primary)] font-semibold">{part.slice(2, -2)}</strong>
            ) : (
              <span key={pi}>{part}</span>
            )
          )}
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      const text = line.replace(/^\d+\. /, "");
      const parts = text.split(/(\*\*.*?\*\*)/g);
      elements.push(
        <li key={i} className="ml-6 list-decimal text-[var(--text-secondary)] mb-1.5">
          {parts.map((part, pi) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={pi} className="text-[var(--text-primary)] font-semibold">{part.slice(2, -2)}</strong>
            ) : (
              <span key={pi}>{part}</span>
            )
          )}
        </li>
      );
    } else if (line.trim() === "") {
      if (inList) { inList = false; }
      elements.push(<div key={i} className="h-4" />);
    } else {
      const parts = line.split(/(\*\*.*?\*\*|\`.*?\`)/g);
      elements.push(
        <p key={i} className="text-[var(--text-secondary)] leading-[1.8] mb-1">
          {parts.map((part, pi) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={pi} className="text-[var(--text-primary)] font-semibold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code key={pi} className="bg-[var(--surface-3)] px-1.5 py-0.5 rounded text-[var(--accent-light)] text-[13px]" style={{ fontFamily: "var(--font-mono)" }}>
                  {part.slice(1, -1)}
                </code>
              );
            }
            return <span key={pi}>{part}</span>;
          })}
        </p>
      );
    }
  }

  if (inTable) flushTable();

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "Quikulate" },
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <main className="flex-1">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 hero-gradient opacity-30" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-24 pb-8">
            <nav className="flex items-center gap-2 text-[13px] text-[var(--text-tertiary)] mb-6">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">Blog</Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[var(--text-secondary)] truncate max-w-[200px]">{post.title}</span>
            </nav>

            <h1
              className="text-3xl sm:text-4xl mb-4 text-[var(--text-primary)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-[var(--text-tertiary)]">
              <time>{post.date}</time>
              <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <article className="prose-custom">
            {renderMarkdown(post.content)}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
