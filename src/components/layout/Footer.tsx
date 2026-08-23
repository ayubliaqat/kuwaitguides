import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="text-lg font-semibold text-text tracking-tight">
            Kuwait<span className="text-brand">Guides</span>
          </Link>
        </div>

        {/* Centered nav */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-brand transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-xs text-text-muted">
            © {year} KuwaitGuides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}