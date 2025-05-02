import React, { useState } from "react";
import People from "./People";

interface HubCardProps {
  hubName: string;
  location: string;
  openSeats: number;
  imageUrl?: string;
}

const HubCard: React.FC<HubCardProps> = ({
  hubName,
  location,
  openSeats,
  imageUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetailClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePeopleSubmit = () => {
    console.log("People form submitted");
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow w-full max-w-md mx-auto">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a"
          }
          alt={hubName}
          className="h-48 w-full object-cover"
        />
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-bold text-[#0c2045]">{hubName}</h3>
          <p className="text-gray-600">{location}</p>
          <p className="text-green-600 font-medium">
            {openSeats} open seat{openSeats !== 1 && "s"} available
          </p>
          <button
            onClick={handleViewDetailClick}
            className="mt-4 bg-[#0c2045] text-white py-2 px-4 rounded hover:bg-[#102d5c] transition"
          >
            View Details
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <People onSubmit={handlePeopleSubmit} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default HubCard;
