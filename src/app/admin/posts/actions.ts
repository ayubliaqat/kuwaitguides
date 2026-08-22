"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts, faqs, categories, tags, postCategories, postTags, relatedPosts, users } from "@/lib/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { postContentSchema, faqItemSchema } from "@/lib/validations/post";
import { z } from "zod";
import slugify from "slugify";


export async function createPost(data: unknown, faqItems: unknown = []) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const parsed = postContentSchema.parse(data);
  const parsedFaqs = z.array(faqItemSchema).parse(faqItems);

  const [post] = await db
    .insert(posts)
    .values({
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt || null,
      content: parsed.content,
      featuredImageAlt: parsed.featuredImageAlt || null,
      featuredImage: parsed.featuredImage || null,
      status: parsed.status,
      publishedAt: parsed.publishedAt || null,
      scheduledAt: parsed.scheduledAt || null,
      isFeatured: parsed.isFeatured,
authorId: session.user.id,

      focusKeyphrase: parsed.focusKeyphrase || null,
      seoTitle: parsed.seoTitle || null,
      metaDescription: parsed.metaDescription || null,
      seoSlug: parsed.seoSlug || null,
      canonicalUrl: parsed.canonicalUrl || null,
      robots: parsed.robots || null,
      breadcrumbTitle: parsed.breadcrumbTitle || null,

      ogTitle: parsed.ogTitle || null,
      ogDescription: parsed.ogDescription || null,
      ogImage: parsed.ogImage || null,
      twitterTitle: parsed.twitterTitle || null,
      twitterDescription: parsed.twitterDescription || null,
      twitterImage: parsed.twitterImage || null,

      schemaType: parsed.schemaType || "Article",

      noindex: parsed.noindex ?? false,
      nofollow: parsed.nofollow ?? false,
      customSchema: parsed.customSchema || null,
    })
    .returning();

  if (parsedFaqs.length > 0) {
    await db.insert(faqs).values(
      parsedFaqs.map((faq, i) => ({
        postId: post.id,
        question: faq.question,
        answer: faq.answer,
        order: i,
      }))
    );
  }

  if (parsed.categoryIds && parsed.categoryIds.length > 0) {
    await db.insert(postCategories).values(
      parsed.categoryIds.map((categoryId) => ({ postId: post.id, categoryId }))
    );
  }

  if (parsed.tagIds && parsed.tagIds.length > 0) {
    await db.insert(postTags).values(
      parsed.tagIds.map((tagId) => ({ postId: post.id, tagId }))
    );
  }

  if (parsed.relatedPostIds && parsed.relatedPostIds.length > 0) {
    await db.insert(relatedPosts).values(
      parsed.relatedPostIds.map((relatedPostId) => ({ postId: post.id, relatedPostId }))
    );
  }

  redirect(`/admin/posts`);
  return post;
}

export async function getCategories() {
  return db.select().from(categories);
}

export async function getTags() {
  return db.select().from(tags);
}

export async function getExistingPosts() {
  return db.select({ id: posts.id, title: posts.title }).from(posts);
}

export async function createCategory(name: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const [category] = await db
    .insert(categories)
    .values({ name, slug: slugify(name, { lower: true, strict: true }) })
    .returning();
  return category;
}

export async function createTag(name: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const [tag] = await db
    .insert(tags)
    .values({ name, slug: slugify(name, { lower: true, strict: true }) })
    .returning();
  return tag;
}

export async function getAllPosts() {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      featuredImage: posts.featuredImage,
      isFeatured: posts.isFeatured,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .orderBy(posts.createdAt);
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  await db.delete(faqs).where(eq(faqs.postId, id));
  await db.delete(postCategories).where(eq(postCategories.postId, id));
  await db.delete(postTags).where(eq(postTags.postId, id));
  await db.delete(relatedPosts).where(eq(relatedPosts.postId, id));
  await db.delete(posts).where(eq(posts.id, id));
}

export async function getPostBySlug(slug: string) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  if (!post) return null;

  const postFaqs = await db.select().from(faqs).where(eq(faqs.postId, post.id));

  const postCats = await db
    .select({ id: categories.id, name: categories.name, slug: categories.slug })
    .from(postCategories)
    .innerJoin(categories, eq(postCategories.categoryId, categories.id))
    .where(eq(postCategories.postId, post.id));

  const postTagList = await db
    .select({ id: tags.id, name: tags.name, slug: tags.slug })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(eq(postTags.postId, post.id));

  return { ...post, faqs: postFaqs, categories: postCats, tags: postTagList };
}
export async function getPostById(id: string) {
  const post = await db.query.posts.findFirst({ where: eq(posts.id, id) });
  if (!post) return null;

  const postFaqs = await db.select().from(faqs).where(eq(faqs.postId, id));

  const catLinks = await db.select().from(postCategories).where(eq(postCategories.postId, id));
  const tagLinks = await db.select().from(postTags).where(eq(postTags.postId, id));
  const relatedLinks = await db.select().from(relatedPosts).where(eq(relatedPosts.postId, id));

  return {
    ...post,
    faqItems: postFaqs.map((f) => ({ question: f.question, answer: f.answer })),
    categoryIds: catLinks.map((c) => c.categoryId),
    tagIds: tagLinks.map((t) => t.tagId),
    relatedPostIds: relatedLinks.map((r) => r.relatedPostId),
  };
}

export async function updatePost(id: string, data: unknown, faqItems: unknown = []) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const parsed = postContentSchema.parse(data);
  const parsedFaqs = z.array(faqItemSchema).parse(faqItems);

  await db
    .update(posts)
    .set({
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt || null,
      content: parsed.content,
      featuredImage: parsed.featuredImage || null,
      featuredImageAlt: parsed.featuredImageAlt || null,
      status: parsed.status,
      publishedAt: parsed.status === "published" ? parsed.publishedAt || new Date().toISOString() : parsed.publishedAt || null,
      scheduledAt: parsed.scheduledAt || null,
      isFeatured: parsed.isFeatured,

      focusKeyphrase: parsed.focusKeyphrase || null,
      seoTitle: parsed.seoTitle || null,
      metaDescription: parsed.metaDescription || null,
      seoSlug: parsed.seoSlug || null,
      canonicalUrl: parsed.canonicalUrl || null,
      robots: parsed.robots || null,
      breadcrumbTitle: parsed.breadcrumbTitle || null,

      ogTitle: parsed.ogTitle || null,
      ogDescription: parsed.ogDescription || null,
      ogImage: parsed.ogImage || null,
      twitterTitle: parsed.twitterTitle || null,
      twitterDescription: parsed.twitterDescription || null,
      twitterImage: parsed.twitterImage || null,

      schemaType: parsed.schemaType || "Article",
      noindex: parsed.noindex ?? false,
      nofollow: parsed.nofollow ?? false,
      customSchema: parsed.customSchema || null,

      updatedAt: new Date().toISOString(),
    })
    .where(eq(posts.id, id));

  // Replace FAQs
  await db.delete(faqs).where(eq(faqs.postId, id));
  if (parsedFaqs.length > 0) {
    await db.insert(faqs).values(
      parsedFaqs.map((faq, i) => ({ postId: id, question: faq.question, answer: faq.answer, order: i }))
    );
  }

  // Replace category links
  await db.delete(postCategories).where(eq(postCategories.postId, id));
  if (parsed.categoryIds && parsed.categoryIds.length > 0) {
    await db.insert(postCategories).values(
      parsed.categoryIds.map((categoryId) => ({ postId: id, categoryId }))
    );
  }

  // Replace tag links
  await db.delete(postTags).where(eq(postTags.postId, id));
  if (parsed.tagIds && parsed.tagIds.length > 0) {
    await db.insert(postTags).values(parsed.tagIds.map((tagId) => ({ postId: id, tagId })));
  }

  // Replace related post links
  await db.delete(relatedPosts).where(eq(relatedPosts.postId, id));
  if (parsed.relatedPostIds && parsed.relatedPostIds.length > 0) {
    await db.insert(relatedPosts).values(
      parsed.relatedPostIds.map((relatedPostId) => ({ postId: id, relatedPostId }))
    );
  }

  redirect(`/admin/posts`);
}

export async function getPublishedPosts() {
  const publishedPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
      featuredImageAlt: posts.featuredImageAlt,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      isFeatured: posts.isFeatured,
    })
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(posts.createdAt);

  // attach categories per post
  const withCategories = await Promise.all(
    publishedPosts.map(async (post) => {
      const cats = await db
        .select({ id: categories.id, name: categories.name })
        .from(postCategories)
        .innerJoin(categories, eq(postCategories.categoryId, categories.id))
        .where(eq(postCategories.postId, post.id));
      return { ...post, categories: cats };
    })
  );

  return withCategories.reverse(); // newest first
}


export async function getDashboardStats() {
  const allPosts = await db.select({ id: posts.id, status: posts.status }).from(posts);
  const allUsers = await db.select({ id: users.id }).from(users);
  const allCategories = await db.select().from(categories);

  const totalPosts = allPosts.length;
  const published = allPosts.filter((p) => p.status === "published").length;
  const drafts = allPosts.filter((p) => p.status === "draft").length;
  const scheduled = allPosts.filter((p) => p.status === "scheduled").length;
  const totalUsers = allUsers.length;

  const categoryBreakdown = await Promise.all(
    allCategories.map(async (cat) => {
      const count = await db
        .select({ count: sql<number>`count(*)` })
        .from(postCategories)
        .where(eq(postCategories.categoryId, cat.id));
      return { name: cat.name, count: Number(count[0]?.count || 0) };
    })
  );

  return {
    totalPosts,
    published,
    drafts,
    scheduled,
    totalUsers,
    categoryBreakdown: categoryBreakdown.filter((c) => c.count > 0),
  };
}