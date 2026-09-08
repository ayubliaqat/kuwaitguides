"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Post = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  categories?: { name: string }[];
};

type BlogGridProps = {
  posts?: Post[];
  initialSearch?: string;
  initialCategory?: string;
};

export default function BlogGrid({
  posts = [],
  initialSearch = "",
  initialCategory = "All",
}: BlogGridProps) {
  const [query, setQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [visibleCount, setVisibleCount] = useState(12);

  const categoryTabs = useMemo(() => {
    const safePosts = posts ?? [];
    const names = new Set<string>();
    safePosts.forEach((post) => {
      (post.categories ?? []).forEach((c) => names.add(c.name));
    });
    return ["All", ...Array.from(names).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const safePosts = posts ?? [];
    const q = query.trim().toLowerCase();

    return safePosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        (post.categories ?? []).some(
          (c) => c.name.toLowerCase() === activeCategory.toLowerCase()
        );

      if (!matchesCategory) return false;
      if (!q) return true;

      const haystack = [
        post.title,
        post.excerpt ?? "",
        ...(post.categories ?? []).map((c) => c.name),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [posts, query, activeCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(12);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setVisibleCount(12);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Category tabs */}
      <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 mb-8 sm:mb-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categoryTabs.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-zinc-600 border-blue-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search bar */}
      <div className="w-full sm:w-80 mx-auto mb-10 sm:mb-12">
        <div className="relative">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search by title, category, or keyword..."
            className="w-full rounded-xl border-2 border-blue-400 bg-white pl-10 pr-9 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_4px_15px_rgba(37,99,235,0.08)] transition"
          />

          {query && (
            <button
              onClick={() => handleQueryChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {(query || activeCategory !== "All") && (
          <p className="text-xs text-zinc-500 mt-2 px-1 text-center sm:text-left">
            {filteredPosts.length === 0
              ? `No results${query ? ` for "${query}"` : ""}${
                  activeCategory !== "All" ? ` in ${activeCategory}` : ""
                }`
              : `${filteredPosts.length} result${filteredPosts.length === 1 ? "" : "s"}${
                  query ? ` for "${query}"` : ""
                }${activeCategory !== "All" ? ` in ${activeCategory}` : ""}`}
          </p>
        )}
      </div>

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-zinc-500 py-16 sm:py-20 text-sm sm:text-base">
          {query
            ? "Try a different word, like a neighborhood, cuisine, or vibe."
            : "No posts published yet — check back soon."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl border-2 border-blue-400 bg-white overflow-hidden shadow-[0_10px_25px_rgba(37,99,235,0.12)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.2)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-[4/3] bg-blue-50 overflow-hidden">
                  {post.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-300">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        className="sm:w-8 sm:h-8"
                      >
                        <path d="M4 4h16v16H4z" strokeLinejoin="round" />
                        <circle cx="9" cy="9" r="1.5" />
                        <path
                          d="M4 16l5-5 4 4 3-3 4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {post.categories && post.categories.length > 0 && (
                    <span className="inline-block self-start px-2.5 py-0.5 mb-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 rounded-full border border-blue-200">
                      {post.categories[0].name}
                    </span>
                  )}

                  <h2 className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto flex items-center justify-center text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl px-3.5 sm:px-4 py-2.5 w-full shadow-sm"
                  >
                    Read Blog &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10 sm:mt-12">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + 12)}
                className="inline-flex items-center justify-center text-sm sm:text-base font-semibold text-blue-600 bg-white border-2 border-blue-400 hover:bg-blue-50 hover:border-blue-600 transition rounded-xl px-8 py-3 shadow-sm"
              >
                Explore More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}