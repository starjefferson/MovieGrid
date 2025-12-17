import { getPopularMovies } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await getPopularMovies(10);
    return NextResponse.json(movies);
  } catch (err) {
    console.error("Server error fetching movies:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}