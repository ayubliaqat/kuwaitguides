import Link from "next/link";

export default function HomeHero() {
  return (
    <section
      className="relative bg-white dark:bg-zinc-950 bg-cover bg-center border-y border-blue-200 dark:border-zinc-800"
      style={{ backgroundImage: "url('/images/blog-banner-image.png')" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-12 md:pt-16 pb-8 sm:pb-8 md:pb-12 flex flex-col items-center text-center">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 tracking-tight leading-[1.1] max-w-2xl">
          Life, food, and hidden gems in Kuwait
        </h1>

        <p className="text-zinc-600 dark:text-zinc-300 mt-4 sm:mt-5 max-w-md sm:max-w-lg text-sm sm:text-base md:text-lg leading-relaxed font-normal">
          Visas, flights, residency laws, and everyday life in Kuwait, explained simply by people who actually live here.
        </p>

        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl px-6 sm:px-7 py-3 sm:py-3.5 shadow-md shadow-blue-500/20"
          >
            Explore Blogs
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-blue-400 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800 transition rounded-xl px-6 sm:px-7 py-3 sm:py-3.5 shadow-md shadow-blue-500/10"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}