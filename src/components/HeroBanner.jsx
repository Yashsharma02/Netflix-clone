import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "cae9c898d1baf4c72539d61c39bde1b9";
const FEATURED_MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

function HeroBanner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(FEATURED_MOVIE_URL);
      setMovie(response.data.results[0]); // Get first movie
    }
    fetchMovie();
  }, []);

  return (
    movie && (
      <div className="relative h-[600px] text-white">
        {/* Background Image */}
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          alt={movie.title} 
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        />

        {/* Content */}
        <div className="relative z-10 p-8 pt-40 max-w-lg">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="mt-4 text-lg">{movie.overview.substring(0, 150)}...</p>

          {/* Buttons */}
          <div className="mt-6">
            <button className="bg-white text-black px-6 py-2 text-lg rounded hover:bg-gray-300 mr-4">
              ▶ Play
            </button>
            <button className="bg-gray-600 px-6 py-2 text-lg rounded hover:bg-gray-500">
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default HeroBanner;
