export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
    { cache: "no-store" }
  );

  const movie = await res.json();

  return (
    <div className="bg-black text-white min-h-screen p-10 max-w-6xl mx-auto">

      {/* Poster + Title */}
      <div className="flex gap-10">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-72 rounded-xl shadow-xl"
        />

        <div>
          <h1 className="text-5xl font-bold">{movie.Title}</h1>
          <p className="text-gray-400 mt-2">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>

          <p className="mt-4 text-lg">{movie.Plot}</p>

          <p className="mt-4 text-yellow-400 text-xl font-bold">
            ⭐ IMDb Rating: {movie.imdbRating} ({movie.imdbVotes} votes)
          </p>
        </div>
      </div>

      {/* Movie Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 text-sm">

        <Info label="Genre" value={movie.Genre} />
        <Info label="Director" value={movie.Director} />
        <Info label="Writer" value={movie.Writer} />
        <Info label="Actors" value={movie.Actors} />
        <Info label="Language" value={movie.Language} />
        <Info label="Country" value={movie.Country} />
        <Info label="Awards" value={movie.Awards} />
        <Info label="Box Office" value={movie.BoxOffice} />
        <Info label="Metascore" value={movie.Metascore} />
        <Info label="Production" value={movie.Production} />
        <Info label="Released" value={movie.Released} />
        <Info label="Type" value={movie.Type} />

      </div>

      {/* Ratings Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Ratings</h2>

        {movie.Ratings?.map((r: any, i: number) => (
          <p key={i} className="text-gray-300">
            🔹 {r.Source}: {r.Value}
          </p>
        ))}
      </div>

    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-semibold">{value || "N/A"}</p>
    </div>
  );
} 