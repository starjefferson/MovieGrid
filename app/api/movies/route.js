import { getPopularMovies } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!API_KEY) {
    console.error("TMDB API key is missing on server");
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }
  try {
    const movies = await getPopularMovies(10);
    return NextResponse.json(movies);
  } catch (err) {
    console.error("Server error fetching movies:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}