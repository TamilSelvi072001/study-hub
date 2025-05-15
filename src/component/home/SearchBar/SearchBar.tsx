import React, { useState } from "react";
import { searchSlots, SearchPayload } from "../../../apiService/SearchService";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudyHubContext } from "../../Context/StudyHubContext";

const getTodayDate = () => new Date().toISOString().split("T")[0];
type SearchBarProps = {
  cities: string[];
};

const SearchBar: React.FC<SearchBarProps> = ({ cities }) => {
  const [date, setDate] = useState<string>(getTodayDate());
  const [location, setLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // 🔁 Fullscreen loader
  const { setHubData, hubData } = useStudyHubContext();
  const navigate = useNavigate();

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
      setIsLoading(true); // Start loader
      const result = await searchSlots(location, date);
      setHubData(result);
      navigate("/details");
    } catch (error) {
      console.error("Search failed:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // End loader
    }
  };

  return (
    <>
      {/* Loader overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white" />
        </div>
      )}

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
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchBar;
