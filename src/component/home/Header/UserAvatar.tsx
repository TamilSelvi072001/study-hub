// src/components/UserAvatar.tsx
import React from "react";

interface UserAvatarProps {
  name: string;
  email: string;
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, email, onLogout }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  console.log(name, email, "name and email");

  return (
    <div className="relative group">
      <div className="w-10 h-10 bg-white text-[#0c2045] rounded-full flex items-center justify-center font-bold cursor-pointer shadow-md hover:scale-105 transition-transform">
        {firstLetter}
      </div>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
        <div className="text-[#0c2045] font-semibold mb-1">{name}</div>
        <div className="text-gray-600 text-sm mb-3 truncate">{email}</div>
        <button
          onClick={onLogout}
          className="text-red-600 text-sm hover:underline"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserAvatar;
