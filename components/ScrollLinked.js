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

  const [mounted, setMounted] = useState(false);
  const [movies, setMovies] = useState([]);

  /* ----------------------------------
     ✅ Ensure client hydration first
  ----------------------------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ----------------------------------
     ✅ Fetch movies ONCE
  ----------------------------------- */
  useEffect(() => {
    async function fetchMovies() {
      try {
        const popularMovies = await getPopularMovies(10);
        setMovies(popularMovies || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    }
    fetchMovies();
  }, []);

  /* ----------------------------------
     ✅ Safe useScroll (NO hydration crash)
  ----------------------------------- */
  const scrollData = mounted
    ? useScroll({ container: ref })
    : { scrollXProgress: useMotionValue(0) };

  const { scrollXProgress } = scrollData;
  const maskImage = useScrollOverflowMask(scrollXProgress);

  const moviesToShow =
    searchResults.length > 0 ? searchResults : movies;

  /* ----------------------------------
     ❌ Prevent blank render on mobile
  ----------------------------------- */
  if (!mounted) return null;

  return (
    <section id="example">
      {/* Progress indicator */}
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

      {/* Movie slider */}
      <motion.ul ref={ref} style={{ maskImage }}>
        {moviesToShow.map((movie) => (
          <li
            key={movie.id}
            onClick={() => router.push(`/movies/${movie.id}`)}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay">
              <h3>{movie.title}</h3>
            </div>
          </li>
        ))}
      </motion.ul>

      <StyleSheet />
    </section>
  );
}

/* ----------------------------------
   ✅ Scroll mask logic
----------------------------------- */
function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    "linear-gradient(90deg, #000, #000 90%, transparent)"
  );

  useMotionValueEvent(scrollXProgress, "change", (v) => {
    animate(
      maskImage,
      v === 0
        ? "linear-gradient(90deg, #000, #000 90%, transparent)"
        : v === 1
        ? "linear-gradient(90deg, transparent, #000 10%, #000)"
        : "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)"
    );
  });

  return maskImage;
}

/* ----------------------------------
   ✅ Fully responsive styles
----------------------------------- */
function StyleSheet() {
  return (
    <style>{`
      #example {
        width: 100%;
        min-height: 70vh;
        position: relative;
        background: black;
        display: flex;
        align-items: center;
        overflow: hidden;
      }

      #progress {
        position: absolute;
        top: 1rem;
        left: 1rem;
        transform: rotate(-90deg);
        z-index: 10;
      }

      .bg {
        stroke: #222;
        fill: none;
        stroke-width: 10%;
      }

      .indicator {
        stroke: red;
        fill: none;
        stroke-width: 10%;
      }

      ul {
        display: flex;
        gap: 1rem;
        padding: 2rem;
        list-style: none;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
      }

      li {
        flex: 0 0 85vw;
        height: 65vh;
        border-radius: 1rem;
        scroll-snap-align: start;
        position: relative;
        cursor: pointer;
      }

      .overlay {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 1rem;
        background: linear-gradient(to top, rgba(0,0,0,.8), transparent);
        color: white;
        text-align: center;
        border-radius: 0 0 1rem 1rem;
      }

      @media (min-width: 768px) {
        li {
          flex: 0 0 40vw;
          height: 60vh;
        }
      }

      @media (min-width: 1200px) {
        li {
          flex: 0 0 25vw;
          height: 70vh;
        }
      }
    `}</style>
  );
}
