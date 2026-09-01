export default function StatsTrustSection() {
  const stats = [
    {
      metric: (
        <div className="flex items-center justify-center gap-1 text-amber-400">
          {"★".repeat(5)}
        </div>
      ),
      title: "4.9 / 5 Rating",
      description: "Verified community feedback",
    },
    {
      metric: "100%",
      title: "In-Person Tested",
      description: "Zero automated fluff",
    },
    {
      metric: "Free",
      title: "Zero Paywalls",
      description: "Open access for all",
    },
    {
      metric: "24/7",
      title: "Always Active",
      description: "Updated round the clock",
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-white dark:bg-zinc-950 border-b border-blue-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-blue-400/60 dark:border-blue-700/80 bg-white dark:bg-zinc-900 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 shadow-[0_12px_35px_rgba(37,99,235,0.15)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center min-h-[140px]"
            >
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                {item.metric}
              </div>
              <h3 className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}