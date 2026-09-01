import Link from "next/link";

const VALUES = [
  {
    title: "Honesty",
    description: "We call out spots that aren't worth your time.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12.75l1.5 1.5 3.75-3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Local Insight",
    description: "Written exclusively by residents who know the city.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    ),
  },
  {
    title: "Verified Updates",
    description: "Prices and hours are re-checked in person regularly.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    ),
  },
];

const TESTIMONIALS = [
  {
    quote: "Found spots in Kuwait I never would have discovered on standard tourism sites. Absolutely spot on.",
    author: "Tariq M.",
    role: "Resident since 2019",
  },
  {
    quote: "When moving here, figuring out everyday living felt overwhelming. This guide made everything crystal clear.",
    author: "Sarah K.",
    role: "Expat Professional",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 overflow-x-hidden">
      
      {/* Banner with Exact Custom Blue Zig-Zag Wave Mask & Clean Height */}
      <div className="relative bg-blue-600 dark:bg-blue-950 pt-16 pb-24 sm:pt-20 sm:pb-32 px-4 sm:px-6 text-white">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
          <span className="inline-block px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-sm">
            About Us
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Kuwait, explained by locals
          </h1>
          <p className="text-blue-100 dark:text-zinc-300 max-w-md mx-auto text-xs sm:text-sm font-medium leading-relaxed">
            Honest, current guides built by people who actually live here.
          </p>
        </div>

        {/* Custom SVG Smooth Zig-Zag Wave Overlay (Matching Reference Style) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-12 sm:h-20 text-white dark:text-zinc-950"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,110 350,-40 500,50 C650,140 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Container with generous spacing below the zig-zag wave */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 pb-20 space-y-20 relative z-20">
        
        {/* Trust Section as Structured Cards with Clear Margins */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12 sm:my-16">
          <div className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 text-center shadow-xl transform transition duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="text-base">{star}</span>
              ))}
            </div>
            <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">4.9 / 5 Rating</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Verified community feedback</p>
          </div>

          <div className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 text-center shadow-xl transform transition duration-300 hover:-translate-y-1">
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">100%</p>
            <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">In-Person Tested</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Zero automated fluff</p>
          </div>

          <div className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 text-center shadow-xl transform transition duration-300 hover:-translate-y-1">
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">Free</p>
            <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">Zero Paywalls</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Open access for all</p>
          </div>
        </div>

        {/* Core Values & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Our Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Driven by accuracy and trust
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              When details shift, we update them immediately. No recycled brochures — just firsthand local insights.
            </p>
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Browse verified guides &rarr;
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUES.map((value, idx) => (
              <div
                key={value.title}
                className={`rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-5 shadow-md flex flex-col justify-between transition hover:-translate-y-1 ${
                  idx === 1 ? "sm:-translate-y-2" : ""
                }`}
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    >
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Testimonials
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mt-2">
              Trusted by Locals & Expats
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 shadow-md flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 italic leading-relaxed mb-4 font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{t.author}</p>
                    <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact CTA */}
        <div className="relative rounded-3xl border-2 border-blue-400 dark:border-blue-600 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/40 p-8 text-center shadow-xl">
          <div className="max-w-lg mx-auto space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Have a spot to recommend?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              We love connecting with our community. Drop us a message with your feedback or hidden gems.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl px-6 py-2.5 shadow-md shadow-blue-500/20"
              >
                Get in touch &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}