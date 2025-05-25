// src/apiService/LoginService.ts

const BASE_URL = "https://studyhub-1-9pee.onrender.com/auth";
// const BASE_URL = "http://localhost:8080/auth";

//  LOGIN FUNCTION
export const loginUser = async (email: string, password: string) => {
  const endpoint = `${BASE_URL}/login`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }
    const token = await response.text();
    console.log("Token received:", token); // ✅ Log the token
    localStorage.setItem("token", token); // ✅ Save token to localStorage
    return token;
  } catch (error) {
    throw new Error("An error occurred during login.");
  }
};
export const registerUser = async (
  email: string,
  password: string,
  role: string,
  userName: string,
  phone: string,
  dob: string // format: 'YYYY-MM-DD'
) => {
  const endpoint = `${BASE_URL}/register`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        roles: [role], // Backend expects a set
        userName,
        phone,
        dob, // Ensure it's in YYYY-MM-DD format to match LocalDate
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Registration failed.");
    }

    return await response.text(); // or response.json() based on backend
  } catch (error) {
    throw new Error("An error occurred during registration.");
  }
};
