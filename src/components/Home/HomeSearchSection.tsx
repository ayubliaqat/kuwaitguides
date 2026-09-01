"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) {
      router.push("/blog");
    } else {
      router.push(`/blog?search=${encodeURIComponent(query.trim())}`);
    }
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
            className="w-full h-12 pl-12 pr-32 rounded-xl border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_4px_15px_rgba(37,99,235,0.08)] transition text-sm sm:text-base font-medium"
          />
          <svg
            className="absolute left-4 w-5 h-5 text-blue-500 dark:text-blue-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            type="submit"
            className="absolute right-1.5 px-5 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}