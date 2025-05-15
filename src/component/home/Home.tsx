import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SearchBar from "./SearchBar/SearchBar";
import Moto from "./Moto/Moto";
import axios from "axios";

function Home() {
  const [cities, setCities] = useState([]);
  // const BASE_URL = "http://localhost:8080/api";
  const BASE_URL = "https://studyhub-1-9pee.onrender.com/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/cities/names`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
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
