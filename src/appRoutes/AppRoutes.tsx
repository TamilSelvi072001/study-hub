import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../component/login/RegisterPage";
import LoginPage from "../component/login/LoginPage";
import Home from "../component/home/Home";
import HubPage from "../component/hubDetail/HubPage";
import Hub from "../component/hub/Hub";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/details" element={<HubPage />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
