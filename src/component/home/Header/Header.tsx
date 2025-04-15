import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#0c2045] text-white flex justify-between items-center p-8 text-[1.5rem] font-bold">
      <div>FocusHub</div>
      <div
        className="right cursor-pointer transition-colors duration-300 hover:text-[#cbd5e1] flex items-center gap-2"
        onClick={handleLoginClick}
      >
        Login
      </div>
    </div>
  );
};

export default Header;
