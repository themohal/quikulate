"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="relative">
          <div className="absolute inset-0 hero-gradient opacity-30" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-8">
            <h1
              className="text-3xl sm:text-4xl mb-3 text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact Us
            </h1>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              Have feedback, a tool suggestion, or found a bug? Send us a message and we will get back to you.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field resize-y"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "sent" && (
                <p className="text-[var(--success)] text-sm">Message sent successfully! We will get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-[var(--error)] text-sm">Something went wrong. Please try again or email us directly.</p>
              )}
            </form>

            {/* Info sidebar */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Email</h2>
                <p className="text-sm text-[var(--text-secondary)]">support@quikulate.com</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Response Time</h2>
                <p className="text-sm text-[var(--text-secondary)]">We typically respond within 24-48 hours.</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Suggestions</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Want a new tool added to Quikulate? Let us know what you need and we will
                  consider adding it to our collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
