import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-[20px] bg-blue-600 px-8 py-14 sm:px-14 sm:py-16 text-center border border-blue-400/60 shadow-[0_12px_35px_rgba(37,99,235,0.25)]">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight mb-4">
            Ready to explore Kuwait properly?
          </h2>
          <p className="text-white/90 leading-relaxed mb-8 max-w-lg mx-auto text-base">
            Browse our full collection of guides — places to eat, things to
            do, and everything in between.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-[10px] bg-white px-7 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition shadow-md"
          >
            Browse the Guides
          </Link>
        </div>
      </div>
    </section>
  );
}