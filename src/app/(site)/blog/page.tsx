import type { Metadata } from "next";
import { getPublishedPosts } from "@/app/admin/posts/actions";
import BlogGrid from "./BlogGrid";

const SITE_URL = "https://kuwaitguides.vercel.app";

// Cache this page for 5 minutes — new posts show up within that window
// instead of every visitor triggering a fresh Supabase query.
export const revalidate = 300;

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

      {/* Search + Card grid */}
      <BlogGrid posts={posts} />
    </div>
  );
}