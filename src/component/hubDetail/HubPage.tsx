import React from "react";
import Header from "../home/Header/Header";
import Footer from "../home/Footer/Footer";
import HubDetail from "./HubDetail";
import HubList from "./HubList";

const HubPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HubDetail />
        <HubList />
      </main>
      <Footer />
    </div>
  );
};

export default HubPage;
