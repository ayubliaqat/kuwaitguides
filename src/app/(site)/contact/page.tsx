"use client";

import { useState } from "react";
import PageBanner from "@/components/layout/PageBanner";
import { submitContactMessage } from "./actions";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition";

  const labelClass = "block text-sm text-text-muted mb-1.5";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      await submitContactMessage({ name, email, message });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageBanner
        eyebrow="Contact"
        title="Let's talk"
        subtitle="Got a question, feedback, or a place we should check out? We'd love to hear from you."
      />

      <div className="max-w-2xl mx-auto px-6 py-16 lg:py-20">
        {submitted ? (
          <div className="rounded-[16px] border border-brand/20 bg-brand/5 p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-brand"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="text-text font-medium mb-1">Message sent</p>

            <p className="text-sm text-text-muted">
              We will get back to you soon.
            </p>
          </div>
        ) : (
          <div className="rounded-[16px] border border-border bg-white p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Name</label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email</label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Message</label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="What's on your mind?"
                  required
                  className={inputClass + " resize-none"}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto rounded-[10px] bg-brand px-7 py-3 text-sm font-medium text-white hover:bg-brand-dark transition disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-text-muted">
          Prefer email? Reach us directly at{" "}
          <a
            href="mailto:hello@kuwaitguides.com"
            className="text-brand hover:text-brand-dark transition font-medium"
          >
            hello@kuwaitguides.com
          </a>
        </p>
      </div>
    </div>
  );
}