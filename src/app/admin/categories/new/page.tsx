"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await createCategory(name);
      router.push("/admin/categories");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-6 py-5">
          <h1 className="text-xl font-semibold text-text">Add Category</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="rounded-[14px] border border-border bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-text-muted mb-1.5">
                Category name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Travel Tips"
                required
                className="w-full rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-[10px] bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Category"}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-text-muted hover:text-text transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}