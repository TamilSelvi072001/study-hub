import React, { useState } from "react";
import { loginUser } from "../../apiService/LoginService";
import { useNavigate } from "react-router-dom"; // 👈 Add this

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // 👈 Add this

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
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>

      {error && (
        <p
          style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px" }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            color: "green",
            backgroundColor: "#e6ffe6",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: isLoading ? "#ccc" : "#28a745",
            color: "#fff",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* 👇 Register link for new users */}
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        New user?{" "}
        <button
          onClick={() => navigate("/register")}
          style={{
            color: "#007bff",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
