import React, { useState } from "react";
import { Alert, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HubService } from "../../apiService/HubService";
import { format } from "date-fns";
import { useStudyHubContext } from "../Context/StudyHubContext";

interface PeopleProps {
  onSubmit: (count: number) => void;
  onClose: () => void;
  availableSeats: number; // Add this to the interface
  hubId: number;
}

const People: React.FC<PeopleProps> = ({
  hubId,
  onSubmit,
  onClose,
  availableSeats,
}) => {
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const { setTableDetails } = useStudyHubContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // if (count < 1 || count > availableSeats) {
    //   setError(`Please enter a number between 1 and ${availableSeats}.`);
    //   return;
    // }

    try {
      const today = format(new Date(), "yyyy-MM-dd"); // or pass date from parent
      const tableData = await HubService(hubId, today);
      setTableDetails(tableData); // store and show in modal

      console.log("Fetched tables with seat details:", tableData);

      onSubmit(count); // still useful if you want to store person count
      navigate("/hub", {
        state: { hubId, tableData, numberOfPersons: count, date: today },
      });
    } catch (error) {
      console.error("Failed to fetch hub details:", error);
      setError("Unable to fetch tables. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">
        How many people are visiting this hub?
      </h2>

      <TextField
        label="Number of People"
        type="number"
        fullWidth
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        inputProps={{ min: 1, max: availableSeats }}
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#0c2045",
          color: "white",
          "&:hover": {
            backgroundColor: "#102d5c",
          },
          marginRight: "20px",
        }}
      >
        Confirm
      </Button>

      <Button
        onClick={onClose}
        sx={{
          color: "#0c2045",
          border: "1px solid #0c2045",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default People;
