const BASE_URL = "https://studyhub-1-9pee.onrender.com";
// const BASE_URL = "http://localhost:8080";

export const fetchUserInfo = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/protected-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  const text = await response.text(); // since backend returns plain text
  return text;
};
