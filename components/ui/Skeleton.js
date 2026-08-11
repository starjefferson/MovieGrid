"use client";

import React from "react";

// Generic Skeleton block component
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`rounded bg-zinc-800/80 skeleton-shimmer border border-zinc-700/40 ${className}`}
    />
  );
}

// Skeleton for horizontal scrollable Movie Grid cards (matches ScrollLinked card dimensions & responsive styles)
export function MovieGridSkeleton({ count = 6 }) {
  return (
    <div className="w-full min-h-[75vh] bg-black px-4 md:px-12 py-6 overflow-hidden flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-48 h-6 rounded-md" />
      </div>

      <div className="flex gap-4 overflow-hidden py-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-[45vw] md:w-[25vw] h-[70vh] md:h-[60vh] rounded-2xl overflow-hidden relative border border-zinc-800 bg-zinc-900 shadow-xl"
          >
            {/* Poster image shimmer */}
            <div className="w-full h-full skeleton-card-shimmer" />

            {/* Title banner shimmer */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2">
              <Skeleton className="w-3/4 h-5 rounded" />
              <Skeleton className="w-1/2 h-4 rounded opacity-70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton loader matching MovieDetailsPage layout
export function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 relative flex flex-col justify-center items-center px-4 md:px-20 py-16 overflow-hidden">
      {/* Background ambient shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 opacity-90" />
      <div className="absolute inset-0 skeleton-shimmer opacity-20" />

      {/* Back button skeleton */}
      <div className="absolute top-6 left-6 z-20">
        <Skeleton className="w-20 h-8 rounded-lg" />
      </div>

      {/* Main content grid */}
      <div className="relative z-10 max-w-5xl w-full text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
        {/* Poster card skeleton */}
        <div className="w-64 md:w-80 h-96 md:h-[450px] rounded-xl overflow-hidden flex-shrink-0 border border-zinc-800 shadow-2xl relative">
          <div className="w-full h-full skeleton-card-shimmer" />
        </div>

        {/* Text details skeleton */}
        <div className="text-white flex-1 flex flex-col gap-4 w-full">
          <Skeleton className="w-3/4 h-10 md:h-12 rounded-lg" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-4/5 h-4 rounded" />
            <Skeleton className="w-3/5 h-4 rounded" />
          </div>

          {/* Badges / pills */}
          <div className="flex flex-wrap items-center gap-4 py-2">
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>

          {/* Action button skeleton */}
          <Skeleton className="w-44 h-12 rounded-lg mt-4" />
        </div>
      </div>
    </div>
  );
}

// Skeleton matching Auth pages (Login/Signup form card)
export function AuthFormSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-30 bg-[url('/movie-gridbg.JPG')]" />
      <div className="w-full max-w-[420px] bg-black/80 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-zinc-800/80 shadow-2xl relative z-10 flex flex-col gap-6">
        <Skeleton className="w-32 h-8 rounded-md mb-2" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
        <Skeleton className="w-full h-11 rounded-lg mt-2" />
        <div className="flex items-center gap-4 my-2">
          <div className="h-px bg-zinc-800 flex-1" />
          <Skeleton className="w-24 h-4 rounded" />
          <div className="h-px bg-zinc-800 flex-1" />
        </div>
        <div className="flex justify-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Skeleton for NavBar
export function NavBarSkeleton() {
  return (
    <div className="w-full h-16 bg-blue-950/90 backdrop-blur-md px-6 flex items-center justify-between border-b border-zinc-800">
      <div className="flex items-center gap-8">
        <Skeleton className="w-32 h-8 rounded-md" />
        <div className="hidden md:flex gap-4">
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="w-48 h-9 rounded-lg" />
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>
    </div>
  );
}
