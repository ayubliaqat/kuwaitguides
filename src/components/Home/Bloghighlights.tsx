import Link from "next/link";
import { getPublishedPosts } from "@/app/admin/posts/actions";

export default async function BlogHighlights() {
  const posts = await getPublishedPosts();
  const featured = posts.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="bg-white dark:bg-zinc-950 border-y border-blue-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-10 sm:pb-14 md:pb-16">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
    Latest Insights & Stories
  </h2>
  <p className="text-text-muted mt-2 sm:mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
    Explore our carefully curated collection of expert guides, industry deep-dives, innovative engineering practices, and fresh perspectives designed to keep you ahead of the curve.
  </p>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {featured.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border-[2.5px] border-blue-400 dark:border-blue-700 bg-white dark:bg-zinc-900/90 overflow-hidden shadow-[0_10px_30px_rgba(37,99,235,0.15)] dark:shadow-[0_10px_30px_rgba(37,99,235,0.35)] backdrop-blur-md hover:shadow-[0_16px_40px_rgba(37,99,235,0.25)] dark:hover:shadow-[0_16px_40px_rgba(37,99,235,0.45)] hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] bg-surface overflow-hidden">
                {post.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted/40">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    >
                      <path d="M4 4h16v16H4z" strokeLinejoin="round" />
                      <circle cx="9" cy="9" r="1.5" />
                      <path
                        d="M4 16l5-5 4 4 3-3 4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                {post.categories.length > 0 && (
                  <p className="text-[10px] sm:text-[11px] font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1.5 sm:mb-2">
                    {post.categories[0].name}
                  </p>
                )}

                <h3 className="text-sm sm:text-base font-semibold text-text dark:text-zinc-100 leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-xs sm:text-sm text-text-muted dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto flex items-center justify-center text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition rounded-[10px] px-3.5 sm:px-4 py-2 w-full shadow-sm"
                >
                  Read Blog
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 sm:mt-11 md:mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition rounded-[10px] px-7 sm:px-8 py-3 sm:py-3.5 shadow-md shadow-blue-500/20"
          >
            Explore All
          </Link>
        </div>
      </div>
    </section>
  );
}
