"use client";
import Logo from "./MovieGrid-logo";
import { MdSettingsAccessibility } from "react-icons/md";
import SearchBar from "./SearchBar";
import { searchMovies } from "@/lib/api";
import { signOut } from "next-auth/react";

export default function NavBar({ setSearchResults }) {

  // Called by SearchBar when the user submits a query
  async function handleSearch(query) {
    if (!query || !query.trim()) return;

    const results = await searchMovies(query, 20);
    setSearchResults(results); // send results to parent
  }

  return (
    <nav>
      <div className="w-full h-10 bg-blue-950 flex items-center justify-between py-6 pr-2 text-gray-200 font-semibold text-sm">
        <div className="flex gap-10 items-center">
          <div className="flex">
            <Logo />
            <Logo />
          </div>

          <div className="">
            <ul className="flex gap-2 cursor-pointer">
              <a href="/Home" className="hover:text-red-500"><li>Home</li></a>
              <a href="/New&popular" className="hover:text-red-500"><li>New & Popular</li></a>
              <a href="/New&popular" className="hover:text-red-500"><li>Movies</li></a>
              <a href="/New&popular" className="hover:text-red-500"><li>TV Shows</li></a>
              <a href="/New&popular" className="hover:text-red-500"><li>Rent-Movies</li></a>
              <a href="/New&popular" className="hover:text-red-500"><li>Support</li></a>
              <a href="/New&popular" className="hover:text-red-500"><li>About-us</li></a>
            </ul>
          </div>
        </div>

        <div className="relative group inline-block">
          <a
            href="#"
            className="flex items-center gap-2 cursor-pointer text-white hover:text-red-400 transition"
          >
            <MdSettingsAccessibility size={30} />
          </a>

          <div className="absolute left-0 top-full hidden group-hover:block bg-gray-900 text-white rounded-md shadow-lg w-40 p-2 z-50">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-700 rounded">My Profile</a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-700 rounded">Settings</a>
            <a href="/logout" 
            onClick={(e) => {
              e.preventDefault();
              signOut({ callbackUrl: "/auth/login" });
            }} className="block px-4 py-2 hover:bg-red-600 rounded">Logout</a>
          </div>
        </div>

        {/* Pass handleSearch directly — SearchBar will provide the query */}
        <SearchBar onSearch={handleSearch} />
      </div>
    </nav>
  );
}
