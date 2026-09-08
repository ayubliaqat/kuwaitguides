"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type HomeSearchBarProps = {
  categories: string[];
};

export default function HomeSearchBar({ categories }: HomeSearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/blog");
      return;
    }

    // Check for an exact category match first (case-insensitive)
    const exactCategory = categories.find(
      (cat) => cat.toLowerCase() === trimmed.toLowerCase()
    );

    if (exactCategory) {
      router.push(`/blog?category=${encodeURIComponent(exactCategory)}`);
      return;
    }

    // Fall back to a partial match — e.g. typing "beach" matches "Beaches"
    const partialCategory = categories.find(
      (cat) =>
        cat.toLowerCase().includes(trimmed.toLowerCase()) ||
        trimmed.toLowerCase().includes(cat.toLowerCase())
    );

    if (partialCategory) {
      router.push(`/blog?category=${encodeURIComponent(partialCategory)}`);
      return;
    }

    // No category match — treat it as a plain keyword search
    router.push(`/blog?search=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-6">
      <div className="max-w-xl">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, food, visas, or categories..."
            className="w-full h-12 pl-12 pr-32 rounded-xl border-2 border-[#0071E3] bg-white text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 shadow-[0_4px_15px_rgba(0,113,227,0.08)] transition text-sm sm:text-base font-medium"
          />

          <svg
            className="absolute left-4 w-5 h-5 text-[#0071E3] pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <button
            type="submit"
            className="absolute right-1.5 px-5 h-9 rounded-lg bg-[#0071E3] hover:bg-[#0058B0] text-white font-semibold text-sm transition shadow-sm"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}