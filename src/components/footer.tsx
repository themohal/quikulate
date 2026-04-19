import Link from "next/link";

const toolLinks = [
  { label: "Financial", href: "/tools/financial" },
  { label: "Educational", href: "/tools/educational" },
  { label: "Text", href: "/tools/text" },
  { label: "Developer", href: "/tools/developer" },
  { label: "Converters", href: "/tools/conversion" },
  { label: "Image", href: "/tools/image" },
];

const legalLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border)] bg-[var(--surface-1)]">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-16">
        {/* Top: Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>Q</span>
            </div>
            <span
              className="text-lg text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quikulate
            </span>
          </Link>
          <p className="mt-3 text-sm text-[var(--text-tertiary)] max-w-sm leading-relaxed">
            Free online calculators, converters, and developer tools.
            Fast, private, no signup required.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-tertiary)] mb-4">
              Tools
            </h3>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-tertiary)] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-tertiary)] mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/blog" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-tertiary)] mb-4">
              Popular
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/tools/financial/emi-calculator" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">EMI Calculator</Link></li>
              <li><Link href="/tools/developer/json-formatter" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">JSON Formatter</Link></li>
              <li><Link href="/tools/conversion/currency-converter" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">Currency Converter</Link></li>
              <li><Link href="/tools/text/word-counter" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">Word Counter</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-tertiary)]">
            &copy; {new Date().getFullYear()} Quikulate. All tools are free and open for everyone.
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">
            All computations run locally &mdash; your data never leaves your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
