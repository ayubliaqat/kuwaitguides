import { getPostBySlug, getRelatedPosts } from "@/app/admin/posts/actions";
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

  const relatedPosts = await getRelatedPosts(
    post.id,
    post.categories.map((cat) => cat.id),
  );

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
      />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center flex-wrap gap-1.5 text-sm">
            <li>
              <Link href="/" className="text-brand hover:underline">
                Home
              </Link>
            </li>
            <li className="text-text-muted">/</li>
            <li>
              <Link href="/blog" className="text-brand hover:underline">
                Blog
              </Link>
            </li>
          </ol>
        </nav>

        {/* Header block */}
        <header className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <h1 className="text-[1.75rem] sm:text-3xl lg:text-4xl font-semibold text-text tracking-tight leading-tight">
            {post.title}
          </h1>

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
            className="w-full rounded-[14px] mb-8 sm:mb-10 aspect-video object-cover"
          />
        )}

        <div
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
            prose-headings:text-text prose-p:text-text prose-a:text-brand
            prose-h1:text-[1.75rem] sm:prose-h1:text-[2rem] lg:prose-h1:text-[2.25rem] prose-h1:font-semibold prose-h1:leading-[1.25] prose-h1:my-5 sm:prose-h1:my-6
            prose-h2:text-[1.5rem] sm:prose-h2:text-[1.7rem] lg:prose-h2:text-[1.875rem] prose-h2:font-semibold prose-h2:leading-[1.3] prose-h2:my-4 sm:prose-h2:my-5
            prose-h3:text-[1.25rem] sm:prose-h3:text-[1.375rem] lg:prose-h3:text-[1.5rem] prose-h3:font-semibold prose-h3:leading-[1.35] prose-h3:my-4
            prose-h4:text-[1.125rem] sm:prose-h4:text-[1.2rem] lg:prose-h4:text-[1.25rem] prose-h4:font-semibold prose-h4:leading-[1.4] prose-h4:my-3 sm:prose-h4:my-4
            prose-h5:text-[1.0625rem] lg:prose-h5:text-[1.125rem] prose-h5:font-semibold prose-h5:leading-[1.4] prose-h5:my-3
            prose-h6:text-base prose-h6:font-semibold prose-h6:leading-[1.4] prose-h6:my-3
            prose-p:leading-relaxed prose-p:my-4
            prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-li:leading-relaxed
            prose-blockquote:my-5 prose-img:my-6 prose-img:rounded-[10px]
            [&_table]:block [&_table]:w-max [&_table]:max-w-full [&_table]:overflow-x-auto md:[&_table]:table md:[&_table]:w-full md:[&_table]:overflow-visible
            [&_table]:my-6 [&_table]:border-collapse
            [&_table]:[-webkit-overflow-scrolling:touch]
            [&_th]:border [&_th]:border-border [&_th]:bg-surface [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-text [&_th]:whitespace-nowrap md:[&_th]:whitespace-normal
            [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-text [&_td]:whitespace-nowrap md:[&_td]:whitespace-normal
            [&_tr]:border-b [&_tr]:border-border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.faqs.length > 0 && (
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-5 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <div className="[&_div.faq-item]:bg-white [&_div.faq-item]:dark:bg-zinc-900/80 [&_div.faq-item]:shadow-[0_8px_20px_rgba(0,0,0,0.06)] [&_div.faq-item]:dark:shadow-[0_8px_20px_rgba(0,0,0,0.3)] [&_div.faq-item]:backdrop-blur-md [&_div.faq-item]:border [&_div.faq-item]:border-zinc-100 [&_div.faq-item]:dark:border-zinc-800 [&_div.faq-item]:rounded-xl [&_div.faq-item]:mb-3 [&_div.faq-item]:p-4 text-black dark:text-zinc-100">
              <FaqAccordion faqs={post.faqs} />
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-text mb-5 sm:mb-6">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group block rounded-[14px] overflow-hidden border border-border hover:border-brand transition"
                >
                  {related.featuredImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={related.featuredImage}
                      alt={related.featuredImageAlt || related.title}
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-sm sm:text-base font-semibold text-text group-hover:text-brand transition leading-snug">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}