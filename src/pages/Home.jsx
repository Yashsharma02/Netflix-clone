import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = "cae9c898d1baf4c72539d61c39bde1b9";
const BASE_URL = "https://api.themoviedb.org/3";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
      setMovies(response.data.results);
    }
    fetchMovies();
  }, []);

  return (
    <div className="pt-20 px-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Trending Now</h1>
      <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;