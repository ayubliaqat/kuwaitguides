import Link from "next/link";

export default function HomeHero() {
  return (
    <section
      className="relative bg-white bg-cover bg-center"
      style={{ backgroundImage: "url('/images/blog-banner-image.png')" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-12 md:pt-16 pb-8 sm:pb-8 md:pb-12 flex flex-col items-center text-center">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold text-blue-600 tracking-tight leading-[1.1] max-w-2xl">
          Your friend who already
          <br className="hidden sm:block" /> knows Kuwait
        </h1>

        <p className="text-text-muted mt-4 sm:mt-5 max-w-md sm:max-w-lg text-sm sm:text-base md:text-lg leading-relaxed">
          Real recommendations for where to eat, relax, and explore —
          curated by people who actually live here, not a search algorithm.
        </p>

        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm sm:text-base font-medium text-white bg-brand hover:bg-brand-dark transition rounded-[10px] px-6 sm:px-7 py-3 sm:py-3.5"
          >
            Explore Blogs
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm sm:text-base font-medium text-text bg-white border border-border hover:bg-surface transition rounded-[10px] px-6 sm:px-7 py-3 sm:py-3.5"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}