// const BASE_URL = "http://localhost:8080/api";
const BASE_URL = "https://studyhub-1-9pee.onrender.com/api";

export interface Seat {
  seatId: number;
  available: boolean;
  seatNumber?: string;
}

export interface Table {
  tableId: number;
  tableName: string;
  seats: Seat[];
}

export const HubService = async (
  hubId: number,
  date: string
): Promise<Table[]> => {
  const token = localStorage.getItem("token"); // ⬅️ Get token from localStorage
  const endpoint = `${BASE_URL}/hubdetails/${hubId}?date=${date}`;

  try {
    const token = localStorage.getItem("token");
    console.log("Token in HubService:", token); // ✅ Log the token

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ...(token && { Authorization: `Bearer ${token}` }), // ✅ Add token to header
      },
      // credentials: "include", // ✅ Also required if backend has allowCredentials(true)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch hub details.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in HubService:", error);
    throw new Error("An error occurred while fetching table details.");
  }
};
