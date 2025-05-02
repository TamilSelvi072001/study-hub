import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="bg-[#0c2045] text-white flex justify-between items-center px-8 py-6 text-2xl font-bold shadow-md">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        FocusHub
      </div>
      <button
        onClick={handleLoginClick}
        className="transition-colors duration-300 hover:text-[#cbd5e1] flex items-center gap-2"
      >
        Login
      </button>
    </header>
  );
};

export default Header;
