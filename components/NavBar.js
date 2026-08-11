"use client";

import Logo from "./MovieGrid-logo";
import { MdSettingsAccessibility } from "react-icons/md";
import SearchBar from "./SearchBar";
import { searchMovies } from "@/lib/api";
import { signOut } from "next-auth/react";
import { TiThMenuOutline } from "react-icons/ti";
import { useState } from "react";

export default function NavBar({ setSearchResults }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Called by SearchBar when the user submits a query
  async function handleSearch(query) {
    if (!query || !query.trim()) return;
    const results = await searchMovies(query, 20);
    setSearchResults(results); // send results to parent
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl transition-all">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-8">
          <a href="/dashboard" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo />
          </a>

          <nav>
            <ul className="flex items-center gap-6 text-sm font-semibold text-zinc-300">
              <li>
                <a href="/dashboard" className="hover:text-red-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-red-500 transition-colors">
                  Movies
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-red-500 transition-colors">
                  Shows
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-red-500 transition-colors">
                  Sponsor
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-red-500 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-red-500 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <SearchBar onSearch={handleSearch} />

          {/* Profile / Settings Dropdown */}
          <div className="relative group">
            <button
              aria-label="User Menu"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-red-500 transition-all shadow-md"
            >
              <MdSettingsAccessibility size={22} />
            </button>

            <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-zinc-900/95 backdrop-blur-lg border border-zinc-800 shadow-2xl rounded-xl w-44 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <a
                href="/profile"
                className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors"
              >
                My Profile
              </a>
              <a
                href="/settings"
                className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors"
              >
                Settings
              </a>
              <hr className="my-1 border-zinc-800" />
              <a
                href="/logout"
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "/auth/login" });
                }}
                className="px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-zinc-800">
        {/* Mobile Menu Toggle */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-zinc-300 hover:text-red-500 transition-colors rounded-lg bg-zinc-900/80 border border-zinc-800"
          >
            <TiThMenuOutline size={22} />
          </button>

          {menuOpen && (
            <div className="absolute left-0 top-full mt-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl w-48 p-2 z-50 flex flex-col gap-1">
              <a href="/dashboard" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">Home</a>
              <a href="/dashboard" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">Movies</a>
              <a href="/dashboard" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">Shows</a>
              <a href="/dashboard" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">Sponsor</a>
              <a href="/dashboard" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">About Us</a>
              <a href="/dashboard" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">Support</a>
            </div>
          )}
        </div>

        {/* Mobile SearchBar */}
        <div className="flex-1 max-w-[190px] mx-2">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Mobile Settings Toggle */}
        <div className="relative">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="p-2 text-zinc-300 hover:text-red-500 transition-colors rounded-lg bg-zinc-900/80 border border-zinc-800"
          >
            <MdSettingsAccessibility size={22} />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-full mt-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl w-44 p-2 z-50 flex flex-col gap-1">
              <a href="/profile" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">Profile</a>
              <a href="/settings" className="px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg">Settings</a>
              <hr className="my-1 border-zinc-800" />
              <a
                href="/logout"
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "/auth/login" });
                }}
                className="px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white rounded-lg"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
