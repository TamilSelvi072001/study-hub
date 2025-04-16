// src/apiService/SearchService.ts

export interface SearchPayload {
  fromDate: string;
  fromTime: string;
  toTime: string;
  location: string;
  numberOfPersons: number;
}

export const searchSlots = async (payload: SearchPayload) => {
  try {
    const response = await fetch("https://your-api-url.com/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Search failed.");
    }

    return await response.json(); // Assuming API returns a JSON response
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};
