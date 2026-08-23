import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-[20px] bg-brand px-8 py-14 sm:px-14 sm:py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight mb-4">
            Ready to explore Kuwait properly?
          </h2>
          <p className="text-white/85 leading-relaxed mb-8 max-w-lg mx-auto">
            Browse our full collection of guides — places to eat, things to
            do, and everything in between.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-[10px] bg-white px-7 py-3 text-sm font-medium text-brand hover:bg-white/90 transition"
          >
            Browse the Guides
          </Link>
        </div>
      </div>
    </section>
  );
}