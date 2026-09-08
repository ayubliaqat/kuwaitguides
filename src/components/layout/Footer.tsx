import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-[#0071E3] text-white">
      {/* Top wave */}
      <div className="absolute -top-[68px] left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="block h-[68px] w-full"
          aria-hidden="true"
        >
          <path
            d="M0,65 C180,105 330,95 500,62 C690,25 820,15 1010,50 C1180,82 1300,100 1440,55 L1440,110 L0,110 Z"
            fill="#0071E3"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Brand */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-block text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            Kuwait<span className="text-white">Guides</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Footer navigation"
          className="mb-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}

              <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-xs text-white/60">
            © {year} KuwaitGuides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}