import type { MetadataRoute } from "next";
// TODO: import your real post-fetching function, e.g.:
// import { getAllPosts } from "@/app/admin/posts/actions";

const BASE_URL = "https://kuwaitguides.com"; // TODO: replace with your real domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // TODO: replace with real published posts, e.g.:
  // const posts = await getAllPosts();
  // const postRoutes: MetadataRoute.Sitemap = posts
  //   .filter((p) => p.status === "published")
  //   .map((post) => ({
  //     url: `${BASE_URL}/blog/${post.slug}`,
  //     lastModified: post.updatedAt ?? post.publishedAt,
  //     changeFrequency: "monthly",
  //     priority: 0.7,
  //   }));

  const postRoutes: MetadataRoute.Sitemap = [];

  return [...staticRoutes, ...postRoutes];
}