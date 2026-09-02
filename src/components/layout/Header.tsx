
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
    <header className="sticky top-0 z-50 border-b-2 border-[#D2D2D7] py-2 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: brand */}
        <Link
          href="/"
          className="text-lg font-semibold text-[#1D1D1F] tracking-tight justify-self-start"
        >
          Kuwait<span className="text-[#0071E3]">Guides</span>
        </Link>

        {/* Center: nav (desktop only) */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[#86868B] hover:text-[#0071E3] transition py-1 group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-[#0071E3] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        {/* Right: CTA (desktop) + mobile menu button */}
        <div className="justify-self-end flex items-center gap-3">
          <Link
            href="/blog"
            className="hidden md:inline-block rounded-[8px] bg-[#0071E3] hover:bg-[#0058B0] px-4 py-2 text-sm font-medium text-white transition shadow-sm"
          >
            Explore Guides
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden w-9 h-9 flex items-center justify-center text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F7] transition"
          >
            {mobileOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-[#D2D2D7] bg-white px-6 py-4 space-y-1 shadow-lg"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] transition"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 rounded-[8px] bg-[#0071E3] px-4 py-2.5 text-sm font-medium text-white text-center hover:bg-[#0058B0] transition shadow-sm"
          >
            Explore Guides
          </Link>
        </nav>
      )}
    </header>
  );
}