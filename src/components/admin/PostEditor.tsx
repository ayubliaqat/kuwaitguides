"use client";

import { useRef, useState } from "react";
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

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Tag = {
  id: string;
  name: string;
  slug: string;
};

type ExistingPost = {
  id: string;
  title: string;
};

const TABS = [
  { id: "content", label: "Content" },
  { id: "seo", label: "SEO" },
  { id: "social", label: "Social" },
  { id: "schema", label: "Schema & FAQ" },
  { id: "organize", label: "Organize" },
  { id: "advanced", label: "Advanced" },
];

function CategoryDropdown({
  categories,
  selectedIds,
  onChange,
}: {
  categories: Category[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(selectedIds);
  const ref = useRef<HTMLDivElement>(null);

  function handleOpen() {
    setDraft(selectedIds);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function toggleDraft(id: string) {
    setDraft((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id],
    );
  }

  function handleApply() {
    onChange(draft);
    setOpen(false);
  }

  const selectedNames = categories
    .filter((category) => selectedIds.includes(category.id))
    .map((category) => category.name);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={open ? handleClose : handleOpen}
        className="flex w-full items-center justify-between rounded-[10px] border border-border bg-white px-4 py-2.5 text-left text-sm text-text outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
      >
        <span
          className={
            selectedNames.length ? "text-text" : "text-text-muted"
          }
        >
          {selectedNames.length
            ? selectedNames.join(", ")
            : "Select categories"}
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`flex-shrink-0 text-text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-[12px] border border-border bg-white shadow-lg">
          <div className="max-h-56 overflow-y-auto py-2">
            {categories.length === 0 ? (
              <p className="px-4 py-3 text-sm text-text-muted">
                No categories yet.
              </p>
            ) : (
              categories.map((category) => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center gap-2.5 px-4 py-2 text-sm text-text transition hover:bg-surface"
                >
                  <input
                    type="checkbox"
                    checked={draft.includes(category.id)}
                    onChange={() => toggleDraft(category.id)}
                    className="h-4 w-4 rounded accent-[var(--color-brand)]"
                  />
                  {category.name}
                </label>
              ))
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border px-3 py-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-[8px] px-3 py-1.5 text-sm text-text-muted transition hover:bg-surface"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="rounded-[8px] bg-brand px-4 py-1.5 text-sm font-medium text-white transition hover:bg-brand-dark"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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

  const [title, setTitle] = useState(
    (initialData?.title as string) || "",
  );

  const [slug, setSlug] = useState(
    (initialData?.slug as string) || "",
  );

  const [slugTouched, setSlugTouched] = useState(
    Boolean(initialData?.slug),
  );

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

  const [uploadingFeaturedImage, setUploadingFeaturedImage] =
    useState(false);

  const [status, setStatus] = useState<
    "draft" | "published" | "scheduled"
  >(
    (initialData?.status as
      | "draft"
      | "published"
      | "scheduled") || "draft",
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
  >(
    (initialData?.faqItems as {
      question: string;
      answer: string;
    }[]) || [],
  );

  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [tags, setTags] = useState<Tag[]>(initialTags);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<
    string[]
  >((initialData?.categoryIds as string[]) || []);

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    (initialData?.tagIds as string[]) || [],
  );

  const [selectedRelatedIds, setSelectedRelatedIds] = useState<
    string[]
  >((initialData?.relatedPostIds as string[]) || []);

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

    if (!slugTouched) {
      setSlug(
        slugify(value, {
          lower: true,
          strict: true,
        }),
      );
    }
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
    setFaqItems((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
      },
    ]);
  }

  function updateFaqItem(
    index: number,
    field: "question" | "answer",
    value: string,
  ) {
    setFaqItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  }

  function removeFaqItem(index: number) {
    setFaqItems((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleCategory(id: string) {
    setSelectedCategoryIds((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id],
    );
  }

  function toggleTag(id: string) {
    setSelectedTagIds((prev) =>
      prev.includes(id)
        ? prev.filter((tagId) => tagId !== id)
        : [...prev, id],
    );
  }

  function toggleRelated(id: string) {
    setSelectedRelatedIds((prev) =>
      prev.includes(id)
        ? prev.filter((postId) => postId !== id)
        : [...prev, id],
    );
  }

  async function handleAddCategory() {
    if (!newCategoryName.trim()) return;

    const category = await createCategory(newCategoryName.trim());

    setCategories((prev) => [...prev, category]);

    setSelectedCategoryIds((prev) => [...prev, category.id]);

    setNewCategoryName("");
  }

  async function handleAddTag() {
    if (!newTagName.trim()) return;

    const tag = await createTag(newTagName.trim());

    setTags((prev) => [...prev, tag]);

    setSelectedTagIds((prev) => [...prev, tag.id]);

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

  async function handleSave(action: "draft" | "primary") {
    setErrors({});

    const finalStatus: "draft" | "published" | "scheduled" =
      action === "draft"
        ? "draft"
        : status === "draft"
          ? "published"
          : status;

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
        const field = issue.path[0];

        if (typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      setActiveTab("content");

      return;
    }

    setSaving(true);

    try {
      const cleanFaqItems = faqItems.filter(
        (faq) => faq.question.trim() && faq.answer.trim(),
      );

      if (postId) {
        await updatePost(postId, result.data, cleanFaqItems);
      } else {
        await createPost(result.data, cleanFaqItems);
      }

      setStatus(finalStatus);
      setPublishedAt(nextPublishedAt);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition";

  const labelClass =
    "block text-sm text-text-muted mb-1.5";

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
    status === "scheduled"
      ? "Scheduling..."
      : "Publishing...";

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="text-sm font-medium text-text">
            {saving ? primarySavingLabel : primaryLabel}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="rounded-[8px] border border-border px-4 py-2 text-sm text-text transition hover:bg-surface"
            >
              Preview
            </button>

            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="rounded-[8px] border border-border px-4 py-2 text-sm text-text transition hover:bg-surface disabled:opacity-50"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => handleSave("primary")}
              disabled={saving}
              className="rounded-[8px] bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-dark disabled:opacity-50"
            >
              {saving ? primarySavingLabel : primaryLabel}
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-4">
          <div className="flex gap-1.5 overflow-x-auto rounded-[12px] bg-surface p-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-[9px] px-4 py-2 text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-white font-medium text-brand shadow-sm"
                    : "text-text-muted hover:bg-white/60 hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "content" && (
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              className="w-full border-b border-border pb-3 text-2xl font-semibold text-text outline-none transition placeholder:text-text-muted/50 focus:border-brand"
            />

            {errors.title && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Slug</label>

            <div className="flex items-center overflow-hidden rounded-[10px] border border-border bg-white transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
              <span className="pl-4 text-sm text-text-muted">
                /blog/
              </span>

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
              <p className="mt-1.5 text-sm text-red-600">
                {errors.slug}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Content</label>

            <TiptapEditor
              value={content}
              onChange={setContent}
            />

            {errors.content && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.content}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>

            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={300}
              className={`${inputClass} resize-none`}
            />

            <p className="mt-1 text-xs text-text-muted">
              {excerpt.length}/300
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Featured Image
              </label>

              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[10px] border border-dashed border-border bg-surface">
                {featuredImagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featuredImagePreview}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : uploadingFeaturedImage ? (
                  <span className="text-sm text-text-muted">
                    Uploading...
                  </span>
                ) : (
                  <label className="cursor-pointer text-sm text-text-muted transition hover:text-brand">
                    Click to upload

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageSelect(
                          e.target.files?.[0] || null,
                        )
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
                onChange={(e) =>
                  setFeaturedImageAlt(e.target.value)
                }
                placeholder="Describe the image for SEO"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-4 rounded-[14px] border border-border bg-surface p-5">
            <h3 className="text-sm font-medium text-text">
              Publish Settings
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Status</label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as typeof status,
                    )
                  }
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">
                    Published
                  </option>
                  <option value="scheduled">
                    Scheduled
                  </option>
                </select>
              </div>

              {status === "scheduled" && (
                <div>
                  <label className={labelClass}>
                    Schedule Date
                  </label>

                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) =>
                      setScheduledAt(e.target.value)
                    }
                    className={inputClass}
                  />

                  {errors.scheduledAt && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.scheduledAt}
                    </p>
                  )}
                </div>
              )}
            </div>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) =>
                  setIsFeatured(e.target.checked)
                }
                className="h-4 w-4 rounded accent-[var(--color-brand)]"
              />

              <span className="text-sm text-text">
                Featured post
              </span>
            </label>
          </div>
        </div>
      )}

      {activeTab === "seo" && (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-5">
            <div>
              <label className={labelClass}>
                Focus Keyphrase
              </label>

              <input
                type="text"
                value={focusKeyphrase}
                onChange={(e) =>
                  setFocusKeyphrase(e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                SEO Title
              </label>

              <input
                type="text"
                value={seoTitle}
                onChange={(e) =>
                  setSeoTitle(e.target.value)
                }
                placeholder={title || "Defaults to post title"}
                maxLength={70}
                className={inputClass}
              />

              <p className="mt-1 text-xs text-text-muted">
                {(seoTitle || title).length}/60
              </p>
            </div>

            <div>
              <label className={labelClass}>
                Meta Description
              </label>

              <textarea
                value={metaDescription}
                onChange={(e) =>
                  setMetaDescription(e.target.value)
                }
                rows={3}
                maxLength={170}
                className={`${inputClass} resize-none`}
              />

              <p className="mt-1 text-xs text-text-muted">
                {metaDescription.length}/160
              </p>
            </div>

            <div>
              <label className={labelClass}>
                SEO Slug
              </label>

              <input
                type="text"
                value={seoSlug}
                onChange={(e) =>
                  setSeoSlug(e.target.value)
                }
                placeholder={slug || "Defaults to post slug"}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Canonical URL
                </label>

                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) =>
                    setCanonicalUrl(e.target.value)
                  }
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Robots
                </label>

                <select
                  value={robots}
                  onChange={(e) =>
                    setRobots(e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="index,follow">
                    Index, Follow
                  </option>
                  <option value="noindex,follow">
                    Noindex, Follow
                  </option>
                  <option value="index,nofollow">
                    Index, Nofollow
                  </option>
                  <option value="noindex,nofollow">
                    Noindex, Nofollow
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Breadcrumb Title
              </label>

              <input
                type="text"
                value={breadcrumbTitle}
                onChange={(e) =>
                  setBreadcrumbTitle(e.target.value)
                }
                placeholder={title || "Defaults to post title"}
                className={inputClass}
              />
            </div>

            <div className="rounded-[14px] border border-border bg-surface p-4">
              <p className="mb-2 text-[11px] uppercase tracking-wide text-text-muted">
                Search preview
              </p>

              <p className="truncate text-lg leading-snug text-[#1a0dab]">
                {seoTitle || title || "Post title"}
              </p>

              <p className="text-sm text-[#006621]">
                yourdomain.com › blog ›{" "}
                {seoSlug || slug || "post-slug"}
              </p>

              <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                {metaDescription ||
                  "Your meta description will appear here."}
              </p>
            </div>
          </div>

          <div>
            <div className="sticky top-32 rounded-[14px] border border-border bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-text">
                  SEO Score
                </p>

                <span
                  className={`rounded-full px-2.5 py-1 text-sm font-semibold ${
                    seoAnalysis.score >= 80
                      ? "bg-green-100 text-green-700"
                      : seoAnalysis.score >= 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {seoAnalysis.score}
                </span>
              </div>

              <div className="space-y-3">
                {seoAnalysis.checks.map((check, index) => (
                  <div key={index} className="flex gap-2">
                    <span
                      className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                        check.status === "good"
                          ? "bg-green-500"
                          : check.status === "ok"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />

                    <div>
                      <p className="text-xs font-medium text-text">
                        {check.label}
                      </p>

                      <p className="mt-0.5 text-xs text-text-muted">
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
        <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
          <div>
            <h3 className="mb-4 text-sm font-medium text-text">
              Open Graph{" "}
              <span className="font-normal text-text-muted">
                (Facebook, LinkedIn, etc.)
              </span>
            </h3>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    OG Title
                  </label>

                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) =>
                      setOgTitle(e.target.value)
                    }
                    placeholder={
                      seoTitle ||
                      title ||
                      "Defaults to SEO title"
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    OG Description
                  </label>

                  <textarea
                    value={ogDescription}
                    onChange={(e) =>
                      setOgDescription(e.target.value)
                    }
                    rows={2}
                    placeholder={
                      metaDescription ||
                      excerpt ||
                      "Defaults to meta description"
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    OG Image URL
                  </label>

                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) =>
                      setOgImage(e.target.value)
                    }
                    placeholder={
                      featuredImagePreview
                        ? "Defaults to featured image"
                        : "https://..."
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-[14px] border border-border bg-white">
                <div className="flex aspect-[1.91/1] items-center justify-center overflow-hidden bg-surface">
                  {ogImage || featuredImagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        ogImage ||
                        featuredImagePreview ||
                        ""
                      }
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-text-muted">
                      No image
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <p className="mb-1 text-[10px] uppercase text-text-muted">
                    yourdomain.com
                  </p>

                  <p className="truncate text-sm font-medium text-text">
                    {ogTitle ||
                      seoTitle ||
                      title ||
                      "Post title"}
                  </p>

                  <p className="mt-0.5 line-clamp-2 text-xs text-text-muted">
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
            <h3 className="mb-4 text-sm font-medium text-text">
              Twitter / X
            </h3>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Twitter Title
                  </label>

                  <input
                    type="text"
                    value={twitterTitle}
                    onChange={(e) =>
                      setTwitterTitle(e.target.value)
                    }
                    placeholder={
                      ogTitle ||
                      seoTitle ||
                      title ||
                      "Defaults to OG title"
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Twitter Description
                  </label>

                  <textarea
                    value={twitterDescription}
                    onChange={(e) =>
                      setTwitterDescription(e.target.value)
                    }
                    rows={2}
                    placeholder={
                      ogDescription ||
                      metaDescription ||
                      "Defaults to OG description"
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Twitter Image URL
                  </label>

                  <input
                    type="text"
                    value={twitterImage}
                    onChange={(e) =>
                      setTwitterImage(e.target.value)
                    }
                    placeholder={
                      ogImage || featuredImagePreview
                        ? "Defaults to OG image"
                        : "https://..."
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-[14px] border border-border bg-white">
                <div className="flex aspect-[1.91/1] items-center justify-center overflow-hidden bg-surface">
                  {twitterImage ||
                  ogImage ||
                  featuredImagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        twitterImage ||
                        ogImage ||
                        featuredImagePreview ||
                        ""
                      }
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-text-muted">
                      No image
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <p className="truncate text-sm font-medium text-text">
                    {twitterTitle ||
                      ogTitle ||
                      seoTitle ||
                      title ||
                      "Post title"}
                  </p>

                  <p className="mt-0.5 line-clamp-2 text-xs text-text-muted">
                    {twitterDescription ||
                      ogDescription ||
                      metaDescription ||
                      "Description preview"}
                  </p>

                  <p className="mt-1 text-[10px] text-text-muted">
                    yourdomain.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "schema" && (
        <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
          <div>
            <h3 className="mb-4 text-sm font-medium text-text">
              Schema Markup
            </h3>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
              <div>
                <label className={labelClass}>
                  Schema Type
                </label>

                <select
                  value={schemaType}
                  onChange={(e) =>
                    setSchemaType(e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="Article">Article</option>
                  <option value="BlogPosting">
                    Blog Posting
                  </option>
                  <option value="NewsArticle">
                    News Article
                  </option>
                </select>

                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {faqItems.length > 0 &&
                    "An FAQPage schema will also be added automatically from your FAQ entries below."}
                </p>
              </div>

              <div className="rounded-[14px] border border-border bg-surface p-4">
                <p className="mb-2 text-[11px] uppercase tracking-wide text-text-muted">
                  Generated schema preview
                </p>

                <pre className="whitespace-pre-wrap break-all text-[10px] leading-relaxed text-text-muted">
                  {JSON.stringify(
                    {
                      "@context": "https://schema.org",
                      "@type": schemaType,
                      headline:
                        seoTitle ||
                        title ||
                        "Post title",
                      description:
                        metaDescription ||
                        excerpt ||
                        "",
                      image:
                        ogImage ||
                        featuredImagePreview ||
                        "",
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
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-text">
                FAQ
              </h3>

              <button
                type="button"
                onClick={addFaqItem}
                className="font-medium text-sm text-brand transition hover:text-brand-dark"
              >
                + Add question
              </button>
            </div>

            {faqItems.length === 0 ? (
              <p className="rounded-[10px] border border-dashed border-border p-6 text-center text-sm text-text-muted">
                No FAQ items yet. Add one to generate FAQ
                schema automatically.
              </p>
            ) : (
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-[14px] border border-border bg-surface p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-muted">
                        Question {index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeFaqItem(index)
                        }
                        className="text-xs text-red-600 transition hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) =>
                        updateFaqItem(
                          index,
                          "question",
                          e.target.value,
                        )
                      }
                      placeholder="Question"
                      className={inputClass}
                    />

                    <textarea
                      value={item.answer}
                      onChange={(e) =>
                        updateFaqItem(
                          index,
                          "answer",
                          e.target.value,
                        )
                      }
                      placeholder="Answer"
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "organize" && (
        <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
          <div>
            <h3 className="mb-4 text-sm font-medium text-text">
              Categories
            </h3>

            <CategoryDropdown
              categories={categories}
              selectedIds={selectedCategoryIds}
              onChange={setSelectedCategoryIds}
            />

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) =>
                  setNewCategoryName(e.target.value)
                }
                placeholder="New category name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                className={`${inputClass} flex-1`}
              />

              <button
                type="button"
                onClick={handleAddCategory}
                className="whitespace-nowrap rounded-[10px] bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="mb-4 text-sm font-medium text-text">
              Tags
            </h3>

            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    selectedTagIds.includes(tag.id)
                      ? "border-brand bg-brand text-white"
                      : "border-border text-text hover:bg-surface"
                  }`}
                >
                  {tag.name}
                </button>
              ))}

              {tags.length === 0 && (
                <p className="text-sm text-text-muted">
                  No tags yet. Add your first one below.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) =>
                  setNewTagName(e.target.value)
                }
                placeholder="New tag name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className={`${inputClass} flex-1`}
              />

              <button
                type="button"
                onClick={handleAddTag}
                className="whitespace-nowrap rounded-[10px] bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="mb-4 text-sm font-medium text-text">
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
                    className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-border px-4 py-2.5 transition hover:bg-surface"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRelatedIds.includes(
                        post.id,
                      )}
                      onChange={() =>
                        toggleRelated(post.id)
                      }
                      className="h-4 w-4 rounded accent-[var(--color-brand)]"
                    />

                    <span className="text-sm text-text">
                      {post.title}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "advanced" && (
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
          <div className="space-y-4 rounded-[14px] border border-border bg-surface p-5">
            <h3 className="text-sm font-medium text-text">
              Indexing
            </h3>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={noindex}
                onChange={(e) =>
                  setNoindex(e.target.checked)
                }
                className="h-4 w-4 rounded accent-[var(--color-brand)]"
              />

              <span className="text-sm text-text">
                Noindex (hide from search engines)
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={nofollow}
                onChange={(e) =>
                  setNofollow(e.target.checked)
                }
                className="h-4 w-4 rounded accent-[var(--color-brand)]"
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
              onChange={(e) =>
                setCustomSchema(e.target.value)
              }
              rows={8}
              placeholder='{ "@context": "https://schema.org", ... }'
              className={`${inputClass} resize-none font-mono text-xs`}
            />

            <p className="mt-2 text-xs text-text-muted">
              Optional. Overrides the auto-generated schema
              from the Schema tab if filled in.
            </p>
          </div>
        </div>
      )}

      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="w-full max-w-2xl rounded-[14px] bg-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-text-muted">
                Preview
              </span>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="text-sm text-text-muted transition hover:text-text"
              >
                Close
              </button>
            </div>

            {featuredImagePreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featuredImagePreview}
                alt=""
                className="mb-6 aspect-video w-full rounded-[10px] object-cover"
              />
            )}

            <h1 className="mb-3 text-3xl font-semibold text-text">
              {title || "Untitled post"}
            </h1>

            {excerpt && (
              <p className="mb-6 text-text-muted">
                {excerpt}
              </p>
            )}

            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  content || "<p>No content yet.</p>",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}