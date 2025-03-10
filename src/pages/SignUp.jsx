import { useState } from "react";
import { signup } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Sign-up error", error.message);
      alert("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSignUp} className="bg-gray-900 p-8 rounded-lg">
        <h2 className="text-white text-2xl mb-4">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 mb-2 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-red-600 w-full p-2 text-white">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
