import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

interface Seat {
  tableId: number;
  seatId: number;
}

const TOTAL_TABLES = 2;

const Hub = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

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
      setSelectedSeats((prev) => [...prev, { tableId, seatId }]);
    }
  };

  const getSeatPosition = (seatIndex: number) => {
    switch (seatIndex) {
      case 0:
        return "-top-4 -left-4"; // Top-left outside
      case 1:
        return "-top-4 -right-4"; // Top-right outside
      case 2:
        return "-bottom-4 -left-4"; // Bottom-left outside
      case 3:
        return "-bottom-4 -right-4"; // Bottom-right outside
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4 font-bold">
        FocusHub Room Layout
      </Typography>

      {/* ROOM */}
      <div className="relative bg-[#f5f5f5] border-4 border-[#0c2045] rounded-lg w-[800px] h-[500px] mx-auto p-10 grid grid-cols-2 gap-12 place-items-center">
        {[...Array(TOTAL_TABLES)].map((_, tableIndex) => (
          <div key={tableIndex} className="relative">
            {/* TABLE */}
            <div className="w-40 h-40 bg-white border-2 border-gray-600 rounded-lg flex items-center justify-center text-sm font-semibold shadow-md">
              Table {tableIndex + 1}
            </div>

            {/* CHAIRS */}
            {[0, 1, 2, 3].map((seatIndex) => {
              const isSelected = selectedSeats.some(
                (seat) =>
                  seat.tableId === tableIndex && seat.seatId === seatIndex
              );

              return (
                <Button
                  key={seatIndex}
                  variant="contained"
                  onClick={() => handleSeatClick(tableIndex, seatIndex)}
                  className={`!absolute !w-10 !h-10 !min-w-0 !p-0 !rounded-full ${getSeatPosition(
                    seatIndex
                  )} ${
                    isSelected
                      ? "!bg-green-600 hover:!bg-green-700"
                      : "!bg-gray-400 hover:!bg-gray-500"
                  }`}
                >
                  {seatIndex + 1}
                </Button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Selected Seats */}
      <div className="mt-6">
        <Typography variant="h6">Selected Seats:</Typography>
        {selectedSeats.length === 0 ? (
          <p className="text-gray-500">No seats selected.</p>
        ) : (
          <ul className="list-disc list-inside">
            {selectedSeats.map((seat, index) => (
              <li key={index}>
                Table {seat.tableId + 1}, Seat {seat.seatId + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Hub;
