import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const BASE_URL = "https://studyhub-1-9pee.onrender.com";
  // const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/api/protected-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({ name: data.name, email: data.email });
          console.log(data);
        }
      } catch (error) {
        console.error("Token expired or invalid");
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  };

  return (
    <header className="bg-[#0c2045] text-white flex justify-between items-center px-8 py-6 text-2xl font-bold shadow-md">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        FocusHub
      </div>

      {userData ? (
        <UserAvatar
          name={userData.name}
          email={userData.email}
          onLogout={handleLogout}
        />
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="transition-colors duration-300 hover:text-[#cbd5e1] flex items-center gap-2"
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
