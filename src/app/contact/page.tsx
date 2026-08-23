"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition";
  const labelClass = "block text-sm text-text-muted mb-1.5";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16 lg:py-20">
        <p className="text-xs font-medium text-brand uppercase tracking-wide mb-3">
          Contact
        </p>
        <h1 className="text-3xl lg:text-4xl font-semibold text-text tracking-tight leading-tight mb-4">
          Get in touch
        </h1>
        <p className="text-text-muted leading-relaxed mb-10">
          Have a question, or a place we should check out? Send us a
          message.
        </p>

        {submitted ? (
          <div className="rounded-[14px] border border-border bg-surface p-8 text-center">
            <p className="text-text font-medium mb-1">Message sent</p>
            <p className="text-sm text-text-muted">
              We&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                className={inputClass + " resize-none"}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="rounded-[10px] bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark transition disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}