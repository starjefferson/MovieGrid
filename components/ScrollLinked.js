"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { getPopularMovies } from "@/lib/api";
import { useRouter } from "next/navigation";
import { MovieGridSkeleton } from "@/components/ui/Skeleton";

export default function ScrollLinked({ searchResults = [] }) {
  const ref = useRef(null);
  const router = useRouter();

  // ✅ Safe scroll state
  const [scrollXProgress, setScrollXProgress] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Hydration guard
  useEffect(() => {
    setHydrated(true);
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640);
    }
  }, []);

  // ✅ Initialize useScroll only after mount
  useEffect(() => {
    if (ref.current) {
      const { scrollXProgress } = useScroll({ container: ref });
      setScrollXProgress(scrollXProgress);
    }
  }, []);

  const maskImage = (!isMobile && scrollXProgress) ? useScrollOverflowMask(scrollXProgress) : null;

  // ✅ Fetch movies once
  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getPopularMovies(10);
        setMovies(data || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const moviesToShow = searchResults.length > 0 ? searchResults : movies;

  // ✅ Show loading until hydration + fetch complete
  if (!hydrated || loading) {
    return <MovieGridSkeleton count={8} />;
  }

  // ✅ Only show "No movies found" if hydrated + fetch complete
  if (moviesToShow.length === 0) {
    return (
      <div id="example" className="text-white text-center py-20">
        No movies found
      </div>
    );
  }

  return (
    <div id="example">
      {/* Progress indicator (hidden on mobile) */}
      {scrollXProgress && (
        <svg id="progress" width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            className="indicator"
            style={{ pathLength: scrollXProgress }}
          />
        </svg>
      )}

      {/* Movie cards */}
      <motion.ul ref={ref} style={maskImage ? { maskImage } : {}}>
        {moviesToShow.map((movie) => (
          <li
            key={movie.id}
            onClick={() => router.push(`/movies/${movie.id}`)}
            className="group overflow-hidden rounded-2xl border border-zinc-800/80 shadow-2xl transition-all duration-300 hover:border-red-600/50 hover:shadow-red-600/20"
            style={{
              backgroundImage: movie.poster_path
                ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                : "url('/fallback.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              backgroundColor: "#18181b", // fallback color
            }}
          >
            {/* Top Rating Badge */}
            {movie.vote_average > 0 && (
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-zinc-700/60 px-2.5 py-1 rounded-full text-xs font-semibold text-amber-400 flex items-center gap-1 shadow-lg z-10">
                <span>⭐</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}

            {/* Bottom Title Gradient Banner */}
            <div className="movie-title bg-gradient-to-t from-black via-black/85 to-transparent p-5 flex flex-col justify-end">
              <span className="font-bold text-lg text-white group-hover:text-red-500 transition-colors line-clamp-2">
                {movie.title}
              </span>
              {movie.release_date && (
                <span className="text-xs text-zinc-400 font-medium mt-1">
                  {movie.release_date.split("-")[0]}
                </span>
              )}
            </div>
          </li>
        ))}
      </motion.ul>

      <StyleSheet />
    </div>
  );
}

/* ============================
   Scroll mask helper
============================ */
function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, #000, #000 5%, #000 95%, #0000)`
  );

  if (scrollXProgress) {
    useMotionValueEvent(scrollXProgress, "change", (value) => {
      if (value === 0) {
        animate(maskImage, `linear-gradient(90deg, #000, #000 5%, #000 95%, #0000)`);
      } else if (value === 1) {
        animate(maskImage, `linear-gradient(90deg, #0000, #000 5%, #000 100%, #000)`);
      } else {
        animate(maskImage, `linear-gradient(90deg, #0000, #000 5%, #000 95%, #0000)`);
      }
    });
  }

  return maskImage;
}

/* ============================
   Styles
============================ */
function StyleSheet() {
  return (
    <style>{`
      #example {
        width: 100%;
        min-height: 100vh;
        position: relative;
        background: #000;
        padding: 1rem 0;
        overflow-x: hidden;
        overflow-y: visible;
      }

      /* Progress circle */
      #progress {
        position: absolute;
        top: 1rem;
        left: 1rem;
        transform: rotate(-90deg);
        z-index: 10;
      }

      #progress .bg {
        stroke: #0b1011;
        fill: none;
        stroke-width: 10%;
      }

      #progress .indicator {
        stroke: var(--accent, red);
        fill: none;
        stroke-width: 10%;
      }

      /* Scroll list */
      #example ul {
        display: flex;
        gap: 1rem;
        padding: 2vh 4vw;
        margin: 0;
        list-style: none;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        height: 75vh;
      }

      /* Hide scrollbar */
      #example ul::-webkit-scrollbar { display: none; }
      #example ul { -ms-overflow-style: none; scrollbar-width: none; }

      #example li {
        flex: 0 0 100%;   /* full width card on mobile */
        height: 75vh;
        border-radius: 1rem;
        scroll-snap-align: start;
        position: relative;
      }

      .movie-title {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 1rem;
        text-align: center;
        background: rgba(0,0,0,0.6);
        color: white;
        border-radius: 0 0 1rem 1rem;
      }

      /* Tablet */
      @media (min-width: 768px) {
        #example li {
          flex: 0 0 40vw;
          height: 60vh;
        }
      }

      /* Desktop */
      @media (min-width: 1200px) {
        #example li {
          flex: 0 0 25vw;
          height: 70vh;
        }
      }

      /* Mobile cleanup */
      @media (max-width: 640px) {
        #progress { display: none; }
      }
    `}</style>
  );
}