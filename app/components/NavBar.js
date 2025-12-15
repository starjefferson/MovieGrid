"use client";
import Logo from "./MovieGrid-logo";
import { MdSettingsAccessibility } from "react-icons/md";
import SearchBar from "./SearchBar";
import { searchMovies } from "@/lib/api";
import { signOut } from "next-auth/react";
import { TiThMenuOutline } from "react-icons/ti";

export default function NavBar({ setSearchResults }) {
  // Called by SearchBar when the user submits a query
  async function handleSearch(query) {
    if (!query || !query.trim()) return;

    const results = await searchMovies(query, 20);
    setSearchResults(results); // send results to parent
  }

  return (
    <>
      <div className="hidden md:w-full md:h-10 md:bg-blue-950 md:flex md:items-center md:justify-between md:py-6 pr-2 md:text-gray-200 md:font-semibold md:text-sm">
        <div className="flex gap-10 items-center">
          <div className="flex">
            <Logo />
            <Logo />
          </div>

          <div className="">
            <ul className="flex justify-center items-center pl-20 gap-2 cursor-pointer text-gray-300 text-sm font-bold ">
              <a href="/Home" className="hover:text-red-500">
                <li>Home</li>
              </a>
              <a href="/New&popular" className="hover:text-red-500">
                <li>Movies</li>
              </a>
              <a href="/New&popular" className="hover:text-red-500">
                <li>Shows</li>
              </a>
              <a href="/New&popular" className="hover:text-red-500">
                <li>Sponsor</li>
              </a>
              <a href="/New&popular" className="hover:text-red-500">
                <li>Support</li>
              </a>
              <a href="/New&popular" className="hover:text-red-500">
                <li>About-us</li>
              </a>
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
            <a
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              My Profile
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Settings
            </a>
            <a
              href="/logout"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/auth/login" });
              }}
              className="block px-4 py-2 hover:bg-red-600 rounded"
            >
              Logout
            </a>
          </div>
        </div>

        {/* Pass handleSearch directly — SearchBar will provide the query */}
        <SearchBar onSearch={handleSearch} />
      </div>

      {/*mobile screen*/}

      <div className="w-full h-10 py-4 bg-blue-950 flex items-center justify-around  text-gray-200 font-semibold text-sm md:hidden">
          <div className=" flex">
            <div className="relative group inline-block">
              <a
                href="#"
                className="flex items-center gap-2 cursor-pointer text-white hover:text-red-400 transition"
              >
                <TiThMenuOutline size={30} />
              </a>

              <div className="absolute left-0 top-full hidden group-hover:block bg-gray-900 text-white rounded-md shadow-lg w-40 p-2 z-50">
                <a
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Movies
                </a>
                <a href="#"
                  className="block px-4 py-2 hover:bg-red-600 rounded"
                >
                  Shows
                </a>
                <a href="#"
                  className="block px-4 py-2 hover:bg-red-600 rounded"
                >
                  Sponsor
                </a>
                <a href="#"
                  className="block px-4 py-2 hover:bg-red-600 rounded"
                >
                  About-us
                </a>
                <a href="#"
                  className="block px-4 py-2 hover:bg-red-600 rounded"
                >
                  Support
                </a>
              </div>
            </div>
        </div>
         {/* Pass handleSearch directly — SearchBar will provide the query */}
            <SearchBar onSearch={handleSearch} />

        <div className="relative group inline-block">
          <a
            href="#"
            className="flex items-center gap-2 cursor-pointer text-white hover:text-red-400 transition"
          >
            <MdSettingsAccessibility size={30} />
          </a>

          <div className="absolute left-0 top-full hidden group-hover:block bg-gray-900 text-white rounded-md shadow-lg w-40 p-2 z-50">
            <a
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              My Profile
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Settings
            </a>
            <a
              href="/logout"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/auth/login" });
              }}
              className="block px-4 py-2 hover:bg-red-600 rounded"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
