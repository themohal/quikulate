"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const categoryLinks = [
  { label: "Financial", href: "/tools/financial" },
  { label: "Educational", href: "/tools/educational" },
  { label: "Text", href: "/tools/text" },
  { label: "Developer", href: "/tools/developer" },
  { label: "Converters", href: "/tools/conversion" },
  { label: "Image", href: "/tools/image" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(28,25,23,0.06)] border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-[64px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: -6, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-md shadow-[var(--accent-glow)]"
            >
              <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-display)" }}>Q</span>
            </motion.div>
            <span
              className="text-[22px] text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quikulate
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {categoryLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent-glow)]"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="w-px h-5 bg-[var(--border)] mx-2" />
            <Link
              href="/blog"
              className="px-3.5 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-all"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] bg-current origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-[var(--border)] bg-white/95 backdrop-blur-xl"
          >
            <div className="px-5 py-4 space-y-0.5">
              {categoryLinks.map((link, i) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-[var(--accent)] bg-[var(--accent-subtle)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryLinks.length * 0.04, duration: 0.25 }}
              >
                <div className="my-2 h-px bg-[var(--border)] mx-4" />
                <Link
                  href="/blog"
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-all"
                >
                  Blog
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
