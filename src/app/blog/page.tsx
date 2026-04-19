"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { blogPosts } from "@/lib/blog-posts";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const PER_PAGE = 9;

export default function BlogIndex() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = blogPosts.slice(start, start + PER_PAGE);

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 hero-gradient opacity-40" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-10">
            <span className="badge mb-4 inline-flex">{blogPosts.length} Articles</span>
            <h1
              className="text-3xl sm:text-4xl mb-3 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Blog
            </h1>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              Guides, tutorials, and insights on finance, education, development, and more.
            </p>
          </div>
        </div>

        {/* Post list */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {visible.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block surface-card surface-card-accent p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-[var(--text-primary)] font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                          <time>{post.date}</time>
                          <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                    n === page
                      ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent-glow)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Page indicator */}
          {totalPages > 1 && (
            <p className="text-center text-xs text-[var(--text-tertiary)] mt-4">
              Page {page} of {totalPages} &middot; {blogPosts.length} articles
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
