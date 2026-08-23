"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: brand */}
        <Link href="/" className="text-lg font-semibold text-text tracking-tight justify-self-start">
          Kuwait<span className="text-brand">Guides</span>
        </Link>

        {/* Center: nav (desktop only) */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-text-muted hover:text-brand transition py-1 group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        {/* Right: CTA (desktop) + mobile menu button */}
        <div className="justify-self-end flex items-center gap-3">
          <Link
            href="/blog"
            className="hidden md:inline-block rounded-[8px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition"
          >
            Explore Guides
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex items-center justify-center text-text"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-white px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm text-text hover:text-brand transition"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 rounded-[8px] bg-brand px-4 py-2.5 text-sm font-medium text-white text-center hover:bg-brand-dark transition"
          >
            Explore Guides
          </Link>
        </nav>
      )}
    </header>
  );
}