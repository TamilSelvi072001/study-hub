import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../component/login/RegisterPage";
import LoginPage from "../component/login/LoginPage";
import Home from "../component/home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
