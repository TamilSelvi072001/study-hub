// src/components/RegisterPage.tsx

import React, { useState } from "react";
import { registerUser } from "../../apiService/LoginService";
import { useNavigate } from "react-router-dom"; // Add this at the top

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("USER"); // Default role
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Add this inside your component before return
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const data = await registerUser(email, password, role?.toUpperCase());
      setSuccess("User registered successfully.");
      setEmail("");
      setPassword("");
      setRole("USER");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Register</h2>

      {error && (
        <p
          style={{
            color: "red",
            backgroundColor: "#ffe6e6",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
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
            marginBottom: "10px",
          }}
        >
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setRole(e.target.value)
            }
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{
            color: "#007bff",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
