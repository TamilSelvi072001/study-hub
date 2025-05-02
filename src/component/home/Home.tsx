import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SearchBar from "./SearchBar/SearchBar";
import Moto from "./Moto/Moto";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="flex-grow">
        <Moto />
        <SearchBar />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
