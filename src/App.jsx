import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";  // Import the new SignUp component
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />  {/* Add Sign Up Route */}
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
