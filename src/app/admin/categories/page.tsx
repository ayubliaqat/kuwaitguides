import Link from "next/link";
import { getCategories } from "./actions";
import CategoriesList from "./CategoriesList";

export default async function AdminCategoriesPage() {
  const categoryList = await getCategories();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text">Categories</h1>

          <Link
            href="/admin/categories/new"
            className="rounded-[10px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition"
          >
            Add Category
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <CategoriesList categories={categoryList} />
      </div>
    </div>
  );
}