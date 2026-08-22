import Link from "next/link";
import { getPublishedPosts } from "@/app/admin/posts/actions";

export default async function BlogListingPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
{/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src="/images/blog-banner.png"
  alt=""
  className="absolute inset-0 w-full h-full object-cover"
/>
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">

          <h1 className="text-4xl sm:text-5xl font-semibold text-brand tracking-tight">
            Blog
          </h1>
          <p className="text-text-muted mt-3 max-w-md">
            Guides, stories, and tips for exploring Kuwait.
          </p>
        </div>
      </div>

      {/* Card grid */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        {posts.length === 0 ? (
          <p className="text-center text-text-muted py-20">No posts published yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-[16px] border border-border bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <div className="aspect-[4/3] bg-surface overflow-hidden">
                  {post.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted/40">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M4 4h16v16H4z" strokeLinejoin="round" />
                        <circle cx="9" cy="9" r="1.5" />
                        <path d="M4 16l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {post.categories.length > 0 && (
                    <p className="text-[11px] font-medium text-brand uppercase tracking-wide mb-2">
                      {post.categories[0].name}
                    </p>
                  )}

                  <h2 className="text-base font-semibold text-text leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-brand hover:bg-brand-dark transition rounded-[8px] px-4 py-2"
                  >
                    Read Blog
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}