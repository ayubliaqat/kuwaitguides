"use client";

import { useState } from "react";
import slugify from "slugify";
import {
  createPost,
  createCategory,
  updatePost,
  createTag,
} from "@/app/admin/posts/actions";
import { postContentSchema } from "@/lib/validations/post";
import TiptapEditor from "./TiptapEditor";
import { analyzeSeo } from "@/lib/seo-analysis";

type Category = { id: string; name: string; slug: string };
type Tag = { id: string; name: string; slug: string };
type ExistingPost = { id: string; title: string };

const TABS = [
  { id: "content", label: "Content" },
  { id: "seo", label: "SEO" },
  { id: "social", label: "Social" },
  { id: "schema", label: "Schema & FAQ" },
  { id: "organize", label: "Organize" },
  { id: "advanced", label: "Advanced" },
];

export default function PostEditor({
  initialCategories,
  initialTags,
  existingPosts,
  postId,
  initialData,
}: {
  initialCategories: Category[];
  initialTags: Tag[];
  existingPosts: ExistingPost[];
  postId?: string;
  initialData?: Record<string, unknown>;
}) {
  const [activeTab, setActiveTab] = useState("content");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState((initialData?.title as string) || "");
  const [slug, setSlug] = useState((initialData?.slug as string) || "");
  const [slugTouched, setSlugTouched] = useState(!!initialData);
  const [excerpt, setExcerpt] = useState(
    (initialData?.excerpt as string) || "",
  );
  const [content, setContent] = useState(
    (initialData?.content as string) || "",
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    (initialData?.featuredImageAlt as string) || "",
  );
  const [featuredImagePreview, setFeaturedImagePreview] = useState<
    string | null
  >((initialData?.featuredImage as string) || null);
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">(
    (initialData?.status as "draft" | "published" | "scheduled") || "draft",
  );
  const [publishedAt, setPublishedAt] = useState(
    (initialData?.publishedAt as string) || "",
  );
  const [scheduledAt, setScheduledAt] = useState(
    (initialData?.scheduledAt as string) || "",
  );
  const [isFeatured, setIsFeatured] = useState(
    (initialData?.isFeatured as boolean) || false,
  );

  const [focusKeyphrase, setFocusKeyphrase] = useState(
    (initialData?.focusKeyphrase as string) || "",
  );
  const [seoTitle, setSeoTitle] = useState(
    (initialData?.seoTitle as string) || "",
  );
  const [metaDescription, setMetaDescription] = useState(
    (initialData?.metaDescription as string) || "",
  );
  const [seoSlug, setSeoSlug] = useState(
    (initialData?.seoSlug as string) || "",
  );
  const [canonicalUrl, setCanonicalUrl] = useState(
    (initialData?.canonicalUrl as string) || "",
  );
  const [robots, setRobots] = useState(
    (initialData?.robots as string) || "index,follow",
  );
  const [breadcrumbTitle, setBreadcrumbTitle] = useState(
    (initialData?.breadcrumbTitle as string) || "",
  );

  const [ogTitle, setOgTitle] = useState(
    (initialData?.ogTitle as string) || "",
  );
  const [ogDescription, setOgDescription] = useState(
    (initialData?.ogDescription as string) || "",
  );
  const [ogImage, setOgImage] = useState(
    (initialData?.ogImage as string) || "",
  );
  const [twitterTitle, setTwitterTitle] = useState(
    (initialData?.twitterTitle as string) || "",
  );
  const [twitterDescription, setTwitterDescription] = useState(
    (initialData?.twitterDescription as string) || "",
  );
  const [twitterImage, setTwitterImage] = useState(
    (initialData?.twitterImage as string) || "",
  );

  const [schemaType, setSchemaType] = useState(
    (initialData?.schemaType as string) || "Article",
  );
  const [faqItems, setFaqItems] = useState<
    { question: string; answer: string }[]
  >((initialData?.faqItems as { question: string; answer: string }[]) || []);

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    (initialData?.categoryIds as string[]) || [],
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    (initialData?.tagIds as string[]) || [],
  );
  const [selectedRelatedIds, setSelectedRelatedIds] = useState<string[]>(
    (initialData?.relatedPostIds as string[]) || [],
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");

  const [noindex, setNoindex] = useState(
    (initialData?.noindex as boolean) || false,
  );
  const [nofollow, setNofollow] = useState(
    (initialData?.nofollow as boolean) || false,
  );
  const [customSchema, setCustomSchema] = useState(
    (initialData?.customSchema as string) || "",
  );

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value, { lower: true, strict: true }));
  }

  async function handleImageSelect(file: File | null) {
    if (!file) {
      setFeaturedImagePreview(null);
      return;
    }

    setUploadingFeaturedImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setFeaturedImagePreview(data.url);
      }
    } finally {
      setUploadingFeaturedImage(false);
    }
  }

  function addFaqItem() {
    setFaqItems([...faqItems, { question: "", answer: "" }]);
  }
  function updateFaqItem(
    index: number,
    field: "question" | "answer",
    value: string,
  ) {
    const updated = [...faqItems];
    updated[index][field] = value;
    setFaqItems(updated);
  }
  function removeFaqItem(index: number) {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  }

  function toggleCategory(id: string) {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }
  function toggleTag(id: string) {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }
  function toggleRelated(id: string) {
    setSelectedRelatedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  }

  async function handleAddCategory() {
    if (!newCategoryName.trim()) return;
    const category = await createCategory(newCategoryName.trim());
    setCategories([...categories, category]);
    setSelectedCategoryIds([...selectedCategoryIds, category.id]);
    setNewCategoryName("");
  }

  async function handleAddTag() {
    if (!newTagName.trim()) return;
    const tag = await createTag(newTagName.trim());
    setTags([...tags, tag]);
    setSelectedTagIds([...selectedTagIds, tag.id]);
    setNewTagName("");
  }

  const seoAnalysis = analyzeSeo({
    focusKeyphrase,
    seoTitle,
    title,
    metaDescription,
    slug,
    content,
  });

  /**
   * action:
   *  - "draft"   -> always force status to "draft" (Save Draft button)
   *  - "primary" -> respect whatever the Status dropdown currently says
   *                 (draft / published / scheduled). Falls back to
   *                 "published" only if the dropdown was left on "draft"
   *                 (so a brand-new post still publishes on first click).
   */
  async function handleSave(action: "draft" | "primary") {
    setErrors({});

    const finalStatus: "draft" | "published" | "scheduled" =
      action === "draft" ? "draft" : status === "draft" ? "published" : status;

    if (finalStatus === "scheduled" && !scheduledAt) {
      setErrors({
        scheduledAt: "Pick a schedule date to schedule this post.",
      });
      setActiveTab("content");
      return;
    }

    const nextPublishedAt =
      finalStatus === "published"
        ? publishedAt || new Date().toISOString()
        : publishedAt;

    const payload = {
      title,
      slug,
      excerpt,
      content,
      featuredImageAlt,
      featuredImage: featuredImagePreview,
      status: finalStatus,
      publishedAt: nextPublishedAt,
      scheduledAt,
      isFeatured,
      focusKeyphrase,
      seoTitle,
      metaDescription,
      seoSlug,
      canonicalUrl,
      robots,
      breadcrumbTitle,
      ogTitle,
      ogDescription,
      ogImage,
      twitterTitle,
      twitterDescription,
      twitterImage,
      schemaType,
      noindex,
      nofollow,
      customSchema,
      categoryIds: selectedCategoryIds,
      tagIds: selectedTagIds,
      relatedPostIds: selectedRelatedIds,
    };

    const result = postContentSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      setActiveTab("content");
      return;
    }

    setSaving(true);
    try {
      if (postId) {
        await updatePost(
          postId,
          result.data,
          faqItems.filter((f) => f.question && f.answer),
        );
      } else {
        await createPost(
          result.data,
          faqItems.filter((f) => f.question && f.answer),
        );
      }
      // Keep local state in sync with what was actually persisted.
      setStatus(finalStatus);
      setPublishedAt(nextPublishedAt);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition";
  const labelClass = "block text-sm text-text-muted mb-1.5";

  const primaryLabel =
    status === "scheduled"
      ? "Schedule"
      : status === "draft"
        ? postId
          ? "Update"
          : "Publish"
        : postId
          ? "Update"
          : "Publish";

  const primarySavingLabel =
    status === "scheduled" ? "Scheduling…" : "Publishing…";

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          {saving ? primarySavingLabel : primaryLabel}{" "}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="rounded-[8px] border border-border px-4 py-2 text-sm text-text hover:bg-surface transition"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="rounded-[8px] border border-border px-4 py-2 text-sm text-text hover:bg-surface transition disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave("primary")}
              disabled={saving}
              className="rounded-[8px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition disabled:opacity-50"
            >
              {saving ? primarySavingLabel : primaryLabel}
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 pb-4">
  <div className="flex gap-1.5 overflow-x-auto rounded-[12px] bg-surface p-1.5">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => setActiveTab(tab.id)}
        className={`px-4 py-2 rounded-[9px] text-sm whitespace-nowrap transition-all ${
          activeTab === tab.id
            ? "bg-white text-brand font-medium shadow-sm"
            : "text-text-muted hover:text-text hover:bg-white/60"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>
      </div>

      {activeTab === "content" && (
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              className="w-full text-2xl font-semibold text-text placeholder:text-text-muted/50 outline-none border-b border-border pb-3 focus:border-brand transition"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1.5">{errors.title}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <div className="flex items-center rounded-[10px] border border-border bg-white overflow-hidden focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 transition">
              <span className="pl-4 text-sm text-text-muted">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className="flex-1 py-2.5 pr-4 text-sm text-text outline-none"
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-red-600 mt-1.5">{errors.slug}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Content</label>
            <TiptapEditor value={content} onChange={setContent} />
            {errors.content && (
              <p className="text-sm text-red-600 mt-1.5">{errors.content}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={300}
              className={inputClass + " resize-none"}
            />
            <p className="text-xs text-text-muted mt-1">{excerpt.length}/300</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Featured Image</label>
              <div className="rounded-[10px] border border-dashed border-border bg-surface aspect-video flex items-center justify-center overflow-hidden">
                {featuredImagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featuredImagePreview}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <label className="cursor-pointer text-sm text-text-muted hover:text-brand transition">
                    Click to upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageSelect(e.target.files?.[0] || null)
                      }
                    />
                  </label>
                )}
              </div>
            </div>
            <div>
              <label className={labelClass}>Alt Text</label>
              <input
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Describe the image for SEO"
                className={inputClass}
              />
            </div>
          </div>
          <div className="rounded-[14px] border border-border bg-surface p-5 space-y-4">
            <h3 className="text-sm font-medium text-text">Publish Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as typeof status)}
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              {status === "scheduled" && (
                <div>
                  <label className={labelClass}>Schedule Date</label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className={inputClass}
                  />
                  {errors.scheduledAt && (
                    <p className="text-sm text-red-600 mt-1.5">
                      {errors.scheduledAt}
                    </p>
                  )}
                </div>
              )}
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--color-brand)]"
              />
              <span className="text-sm text-text">Featured post</span>
            </label>
          </div>
        </div>
      )}

      {activeTab === "seo" && (
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Focus Keyphrase</label>
              <input
                type="text"
                value={focusKeyphrase}
                onChange={(e) => setFocusKeyphrase(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title || "Defaults to post title"}
                maxLength={70}
                className={inputClass}
              />
              <p className="text-xs text-text-muted mt-1">
                {(seoTitle || title).length}/60
              </p>
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                maxLength={170}
                className={inputClass + " resize-none"}
              />
              <p className="text-xs text-text-muted mt-1">
                {metaDescription.length}/160
              </p>
            </div>
            <div>
              <label className={labelClass}>SEO Slug</label>
              <input
                type="text"
                value={seoSlug}
                onChange={(e) => setSeoSlug(e.target.value)}
                placeholder={slug || "Defaults to post slug"}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Canonical URL</label>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Robots</label>
                <select
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                  className={inputClass}
                >
                  <option value="index,follow">Index, Follow</option>
                  <option value="noindex,follow">Noindex, Follow</option>
                  <option value="index,nofollow">Index, Nofollow</option>
                  <option value="noindex,nofollow">Noindex, Nofollow</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Breadcrumb Title</label>
              <input
                type="text"
                value={breadcrumbTitle}
                onChange={(e) => setBreadcrumbTitle(e.target.value)}
                placeholder={title || "Defaults to post title"}
                className={inputClass}
              />
            </div>
            <div className="rounded-[14px] border border-border bg-surface p-4">
              <p className="text-[11px] uppercase tracking-wide text-text-muted mb-2">
                Search preview
              </p>
              <p className="text-[#1a0dab] text-lg leading-snug truncate">
                {seoTitle || title || "Post title"}
              </p>
              <p className="text-[#006621] text-sm">
                yourdomain.com › blog › {seoSlug || slug || "post-slug"}
              </p>
              <p className="text-sm text-text-muted mt-1 line-clamp-2">
                {metaDescription || "Your meta description will appear here."}
              </p>
            </div>
          </div>
          <div>
            <div className="rounded-[14px] border border-border bg-white p-4 sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-text">SEO Score</p>
                <span
                  className={`text-sm font-semibold px-2.5 py-1 rounded-full ${seoAnalysis.score >= 80 ? "bg-green-100 text-green-700" : seoAnalysis.score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                >
                  {seoAnalysis.score}
                </span>
              </div>
              <div className="space-y-3">
                {seoAnalysis.checks.map((check, i) => (
                  <div key={i} className="flex gap-2">
                    <span
                      className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${check.status === "good" ? "bg-green-500" : check.status === "ok" ? "bg-yellow-500" : "bg-red-500"}`}
                    />
                    <div>
                      <p className="text-xs font-medium text-text">
                        {check.label}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {check.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "social" && (
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <div>
            <h3 className="text-sm font-medium text-text mb-4">
              Open Graph{" "}
              <span className="text-text-muted font-normal">
                (Facebook, LinkedIn, etc.)
              </span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>OG Title</label>
                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    placeholder={seoTitle || title || "Defaults to SEO title"}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>OG Description</label>
                  <textarea
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value)}
                    rows={2}
                    placeholder={
                      metaDescription ||
                      excerpt ||
                      "Defaults to meta description"
                    }
                    className={inputClass + " resize-none"}
                  />
                </div>
                <div>
                  <label className={labelClass}>OG Image URL</label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder={
                      featuredImagePreview
                        ? "Defaults to featured image"
                        : "https://..."
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="rounded-[14px] border border-border overflow-hidden bg-white">
                <div className="aspect-[1.91/1] bg-surface flex items-center justify-center overflow-hidden">
                  {ogImage || featuredImagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ogImage || featuredImagePreview || ""}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-text-muted">No image</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[10px] uppercase text-text-muted mb-1">
                    yourdomain.com
                  </p>
                  <p className="text-sm font-medium text-text truncate">
                    {ogTitle || seoTitle || title || "Post title"}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                    {ogDescription ||
                      metaDescription ||
                      excerpt ||
                      "Description preview"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border" />
          <div>
            <h3 className="text-sm font-medium text-text mb-4">Twitter / X</h3>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Twitter Title</label>
                  <input
                    type="text"
                    value={twitterTitle}
                    onChange={(e) => setTwitterTitle(e.target.value)}
                    placeholder={
                      ogTitle || seoTitle || title || "Defaults to OG title"
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Twitter Description</label>
                  <textarea
                    value={twitterDescription}
                    onChange={(e) => setTwitterDescription(e.target.value)}
                    rows={2}
                    placeholder={
                      ogDescription ||
                      metaDescription ||
                      "Defaults to OG description"
                    }
                    className={inputClass + " resize-none"}
                  />
                </div>
                <div>
                  <label className={labelClass}>Twitter Image URL</label>
                  <input
                    type="text"
                    value={twitterImage}
                    onChange={(e) => setTwitterImage(e.target.value)}
                    placeholder={
                      ogImage || featuredImagePreview
                        ? "Defaults to OG image"
                        : "https://..."
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="rounded-[14px] border border-border overflow-hidden bg-white">
                <div className="aspect-[1.91/1] bg-surface flex items-center justify-center overflow-hidden">
                  {twitterImage || ogImage || featuredImagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        twitterImage || ogImage || featuredImagePreview || ""
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-text-muted">No image</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-text truncate">
                    {twitterTitle ||
                      ogTitle ||
                      seoTitle ||
                      title ||
                      "Post title"}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                    {twitterDescription ||
                      ogDescription ||
                      metaDescription ||
                      "Description preview"}
                  </p>
                  <p className="text-[10px] text-text-muted mt-1">
                    yourdomain.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "schema" && (
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <div>
            <h3 className="text-sm font-medium text-text mb-4">
              Schema Markup
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              <div>
                <label className={labelClass}>Schema Type</label>
                <select
                  value={schemaType}
                  onChange={(e) => setSchemaType(e.target.value)}
                  className={inputClass}
                >
                  <option value="Article">Article</option>
                  <option value="BlogPosting">Blog Posting</option>
                  <option value="NewsArticle">News Article</option>
                </select>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  {faqItems.length > 0 &&
                    "An FAQPage schema will also be added automatically from your FAQ entries below."}
                </p>
              </div>
              <div className="rounded-[14px] border border-border bg-surface p-4">
                <p className="text-[11px] uppercase tracking-wide text-text-muted mb-2">
                  Generated schema preview
                </p>
                <pre className="text-[10px] text-text-muted whitespace-pre-wrap break-all leading-relaxed">
                  {JSON.stringify(
                    {
                      "@context": "https://schema.org",
                      "@type": schemaType,
                      headline: seoTitle || title || "Post title",
                      description: metaDescription || excerpt || "",
                      image: ogImage || featuredImagePreview || "",
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </div>
          <div className="border-t border-border" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-text">FAQ</h3>
              <button
                type="button"
                onClick={addFaqItem}
                className="text-sm text-brand hover:text-brand-dark transition font-medium"
              >
                + Add question
              </button>
            </div>
            {faqItems.length === 0 ? (
              <p className="text-sm text-text-muted rounded-[10px] border border-dashed border-border p-6 text-center">
                No FAQ items yet. Add one to generate FAQ schema automatically.
              </p>
            ) : (
              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-[14px] border border-border bg-surface p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-muted">
                        Question {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFaqItem(i)}
                        className="text-xs text-red-600 hover:text-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) =>
                        updateFaqItem(i, "question", e.target.value)
                      }
                      placeholder="Question"
                      className={inputClass}
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) =>
                        updateFaqItem(i, "answer", e.target.value)
                      }
                      placeholder="Answer"
                      rows={2}
                      className={inputClass + " resize-none"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "organize" && (
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <div>
            <h3 className="text-sm font-medium text-text mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${selectedCategoryIds.includes(cat.id) ? "bg-brand text-white border-brand" : "border-border text-text hover:bg-surface"}`}
                >
                  {cat.name}
                </button>
              ))}
              {categories.length === 0 && (
                <p className="text-sm text-text-muted">
                  No categories yet — add your first one below.
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                className={inputClass + " flex-1"}
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="rounded-[10px] bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark transition whitespace-nowrap"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="text-sm font-medium text-text mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${selectedTagIds.includes(tag.id) ? "bg-brand text-white border-brand" : "border-border text-text hover:bg-surface"}`}
                >
                  {tag.name}
                </button>
              ))}
              {tags.length === 0 && (
                <p className="text-sm text-text-muted">
                  No tags yet — add your first one below.
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New tag name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className={inputClass + " flex-1"}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="rounded-[10px] bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark transition whitespace-nowrap"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="text-sm font-medium text-text mb-4">
              Related Posts
            </h3>
            {existingPosts.length === 0 ? (
              <p className="text-sm text-text-muted">
                No other posts published yet to relate to.
              </p>
            ) : (
              <div className="space-y-2">
                {existingPosts.map((post) => (
                  <label
                    key={post.id}
                    className="flex items-center gap-2.5 cursor-pointer rounded-[10px] border border-border px-4 py-2.5 hover:bg-surface transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRelatedIds.includes(post.id)}
                      onChange={() => toggleRelated(post.id)}
                      className="w-4 h-4 rounded accent-[var(--color-brand)]"
                    />
                    <span className="text-sm text-text">{post.title}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "advanced" && (
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          <div className="rounded-[14px] border border-border bg-surface p-5 space-y-4">
            <h3 className="text-sm font-medium text-text">Indexing</h3>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={noindex}
                onChange={(e) => setNoindex(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--color-brand)]"
              />
              <span className="text-sm text-text">
                Noindex (hide from search engines)
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={nofollow}
                onChange={(e) => setNofollow(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--color-brand)]"
              />
              <span className="text-sm text-text">
                Nofollow (don&apos;t pass link authority)
              </span>
            </label>
          </div>
          <div>
            <label className={labelClass}>
              Custom Schema Override (raw JSON-LD)
            </label>
            <textarea
              value={customSchema}
              onChange={(e) => setCustomSchema(e.target.value)}
              rows={8}
              placeholder='{ "@context": "https://schema.org", ... }'
              className={inputClass + " font-mono text-xs resize-none"}
            />
            <p className="text-xs text-text-muted mt-2">
              Optional — overrides the auto-generated schema from the Schema tab
              if filled in.
            </p>
          </div>
        </div>
      )}

      {showPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto py-10 px-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white rounded-[14px] max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-wide text-text-muted">
                Preview
              </span>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="text-text-muted hover:text-text transition text-sm"
              >
                Close
              </button>
            </div>
            {featuredImagePreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featuredImagePreview}
                alt=""
                className="w-full rounded-[10px] mb-6 aspect-video object-cover"
              />
            )}
            <h1 className="text-3xl font-semibold text-text mb-3">
              {title || "Untitled post"}
            </h1>
            {excerpt && <p className="text-text-muted mb-6">{excerpt}</p>}
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: content || "<p>No content yet.</p>",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}