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

export default function ScrollLinked({ searchResults = [] }) {
  const ref = useRef(null);
  const router = useRouter();

  const [scrollXProgress, setScrollXProgress] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Initialize useScroll only after mount
  useEffect(() => {
    if (ref.current) {
      const { scrollXProgress } = useScroll({ container: ref });
      setScrollXProgress(scrollXProgress);
    }
  }, []);

  const maskImage = scrollXProgress ? useScrollOverflowMask(scrollXProgress) : null;

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

  if (loading) {
    return (
      <div id="example" className="text-white text-center py-20">
        Loading movies…
      </div>
    );
  }

  if (!moviesToShow || moviesToShow.length === 0) {
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
            style={{
              backgroundImage: movie.poster_path
                ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                : "url('/fallback.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              backgroundColor: "#222", // fallback color
            }}
          >
            <div className="movie-title">{movie.title}</div>
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

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(maskImage, `linear-gradient(90deg, #000, #000 5%, #000 95%, #0000)`);
    } else if (value === 1) {
      animate(maskImage, `linear-gradient(90deg, #0000, #000 5%, #000 100%, #000)`);
    } else {
      animate(maskImage, `linear-gradient(90deg, #0000, #000 5%, #000 95%, #0000)`);
    }
  });

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
        width: 100%;   /* ✅ fill parent */
        height: 75vh;  /* ✅ fixed height */
      }

      /* Hide scrollbar */
      #example ul::-webkit-scrollbar { display: none; }
      #example ul { -ms-overflow-style: none; scrollbar-width: none; }

      #example li {
        flex: 0 0 100%;   /* ✅ full width card on mobile */
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