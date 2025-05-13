import React, { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useStudyHubContext } from "../Context/StudyHubContext";

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

  const handleBookingApi = async () => {
    const token = localStorage.getItem("token");

    try {
      const BASE_URL = "https://studyhub-1-9pee.onrender.com";

      const response = await fetch(`${BASE_URL}/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
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
      setOpenDialog(false); // Close the dialog
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error(error);
    }
  };

  const getSeatPosition = (seatIndex: number) => {
    switch (seatIndex) {
      case 0:
        return "-top-4 -left-4";
      case 1:
        return "-top-4 -right-4";
      case 2:
        return "-bottom-4 -left-4";
      case 3:
        return "-bottom-4 -right-4";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4 font-bold text-white">
        FocusHub Room Layout
      </Typography>

      <div className="relative bg-[#f5f5f5] border-4 border-[#0c2045] rounded-xl w-[800px] mx-auto p-10 grid grid-cols-2 gap-12 place-items-center">
        {tableDetails?.map((table: TableData) => (
          <div key={table.tableId} className="relative">
            <div className="w-40 h-40 bg-white border-2 border-gray-600 rounded-lg flex items-center justify-center text-sm font-semibold shadow-md">
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
                    seatIndex
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
            onClick={() => setOpenDialog(true)}
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
    </div>
  );
};

export default Hub;
