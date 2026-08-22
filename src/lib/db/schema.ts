import { pgTable, text, boolean, timestamp, integer, uuid, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums (Postgres-native, replaces the { enum: [...] } pattern)
export const userRoleEnum = pgEnum("user_role", ["admin", "editor"]);
export const postStatusEnum = pgEnum("post_status", ["draft", "published", "scheduled"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(), // bcrypt hash, never plain text

  role: userRoleEnum("role").notNull().default("admin"),

  createdAt: timestamp("created_at").notNull().defaultNow(),

  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Core
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(), // Tiptap HTML output
  excerpt: text("excerpt"),

  // Featured image
  featuredImage: text("featured_image"), // Cloudinary URL
  featuredImageAlt: text("featured_image_alt"),

  // Author
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),

  // Publish settings
  status: postStatusEnum("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  scheduledAt: timestamp("scheduled_at"),
  isFeatured: boolean("is_featured").notNull().default(false),

  // SEO
  focusKeyphrase: text("focus_keyphrase"),
  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),
  seoSlug: text("seo_slug"),
  canonicalUrl: text("canonical_url"),
  robots: text("robots"), // e.g. "index,follow"
  breadcrumbTitle: text("breadcrumb_title"),

  // Social — Open Graph
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),

  // Social — Twitter/X
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),

  // Schema.org
  schemaType: text("schema_type"), // e.g. "Article", "BlogPosting"

  // Advanced
  noindex: boolean("noindex").notNull().default(false),
  nofollow: boolean("nofollow").notNull().default(false),
  customSchema: text("custom_schema"), // raw JSON-LD override

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Categories
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const postCategories = pgTable("post_categories", {
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
});

// Tags
export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const postTags = pgTable("post_tags", {
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
});

// FAQs (belongs to one post)
export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0),
});

// Related posts (self-referencing many-to-many)
export const relatedPosts = pgTable("related_posts", {
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  relatedPostId: uuid("related_post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
});