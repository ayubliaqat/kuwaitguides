import type { Metadata } from "next";
import { getPublishedPosts } from "@/app/admin/posts/actions";
import BlogGrid from "./BlogGrid";

const SITE_URL = "https://kuwaitguides.vercel.app";

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

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const posts = await getPublishedPosts();
  const { search, category } = await searchParams;

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
      ...(post.featuredImage
        ? {
            image: post.featuredImage,
          }
        : {}),
      ...(post.excerpt
        ? {
            description: post.excerpt,
          }
        : {}),
      ...(post.publishedAt
        ? {
            datePublished: new Date(post.publishedAt).toISOString(),
          }
        : {}),
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      {/* =====================================================
          MODERN KUWAIT BLOG HERO
          ===================================================== */}
      <section className="relative h-[300px] overflow-hidden bg-brand sm:h-[360px] md:h-[400px] lg:h-[430px]">

        {/* =================================================
            SUBTLE BACKGROUND DETAILS
            Uses only the existing brand blue + white
            ================================================= */}

        {/* Large soft white circle */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/[0.10]" />

        {/* Inner circle */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full border border-white/[0.10]" />

        {/* Bottom left circle */}
        <div className="pointer-events-none absolute -bottom-44 -left-24 h-80 w-80 rounded-full border border-white/[0.08]" />

        {/* Small white decorative line */}
        <div className="pointer-events-none absolute left-[7%] top-[28%] hidden h-px w-24 bg-white/20 sm:block" />

        <div className="pointer-events-none absolute right-[7%] top-[32%] hidden h-px w-32 bg-white/20 sm:block" />

        {/* =================================================
            PARTICLES
            ================================================= */}
        <div className="pointer-events-none absolute inset-0">

          <span className="absolute left-[8%] top-[20%] h-2 w-2 rounded-full bg-white/30" />

          <span className="absolute left-[18%] top-[40%] h-1.5 w-1.5 rounded-full bg-white/40" />

          <span className="absolute left-[28%] top-[18%] h-1 w-1 rounded-full bg-white/50" />

          <span className="absolute left-[13%] top-[65%] h-1 w-1 rounded-full bg-white/40" />

          <span className="absolute left-[36%] top-[72%] h-1.5 w-1.5 rounded-full bg-white/25" />

          <span className="absolute right-[12%] top-[22%] h-2 w-2 rounded-full bg-white/30" />

          <span className="absolute right-[22%] top-[47%] h-1.5 w-1.5 rounded-full bg-white/40" />

          <span className="absolute right-[33%] top-[17%] h-1 w-1 rounded-full bg-white/50" />

          <span className="absolute right-[8%] top-[66%] h-1 w-1 rounded-full bg-white/40" />

          <span className="absolute right-[39%] bottom-[27%] h-1.5 w-1.5 rounded-full bg-white/25" />

          <span className="absolute left-[46%] top-[25%] h-1 w-1 rounded-full bg-white/30" />

          <span className="absolute left-[55%] top-[68%] h-1 w-1 rounded-full bg-white/40" />

        </div>

        {/* =================================================
            HERO CONTENT
            ================================================= */}
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 pb-12 text-center sm:px-6 sm:pb-14">


          {/* Heading */}
          <h1 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Kuwait, the way locals actually see it
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-md px-2 text-sm leading-relaxed text-white/80 sm:max-w-lg sm:text-base">
            No listicles, no filler — just the dining rooms, coastlines,
            souqs, and corners worth your time.
          </p>

        </div>

        {/* =================================================
            THIN DECORATIVE WAVE
            ================================================= */}
        <div className="pointer-events-none absolute bottom-[52px] left-0 w-full opacity-30 sm:bottom-[65px] md:bottom-[72px]">

          <svg
            className="h-8 w-full sm:h-10"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,55 C200,10 350,95 550,50 C750,5 900,95 1200,35"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

        </div>

        {/* =================================================
            MAIN WHITE WAVE
            ================================================= */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">

          <svg
            className="relative block h-[65px] w-full sm:h-[80px] md:h-[90px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 C180,135 330,10 520,55 C700,100 820,135 1000,65 C1080,35 1140,35 1200,55 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>

        </div>

      </section>

      {/* =====================================================
          BLOG GRID
          ===================================================== */}
      <BlogGrid
        key={`${search ?? ""}-${category ?? ""}`}
        posts={posts}
        initialSearch={search ?? ""}
        initialCategory={category ?? "All"}
      />
    </div>
  );
}