import React, { useState } from "react";
import {
  searchSlots,
  SearchPayload,
  mockResponse,
} from "../../../apiService/SearchService";
import Hub from "../../hub/Hub";
import { Calendar } from "lucide-react";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const SearchBar: React.FC = () => {
  const [date, setDate] = useState<string>(getTodayDate());
  const [location, setLocation] = useState<string>("");
  const [hubData, setHubData] = useState<any>(null);

  const handleSearch = async () => {
    if (!location) {
      alert("Please select a city.");
      return;
    }

    const payload: SearchPayload = {
      date,
      location,
      numberOfPersons: 1,
    };

    try {
      // const result = await searchSlots(payload);
      let result = mockResponse;

      if (location) {
        result = result.filter(
          (item: any) => item.location.toLowerCase() === location.toLowerCase()
        );
      }

      console.log("Filtered Result:", result);
      setHubData(result);
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
    <>
      <section className="flex justify-center items-center mt-8 px-4">
        <div className="bg-white w-full max-w-lg px-8 py-6 rounded-xl shadow-lg space-y-5">
          {/* City Dropdown */}
          <div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Date Picker */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Search Button */}
          <div>
            <button
              onClick={handleSearch}
              className="w-full bg-[#0c2045] text-white py-3 rounded-lg font-medium hover:bg-[#14336e] transition"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Conditionally render Hub */}
      {hubData && <Hub data={hubData} />}
    </>
  );
};

export default SearchBar;
