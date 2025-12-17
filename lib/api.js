const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// ✅ Fetch multiple pages of popular movies
export const getPopularMovies = async (pages = 5) => {
  if (!API_KEY) {
    console.error("TMDB API key is missing. Did you set NEXT_PUBLIC_TMDB_API_KEY?");
    return [];
  }

  let allMovies = [];

  try {
    for (let page = 1; page <= pages; page++) {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
        { cache: "no-store" } // ✅ avoid stale cache
      );

      if (!response.ok) {
        throw new Error(`TMDB fetch failed: ${response.status}`);
      }

      const data = await response.json();
      if (data?.results) {
        allMovies = [...allMovies, ...data.results];
      }
    }

    const uniqueMovies = allMovies.filter(
      (movie, index, self) => index === self.findIndex(m => m.id === movie.id)
    );

    console.log("Fetched movies:", uniqueMovies.length);
    return uniqueMovies;
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    return [];
  }
};

// ✅ Search movies
export const searchMovies = async (query) => {
  if (!API_KEY) {
    console.error("TMDB API key is missing.");
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`TMDB search failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Search results:", data?.results?.length || 0);
    return data.results || [];
  } catch (err) {
    console.error("Error searching movies:", err);
    return [];
  }
};

// ✅ Get movie details
export async function getMovieDetails(id) {
  if (!API_KEY) {
    console.error("TMDB API key is missing.");
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch movie details: ${res.status}`);

    const data = await res.json();
    console.log("Movie details:", data?.title);
    return data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    return null;
  }
}