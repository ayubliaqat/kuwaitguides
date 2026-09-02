const INCLUSIONS = [
  {
    title: "Neighborhood Spotlights",
    description:
      "Detailed breakdowns of districts, walkability, parking, and vibes.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
      />
    ),
  },
  {
    title: "Authentic Dining Guides",
    description:
      "Curated lists of street food, hidden cafés, and high-end dining.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75s.75-1.5 2.25-1.5 2.25 1.5 2.25 1.5M8.25 15s1.5 1.5 3.75 1.5 3.75-1.5 3.75-1.5"
      />
    ),
  },
  {
    title: "Visa & Practical Steps",
    description:
      "Clear instructions for legal documents, transport, and daily living.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
      />
    ),
  },
  {
    title: "Seasonal Recommendations",
    description:
      "What to explore during winter events, summer escapes, and holidays.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    ),
  },
];

export default function AboutInclusions() {
  return (
    <section className="relative">
      {/* Ambient background accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-10">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Coverage
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            What&apos;s{" "}
            <span className="text-blue-600 dark:text-blue-400">
              actually
            </span>{" "}
            included
          </h2>

          <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-100 leading-relaxed">
            Four ways every guide on this site earns its place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INCLUSIONS.map((item, idx) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-blue-950/40 p-6 shadow-md shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500 overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute -top-3 -right-1 text-6xl font-black text-blue-50 dark:text-blue-900/50 select-none pointer-events-none transition-colors duration-300 group-hover:text-blue-100 dark:group-hover:text-blue-800/60">
                0{idx + 1}
              </span>

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    {item.icon}
                  </svg>
                </div>

                <h3 className="text-base font-bold mb-2 text-blue-950 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-100 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}