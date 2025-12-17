"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  if (error) return <div className="text-white p-10">{error}</div>;
  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center px-4 md:px-20"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-8">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 md:w-80 rounded-xl shadow-lg flex-shrink-0"
          />
        )}

        <div className="text-white flex-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm md:text-base mb-4">
            <span>⭐ {movie.vote_average}</span>
            <span>📅 {movie.release_date}</span>
            <span>🕒 {movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
          </div>

          {trailer && (
            <button
              onClick={() => setOpen(true)}
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded font-semibold"
            >
              ▶ Play Trailer
            </button>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 text-gray-300 hover:text-white font-semibold"
      >
        ← Back
      </button>

      {/* Trailer Modal */}
      {open && trailer && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
          <div className="relative w-full max-w-3xl h-64 md:h-[60vh]">
            <iframe
              className="w-full h-full rounded"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}