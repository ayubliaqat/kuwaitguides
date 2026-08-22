"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deletePost } from "@/app/admin/posts/actions";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "scheduled";
  featuredImage: string | null;
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-yellow-100 text-yellow-700",
  scheduled: "bg-blue-100 text-blue-700",
};

export default function PostsList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await deletePost(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    router.refresh();
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-[14px] border border-dashed border-border py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
            <path d="M4 4h16v16H4z" strokeLinejoin="round" />
            <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-text font-medium mb-1">No posts yet</p>
        <p className="text-sm text-text-muted mb-5">Create your first post to get started.</p>
        <Link href="/admin/posts/new" className="inline-block rounded-[8px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition">
          + New Post
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group flex items-center gap-4 rounded-[14px] border border-border bg-white p-3 hover:border-brand/40 hover:shadow-sm transition"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-[10px] bg-surface flex-shrink-0 overflow-hidden flex items-center justify-center">
              {post.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted/40">
                  <path d="M4 4h16v16H4z" strokeLinejoin="round" />
                  <circle cx="9" cy="9" r="1.5" />
                  <path d="M4 16l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-medium text-text truncate">{post.title || "Untitled"}</h3>
                {post.isFeatured && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-brand flex-shrink-0">
                    <path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7.1L12 17.8l-6.2 3.5L7 14.2 2 9.3l7.1-.7L12 2z" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusStyles[post.status]}`}>
                  {post.status}
                </span>
                <span className="text-xs text-text-muted">
                  {new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                title="View"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-text-muted hover:bg-surface hover:text-text transition"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </Link>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                title="Edit"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-text-muted hover:bg-surface hover:text-brand transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 20h9" strokeLinecap="round" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <button
                type="button"
                title="Delete"
                onClick={() => setDeleteTarget(post)}
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-text-muted hover:bg-red-50 hover:text-red-600 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 6h18" strokeLinecap="round" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 11v6M14 11v6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-[14px] max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red-600">
                <path d="M3 6h18" strokeLinecap="round" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text mb-1">Delete post?</h3>
            <p className="text-sm text-text-muted mb-5">
              &ldquo;{deleteTarget.title || "Untitled"}&rdquo; will be permanently deleted, along with its FAQs and category/tag links. This can&apos;t be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-[8px] border border-border py-2 text-sm text-text hover:bg-surface transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 rounded-[8px] bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}