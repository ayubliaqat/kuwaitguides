import type { Metadata } from "next";
import HomeHero from "@/components/Home/HomeHero";
import BlogHighlights from "@/components/Home/Bloghighlights";
import WhoWeAre from "@/components/Home/WhoWeAre";
import Testimonials from "@/components/Home/Testimonials";
import CtaSection from "@/components/Home/CTASection";
import FaqSection from "@/components/Home/FAQSection";
import WhatYouWillLearn from "@/components/Home/WhatYouWillLearn";
import HomeSearchBar from "@/components/Home/HomeSearchSection";
import TrustSection from "@/components/Home/TrustSection";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import LongGuideSection from "@/components/Home/Longguidesection";

const SITE_URL = "https://kuwaitguides.vercel.app";

export const metadata: Metadata = {
  title: "Kuwait Guides — Real Local Recommendations for Kuwait",
  description:
    "Your friend who already knows Kuwait. Discover the best dining, beaches, malls, souqs, and parks — curated by locals, not an algorithm.",
  alternates: {
    canonical: SITE_URL,
  },
  keywords: [
    "Kuwait guide",
    "Kuwait travel",
    "things to do in Kuwait",
    "Kuwait restaurants",
    "Kuwait beaches",
    "Kuwait blog",
  ],
  openGraph: {
    title: "Kuwait Guides — Real Local Recommendations for Kuwait",
    description:
      "Your friend who already knows Kuwait. Dining, beaches, malls, souqs, and parks — curated by locals.",
    url: SITE_URL,
    siteName: "Kuwait Guides",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/blog-banner-image.png`,
        width: 1200,
        height: 630,
        alt: "Kuwait Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuwait Guides — Real Local Recommendations for Kuwait",
    description: "Your friend who already knows Kuwait.",
    images: [`${SITE_URL}/images/blog-banner-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function HomePage() {
  const categoryRows = await db.select().from(categories);
  const categoryNames = categoryRows.map((c) => c.name);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kuwait Guides",
    url: SITE_URL,
    description:
      "Real local recommendations for dining, beaches, malls, souqs, and parks in Kuwait.",
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <HomeHero />
      <TrustSection />
      <HomeSearchBar categories={categoryNames} />
      <BlogHighlights />
      <WhoWeAre />
      <WhatYouWillLearn />
      <LongGuideSection />

      <Testimonials />
      <CtaSection />
      <FaqSection />
    </div>
  );
}
