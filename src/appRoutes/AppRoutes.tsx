import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../component/login/RegisterPage";
import LoginPage from "../component/login/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
