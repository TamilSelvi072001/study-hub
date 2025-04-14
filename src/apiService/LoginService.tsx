// src/apiService/LoginService.ts

const BASE_URL = "http://localhost:8080/auth";

//  LOGIN FUNCTION
export const loginUser = async (userName: string, password: string) => {
  const endpoint = `${BASE_URL}/login`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }

    return await response.text(); // or response.json() based on your API
  } catch (error) {
    throw new Error("An error occurred during login.");
  }
};

// REGISTER FUNCTION
export const registerUser = async (
  userName: string,
  password: string,
  role: string
) => {
  const endpoint = `${BASE_URL}/register`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
        roles: [role], // Backend expects an array
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Registration failed.");
    }

    return await response.text(); // or response.json()
  } catch (error) {
    throw new Error("An error occurred during registration.");
  }
};
