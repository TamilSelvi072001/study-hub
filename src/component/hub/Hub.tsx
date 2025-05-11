import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useStudyHubContext } from "../Context/StudyHubContext";

interface Seat {
  tableId: number;
  seatId: number;
}

const Hub = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
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
      setSelectedSeats((prev) => [...prev, { tableId, seatId }]);
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
        {tableDetails?.map((table: any, tableIndex: number) => (
          <div key={table.tableId} className="relative">
            {/* TABLE */}
            <div className="w-40 h-40 bg-white border-2 border-gray-600 rounded-lg flex items-center justify-center text-sm font-semibold shadow-md">
              Table {table.tableNum}
            </div>

            {/* CHAIRS */}
            {table.seats.map((seat: any, seatIndex: number) => {
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
                  {console.log(seat, "seat", seat.available, isSelected)}
                  {seat.seatNumber}
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
                Table {seat.tableId}, Seat ID {seat.seatId}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Hub;
