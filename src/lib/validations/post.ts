import { z } from "zod";

export const postContentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(1, "Content is required"),
  featuredImageAlt: z.string().optional(),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"]),
  publishedAt: z.string().optional(),
  scheduledAt: z.string().optional(),
  isFeatured: z.boolean(),

  // SEO
  focusKeyphrase: z.string().optional(),
  seoTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  seoSlug: z.string().optional(),
  canonicalUrl: z.string().optional(),
  robots: z.string().optional(),
  breadcrumbTitle: z.string().optional(),

  // Social — Open Graph
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),

  // Social — Twitter/X
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),

  // Schema
  schemaType: z.string().optional(),

  // Advanced
  noindex: z.boolean().optional(),
  nofollow: z.boolean().optional(),
  customSchema: z.string().optional(),

  // Organize
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  relatedPostIds: z.array(z.string()).optional(),
});

export type PostContentInput = z.infer<typeof postContentSchema>;

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FaqItem = z.infer<typeof faqItemSchema>;