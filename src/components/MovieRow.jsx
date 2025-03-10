import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    }
    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="px-8">
      <h2 className="text-xl font-bold my-4">{title}</h2>

      <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="flex-none">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-40 rounded-lg transition transform hover:scale-110"
          />
        </Link>        
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
