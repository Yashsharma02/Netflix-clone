// Home.jsx
import { useState, useEffect } from "react";
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
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="src\assets\BrandAssets_Logo.jpg"
          alt="Netflix Background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-5xl font-bold max-w-2xl">Unlimited movies, TV shows and more</h1>
        <p className="text-lg mt-4">Starts at ₹149. Cancel at any time.</p>
        <p className="text-md mt-2">Ready to watch? Enter your email to create or restart your membership.</p>
        
        {/* Signup Form */}
        <div className="mt-4 flex flex-col md:flex-row gap-3 items-center">
          <input 
            type="email" 
            placeholder="Email address" 
            className="px-4 py-3 w-80 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <button className="bg-red-600 text-white px-6 py-3 rounded-md text-lg hover:bg-red-700 transition">Get Started →</button>
        </div>
      </div>
      
      {/* Trending Movies Section */}
      <div className="relative z-10 px-6 mt-20">
        <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;