export default function WhatYouWillLearn() {
  const points = [
    "Navigating visa requirements and entry rules without the headache.",
    "Hunting down legendary local eats and hidden café spots.",
    "Uncovering iconic tourist sights and everyday insider tips.",
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-zinc-950 border-y border-blue-200/60 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: WOW Image with striking blue border and glow */}
        <div className="relative group self-center order-2 lg:order-1">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-45 transition duration-700" />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border-2 border-blue-500 dark:border-blue-500 shadow-[0_20px_50px_rgba(37,99,235,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-white dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cultur.jpg"
              alt="Kuwait exploration showcase"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
            />
          </div>
        </div>

        {/* Right Side: Title, Description & Concise Bullets */}
        <div className="space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            What You Get
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-zinc-900 dark:text-zinc-100">
            Everything you need to know about Kuwait, all in one place
          </h2>

          <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed font-normal">
            Whether you&apos;re figuring out paperwork before flying in or tracking down the best spots to eat and explore, we break down everything you actually care about without any fluff.
          </p>

          <ul className="space-y-3.5 pt-1">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-xs flex items-center justify-center mt-0.5 shadow-sm">
                  ✓
                </div>
                <span className="text-base font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}