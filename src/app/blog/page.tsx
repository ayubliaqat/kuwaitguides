import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/app/admin/posts/actions";

const SITE_URL = "https://kuwaitguides.vercel.app";

export const metadata: Metadata = {
  title: "Kuwait Blog — Local Guides, Food, Beaches & Hidden Spots",
  description:
    "Real guides to Kuwait, written for people who actually want to go. Discover the best dining, coastal spots, malls, souqs, and parks — no filler, just what's worth your time.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  keywords: [
    "Kuwait blog",
    "Kuwait guide",
    "things to do in Kuwait",
    "Kuwait restaurants",
    "Kuwait beaches",
    "Kuwait travel tips",
  ],
  openGraph: {
    title: "Kuwait Blog — Local Guides, Food, Beaches & Hidden Spots",
    description:
      "Real guides to Kuwait, written for people who actually want to go. Dining, beaches, malls, souqs, parks, and more.",
    url: `${SITE_URL}/blog`,
    siteName: "Kuwait Guides",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/blog-banner-image.png`,
        width: 1200,
        height: 630,
        alt: "Kuwait Guides Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuwait Blog — Local Guides, Food, Beaches & Hidden Spots",
    description:
      "Real guides to Kuwait, written for people who actually want to go.",
    images: [`${SITE_URL}/images/blog-banner-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function BlogListingPage() {
  const posts = await getPublishedPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kuwait Blog",
    description:
      "Guides, stories, and tips for exploring Kuwait — dining, beaches, malls, souqs, and parks.",
    url: `${SITE_URL}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: "Kuwait Guides",
      url: SITE_URL,
    },
    hasPart: posts.slice(0, 12).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(post.featuredImage ? { image: post.featuredImage } : {}),
      ...(post.excerpt ? { description: post.excerpt } : {}),
      ...(post.publishedAt
        ? { datePublished: new Date(post.publishedAt).toISOString() }
        : {}),
    })),
  };

  return (
    <div className="min-h-screen">
      {/* eslint-disable-next-line @next/next/no-typos */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Banner */}
      <div className="relative h-[220px] xs:h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/blog-banner-image.png"
          alt="Kuwait skyline and coastline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" />
        <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold text-brand tracking-tight leading-[1.05] max-w-3xl">
            Kuwait, the way locals actually see it
          </h1>
          <p className="text-black mt-3 sm:mt-4 max-w-md sm:max-w-lg text-sm sm:text-base leading-relaxed px-2">
            No listicles, no filler — just the dining rooms, coastlines, souqs,
            and corners worth your time.
          </p>
        </div>
      </div>

      {/* Card grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {posts.length === 0 ? (
          <p className="text-center text-text-muted py-16 sm:py-20 text-sm sm:text-base">
            No posts published yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {posts.map((post) => (
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
                        className="sm:w-8 sm:h-8"
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

                  <h2 className="text-sm sm:text-base font-semibold text-text leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-xs sm:text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-white bg-brand hover:bg-brand-dark transition rounded-[8px] px-3.5 sm:px-4 py-2 w-full sm:w-fit"
                  >
                    Read Blog
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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