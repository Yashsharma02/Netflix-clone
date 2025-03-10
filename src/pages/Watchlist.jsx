import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getWatchlist, removeFromWatchlist } from "../services/firebase";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Watchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      getWatchlist(user.uid).then(setWatchlist);
    }
  }, [user]);

  return (
    <div className="text-white p-8 pt-20 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-gray-400">No movies in your watchlist.</p>
      ) : (
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group w-[200px]">
              <Link to={`/movie/${movie.movieId}`}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="rounded-lg transition-transform transform group-hover:scale-105 object-cover w-full" />
              </Link>
              <button
                onClick={() => {
                  removeFromWatchlist(movie.id);
                  setWatchlist((prev) => prev.filter((m) => m.id !== movie.id));
                }}
                className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-75 hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
