import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-blue-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Kuwait<span className="text-blue-600 dark:text-blue-400">Guides</span>
          </Link>
        </div>

        {/* Centered nav */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative inline-block text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 font-medium"
            >
              {link.label}
              <span
                className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-blue-100 dark:border-zinc-800/80">
          <p className="text-xs text-blue-500 dark:text-zinc-400">
            © {year} KuwaitGuides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}