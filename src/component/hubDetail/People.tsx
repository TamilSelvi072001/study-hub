import React, { useState } from "react";
import { Alert, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PeopleProps {
  onSubmit: (count: number) => void;
  onClose: () => void;
  availableSeats: number; // Add this to the interface
  hubId: string;
}

const People: React.FC<PeopleProps> = ({
  hubId,
  onSubmit,
  onClose,
  availableSeats,
}) => {
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (count < 1 || count > availableSeats) {
      setError(`Please enter a number between 1 and ${availableSeats}.`);
      return;
    }
    setError("");
    onSubmit(count);
    console.log("Hub ID:", hubId, count);
    navigate("/hub"); // Navigate to the Hub page
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
