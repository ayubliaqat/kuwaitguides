export default function WhoWeAre() {
  return (
    <section className="py-8 lg:py-12 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text side */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            Who We Are
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
            <span className="text-blue-600 dark:text-blue-400">Kuwait, explained</span>{" "}
            <span className="text-zinc-900 dark:text-zinc-100">by people who actually live here</span>
          </h2>
          
          <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed font-normal">
            We started Kuwait Guides because most travel advice online felt outdated or written by someone who&apos;d never set foot here. So we built the guide we wished existed — honest, current, and written by locals who know which restaurant is actually worth the wait.
          </p>

          <ul className="space-y-2.5 pt-1">
            {[
              "Written by real residents",
              "Updated regularly, not archived",
              "Honest picks, no filler",
              "Prices and timings included",
              "Clear directions, no guesswork"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0" />
                <span className="text-base font-medium text-zinc-900 dark:text-zinc-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image side matching text height balance */}
        <div className="relative group self-center">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-md opacity-15 group-hover:opacity-30 transition duration-500" />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-blue-300/70 dark:border-blue-700/50 shadow-[0_8px_25px_rgba(37,99,235,0.12)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)] bg-white dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/whoarewe.avif"
              alt="Kuwait City skyline"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}