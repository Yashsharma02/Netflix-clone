import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg transition-transform transform hover:scale-110 w-[200px]">
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-bold transition-opacity">
          {movie.title}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;