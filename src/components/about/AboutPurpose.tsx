import Image from "next/image";

const PURPOSE_POINTS = [
  "No recycled tourism copy — every guide is written from firsthand experience.",
  "Prices, hours, and details are re-verified regularly, not set once and forgotten.",
  "Built by residents who actually live in the neighborhoods we cover.",
];

export default function AboutPurpose() {
  return (
    <section className="border-y-2 border-blue-400 dark:border-blue-600 py-14 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-blue-400 dark:border-blue-600 shadow-2xl shadow-blue-500/40 dark:shadow-blue-500/20 aspect-[4/3]">
            <Image
              src="/images/about-purpose.jpg"
              alt="Kuwait city street view"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent" />
          </div>

          {/* Ambient blue glow behind image */}
          <div className="absolute -inset-6 -z-10 bg-blue-500/25 blur-3xl rounded-full" />

          {/* Floating glass accent card */}
          <div className="absolute -bottom-6 -right-4 sm:-right-6 w-36 rounded-2xl border border-blue-200 dark:border-blue-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg shadow-blue-500/20 p-4">
            <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">100%</p>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">Locally written</p>
          </div>
        </div>

        {/* Right: Title, description, bullets */}
        <div className="space-y-5 text-center lg:text-left">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 mx-auto lg:mx-0">
            Our Purpose
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Cutting through general{" "}
            <span className="text-blue-600 dark:text-blue-400">tourism noise</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Finding reliable information about Kuwait shouldn&apos;t require digging through outdated blogs or sponsored ads. We built this platform on transparent, current, community-backed details from people who actually live here.
          </p>

          <ul className="space-y-3 pt-2 max-w-xl mx-auto lg:mx-0">
            {PURPOSE_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-left">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-3 h-3 text-blue-600 dark:text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
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