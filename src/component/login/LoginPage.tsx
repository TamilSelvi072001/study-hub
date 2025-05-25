import React, { useState } from "react";
import { loginUser } from "../../apiService/LoginService";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);
      setSuccess("Login successful!");
      setEmail("");
      setPassword("");

      // Redirect after login if saved
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c2045] flex items-center justify-center relative">
      {/* Fullscreen Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white" />
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-[#0c2045] font-semibold hover:text-[#143672] transition"
          aria-label="Go back"
        >
          ← Back
        </button>

        {/* 🏠 Home Button - Top Right */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 flex items-center gap-1 text-[#0c2045] font-semibold hover:text-[#143672] transition"
          aria-label="Go home"
        >
          <HomeIcon size={18} />
          Home
        </button>
        <h2 className="text-2xl font-bold mt-6 mb-6 text-center text-[#0c2045]">
          Login to FocusHub
        </h2>

        {error && (
          <p className="text-red-700 bg-red-100 p-3 mb-4 rounded">{error}</p>
        )}

        {success && (
          <p className="text-green-700 bg-green-100 p-3 mb-4 rounded">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0c2045]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0c2045]"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded font-semibold text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0c2045] hover:bg-[#143672] transition duration-300"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New user?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[#0c2045] font-semibold underline hover:text-[#143672] transition"
            disabled={isLoading}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
