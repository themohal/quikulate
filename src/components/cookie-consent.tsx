"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
    // Disable personalized ads if declined
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gaOptout = true;
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9998] p-4 sm:p-6"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-[0_-4px_40px_rgba(28,25,23,0.12)] border border-[var(--border-hover)] p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">
                  Cookie Notice
                </p>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  We use cookies for advertising through Google AdSense. These cookies help
                  serve relevant ads and measure performance. See our{" "}
                  <Link href="/privacy" className="text-[var(--accent)] underline underline-offset-2">
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={decline}
                  className="btn-secondary !py-2 !px-4 !text-xs"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="btn-primary !py-2 !px-4 !text-xs"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
