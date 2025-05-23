import React, { useState } from "react";
import People from "./People";
import { getHubDetails } from "../../apiService/SearchService";
import { useStudyHubContext } from "../Context/StudyHubContext";

interface HubCardProps {
  hubId: number;
  hubName: string;
  address: string;
  availableSeats: number;
  imageUrl?: string;
}

const HubCard: React.FC<HubCardProps> = ({
  hubId,
  hubName,
  address,
  availableSeats,
  imageUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTableDetails } = useStudyHubContext(); // Assuming you have a context to manage state

  const handleViewDetailClick = async () => {
    try {
      setIsModalOpen(true);
      const data = await getHubDetails(hubId);
      setTableDetails(data); // store and show in modal
    } catch (error) {
      console.error("Could not load hub details", error);
    }
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
      {/* Hub Card */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow w-full max-w-md mx-auto">
        <img
          src={
            imageUrl
              ? `https://studyhub-1-9pee.onrender.com${imageUrl}` // <- Fix: prepend backend base URL
              : "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a"
          }
          alt={hubName}
          className="h-48 w-full object-cover"
        />
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-bold text-[#0c2045]">{hubName}</h3>
          <p className="text-gray-600">{address}</p>
          {/* <p className="text-green-600 font-medium">
            {availableSeats} available seat{availableSeats !== 1 && "s"}
          </p> */}
          <button
            onClick={handleViewDetailClick}
            className="mt-4 bg-[#0c2045] text-white py-2 px-4 rounded hover:bg-[#102d5c] transition"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              aria-label="Close modal"
            >
              &times;
            </button>
            <People
              hubId={hubId}
              onSubmit={handlePeopleSubmit}
              onClose={handleCloseModal}
              availableSeats={availableSeats}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HubCard;
