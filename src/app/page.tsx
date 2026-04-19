"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { categories, tools, searchTools, type Tool } from "@/lib/tools-registry";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ToolIcon from "@/components/tool-icon";

const categoryAccent: Record<string, { gradient: string; tag: string; bg: string }> = {
  financial: { gradient: "from-amber-500 to-orange-600", tag: "FIN", bg: "bg-amber-50" },
  educational: { gradient: "from-emerald-500 to-teal-600", tag: "EDU", bg: "bg-emerald-50" },
  text: { gradient: "from-sky-500 to-blue-600", tag: "TXT", bg: "bg-sky-50" },
  developer: { gradient: "from-violet-500 to-purple-600", tag: "DEV", bg: "bg-violet-50" },
  conversion: { gradient: "from-rose-500 to-pink-600", tag: "CNV", bg: "bg-rose-50" },
  image: { gradient: "from-cyan-500 to-teal-600", tag: "IMG", bg: "bg-cyan-50" },
};

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const accent = categoryAccent[tool.category] || categoryAccent.financial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/tools/${tool.category}/${tool.slug}`}
        className="group block surface-card surface-card-accent p-6 h-full"
      >
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-white shadow-lg shadow-black/10 mb-4`}
        >
          <ToolIcon name={tool.icon} size={18} />
        </motion.div>

        {/* Name + description */}
        <h3 className="text-[var(--text-primary)] font-semibold text-[15px] leading-snug mb-1.5 group-hover:text-[var(--accent)] transition-colors duration-300">
          {tool.name}
        </h3>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
          {tool.shortDesc}
        </p>
      </Link>
    </motion.div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const results = query.length >= 2 ? searchTools(query) : [];

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* ─── Hero ──────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
          <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />

          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-36 pb-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="badge mb-6 inline-flex">28+ Free Tools</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.25rem,5vw,3.75rem)] tracking-tight mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Calculators, Converters{" "}
              <br className="hidden sm:block" />
              <span className="text-[var(--accent)]">&amp;</span> Developer Tools
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto mb-12 leading-relaxed"
            >
              Fast, private, browser-based tools for finance, education,
              development, and everyday tasks.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-md mx-auto"
            >
              <motion.div
                animate={searchFocused ? { scale: 1.02 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="input-field !pl-12 !py-4 !text-base !rounded-2xl !shadow-lg !shadow-black/[0.03] !border-[var(--surface-3)]"
                />
              </motion.div>

              {results.length > 0 && searchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--border-hover)] rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)] z-50 max-h-80 overflow-y-auto"
                >
                  {results.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.category}/${t.slug}`}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--surface-1)] transition-colors border-b border-[var(--border)] last:border-0"
                      onClick={() => setQuery("")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)]">
                          <ToolIcon name={t.icon} size={14} />
                        </div>
                        <div>
                          <span className="text-[var(--text-primary)] font-medium text-sm">{t.name}</span>
                          <span className="text-[var(--text-tertiary)] text-xs ml-2">{t.categoryName}</span>
                        </div>
                      </div>
                      <svg className="w-3.5 h-3.5 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ─── Tool Categories ───────────────────────── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
          {categories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.slug);
            const meta = categoryAccent[cat.slug] || categoryAccent.financial;

            return (
              <div key={cat.slug} className="mb-20 last:mb-0">
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between mb-7"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${meta.bg} text-xs font-bold tracking-widest text-[var(--text-secondary)]`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {meta.tag}
                    </span>
                    <h2
                      className="text-xl text-[var(--text-primary)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cat.name}
                    </h2>
                  </div>
                  <Link
                    href={`/tools/${cat.slug}`}
                    className="text-xs font-medium text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 group"
                  >
                    View all
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Tool grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catTools.map((tool, i) => (
                    <ToolCard key={tool.slug} tool={tool} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ─── Why Quikulate ─────────────────────────── */}
        <section className="relative overflow-hidden border-t border-[var(--border)]">
          <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2
                className="text-3xl sm:text-4xl mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Why Quikulate?
              </h2>
              <p className="text-[var(--text-secondary)] text-base max-w-md mx-auto">
                Built for speed, privacy, and simplicity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Lightning Fast",
                  desc: "All tools run directly in your browser. Zero server round-trips, zero waiting.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                },
                {
                  title: "100% Private",
                  desc: "Your data never leaves your device. No uploads, no tracking, no accounts.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                },
                {
                  title: "Completely Free",
                  desc: "Every tool is free with no limits. No signup, no paywall, no restrictions.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -4 }}
                  className="surface-card p-8 text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)] mb-5 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-400">
                    {item.icon}
                  </div>
                  <h3 className="text-[var(--text-primary)] font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
