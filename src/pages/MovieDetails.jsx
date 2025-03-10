import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addToWatchlist } from "../services/firebase";
import axios from "axios";

const API_KEY = "cae9c898d1baf4c72539d61c39bde1b9";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
      setMovie(response.data);

      // Get the first YouTube trailer
      const trailerVideo = response.data.videos.results.find((vid) => vid.type === "Trailer");
      setTrailer(trailerVideo ? `https://www.youtube.com/embed/${trailerVideo.key}` : "");
    }

    fetchMovie();
  }, [id]);

  const handleAddToWatchlist = () => {
    if (user) {
      addToWatchlist(user.uid, { movieId: id, title: movie.title, poster_path: movie.poster_path });
      alert("Added to Watchlist!");
    } else {
      alert("Please Sign In to add to Watchlist.");
    }
  };

  if (!movie) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="text-white p-8">
      {/* Movie Poster */}
      <div className="relative h-[500px]">
        <img src={`${IMAGE_BASE_URL}${movie.backdrop_path}`} alt={movie.title} className="w-full h-full object-cover brightness-75" />
        <h1 className="absolute bottom-4 left-8 text-4xl font-bold">{movie.title}</h1>
      </div>

      {/* Movie Info */}
      <div className="mt-6 max-w-4xl">
        <p className="text-lg">{movie.overview}</p>
        <p className="mt-2">⭐ {movie.vote_average.toFixed(1)} / 10</p>
        <p className="mt-2">📅 Release Date: {movie.release_date}</p>
      </div>

      {/* Watch Trailer */}
      {trailer && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Watch Trailer</h2>
          <iframe className="mt-2 w-full h-[400px] rounded-lg" src={trailer} allowFullScreen></iframe>
        </div>
      )}

      {/* Add to Watchlist Button */}
      <button
        onClick={handleAddToWatchlist}
        className="bg-red-600 px-6 py-2 text-lg rounded mt-4 hover:bg-red-700"
      >
        + Add to Watchlist
      </button>
    </div>
  );
}

export default MovieDetails;
