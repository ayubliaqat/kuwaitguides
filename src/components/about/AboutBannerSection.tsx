import Link from "next/link";

const VALUES = [
  {
    title: "Honesty",
    description: "We call out spots that aren't worth your time, providing true unfiltered opinions.",
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
    description: "Written exclusively by long-term residents who genuinely know the hidden corners.",
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
    description: "Prices, menus, and operating hours are re-checked in person on a regular basis.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.9"
      />
    ),
  },
];

const INCLUSIONS = [
  {
    title: "Neighborhood Spotlights",
    description: "Detailed breakdowns of districts, walkability, parking, and vibes.",
  },
  {
    title: "Authentic Dining Guides",
    description: "Curated lists of street food, hidden cafés, and high-end dining.",
  },
  {
    title: "Visa & Practical Steps",
    description: "Clear instructions for legal documents, transport, and daily living.",
  },
  {
    title: "Seasonal Recommendations",
    description: "What to explore during winter events, summer escapes, and holidays.",
  },
];

export function AboutBannerSection() {
  return (
    <div className="relative bg-blue-600 dark:bg-blue-950 pt-16 pb-24 sm:pt-20 sm:pb-32 px-4 sm:px-6 text-white">
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
        <span className="inline-block px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-sm">
          About Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Kuwait, explained by locals
        </h1>
        <p className="text-blue-100 dark:text-zinc-300 max-w-md mx-auto text-xs sm:text-sm font-medium leading-relaxed">
          Honest, current guides built by people who actually live here.
        </p>
      </div>

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
  );
}

export function AboutPurposeSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Our Purpose
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Cutting through general tourism noise
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Finding reliable information about Kuwait shouldn&apos;t require digging through outdated blogs or sponsored ads. We built this platform to deliver transparent, updated, and community-backed details directly from residents.
        </p>
      </div>
    </section>
  );
}

export function AboutEthosSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Our Ethos
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Driven by accuracy and trust
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            When details shift, we update them immediately. No recycled brochures — just firsthand local insights. Scroll through our core values to see how we maintain quality.
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

        <div className="lg:col-span-7 space-y-6 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 dark:scrollbar-thumb-blue-600">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 shadow-md transition hover:border-blue-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  >
                    {value.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1 text-zinc-900 dark:text-zinc-100">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutCoverageSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            What is included
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {INCLUSIONS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutCtaSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl border-2 border-blue-400 dark:border-blue-600 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/40 p-8 sm:p-12 text-center shadow-xl">
          <div className="max-w-lg mx-auto space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
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
    </section>
  );
}