import type { MetadataRoute } from "next";

const BASE_URL = "https://kuwaitguides.com"; // TODO: replace with your real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}