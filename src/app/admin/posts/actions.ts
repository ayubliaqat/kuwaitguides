"use server";
import { eq, sql, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  posts,
  faqs,
  categories,
  tags,
  postCategories,
  postTags,
  relatedPosts,
  users,
} from "@/lib/db/schema";
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
      publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
      scheduledAt: parsed.scheduledAt ? new Date(parsed.scheduledAt) : null,
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
      })),
    );
  }

  if (parsed.categoryIds && parsed.categoryIds.length > 0) {
    await db
      .insert(postCategories)
      .values(
        parsed.categoryIds.map((categoryId) => ({
          postId: post.id,
          categoryId,
        })),
      );
  }

  if (parsed.tagIds && parsed.tagIds.length > 0) {
    await db
      .insert(postTags)
      .values(parsed.tagIds.map((tagId) => ({ postId: post.id, tagId })));
  }

  if (parsed.relatedPostIds && parsed.relatedPostIds.length > 0) {
    await db
      .insert(relatedPosts)
      .values(
        parsed.relatedPostIds.map((relatedPostId) => ({
          postId: post.id,
          relatedPostId,
        })),
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

  const catLinks = await db
    .select()
    .from(postCategories)
    .where(eq(postCategories.postId, id));
  const tagLinks = await db
    .select()
    .from(postTags)
    .where(eq(postTags.postId, id));
  const relatedLinks = await db
    .select()
    .from(relatedPosts)
    .where(eq(relatedPosts.postId, id));

  return {
    ...post,
    faqItems: postFaqs.map((f) => ({ question: f.question, answer: f.answer })),
    categoryIds: catLinks.map((c) => c.categoryId),
    tagIds: tagLinks.map((t) => t.tagId),
    relatedPostIds: relatedLinks.map((r) => r.relatedPostId),
  };
}

/**
 * Returns related posts for display on the public post page.
 * Combines explicit related-post links set by the author with posts that
 * share at least one category. Only published posts are returned.
 * Pass `limit` only if you want to cap the count — omit it to return all matches.
 */
export async function getRelatedPosts(
  postId: string,
  categoryIds: string[],
  limit?: number,
) {
  // 1. Explicit related-post links set by the author
  const explicitLinks = await db
    .select({ relatedPostId: relatedPosts.relatedPostId })
    .from(relatedPosts)
    .where(eq(relatedPosts.postId, postId));

  let relatedIds: string[] = explicitLinks.map((r) => r.relatedPostId);

  // 2. Add same-category posts too
  if (categoryIds.length > 0) {
    const catMatches = await db
      .select({ postId: postCategories.postId })
      .from(postCategories)
      .where(inArray(postCategories.categoryId, categoryIds));

    const candidateIds = Array.from(
      new Set(catMatches.map((c) => c.postId)),
    ).filter((id) => id !== postId && !relatedIds.includes(id));

    relatedIds = [...relatedIds, ...candidateIds];
  }

  if (typeof limit === "number") {
    relatedIds = relatedIds.slice(0, limit);
  }

  if (relatedIds.length === 0) return [];

  const candidatePosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      featuredImage: posts.featuredImage,
      featuredImageAlt: posts.featuredImageAlt,
      status: posts.status,
    })
    .from(posts)
    .where(inArray(posts.id, relatedIds));

  const published = candidatePosts.filter((p) => p.status === "published");

  const priority = new Map(relatedIds.map((id, i) => [id, i]));
  published.sort(
    (a, b) => (priority.get(a.id) ?? 0) - (priority.get(b.id) ?? 0),
  );

  return published;
}

export async function updatePost(
  id: string,
  data: unknown,
  faqItems: unknown = [],
) {
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
      publishedAt:
        parsed.status === "published"
          ? parsed.publishedAt
            ? new Date(parsed.publishedAt)
            : new Date()
          : parsed.publishedAt
            ? new Date(parsed.publishedAt)
            : null,
      scheduledAt: parsed.scheduledAt ? new Date(parsed.scheduledAt) : null,
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

      updatedAt: new Date(),
    })
    .where(eq(posts.id, id));

  // Replace FAQs
  await db.delete(faqs).where(eq(faqs.postId, id));
  if (parsedFaqs.length > 0) {
    await db
      .insert(faqs)
      .values(
        parsedFaqs.map((faq, i) => ({
          postId: id,
          question: faq.question,
          answer: faq.answer,
          order: i,
        })),
      );
  }

  // Replace category links
  await db.delete(postCategories).where(eq(postCategories.postId, id));
  if (parsed.categoryIds && parsed.categoryIds.length > 0) {
    await db
      .insert(postCategories)
      .values(
        parsed.categoryIds.map((categoryId) => ({ postId: id, categoryId })),
      );
  }

  // Replace tag links
  await db.delete(postTags).where(eq(postTags.postId, id));
  if (parsed.tagIds && parsed.tagIds.length > 0) {
    await db
      .insert(postTags)
      .values(parsed.tagIds.map((tagId) => ({ postId: id, tagId })));
  }

  // Replace related post links
  await db.delete(relatedPosts).where(eq(relatedPosts.postId, id));
  if (parsed.relatedPostIds && parsed.relatedPostIds.length > 0) {
    await db
      .insert(relatedPosts)
      .values(
        parsed.relatedPostIds.map((relatedPostId) => ({
          postId: id,
          relatedPostId,
        })),
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

  if (publishedPosts.length === 0) return [];

  // Single query for all post-category links instead of one query per post.
  const postIds = publishedPosts.map((p) => p.id);
  const catLinks = await db
    .select({
      postId: postCategories.postId,
      id: categories.id,
      name: categories.name,
    })
    .from(postCategories)
    .innerJoin(categories, eq(postCategories.categoryId, categories.id))
    .where(inArray(postCategories.postId, postIds));

  const catsByPostId = new Map<string, { id: string; name: string }[]>();
  for (const link of catLinks) {
    const list = catsByPostId.get(link.postId) ?? [];
    list.push({ id: link.id, name: link.name });
    catsByPostId.set(link.postId, list);
  }

  const withCategories = publishedPosts.map((post) => ({
    ...post,
    categories: catsByPostId.get(post.id) ?? [],
  }));

  return withCategories.reverse(); // newest first
}

export async function getDashboardStats() {
  const allPosts = await db
    .select({ id: posts.id, status: posts.status })
    .from(posts);
  const allUsers = await db.select({ id: users.id }).from(users);

  const totalPosts = allPosts.length;
  const published = allPosts.filter((p) => p.status === "published").length;
  const drafts = allPosts.filter((p) => p.status === "draft").length;
  const scheduled = allPosts.filter((p) => p.status === "scheduled").length;
  const totalUsers = allUsers.length;

  // Single grouped query instead of one COUNT(*) query per category.
  const categoryBreakdown = await db
    .select({
      name: categories.name,
      count: sql<number>`count(${postCategories.postId})`,
    })
    .from(categories)
    .leftJoin(postCategories, eq(postCategories.categoryId, categories.id))
    .groupBy(categories.id, categories.name)
    .having(sql`count(${postCategories.postId}) > 0`);

  return {
    totalPosts,
    published,
    drafts,
    scheduled,
    totalUsers,
    categoryBreakdown: categoryBreakdown.map((c) => ({
      name: c.name,
      count: Number(c.count),
    })),
  };
}