export default async function MovieDetailsPage({ params }) {
  const { id: movieId } = await params;

  if (!movieId) {
    return <div className="text-white p-10">Movie ID is missing</div>;
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="text-white p-10">Failed to fetch movie</div>;
  }

  const movie = await res.json();

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
        {/* Poster */}
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 md:w-80 rounded-xl shadow-lg flex-shrink-0"
          />
        )}

        {/* Movie Info */}
        <div className="text-white flex-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm md:text-base">
            <span>⭐ {movie.vote_average}</span>
            <span>📅 {movie.release_date}</span>
            <span>🕒 {movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <a
        href="/"
        className="absolute top-6 left-6 text-gray-300 hover:text-white font-semibold"
      >
        ← Back
      </a>
    </div>
  );
}