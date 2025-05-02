import React, { useState } from "react";

const mockData = [
  {
    hubName: "Anna Nagar Hub",
    tables: Array.from({ length: 5 }, (_, tableIndex) => ({
      tableName: `Table ${tableIndex + 1}`,
      seats: {
        seat1: "available",
        seat2: "available",
        seat3: "available",
        seat4: "available",
      },
    })),
  },
];

const BookSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (tableName: string, seatId: string) => {
    const seatKey = `${tableName}-${seatId}`;
    setSelectedSeats((prev) =>
      prev.includes(seatKey)
        ? prev.filter((s) => s !== seatKey)
        : [...prev, seatKey]
    );
  };

  return (
    <div className="p-4 space-y-8">
      {mockData?.map((hub) => (
        <div key={hub.hubName}>
          <h2 className="text-xl font-bold mb-4">{hub.hubName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hub.tables.map((table) => (
              <div
                key={table.tableName}
                className="relative w-40 h-40 border-2 border-gray-400 rounded-lg flex items-center justify-center"
              >
                <div className="absolute top-0 left-0">
                  <button
                    className={`w-8 h-8 rounded-full m-1 text-sm ${
                      selectedSeats.includes(`${table.tableName}-seat1`)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => toggleSeat(table.tableName, "seat1")}
                  >
                    S1
                  </button>
                </div>
                <div className="absolute top-0 right-0">
                  <button
                    className={`w-8 h-8 rounded-full m-1 text-sm ${
                      selectedSeats.includes(`${table.tableName}-seat2`)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => toggleSeat(table.tableName, "seat2")}
                  >
                    S2
                  </button>
                </div>
                <div className="absolute bottom-0 left-0">
                  <button
                    className={`w-8 h-8 rounded-full m-1 text-sm ${
                      selectedSeats.includes(`${table.tableName}-seat3`)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => toggleSeat(table.tableName, "seat3")}
                  >
                    S3
                  </button>
                </div>
                <div className="absolute bottom-0 right-0">
                  <button
                    className={`w-8 h-8 rounded-full m-1 text-sm ${
                      selectedSeats.includes(`${table.tableName}-seat4`)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => toggleSeat(table.tableName, "seat4")}
                  >
                    S4
                  </button>
                </div>
                <div className="text-center text-sm font-semibold">
                  {table.tableName}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedSeats.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Selected Seats:</h3>
          <ul className="list-disc list-inside">
            {selectedSeats.map((seat) => (
              <li key={seat}>{seat}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookSeat;
