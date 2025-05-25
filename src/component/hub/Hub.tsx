import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useStudyHubContext } from "../Context/StudyHubContext";
import { useNavigate } from "react-router-dom";
import Header from "../home/Header/Header";
import Footer from "../home/Footer/Footer";

// Define interfaces for Seat and TableData
interface SeatData {
  seatId: number;
  seatNumber: number;
  available: boolean;
}

interface TableData {
  tableId: number;
  tableNumber: number;
  seats: SeatData[];
}

interface Seat {
  tableId: number;
  seatId: number;
  seatNumber: number; // Added seatNumber property
}

const Hub = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  let { tableDetails } = useStudyHubContext();
  const navigate = useNavigate();

  const handleSeatClick = (tableId: number, seatId: number) => {
    const alreadySelected = selectedSeats.some(
      (seat) => seat.tableId === tableId && seat.seatId === seatId
    );

    if (alreadySelected) {
      setSelectedSeats((prev) =>
        prev.filter(
          (seat) => !(seat.tableId === tableId && seat.seatId === seatId)
        )
      );
    } else {
      setSelectedSeats((prev) => [
        ...prev,
        { tableId, seatId, seatNumber: seatId },
      ]);
    }
  };
  useEffect(() => {
    const pending = localStorage.getItem("pendingSeats");
    if (pending) {
      try {
        const parsedSeats = JSON.parse(pending);
        setSelectedSeats(parsedSeats);
        localStorage.removeItem("pendingSeats");
      } catch (err) {
        console.error("Failed to parse saved seats", err);
      }
    }
  }, []);
  function getEmailFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64); // decode base64
    const payload = JSON.parse(payloadJson);
    console.log(payload, "payload");
    return payload.sub; // usually the email
  }
  const handleBookingApi = async () => {
    const token = localStorage.getItem("token");
    console.log(token, "token");

    if (!token) {
      localStorage.setItem("pendingSeats", JSON.stringify(selectedSeats));
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      alert("Please log in to confirm your booking.");
      navigate("/login");
      return;
    }

    try {
      const BASE_URL = "https://studyhub-1-9pee.onrender.com";
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (user) {
        console.log(user.email); // ✅ This will print the user's email
      } else {
        console.log("No user found in localStorage");
      }

      const email = getEmailFromToken();
      console.log(email); // prints: tamilselvi072001@gmail.com
      const response = await fetch(`${BASE_URL}/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          seats: selectedSeats,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Booking failed");
      }

      alert("Booking successful!");
      setSelectedSeats([]);
      setOpenDialog(false);
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error(error);
    }
  };

  const getSeatPosition = (seatIndex: number, totalSeats: number) => {
    const positions = {
      one: ["top-1/2 left-[120%] -translate-y-1/2"],

      two: [
        "top-1/2 -left-5 -translate-y-1/2", // left outside
        "top-1/2 -right-5 -translate-y-1/2", // right outside
      ],

      corner: [
        "-top-5 -left-5", // top-left outside
        "-top-5 -right-5", // top-right outside
        "-bottom-5 -left-5", // bottom-left outside
        "-bottom-5 -right-5", // bottom-right outside
      ],

      side: [
        "-top-5 left-1/2 -translate-x-1/2", // top center outside
        "-bottom-5 left-1/2 -translate-x-1/2", // bottom center outside
        "top-1/2 -left-5 -translate-y-1/2", // center left outside
        "top-1/2 -right-5 -translate-y-1/2", // center right outside
      ],
    };

    if (totalSeats === 1) return positions.one[0];

    if (totalSeats === 2) return positions.two[seatIndex] || "";

    if (totalSeats <= 4) return positions.corner[seatIndex] || "";

    if (seatIndex < 4) return positions.corner[seatIndex];

    return positions.side[(seatIndex - 4) % positions.side.length];
  };

  const getTableSize = (seatCount: number) => {
    if (seatCount > 4) return "w-56 h-36"; // wider rectangular table
    return "w-36 h-36"; // uniform for 1–4
  };

  return (
    <div>
      <Header />

      <div className="relative bg-[#f5f5f5] border-4 border-[#0c2045] rounded-xl w-[800px] mx-auto p-10 grid grid-cols-2 gap-20 place-items-center">
        {tableDetails?.map((table: TableData) => (
          <div key={table.tableId} className="relative">
            <div
              className={`bg-white border-2 border-gray-600 rounded-lg flex items-center justify-center text-sm font-semibold shadow-md ${getTableSize(
                table.seats.length
              )}`}
            >
              Table {table.tableNumber}
            </div>

            {table.seats.map((seat: SeatData, seatIndex: number) => {
              const isSelected = selectedSeats.some(
                (s) => s.tableId === table.tableId && s.seatId === seat.seatId
              );

              return (
                <Button
                  key={seat.seatId}
                  variant="contained"
                  onClick={() =>
                    seat.available &&
                    handleSeatClick(table.tableId, seat.seatId)
                  }
                  disabled={!seat.available}
                  className={`!absolute !w-10 !h-10 !min-w-0 !p-0 !rounded-full ${getSeatPosition(
                    seatIndex,
                    table.seats.length
                  )} ${
                    isSelected
                      ? "!bg-green-600 hover:!bg-green-700"
                      : seat.available
                      ? "!bg-gray-400 hover:!bg-gray-500"
                      : "!bg-red-400 cursor-not-allowed"
                  }`}
                >
                  {seat.seatNumber}
                </Button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Typography variant="h6" className="mb-2">
          Selected Seats:
        </Typography>
        {selectedSeats.length === 0 ? (
          <p className="text-gray-500">No seats selected.</p>
        ) : (
          <ul className="list-disc list-inside inline-block text-left mb-4">
            {selectedSeats.map((seat, index) => (
              <li key={index}>
                Table {seat.tableId}, Seat ID {seat.seatId}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("Please log in to confirm your booking.");
                navigate("/login");
              } else {
                setOpenDialog(true);
              }
            }}
            disabled={selectedSeats.length === 0}
            className="!bg-[#163d73] hover:!bg-[#0b2548] !text-white !rounded-full !px-6 !py-2 !text-base transition-all duration-200 shadow-md"
          >
            Confirm Booking
          </Button>
        </div>
      </div>

      {/* Reconfirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reconfirm Your Booking</DialogTitle>
        <DialogContent>
          {selectedSeats.length === 0 ? (
            <Typography>No seats selected.</Typography>
          ) : (
            <ul className="list-disc pl-5">
              {selectedSeats.map((seat, index) => (
                <li key={index}>
                  Table {seat.tableId}, Seat ID {seat.seatNumber}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleBookingApi}
            variant="contained"
            className="!bg-[#163d73] hover:!bg-[#0b2548] !text-white"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Hub;
