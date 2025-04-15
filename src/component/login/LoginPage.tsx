import React, { useState } from "react";
import { loginUser } from "../../apiService/LoginService";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await loginUser(userName, password);
      setSuccess("Login successful!");

      setUserName("");
      setPassword("");

      // navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c2045] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0c2045]">
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
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0c2045]"
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
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
