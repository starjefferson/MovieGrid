"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MovieDetailsSkeleton } from "@/components/ui/Skeleton";
import { FaPlay, FaArrowLeft, FaStar, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function MovieDetailsPage({ params }) {
  // ✅ unwrap params (required in Next.js 16 with Turbopack)
  const { id: movieId } = use(params);
  const router = useRouter();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch movie details
        const resMovie = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          { cache: "no-store" }
        );
        if (!resMovie.ok) throw new Error("Failed to fetch movie details");
        const movieData = await resMovie.json();
        setMovie(movieData);

        // Fetch videos
        const resVideos = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          { cache: "no-store" }
        );
        if (!resVideos.ok) throw new Error("Failed to fetch videos");
        const videosData = await resVideos.json();
        const trailerData = videosData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(trailerData);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError(err.message);
      }
    }

    if (movieId) fetchData();
  }, [movieId]);

  if (error)
    return (
      <div className="min-h-screen bg-zinc-950 text-red-400 flex flex-col items-center justify-center p-6">
        <p className="text-lg font-semibold">{error}</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white hover:border-red-600 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );

  if (!movie) return <MovieDetailsSkeleton />;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center px-4 md:px-20 py-16 overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/70 backdrop-blur-[2px]" />

      {/* Frosted Back Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60 rounded-full text-sm font-semibold text-zinc-200 hover:text-white hover:border-red-500 hover:bg-zinc-900 transition-all shadow-xl cursor-pointer"
      >
        <FaArrowLeft size={12} />
        <span>Back</span>
      </button>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl w-full text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mt-10">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 md:w-80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-zinc-800/80 flex-shrink-0 object-cover"
          />
        )}

        <div className="text-white flex-1 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white leading-tight">
            {movie.title}
          </h1>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            {movie.overview}
          </p>

          {/* Badges / Meta Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-semibold mb-8">
            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-zinc-700/60 px-3 py-1.5 rounded-full text-amber-400 shadow-md">
              <FaStar size={13} />
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
            </span>

            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-zinc-700/60 px-3 py-1.5 rounded-full text-zinc-300 shadow-md">
              <FaCalendarAlt size={13} className="text-zinc-400" />
              <span>{movie.release_date || "N/A"}</span>
            </span>

            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-zinc-700/60 px-3 py-1.5 rounded-full text-zinc-300 shadow-md">
              <FaClock size={13} className="text-zinc-400" />
              <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
            </span>
          </div>

          {trailer && (
            <div>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold tracking-wide px-8 py-3.5 rounded-xl shadow-xl shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FaPlay size={14} />
                <span>Play Trailer</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      {open && trailer && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-64 sm:h-96 md:h-[65vh] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <iframe
              className="w-full h-full rounded-2xl"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 bg-zinc-900/90 text-zinc-300 hover:text-white p-2 rounded-full border border-zinc-700 shadow-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}