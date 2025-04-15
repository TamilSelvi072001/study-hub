import React, { useState } from "react";
import { searchSlots, SearchPayload } from "../../../apiService/SearchService";

const SearchBar: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [numberOfPersons, setNumberOfPersons] = useState<string>("");

  const handleSearch = async () => {
    const payload: SearchPayload = {
      fromDate,
      location,
      numberOfPersons: Number(numberOfPersons),
    };

    try {
      const result = await searchSlots(payload);
      console.log("API Response:", result);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const cities: string[] = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Coimbatore",
  ];

  return (
    <div className="w-full px-6 py-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 w-full">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 w-full">
          <input
            type="number"
            min="1"
            value={numberOfPersons}
            onChange={(e) => setNumberOfPersons(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number of seats"
          />
        </div>

        <div className="flex-1 w-full">
          <button
            onClick={handleSearch}
            className="w-full bg-[#0c2045] text-white px-4 py-2 rounded-lg hover:bg-[#14336e] transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
