import Link from "next/link";
import { getPublishedPosts } from "@/app/admin/posts/actions";

export default async function BlogHighlights() {
  const posts = await getPublishedPosts();
  const featured = posts.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="bg-white border-y border-blue-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-10 sm:pb-14 md:pb-16">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 tracking-tight">
            From the journal
          </h2>
          <p className="text-text-muted mt-2 sm:mt-3 text-sm sm:text-base max-w-md mx-auto">
            A few of our latest guides, picked for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {featured.map((post) => (
            <article
              key={post.id}
              className="group rounded-[14px] sm:rounded-[16px] border border-border bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col"
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
                  <p className="text-[10px] sm:text-[11px] font-medium text-brand uppercase tracking-wide mb-1.5 sm:mb-2">
                    {post.categories[0].name}
                  </p>
                )}

                <h3 className="text-sm sm:text-base font-semibold text-text leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-xs sm:text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto flex items-center justify-center text-xs sm:text-sm font-medium text-white bg-brand hover:bg-brand-dark transition rounded-[8px] px-3.5 sm:px-4 py-2 w-full"
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
            className="inline-flex items-center justify-center text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition rounded-[10px] px-7 sm:px-8 py-3 sm:py-3.5"
          >
            Explore All
          </Link>
        </div>
      </div>
    </section>
  );
}