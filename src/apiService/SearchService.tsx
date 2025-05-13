const BASE_URL = "https://studyhub-1-9pee.onrender.com";
// const BASE_URL = "http://localhost:8080";

export interface SearchPayload {
  date: string;
  location: string;
  numberOfPersons: number;
}

export const searchSlots = async (city: string, date: string) => {
  const endpoint = `${BASE_URL}/hub?city=${city}&date=${date}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET", // Use GET for fetching data
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch data from the server.");
    }

    return await response.json(); // Return the parsed JSON response
  } catch (error) {
    console.error("Error in searchSlots:", error);
    throw new Error("An error occurred while fetching search results.");
  }
};
export const getHubDetails = async (hubId: number) => {
  const endpoint = `${BASE_URL}/${hubId}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch hub details.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getHubDetails:", error);
    throw new Error("An error occurred while fetching hub details.");
  }
};
