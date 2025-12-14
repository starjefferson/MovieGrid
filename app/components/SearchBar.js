"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar ({ onSearch }) {
    const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query); 
    };

    return (
        <div className="flex bg-slate-900 h-10 w-50 border border-gray-500 items-center px-2 py-2 gap-2">  
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                    type="search"
                    placeholder="Search movies..."
                    name="query"
                    id="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="on"
                    className="w-35 h-7 px-2 py-2 rounded-md bg-gray-500 text-white"/>
                    <button type="submit">
                        <FaSearch
                        size="25"
                        color="darkgray" /> 
                    </button> 
                </form> 
        </div>
    )
}