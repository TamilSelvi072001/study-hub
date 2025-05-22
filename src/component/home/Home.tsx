import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SearchBar from "./SearchBar/SearchBar";
import Moto from "./Moto/Moto";
import axios from "axios";

function Home() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = "https://studyhub-1-9pee.onrender.com/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/cities/names`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Fullscreen Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white" />
        </div>
      )}

      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="flex-grow">
        <Moto />
        <SearchBar cities={cities} />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
