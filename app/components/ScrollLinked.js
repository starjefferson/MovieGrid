"use client";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { getPopularMovies } from  "@/lib/api";
import { useRouter } from "next/navigation";

export default function ScrollLinked({ searchResults = [] }) {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  const [movies, setMovies] = useState([]);
  const router = useRouter();


  useEffect(() => {
    async function fetchMovies() {
      const cached = localStorage.getItem("popularMovies");
      if (cached) {
        setMovies(JSON.parse(cached));
        return;
      }
      const popularMovies = await getPopularMovies(10);
      localStorage.setItem("popularMovies", JSON.stringify(popularMovies));
      setMovies(popularMovies);
    }
    fetchMovies();
  }, []);

  // Use search results if available, otherwise show popular movies
  const moviesToShow = searchResults.length > 0 ? searchResults : movies;

  return (
    <div id="example">
      <svg id="progress" width="80" height="80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle cx="50" cy="50" r="30" className="indicator" style={{ pathLength: scrollXProgress }} />
      </svg>

      <motion.ul ref={ref} style={{ maskImage }}>
        {moviesToShow.map((movie, index) => (
          <li
            key={`${movie.id}-${index}`}
            onClick={() => router.push(`/movies/${movie.id}`)} //navigate each card programmatically): instead of wrapping with link
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.5)",
                color: "white",
                padding: "1rem",
                position: "absolute",
                bottom: 0,
                width: "100%",
                borderRadius: "0 0 1rem 1rem",
                textAlign: "center",
              }}
            >
              {movie.title}
            </div>
          </li>
        ))}
      </motion.ul>

      <StyleSheet />
    </div>
  );
}

// Scroll mask function
function useScrollOverflowMask(scrollXProgress) {
  const left = `0%`;
  const right = `100%`;
  const leftInset = `5%`;
  const rightInset = `95%`;
  const transparent = `#0000`;
  const opaque = `#000`;

  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(maskImage, `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`);
    } else if (value === 1) {
      animate(maskImage, `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`);
    } else if (scrollXProgress.getPrevious() === 0 || scrollXProgress.getPrevious() === 1) {
      animate(maskImage, `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`);
    }
  });

  return maskImage;
}

// Full-screen & responsive CSS
function StyleSheet() {
  return (
    <style>{`
      #example {
        width: 100%;
        height: 100vh;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
      }
      #example #progress {
        position: absolute;
        top: 2%;
        left: 2%;
        transform: rotate(-90deg);
        z-index: 10;
      }
      #example .bg { stroke: #0b1011; }
      #example #progress circle { stroke-dashoffset: 0; stroke-width: 10%; fill: none; }
      #progress .indicator { stroke: var(--accent); }
      #example ul {
        display: flex;
        list-style: none;
        height: 70vh;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 2vh 4vw;
        margin: 0;
        gap: 2vw;
        scroll-snap-type: x mandatory;
        flex-wrap: nowrap;
        width: max-content;
      }
      #example li {
        flex: 0 0 80vw;
        max-width: 300px;
        height: 60vh;
        border-radius: 1rem;
        scroll-snap-align: start;
      }
      #example ::-webkit-scrollbar { height: 6px; background: #fff3; }
      #example ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }
      @media (min-width: 768px) {
        #example li { flex: 0 0 40vw; height: 60vh; }
      }
      @media (min-width: 1200px) {
        #example li { flex: 0 0 25vw; height: 70vh; }
      }
    `}</style>
  );
}