"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCategory } from "./actions";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function CategoriesList({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await deleteCategory(deleteTarget.id);
      setDeleteTarget(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setDeleting(false);
    }
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-[14px] border border-dashed border-border py-20 text-center">
        <p className="text-text font-medium mb-1">No categories yet</p>
        <p className="text-sm text-text-muted">
          Categories help organize your posts. Add your first one to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[14px] border border-border bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/60">
              <th className="text-left font-medium text-text-muted px-4 py-3">Name</th>
              <th className="text-left font-medium text-text-muted px-4 py-3">Slug</th>
              <th className="text-right font-medium text-text-muted px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b border-border last:border-0 hover:bg-surface/40 transition"
              >
                <td className="px-4 py-3.5 text-text font-medium">{cat.name}</td>
                <td className="px-4 py-3.5 text-text-muted">{cat.slug}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(cat)}
                      title="Delete"
                      className="w-8 h-8 rounded-[8px] flex items-center justify-center text-text-muted hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
          onClick={() => {
            if (!deleting) setDeleteTarget(null);
          }}
        >
          <div
            className="bg-white rounded-[14px] max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-text mb-1">Delete category?</h3>

            <p className="text-sm text-text-muted mb-5">
              &ldquo;{deleteTarget.name}&rdquo; will be permanently deleted and removed
              from any posts using it.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-[8px] border border-border py-2 text-sm text-text hover:bg-surface transition disabled:opacity-50"
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