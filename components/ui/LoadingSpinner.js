"use client";

import React from "react";
import { BiFilm } from "react-icons/bi";

export default function LoadingSpinner({ label = "Loading MovieGrid..." }) {
  return (
    <div className="min-h-[60vh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-black/95 text-white p-6">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Outer glowing film reel ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-t-red-600 border-r-transparent border-b-red-900 border-l-transparent animate-spin" />
          <div className="absolute w-28 h-28 rounded-full border border-red-500/30 animate-ping opacity-25" />
          <div className="absolute flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-full border border-zinc-700 shadow-2xl">
            <BiFilm className="text-red-500 text-3xl animate-spin-slow" />
          </div>
        </div>

        {/* Text and pulsating dots */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-red-600 uppercase">
            MovieGrid
          </h3>
          <p className="text-sm text-zinc-400 font-medium tracking-wide flex items-center gap-2">
            <span>{label}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
