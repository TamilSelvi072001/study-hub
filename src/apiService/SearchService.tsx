export interface SearchPayload {
  date: string;
  location: string;
  numberOfPersons: number;
}

export const mockResponse = [
  {
    location: "Chennai",
    hub: [
      {
        area: "T. Nagar",
        hubs: [
          {
            hubName: "T. Nagar Study Hub 1",
            tables: [
              {
                tableName: "Table A1",
                seats: {
                  A1: "available",
                  A2: "unavailable",
                  A3: "available",
                },
              },
              {
                tableName: "Table A2",
                seats: {
                  B1: "unavailable",
                  B2: "available",
                },
              },
            ],
          },
        ],
      },
      {
        area: "Velachery",
        hubs: [
          {
            hubName: "Velachery Study Space",
            tables: [
              {
                tableName: "Table V1",
                seats: {
                  C1: "available",
                  C2: "unavailable",
                  C3: "unavailable",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    location: "Bangalore",
    hub: [
      {
        area: "Whitefield",
        hubs: [
          {
            hubName: "Whitefield Hub A",
            tables: [
              {
                tableName: "Table W1",
                seats: {
                  W1: "available",
                  W2: "available",
                  W3: "unavailable",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    location: "Hyderabad",
    hub: [
      {
        area: "Hi-Tech City",
        hubs: [
          {
            hubName: "Hi-Tech Study Spot",
            tables: [
              {
                tableName: "Table H1",
                seats: {
                  H1: "unavailable",
                  H2: "available",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export const searchSlots = async (payload: SearchPayload) => {
  console.log("Mock Search API called with payload:", payload);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data filtered by location (optional)
  const filtered = mockResponse.filter(
    (loc) => loc.location === payload.location
  );

  return filtered.length > 0 ? filtered : mockResponse;
};

// export interface SearchPayload {
//   fromDate: string;
//   location: string;
//   numberOfPersons: number;
// }

// export const searchSlots = async (payload: SearchPayload) => {
//   try {
//     const response = await fetch("https://your-api-url.com/api/search", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || "Search failed.");
//     }

//     return await response.json(); // Assuming API returns a JSON response
//   } catch (error) {
//     console.error("Search API error:", error);
//     throw error;
//   }
// };
