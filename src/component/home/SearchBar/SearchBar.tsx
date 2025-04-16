import React, { useEffect, useState } from "react";
import { searchSlots, SearchPayload } from "../../../apiService/SearchService";

// Helper functions to get today's date and current time
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getEndOfDay = () => {
  return "23:59"; // End of today's time
};

const SearchBar: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>(getTodayDate());
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [numberOfPersons, setNumberOfPersons] = useState<string>("");

  useEffect(() => {
    // Reset fromTime and toTime if the fromDate is today and fromTime is past
    if (fromDate === getTodayDate() && fromTime < getCurrentTime()) {
      setFromTime("");
      setToTime("");
    }
  }, [fromDate, fromTime]);

  const handleSearch = async () => {
    // Validation: Ensure fromTime is less than toTime
    if (fromDate === getTodayDate() && fromTime >= toTime) {
      alert("To Time must be greater than From Time.");
      return;
    }

    const payload: SearchPayload = {
      fromDate,
      fromTime,
      toTime,
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
      <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center">
        {/* Date Picker */}
        <div className="flex-1 w-full">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setFromTime("");
              setToTime("");
            }}
            min={getTodayDate()}
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* From Time */}
        <div className="flex-1 w-full">
          <input
            type="time"
            value={fromTime}
            onChange={(e) => {
              setFromTime(e.target.value);
              // Reset toTime if it's invalid
              if (toTime && e.target.value >= toTime) {
                setToTime("");
              }
            }}
            min={fromDate === getTodayDate() ? getCurrentTime() : "00:00"}
            max="23:59"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* To Time */}
        <div className="flex-1 w-full">
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            min={
              fromTime ||
              (fromDate === getTodayDate() ? getCurrentTime() : "00:00")
            }
            max={fromDate === getTodayDate() ? getEndOfDay() : "23:59"}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City Dropdown */}
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

        {/* Number of Seats */}
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

        {/* Search Button */}
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
