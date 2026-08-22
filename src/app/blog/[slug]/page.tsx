import { getPostBySlug } from "@/app/admin/posts/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion from "@/components/blog/FaqAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.excerpt || undefined;

  return {
    title,
    description,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    robots: post.robots || undefined,
    openGraph: {
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      images: post.ogImage || post.featuredImage ? [post.ogImage || post.featuredImage!] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.twitterTitle || post.ogTitle || title,
      description: post.twitterDescription || post.ogDescription || description,
      images: post.twitterImage || post.ogImage || post.featuredImage
        ? [post.twitterImage || post.ogImage || post.featuredImage!]
        : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "Article",
    headline: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
    image: post.ogImage || post.featuredImage || "",
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
  };

  // Guard against malformed custom schema JSON crashing the page for visitors
  let finalSchema = articleSchema;
  if (post.customSchema) {
    try {
      finalSchema = JSON.parse(post.customSchema);
    } catch {
      finalSchema = articleSchema;
    }
  }

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const publishedLabel = new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = post.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
      />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Back to blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand transition mb-8"
        >
          ← Back to blog
        </Link>

        {/* Header block — consistent vertical rhythm */}
        <header className="space-y-4 mb-10">
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs font-medium text-brand bg-brand/10 px-2.5 py-1 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-semibold text-text tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-text-muted leading-relaxed">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-2 text-sm text-text-muted pt-1">
            <span>{publishedLabel}</span>
            <span className="w-1 h-1 rounded-full bg-text-muted/40" />
            <span>{readingMinutes} min read</span>
          </div>
        </header>

        {post.featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            className="w-full rounded-[14px] mb-10 aspect-video object-cover"
          />
        )}

        <div
          className="prose prose-lg max-w-none
            prose-headings:text-text prose-p:text-text prose-a:text-brand
            prose-h1:text-[2.25rem] prose-h1:font-semibold prose-h1:leading-[1.2] prose-h1:my-6
            prose-h2:text-[1.875rem] prose-h2:font-semibold prose-h2:leading-[1.3] prose-h2:my-5
            prose-h3:text-[1.5rem] prose-h3:font-semibold prose-h3:leading-[1.35] prose-h3:my-4
            prose-h4:text-[1.25rem] prose-h4:font-semibold prose-h4:leading-[1.4] prose-h4:my-4
            prose-h5:text-[1.125rem] prose-h5:font-semibold prose-h5:leading-[1.4] prose-h5:my-3
            prose-h6:text-[1rem] prose-h6:font-semibold prose-h6:leading-[1.4] prose-h6:my-3
            prose-p:leading-relaxed prose-p:my-4
            prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-li:leading-relaxed
            prose-blockquote:my-5 prose-img:my-6 prose-img:rounded-[10px]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-medium text-brand bg-brand/10 px-2.5 py-1 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

       {post.faqs.length > 0 && (
  <div className="mt-14 pt-10 border-t border-border">
    <h2 className="text-2xl font-semibold text-text mb-6">Frequently Asked Questions</h2>
    <FaqAccordion faqs={post.faqs} />
  </div>
)}
      </article>
    </div>
  );
}