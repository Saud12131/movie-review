"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_KEY  = process.env.NEXT_PUBLIC_OMDB_API_KEY;
interface MovieType {
    imdbID: string
    Poster: string
    Title: string
    Year: string
}
export default function Landing() {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const [movies, setMovies] = useState<MovieType[]>([]);
    
    const searchMovies = async () => {
        if (!query) return;

        const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );
        const data = await res.json();
        setMovies(data.Search || []);
    };

    return (
        <div className="bg-darkbg text-white min-h-screen">

            {/* HERO */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-6xl md:text-7xl font-extrabold text-neonred tracking-widest">
                    REDFLIX
                </h1>

                <p className="mt-6 max-w-xl text-gray-400">
                    Discover movies, explore reviews, and dive into cinematic worlds.
                </p>

                {/* SEARCH */}
                <div className="mt-10 flex w-full max-w-xl">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search movies like Stranger Things..."
                        className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-l-lg focus:outline-none"
                    />
                    <button
                        onClick={searchMovies}
                        className="px-6 bg-neonred hover:bg-red-700 rounded-r-lg font-semibold"
                    >
                        Search
                    </button>
                </div>
            </section>

            {/* RESULTS */}
            {movies.length > 0 && (
                <section className="px-6 pb-20">
                    <h2 className="text-3xl font-bold mb-10 text-neonred text-center">
                        Search Results
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {movies.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:scale-105 transition"
                                onClick={()=>router.push(`/movie/${movie.imdbID}`)}
                            >
                                <img
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : "https://via.placeholder.com/300x450"
                                    }
                                    alt={movie.Title}
                                    className="w-full h-72 object-cover"
                                />

                                <div className="p-4">
                                    <h3 className="font-bold text-sm">{movie.Title}</h3>
                                    <p className="text-gray-500 text-xs">{movie.Year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FOOTER */}
            <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
                © 2026 RedFlix · Powered by OMDb API
            </footer>
        </div>
    );
}
