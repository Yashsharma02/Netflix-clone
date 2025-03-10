import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/firebase";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-90 px-6 py-4 flex justify-between items-center z-50 text-white shadow-lg">
      <Link to="/">
        <img src="/logo.png" alt="Netflix" className="w-32" />
      </Link>
      <div className="flex space-x-6 text-lg">
        <Link to="/" className="hover:text-gray-400 transition duration-300">Home</Link>
        {user && <Link to="/watchlist" className="hover:text-gray-400 transition duration-300">Watchlist</Link>}
      </div>
      {user ? (
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
          Logout
        </button>
      ) : (
        <div className="flex space-x-4">
          <button onClick={() => navigate("/signin")} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
            Sign In
          </button>
          <button onClick={() => navigate("/signup")} className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
