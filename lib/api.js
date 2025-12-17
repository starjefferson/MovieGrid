const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch multiple pages of popular movies
export const getPopularMovies = async (pages = 5) => {
  let allMovies = [];

  for (let page = 1; page <= pages; page++) {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    allMovies = [...allMovies, ...data.results];
  }

   const uniqueMovies = allMovies.filter(
    (movie, index, self) => index === self.findIndex(m => m.id === movie.id)
  );

  return uniqueMovies;

};

// Search movies
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

