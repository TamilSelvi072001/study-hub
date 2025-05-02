import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../component/login/RegisterPage";
import LoginPage from "../component/login/LoginPage";
import Home from "../component/home/Home";
import HubDetail from "../component/hubDetail/HubDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/details" element={<HubDetail />} />
    </Routes>
  );
};

export default AppRoutes;
