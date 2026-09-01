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

export default function AboutValues() {
  return (
    <section className="space-y-12">
      {/* Top: Heading + Description, centered */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Our Ethos
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Driven by <span className="text-blue-600 dark:text-blue-400">accuracy and trust</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          When details shift, we update them immediately. No recycled brochures — just firsthand local insights. Here&apos;s how we maintain quality.
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

      {/* Bottom: Cards in a single row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 p-6 shadow-lg shadow-blue-500/10 transition hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
              >
                {value.icon}
              </svg>
            </div>
            <h3 className="text-base font-bold mb-1">{value.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}