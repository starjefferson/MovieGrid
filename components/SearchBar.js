"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-xs sm:max-w-sm rounded-full bg-zinc-900/90 border border-zinc-700/60 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/30 transition-all shadow-inner px-3 py-1.5"
    >
      <input
        type="search"
        placeholder="Search movies..."
        name="query"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        className="w-full bg-transparent text-sm text-white placeholder-zinc-400 focus:outline-none pr-8 pl-1"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute right-2 p-1.5 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer rounded-full hover:bg-zinc-800/80"
      >
        <FaSearch size={15} />
      </button>
    </form>
  );
}