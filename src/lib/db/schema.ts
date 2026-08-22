import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(), // bcrypt hash, never plain text

  role: text("role", { enum: ["admin", "editor"] })
    .notNull()
    .default("admin"),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),

  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const posts = sqliteTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  // Core
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(), // Tiptap HTML output
  excerpt: text("excerpt"),

  // Featured image
  featuredImage: text("featured_image"), // Cloudinary URL
  featuredImageAlt: text("featured_image_alt"),

  // Author
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),

  // Publish settings
  status: text("status", { enum: ["draft", "published", "scheduled"] })
    .notNull()
    .default("draft"),
  publishedAt: text("published_at"),
  scheduledAt: text("scheduled_at"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),

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
  noindex: integer("noindex", { mode: "boolean" }).notNull().default(false),
  nofollow: integer("nofollow", { mode: "boolean" }).notNull().default(false),
  customSchema: text("custom_schema"), // raw JSON-LD override

  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// Categories
export const categories = sqliteTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const postCategories = sqliteTable("post_categories", {
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  categoryId: text("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
});

// Tags
export const tags = sqliteTable("tags", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const postTags = sqliteTable("post_tags", {
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
});

// FAQs (belongs to one post)
export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0),
});

// Related posts (self-referencing many-to-many)
export const relatedPosts = sqliteTable("related_posts", {
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  relatedPostId: text("related_post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
});