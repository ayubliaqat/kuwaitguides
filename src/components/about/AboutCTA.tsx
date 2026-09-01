import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-blue-400 dark:border-blue-600 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-zinc-950 p-8 sm:p-12 text-center shadow-2xl shadow-blue-500/30">
      {/* Ambient glow accents */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-lg mx-auto space-y-4">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-100 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          Get Involved
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
          Have a spot to recommend?
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
          We love connecting with our community. Drop us a message with your feedback or hidden gems.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-blue-700 bg-white hover:bg-blue-50 transition rounded-xl px-6 py-2.5 shadow-lg shadow-blue-900/30"
          >
            Get in touch &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}